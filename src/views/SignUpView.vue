<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <div>
        <label for="nickname">Nickname:</label>
        <input type="text" id="nickname" v-model="nickname" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div>
        <label for="university">University:</label>
        <input type="text" id="university" v-model="university" required />
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      nickname: "",
      email: "",
      password: "",
      university: "",
    };
  },
  methods: {
    ...mapActions(["signUp"]),
    signUp() {
      this.$store.dispatch("signUp", {
        nickname: this.nickname,
        email: this.email,
        password: this.password,
        university: this.university,
      });
    },
  },
};
</script>
