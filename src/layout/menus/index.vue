<template>
  <div class="menus-wrap pf">
    <sidebar />
  </div>
</template>
<script type="text/javascript">
import router from '@/router'
import sidebar from './sidebar/index.vue'
export default {
  props: {},
  components: {
    sidebar
  },
  data() {
    return {
      routes: []
    }
  },
  filters: {},
  watch: {
  },
  mounted() {
    this.routes = router.options.routes
    console.log(this.routes)
  },
  methods: {
    handleOpen() {},
    handleClose() {}
  }
}
</script>
<style 
  lang="less" scoped>

.menus-wrap {
  width: @menuWidth;
  height: calc(100% - @headHeight);
  top: @headHeight;
  z-index: @zidxFrame;
  .boxshadow();
}
</style>