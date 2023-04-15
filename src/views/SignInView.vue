<template>
  <div class="signin-flame">
    <div class="signin">
      <h1>Sign In</h1>
      <form @submit.prevent="signIn">
        <div>
          <label>Email:<input type="email" id="email" v-model="email" required></label>
        </div>
        <div>
          <label>Password:<input type="password" id="password" v-model="password" required></label>
        </div>
        <button type="submit">Sign In</button>
      </form>
      <router-link to="/sign_up">Go to Sign Up</router-link>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/main";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signIn() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.$store.dispatch("fetchUserData", userCredential.user.uid)
          this.$router.push("/");
          this.$store.commit("setLoginStatus", true)
        })
        .catch ((error) => {
          console.error(error.message)
      })
    },
  }
};
</script>
