<template>
  <div class="signup">
    <h2>Create your account</h2>
    <form @submit.prevent="signUp">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-control">
        <label for="nickname">Nickname</label>
        <input type="text" id="nickname" v-model="nickname" required />
      </div>
      <div class="form-control">
        <label for="gender">Gender</label>
        <input type="text" id="gender" v-model="gender" />
      </div>
      <div class="form-control">
        <label for="university">University</label>
        <input type="text" id="university" v-model="university" />
      </div>
      <button type="submit">Create account</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth } from "../main";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  created: function () {
    this.$store.getters['auth']
    console.log(this.$store)
    console.log(this)
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const nickname = ref("");
    const gender = ref("");
    const university = ref("");

    const signUp = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email.value, password.value)
          .then((userCredential) => {
            const user = {
              uid: userCredential.user.uid,
              nickname: nickname.value,
              email: email.value,
              gender: gender.value,
              university: university.value,
            };
            this.$store.commit("setLoginStatus", true);
            this.$store.dispatch("createUser", user);
            console.log("サインアップ成功!!");
          })
          .then(() => {
            this.$router.push("/");
          });
      } catch (error) {
        console.log(error);
      }
    };

    return { email, password, nickname, gender, university, signUp };
  },
};
</script>
