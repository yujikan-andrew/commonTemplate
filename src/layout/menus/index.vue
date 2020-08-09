<template>
  <div class="menus-wrap pf">
    我是menus
  </div>
</template>
<script type="text/javascript">
export default {
  props: {},
  components: {},
  data() {
    return {
    }
  },
  filters: {},
  watch: {
  },
  mounted() {},
  methods: {

  }
}
</script>
<style 
  lang="less" scoped>

.menus-wrap {
  width: @menuWidth;
  height: calc(100% - @headHeight);
  top: @headHeight;
  background: @selectBg;
  z-index: @zidxFrame;
  .boxshadow();
}
</style>