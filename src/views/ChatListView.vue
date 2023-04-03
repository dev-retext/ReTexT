<template>
  <div>
    <user-list-card :users="users" @user-selected="selectChat" />

    <v-card>
      <v-card-title class="text-h5">{{ selectedChat.name }}</v-card-title>
      <v-card-text>
        <p class="mb-0">{{ selectedChat.lastTalk }}</p>
        <p class="text-caption grey--text">{{ selectedChat.talkTime }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import UserListCard from "@/components/ForChat/UserListCard.vue";

export default {
  components: {
    UserListCard
  },
  data() {
    return {
      users: [
        {
          name: "Lisa",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          status: "online"
        },
        {
          name: "John",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          status: "offline"
        },
        {
          name: "Mary",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          status: "away"
        },
        {
          name: "Tom",
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          status: "busy"
        }
      ],
      selectedChat: {
        name: "Lisa",
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        lastTalk: "How are you?",
        talkTime: "10:30 AM"
      }
    };
  },
  methods: {
    selectChat(index) {
      this.selectedChat = {
        name: this.users[index].name,
        avatar: this.users[index].avatar,
        lastTalk: "Selected user: " + this.users[index].name,
        talkTime: new Date().toLocaleTimeString()
      };
    }
  }
};
</script>
