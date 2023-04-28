<template>
  <div>
    <h1>チャット一覧</h1>
    <div v-for="user in users" :key="user.id">
      <UserListCard :user="user" class="user-list" @click="toChatRoom(user.id)" />
    </div>
  </div>
</template>

<script>
import UserListCard from "../components/Chat/UserListCard.vue";

export default {
  components: {
    UserListCard,
  },
  data() {
    return {
      users: [
        {
          id: 1,
          name: "User A",
          lastMessage: "こんにちは！",
          lastMessageTime: "13:00",
          icon: "https://dummyimage.com/100x100/000/fff&text=UserA",
        },
        {
          id: 2,
          name: "User B",
          lastMessage: "おはようございます。",
          lastMessageTime: "10:00",
          icon: "https://dummyimage.com/100x100/000/fff&text=UserB",
        },
        {
          id: 3,
          name: "User C",
          lastMessage: "今日は何してる？",
          lastMessageTime: "9:00",
          icon: "https://dummyimage.com/100x100/000/fff&text=UserC",
        },
      ],
    };
  },
  methods: {
    toChatRoom(id) {
      this.$router.push("/chat_room/:usrID" + id)
    },
  },
  computed: {},
  /* このページを開いたら商品データを取得する */
  async mounted() {
    console.log("ページを開くたびに実行")
    await this.$store.dispatch("fetchChatUserData")
  },
};
</script>

<style>
.user-list {
  margin: 1rem;
}
</style>
