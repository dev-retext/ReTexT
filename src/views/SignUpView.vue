<template>
  <div class="signup-flame">
    <div class="signup">
      <h2>Create your account</h2>
      <form @submit.prevent="signUp">
        <div class="form-control">
          <label>Email:<input type="email" id="email" v-model="email" required /></label>
        </div>
        <div class="form-control">
          <label>Password:<input type="password" id="password" v-model="password" required /></label>
        </div>
        <div class="form-control">
          <label>Nickname:<input type="text" id="nickname" v-model="nickname" required /></label>
        </div>
        <div class="form-control">
          <label>Gender:<input type="text" id="gender" v-model="gender" /></label>
        </div>
        <div class="form-control">
          <label>University:<input type="text" id="university" v-model="university" /></label>
        </div>
        <button type="submit">Create account</button>
      </form>
      <router-link to="/sign_in">Go to Sign In</router-link>
    </div>
  </div>
</template>
<script>
import { auth } from "../main";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data: function () {
    return {
      email: null,
      password: null,
      nickname: null,
      gender: null,
      university: null,
    }
  },
  methods: {
    signUp() {
      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const registerData = {
            Uid: userCredential.user.uid,
            Email: this.email,
            Password: this.password,
            NickName: this.nickname,
            Gender: this.gender,
            University: this.university,
          };
          this.$store.dispatch("createUserDB", registerData);
          console.log("サインアップに成功!!")
          this.$store.commit("setLoginStatus", true);
          this.$router.push("/")
        })
        .catch((error) => {
          console.error(error.message);
        });
    },
  },
};
</script>

<style scoped>
.signup-flame {
  display: flex;
  justify-content: center;
  align-content: center;
}
.signup {
  margin-top: 30%;
}
</style>