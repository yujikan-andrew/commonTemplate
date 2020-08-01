<template>
  <section class="app-main">
    <keep-alive>
      <router-view :key="key" />
    </keep-alive>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="less" scoped>
.app-main {
  min-height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  overflow: hidden;
  z-index: 99;
  font-size: 14px;  // for solve the rem bug
}

</style>

