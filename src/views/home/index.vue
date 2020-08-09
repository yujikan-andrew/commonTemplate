<template>
  <div class="warp-margin warp-padding">
    <HelloWorld :msg="username"></HelloWorld>
    <p class="p-title">我是{{username}}</p>
    <p class="p-line-warp">
      <span class="p-label">这是前面：</span>
      <span class="p-content">这是后面内容这是</span>
    </p>
    <p class="p-line-warp">
      <span class="p-label">这是前面：</span>
      <span class="p-content">这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容这是后面内容</span>
    </p>
  </div>
</template>
<script type="text/javascript">
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  props: {},
  components: {
    HelloWorld
  },
  data() {
    return {
      username: '好用的模版'
    }
  },
  filters: {},
  watch: {
    
  },
  mounted() {
  },
  methods: {

  }
}
</script>
<style 
  lang="less" scoped>

// must has style 
.gray {
  color: @subFont;
}
.warp-margin {
  width: calc(100% - 44px);
  box-sizing: border-box;
  height: calc(100% - 24px);
}
</style>