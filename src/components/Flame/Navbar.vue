<template>
  <div class="navbar">
    <div
      class="navbar__item"
      v-for="(item, index) in items"
      :key="index"
      :class="{'selected': item.route === $route.path}"
    >
      <router-link :to="item.route" exact>
        <i class="navbar__item__icon" :class="'ri-' + item.icon"></i>
        <div class="navbar__item__label">{{ item.label }}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppNavbar",
  data() {
    return {
      items: [
        {
          label: "Home",
          icon: "home-2-fill",
          route: "/",
        },
        {
          label: "Sell",
          icon: "add-circle-fill",
          route: "/sell",
        },
        {
          label: "Chat",
          icon: "chat-3-fill",
          route: "/chat_list",
        },
        {
          label: "Saved",
          icon: "heart-fill",
          route: "/saved_list",
        },
        {
          label: "Profile",
          icon: "user-3-fill",
          route: "/profile",
        },
      ],
    };
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid #e2e8f0;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.05);
}

.navbar__item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 20%;
  height: 100%;
  font-size: 12px;
  font-weight: 600;
}

.navbar__item__icon {
  font-size: 30px;
  margin-bottom: 4px;
  color: var(--text-light-gray);
}
.navbar__item__label {
  font-size: 12px;
  color: var(--text-light-gray);
}
.selected .navbar__item__icon {
  color: var(--text-purple);
}
.selected .navbar__item__label {
  color: var(--text-purple);
}
</style>
