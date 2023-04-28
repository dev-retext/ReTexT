<template>
  <div class="user-list-card">
    <div class="icon">
      <img :src="user.icon" alt="user icon" />
    </div>
    <div class="info">
      <div class="name">{{ user.name }}</div>
      <div class="last-message">{{ user.lastMessage }}</div>
      <div class="last-message-time">{{ user.lastMessageTime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
};
</script>

<style scoped>
.user-list-card {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.icon {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.info {
  flex: 1;
}

.name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.last-message {
  font-size: 14px;
  color: #888;
  margin-bottom: 3px;
}

.last-message-time {
  font-size: 12px;
  color: #aaa;
}
</style>
