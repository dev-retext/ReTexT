import { createStore } from "vuex";
import { realtimeDB, firestoreDB } from "../main";
import { set, ref, get, update } from "firebase/database";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

export default createStore({
  state: {
    userData: {
      Uid: "",
      NickName: "",
      Email: "",
      Password: "",
      Gender: "",
      University: "",
      MarkedProductIDs: [],
      RegisteredProductIDs: [],
    },
    products: {
      ProductID: {
        ProductName: "",
        ProductAuthor: "",
        ProductImage: "",
        ProductQuality: "",
        Remark: "",
        Tags: {
          Coverless: false,
          Crease: false,
          Dirty: false,
          Written: false,
        },
      },
    },
    tradeHistory: {
      TradeID: {
        TradeDate: "",
        TradeProduct: [
          /* ProductID */
        ],
        TradePartnerID: "",
        TradePartnerName: "",
        TradeEvaluation: "",
      },
    },
    loginStatus: false,
  },
  getters: {},
  mutations: {
    setLoginStatus(state, bool) {
      state.loginStatus = bool;
    },
    setUid(state, Uid) {
      state.userData.Uid = Uid;
    },
    setNickName(state, NickName) {
      state.userData.NickName = NickName;
    },
    setEmail(state, Email) {
      state.userData.Email = Email;
    },
    setPassword(state, Password) {
      state.userData.Password = Password;
    },
    setGender(state, Gender) {
      state.userData.Gender = Gender;
    },
    setUniversity(state, University) {
      state.userData.University = University;
    },
    setMarkedProductIDs(state, MarkedProductIDs) {
      state.userData.MarkedProductIDs = MarkedProductIDs;
    },
    setRegisteredProductID(state, RegisteredProductIDs) {
      state.userData.RegisteredProductIDs = RegisteredProductIDs
    },
    pushRegisteredProductID(state, ProductID) {
      state.userData.RegisteredProductIDs.push(ProductID);
    },
    setRegisteredProducts(state, products) {
      state.products = products;
    },    
  },
  actions: {
    // サインアップに成功した時に, 初期データを登録する用
    async createUserDB({ commit }, arrivedData) {
      try {
        const registerData = {
          Email: arrivedData.Email,
          Password: arrivedData.Password,
          NickName: arrivedData.NickName,
          Gender: arrivedData.Gender,
          University: arrivedData.University,
        };
        const Uid = arrivedData.Uid;
        await set(ref(realtimeDB, `Users/${Uid}/`), registerData);
        // vuexストアへ
        commit("setUid", Uid);
        commit("setNickName", registerData.NickName);
        commit("setEmail", registerData.Email);
        commit("setPassword", registerData.Password);
        commit("setGender", registerData.Gender);
        commit("setUniversity", registerData.University);
      } catch (error) {
        console.log(error);
      }
    },
    // サインインに成功した時に, データを取得する用
    async fetchUserData({ commit }, uid) {
      // UIDで自分のユーザー情報が置いてある場所を参照
      const userRef = ref(realtimeDB, `Users/${uid}`);
      try {
        // UID以下のユーザー情報を全て取得
        const snapshot = await get(userRef);
        const userData = snapshot.val();
        commit("setUid", uid);
        commit("setNickName", userData.NickName);
        commit("setEmail", userData.Email);
        commit("setPassword", userData.Password);
        commit("setGender", userData.Gender);
        commit("setUniversity", userData.University);
        // 配列が空だったら, そのままにしておく
        const favorite = userData.MarkedProductIDs || [];
        const productIds = userData.RegisteredProductIDs || [];
        commit("setMarkedProductIDs", favorite);
        commit("setRegisteredProductID", productIds);
      } catch (error) {
        console.error(error);
      }
    },
    // Firestoreに商品を登録(出品)し, vuexストアとrealtime databaseにProductIDを記憶
    async addProduct({ commit, state }, newProductData) {
      try {
        // Firestoreに商品を登録(自動で商品IDが生成される)
        const docRef = await addDoc(collection(firestoreDB, "Products"), {
          ...newProductData,
        });
        // vuexストアに自動生成されたProductIDを保存
        await commit("pushRegisteredProductID", docRef.id);
        // realtime databaseに自動生成されたProductIDを保存
        await update(ref(realtimeDB, `Users/${state.userData.Uid}/`), {
          RegisteredProductIDs: state.userData.RegisteredProductIDs,
        });
      } catch (error) {
        console.log(error);
      }
    },
    // Firestoreから商品IDを用いて任意の商品データを取得する
    async fetchProductsByIDs({ commit }, ids) {
      try {
        const products = {};
        await Promise.all(
          ids.map(async (id) => {
            const docRef = doc(firestoreDB, 'Products', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              products[id] = docSnap.data();
            }
          })
        );
        commit('setRegisteredProducts', products);
      } catch (error) {
        console.error(error);
      }
    },
    // Firestoreから画像データを持ってきて, ダウンロードしてURLにする
  },
});
