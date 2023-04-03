<template>
  <v-list>
    <v-list-item
      v-for="(user, index) in users"
      :key="index"
      @click="selectUser(index)"
    >
      <v-list-item-avatar>
        <v-img :src="user.avatar" class="rounded-icon"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ user.status }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <div class="status-circle" :class="user.status"></div>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  methods: {
    selectUser(index) {
      this.$emit("user-selected", index);
    },
  },
};
</script>

<style scoped>
.rounded-icon {
  border-radius: 50%;
}

.status-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: auto;
}

.online {
  background-color: #2ecc71;
}

.offline {
  background-color: #95a5a6;
}

.away {
  background-color: #f1c40f;
}

.busy {
  background-color: #e74c3c;
}
</style>
