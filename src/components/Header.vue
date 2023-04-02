<template>
  <div class="header">
    <h1>ReTexT</h1>
  </div>
</template>

<script>
export default {
  name: "GlobalHeader",
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 414px) {
  /* iPhone XR */
  .header {
    height: 60px;
  }
}
</style>
