import { createStore } from "vuex";
import { realtimeDB } from "../main"
import { set, ref, get } from "firebase/database"

export default createStore({
  state: {
    userData: {
      Uid: "",
      NickName: "",
      Email: "",
      Password: "",
      Gender: "",
      University: "",
      Favorite: []
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
          Written: false
        }
      }
    },
    tradeHistory: {
      TransID: {
        TransDate: "",
        TransProduct: {
          ProductID: ""
        },
        TransPartner: {
          Uid: "",
          NickName: ""
        },
        TransEvaluation: ""
      }
    },
    LoginStatus: false
  },
  getters: {},  
  mutations: {
    setLoginStatus(state, bool) {
      state.LoginStatus = bool
    },
    setUid(state, Uid) {
      state.userData.Uid = Uid
    },
    setNickName(state, NickName) {
      state.userData.NickName = NickName
    },
    setEmail(state, Email) {
      state.userData.Email = Email
    },
    setPassword(state, Password) {
      state.userData.Password = Password
    },
    setGender(state, Gender) {
      state.userData.Gender = Gender
    },
    setUniversity(state, University) {
      state.userData.University = University
    },
    setFavorite(state, Favorite) {
      state.userData.Favorite = Favorite
    },
  },
  actions: {
    // サインアップに成功した時に, 初期データを登録する用
    async createUserDB({ commit }, arrivedData) {
      const registerData = {
        Email: arrivedData.Email,
        Password: arrivedData.Password,
        NickName: arrivedData.NickName,
        Gender: arrivedData.Gender,
        University: arrivedData.University,
      }
      const Uid = arrivedData.Uid
      await set(ref(realtimeDB, `Users/${Uid}/`), registerData)
      // vuexストアへ
      commit("setUid", registerData.Uid)
      commit("setNickName", registerData.NickName);
      commit("setEmail", registerData.Email);
      commit("setPassword", registerData.Password);
      commit("setGender", registerData.Gender);
      commit("setUniversity", registerData.University);
    },    
    // サインインに成功した時に, データを取得する用
    async fetchUserData({ commit }, uid) {
      const userRef = ref(realtimeDB, `Users/${uid}`)
      try {
        const snapshot = await get(userRef)
        const userData = snapshot.val()
        console.log(snapshot)
        console.log(userData)
        commit('setUid', uid)
        commit('setNickName', userData.NickName)
        commit('setEmail', userData.Email)
        commit('setPassword', userData.Password)
        commit('setGender', userData.Gender)
        commit('setUniversity', userData.University)
        commit('setFavorite', userData.Favorite)
      } catch (error) {
        console.error(error)
      }
    }    
  }
});
