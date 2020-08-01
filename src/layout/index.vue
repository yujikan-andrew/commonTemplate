<template>
  <div class="app-main">
    <head-section></head-section>
    <menus></menus>
    我是布局
    <app-main></app-main>
  </div>
</template>
<script type="text/javascript">
import headSection from './header/index.vue'
import menus from './menus/index.vue'
import appMain from './apps/index.vue'

export default {
  props: {},
  components: {
    headSection,
    menus,
    appMain
  },
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
  
</style>