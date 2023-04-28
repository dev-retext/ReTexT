import { createStore } from "vuex";
import { realtimeDB, firestoreDB, storage } from "../main";
import { set, ref as dbRef, get, update } from "firebase/database";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { ref as storageRef, getDownloadURL, uploadBytes } from "firebase/storage";

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
      TalkedUserIDs: [],
    },
    products: {
      // サインアップ時に, Firestoreからデモデータを強制保存させる
    },
    tradeHistory: {
      // サインアップ時に, Firestoreからデモデータを強制保存させる
      demoID: {
        TradeDate: "20230415",
        TradeProduct: "demoID",
        TradePartnerID: "demoUID",
        TradePartnerName: "demo",
        TradeEvaluation: "4",
      },
    },
    chatUserData: {
      // チャットデータを一時保存する用
      userID: {
        iconImage: "",
        userName: "", 
        pastTalk: "",
        pastTalkTime: "",
      }
    }, 
    loginStatus: false,
    isLoading: false,
  },


  mutations: {
    setLoginStatus(state, bool) {
      state.loginStatus = bool;
    },
    setIsLoading(state, bool) {
      state.isLoading = bool;
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
      state.userData.RegisteredProductIDs = RegisteredProductIDs;
    },
    pushRegisteredProductID(state, ProductID) {
      state.userData.RegisteredProductIDs.push(ProductID);
    },
    setRegisteredProducts(state, products) {
      state.products = products;
    },
    storeProductToVuex(state, { id, data }) {
      state.products[id] = data;
    },
    storeChatDataToVuex(state, { id, data }) {
      state.chatUserData[id] = data;
    },
  },


  actions: {
    /* サインアップに成功した時に, 初期データを登録する用 */
    async createUserDB({ commit, dispatch }, arrivedData) {
      await commit("setIsLoading", true);
      try {
        // デモデータを取得
        await commit("addDemoData");
        // realtime databaseとvuexストアに登録するIDとユーザーデータを設定
        const Uid = arrivedData.Uid;
        const registerData = {
          Email: arrivedData.Email,
          Password: arrivedData.Password,
          NickName: arrivedData.NickName,
          Gender: arrivedData.Gender,
          University: arrivedData.University,
        };
        // realtime databaseへ
        await set(dbRef(realtimeDB, `Users/${Uid}/`), registerData);
        // vuexストアへ
        commit("setUid", Uid);
        commit("setNickName", registerData.NickName);
        commit("setEmail", registerData.Email);
        commit("setPassword", registerData.Password);
        commit("setGender", registerData.Gender);
        commit("setUniversity", registerData.University);
        // Firestoreからデモデータを取得し, vuexストアへ
        const ID = await ["demoID"];
        dispatch("fetchProductsByIDs", ID);
      } catch (error) {
        console.log(error);
      }
      commit("setIsLoading", false);
    },

    /* サインインに成功した時に, データを取得する用 */
    async fetchUserData({ commit, dispatch }, uid) {
      await commit("setIsLoading", true);
      try {
        // UIDで自分のユーザー情報が置いてある場所を参照
        const userRef = await dbRef(realtimeDB, `Users/${uid}`);
        // UID以下のユーザー情報を全て取得
        const snapshot = await get(userRef);
        const userData = await snapshot.val();
        commit("setUid", uid);
        commit("setNickName", userData.NickName);
        commit("setEmail", userData.Email);
        commit("setPassword", userData.Password);
        commit("setGender", userData.Gender);
        commit("setUniversity", userData.University);
        // 配列が空だったら, そのままにしておく
        const favorite = await userData.MarkedProductIDs || [];
        const productIds = await userData.RegisteredProductIDs || [];
        commit("setMarkedProductIDs", favorite);
        commit("setRegisteredProductID", productIds);
        // Firestoreからデモデータを取得し, vuexストアへ
        const ID = await ["demoID"];
        dispatch("fetchProductsByIDs", ID);
      } catch (error) {
        console.error(error);
      }
      commit("setIsLoading", false);
    },

    /* Storageに画像を登録し, 公開URLを取得する */
    async registerImage({ commit, dispatch }, { imageFile: imageFile }) {
      commit("setIsLoading", true);
      try {
        await console.log(imageFile.name);
        const imageName = await imageFile.name.split(".")[0];
        console.log(imageName);
        // 現在時刻を取得
        const nowDate = await dispatch("getNowDate");
        // 画像データ名と登録日を合わせて独自の画像データを格納場所を作成
        const imageDataName = await `${imageName + "_" + nowDate}`;
        // Storageの参照先を作成
        const fileRef = await storageRef(
          storage,
          `book_images/` + imageDataName
        );
        // 画像データをStorageへ
        await uploadBytes(fileRef, imageFile);
        // 画像データの公開URLを取得
        const url = await getDownloadURL(fileRef);
        // 取得した公開URLを返す(※親元でローディング終了判定)
        return url;
      } catch (error) {
        console.log(error);
      }
    },

    /* 現在時刻を取得 */
    getNowDate() {
      const now = new Date();
      const year = now.getFullYear().toString();
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const day = now.getDate().toString().padStart(2, "0");
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      return (year + month + day + hours + minutes + seconds);
    },

    /* Firestoreに商品を登録(出品)し, vuexストアとrealtime databaseにProductIDを記憶 */
    async addProduct({ commit, state }, newProductData) {
      try {
        // Firestoreに商品を登録(自動で商品IDが生成される)
        const docRef = await addDoc(collection(firestoreDB, "Products"), {
          ...newProductData,
        });
        // vuexストアに自動生成されたProductIDを保存
        await commit("pushRegisteredProductID", docRef.id);
        // realtime databaseに自動生成されたProductIDを保存
        await update(dbRef(realtimeDB, `Users/${state.userData.Uid}/`), {
          RegisteredProductIDs: state.userData.RegisteredProductIDs,
        });
        // 登録した商品データをvuexストアにも保存
        commit("storeProductToVuex", {
          id: docRef.id,
          data: { ...newProductData },
        });
      } catch (error) {
        console.log(error);
      }
    },

    /* Firestoreから商品IDを用いて任意の商品データをvuexストアに取得 */
    async fetchProductsByIDs({ commit }, ids) {
      commit("setIsLoading", true);
      try {
        // 引数の配列内の全ての商品IDの分、Firestoreから商品データを取得
        await Promise.all(
          ids.map(async (id) => {
            // 商品データを取得するための参照を作成して, 参照先の商品データを取得
            const docRef = await doc(firestoreDB, "Products", id);
            const docSnap = await getDoc(docRef);
            // 参照先の商品データを取得できたら, vuexストアに商品IDと商品データを登録
            if (docSnap.exists()) {
              commit("storeProductToVuex", { id: id, data: docSnap.data() });
            }
          })
        );
      } catch (error) {
        console.error(error);
      }
      commit("setIsLoading", false);
    },

    /* FirestoreからユーザーIDを用いてチャットデータをvuexストアに取得 */
    async fetchChatUserData({ commit }, ids) {
      try {
        // 
        await Promise.all(
          ids.map(async (id) => {
            const docRef = await storageRef(firestoreDB,`Chats`,id);
            const docSnap = await getDoc(docRef);
            // 参照先のチャットデータを取得できたら, vuexストアに商品IDと商品データを登録
            if (docSnap.exists()) {
              commit("")
            }
          })
        )
      } catch (error) {
        console.log(error)
      }
    },
  },
});
