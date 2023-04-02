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
import Navbar from "./components/Navbar.vue";
import Header from "./components/Header.vue";

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
    };
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.hideNavigation == true) {
        this.hideNavigation = true;
      } else {
        this.hideNavigation = false;
      }
      next();
    });
  },
};
</script>

<style>
:root {
  --text-light-gray: #55575f;
  --text-purple: #917AFD;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100vh;
  background-color: #f7fafc;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}

@media (max-width: 414px) {
  .main-content {
    padding: 10px;
  }
}
</style>
