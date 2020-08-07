<template>
  <div class="main-wrap">
    home page
    <HelloWorld msg="my components"></HelloWorld>
  </div>
</template>
<script type="text/javascript">
import HelloWorld from '@/components/HelloWorld.vue'
import { userInfo } from '@/api/user.js'
export default {
  props: {},
  components: {
    HelloWorld
  },
  data() {
    return {
    }
  },
  filters: {},
  watch: {
    
  },
  mounted() {
    userInfo().then((res)=> {
      console.log(res.data.data)
    })
  },
  methods: {

  }
}
</script>
<style 
  lang="less" scoped>
  
</style>