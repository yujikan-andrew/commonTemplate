<template>
  <div class="apps-wrap pr">
    <!-- keep-alive hot load performance not good, please open it when you build  -->
    <!-- <keep-alive> -->
      <router-view :key="key" />
    <!-- </keep-alive> -->
  </div>
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
.apps-wrap {
  top: @headHeight;
  left: @menuWidth;
  height: calc(100vh - @headHeight);
  width: calc(100vw - @menuWidth);
  z-index: @zidxBottom;
  overflow-y: auto;
}
</style>

