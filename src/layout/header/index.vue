<template>
  <div class="head-wrap pf">
    我是头部
  </div>
</template>
<script type="text/javascript">
export default {
  props: {},
  methods: {

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