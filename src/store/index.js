import { createStore } from "vuex";
import { db } from "../main"

export default createStore({
  state: {
    user: {
      Uid: "",
      NickName: "",
      Email: "",
      Password: "",
      Gender: "",
      University: "",
      Products: {
        ProductID: {
          ProductName: "",
          ProductImage: "",
          ProductQuality: "",
          Remark: "",
          Tags: {
            Favorite: null,
            Coverless: null,
            Crease: null,
            Dirty: null,
            Written: null,
          }
        },
      },
      Favorite: {
        ProductID: ""
      },
      TradeHistory: {
        TransID: {
          TransDate: "",
          TransProduct: "",
          TransPartner: "",
          TransEvaluation: "",
        }
      }
    },
    LoginStatus: false
  },
  getters: {
    getUid: (state) => {
      return state.Uid
    },
    getNickName: (state) => {
      return state.user.NickName
    },
    getEmail: (state) => {
      return state.user.Email
    },
    getPassword: (state) => {
      return state.user.Password
    },
    getGender: (state) => {
      return state.user.Gender
    },
    getUniversity: (state) => {
      return state.user.University
    },
    getProductID: (state) => {
      return state.user.Products.ProductID
    },
    getProductName: (state) => (ProductID) => {
      return state.user.Products[ProductID].ProductName
    },
    getProductImage: (state) => (ProductID) => {
      return state.user.Products[ProductID].ProductImage
    },
    getProductQuality: (state) => (ProductID) => {
      return state.user.Products[ProductID].ProductQuality
    },
    getProductRemark: (state) => (ProductID) => {
      return state.user.Products[ProductID].ProductRemark
    },
    getProductTags: (state) => (ProductID) => {
      return state.user.Products[ProductID].Tags
    },
    getFavorite: (state) => (ProductID) => {
      return state.user.Favorite[ProductID]
    },
    getTradeHistoryID: (state) => {
      return state.user.TradeHistory.TransID
    },
    getTransData: (state) => (TransID) => {
      return state.user.TradeHistory[TransID].TransDate
    },
    getTransProduct: (state) => (TransID) => {
      return state.user.TradeHistory[TransID].TransProduct
    },
    getTransPartner: (state) => (TransID) => {
      return state.user.TradeHistory[TransID].TransPartner
    },
    getTransEvaluation: (state) => (TransID) => {
      return state.user.TradeHistory[TransID].TransEvaluation
    },
    getLoginStatus: (state) => {
      return state.loginStatus
    }
  },  
  mutations: {
    setUid(state, Uid) {
      state.user.Uid = Uid;
    },
    setNickName(state, NickName) {
      state.user.NickName = NickName;
    },
    setEmail(state, Email) {
      state.user.Email = Email;
    },
    setPassword(state, Password) {
      state.user.Password = Password;
    },
    setGender(state, Gender) {
      state.user.Gender = Gender
    },
    setUniversity(state, University) {
      state.user.University = University
    },
    setProduct(state, Product) {
      state.user.Product[Product.newProductID] = {
        ProductName: "",
        ProductImage: "",
        ProductQuality: "",
        Remark: "",
        Tags: {
          Favorite: null,
          Coverless: null,
          Crease: null,
          Dirty: null,
          Written: null,
        },
      }
    },
    setFavorite(state, ProductID) {
      state.user.Favorite[ProductID] = ""
    },
    setTrade(state, Trade) {
      state.user.TradeHistory[Trade.newTransID] = {
        TransDate: "",
        TransProduct: "",
        TransPartner: "",
        TransEvaluation: "",
      }
    },
    setLoginStatus(state, bool) {
      state.LoginStatus = bool
    }
  },
  actions: {
    async createUser({commit}, user) {
      try {
        const userRef = db.ref(`users/${user.uid}`)
        await userRef.set(user)

        commit("setUid", user.uid)
        commit("setNickName", user.nickname)
        commit("setEmail", user.email)
        commit("setGender", user.gender)
        commit("setUniversity", user.university)
      } catch (error) {
        console.error(error)
      }
    },
    async fetchUserData({commit}, uid) {
      try {
        const userRef = db.ref(`users/${uid}`)
        const snapshot = await userRef.once("value")
        const userData = snapshot.val()
        commit("setUid", uid)
        commit("setNickName", userData.NickName)
        commit("setEmail", userData.Email)
        commit("setPassword", userData.Password)
        commit("setGender", userData.Gender)
        commit("setUniversity", userData.University)
        commit("setProducts", userData.Products)
        commit("setFavorite", userData.Favorite)
        commit("setTradeHistory", userData.TradeHistory)
      } catch (error) {
        console.error(error)
      }
    },
    setNewProduct({commit}, ProductID) {
      commit("setProduct", ProductID)
    },
    setFavoriteProduct({commit}, ProductID) {
      commit("setFavorite", ProductID)
    },
  }
});
