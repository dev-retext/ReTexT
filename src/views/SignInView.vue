<!-- <template>
  <form @submit.prevent="signIn">
    <div>
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email" required>
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
    </div>
    <button type="submit">Sign In</button>
  </form>
  <router-link to="/sign_up">Go to Sign Up</router-link>

</template>

<script>
import { getAuth } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useStore } from "vuex";
import { getDatabase, onValue } from "firebase/database";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const store = useStore();
    const router = useRouter();

    const signIn = async () => {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        console.log(userCredential);
        console.log("ログイン成功!!");
        const db = getDatabase();
        const userRef = ref(db, `Users/${userCredential.user.uid}`);
        onValue(userRef, (snapshot) => {
          const userData = snapshot.val();
          store.commit("setUser", userData);
          store.commit("setLoginStatus", true);
        });
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    };

    return { email, password, signIn };
  },
};

</script> -->

<template>
  <div class="signin">
    <h2>Sign In</h2>
    <form @submit.prevent="signIn">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button class="btn" type="submit">Sign In</button>
    </form>
  </div>
  <router-link to="/sign_up">Go to Sign Up</router-link>
</template>

<script>
import { ref } from "vue";
import { auth } from "@/main";

export default {
  name: "SignInView",
  setup() {
    const email = ref("");
    const password = ref("");

    const signIn = async () => {
      try {
        await auth.signInWithEmailAndPassword(email.value, password.value);
        await fetchUserData();
        console.log("ログイン成功!!");
        this.$router.push('/')
      } catch (error) {
        console.log(error);
      }
    };

    async function fetchUserData({ commit }, uid) {
      // FirebaseのRealtime Databaseからデータを取得する処理
      const snapshot = await ref.child(`users/${uid}`).once("value");
      const userData = snapshot.val();

      // Vuexストアにデータを格納するためのmutationを呼び出す
      commit("SET_USER_DATA", userData);
    }

    return { email, password, signIn };
  },
};
</script>
