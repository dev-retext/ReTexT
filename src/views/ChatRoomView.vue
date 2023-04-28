<template>
  <div>
    <h1>Chat Room</h1>
    <p>User ID: {{ prop_data }}</p>
  </div>
</template>

<script>
export default {
  props: {
    prop_data: {
      type: String,
      required: true,
      default: "demoID",
    }
  }
};
</script>
