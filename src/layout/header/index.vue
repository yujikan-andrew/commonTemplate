<template>
  <div class="head-wrap pf">
    我是头部
    <button @click="logout">登出</button>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {},
  methods: {
    logout() {
      this.$store.dispatch("logout")
    }
  }
}
</script>
<style 
  lang="less" scoped>
  
.head-wrap {
  .height(@headHeight);
  width: 100%;
  background: @hoverBg;
  z-index: @zidxFrame;
  .boxshadow();
}
</style>