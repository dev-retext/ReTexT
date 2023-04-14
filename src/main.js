import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getDatabase } from 'firebase/database'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import "remixicon/fonts/remixicon.css"

const firebaseConfig = {
  apiKey: "AIzaSyD7QGeo_GespCEFb_3CP8xBrPZzdpWq2Sg",
  authDomain: "retext-4803c.firebaseapp.com",
  databaseURL: "https://retext-4803c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "retext-4803c",
  storageBucket: "retext-4803c.appspot.com",
  messagingSenderId: "747084861366",
  appId: "1:747084861366:web:9dd5057b75778986317b17",
  measurementId: "G-1W0EJYENKN"
};

console.log(firebaseConfig)
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const realtimeDB = getDatabase(firebaseApp)
const fireDB = getFirestore(firebaseApp)

createApp(App).use(store).use(router).mount("#app")

export {
  firebaseApp,
  auth,
  realtimeDB,
  fireDB,
  collection,
  addDoc
}