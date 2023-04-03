<!-- <template>
  <div class="home">
    <h1>This is an home page</h1>
    
  </div>
</template> -->

<!-- <template>
  <div>
    <div v-if="allData">
      <pre>{{ allData }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("fetchAllData");
  },
  computed: {
    allData() {
      return this.$store.state.allData;
    },
  },
};
</script> -->

<template>
  <div>
    <p>{{ user }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.getUserByID('userID1')
    }
  }
}
</script>
