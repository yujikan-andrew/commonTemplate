<template>
  <div class="head-wrap pf">
    <div class="head-content ps">
      我是头部
      <button @click="logout">登出</button>
    </div>
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

  .head-content {
    right: 20px;
  }
}
</style>