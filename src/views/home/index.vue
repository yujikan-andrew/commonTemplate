<template>
  <div class="warp-margin warp-padding">
    <p class="p-title">我是标题</p>
    <p class="p-line-warp" v-for="item in list">
      <span class="p-label">{{item.title}}：</span>
      <span class="p-content">{{item.content}}</span>
    </p>
  </div>
</template>
<script type="text/javascript">
import { homeList } from '@/api/home.js'
export default {
  props: {},
  components: {
    
  },
  data() {
    return {
      list: []
    }
  },
  filters: {},
  watch: {
    
  },
  mounted() {
    homeList().then((res)=> {
      if (res.data.code === 0) {
        this.list = res.data.data  
      }
    })
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