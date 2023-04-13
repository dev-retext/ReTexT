<template>
  <div id="app">
    <Header />
    <div class="main-content">
      <router-view />
    </div>
    <navbar v-if="!hideNavigation" />
  </div>
</template>

<script>
import { auth } from "./main";
import { onAuthStateChanged } from "@firebase/auth";
import Header from "./components/Flame/Header.vue";
import Navbar from "./components/Flame/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Header,
  },
  data() {
    return {
      title: "Vue Navigation Bar",
      hideNavigation: false,
      isLoggedIn: false,
    };
  },
  created() {
    // Firebaseのログイン状態の監視
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.$router.beforeEach((to, from, next) => {
      if (to.meta.hideNavigation == true) {
        this.hideNavigation = true;
      } else {
        this.hideNavigation = false;
      }

      if (to.meta.requiresAuth && !this.isLoggedIn) {
        next("/sign_in");
      } else {
        next();
      }
    });
  },
};
</script>

<style>
:root {
  --text-light-gray: #76767a;
  --text-deep-gray: #333236;
  --text-purple: #6246EA;
}

* {
  margin: 0;
  padding: 0;
}

body {
  overflow: hidden;
}

li {
  list-style: none;
}

a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
}
</style>