<template>
  <div class="hello">
    <div class="warp-margin warp-padding">{{msg}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { userInfo, testMock, testInCache } from '@/api/req.js'
import { login } from '@/api/login.js'
export default {
  data() {
    return {
      msg: '请求中……'
    }
  },
  computed: {
    ...mapGetters([
      'screenWidth',
      'screenHeight'
    ])
  },
  mounted() {
    console.log('screenWidth:',this.screenWidth, 'screenHeight:', this.screenHeight)
    userInfo().then((res)=> {
      if (res.status === 200 && res.data.success) {
        this.msg = res.data.msg
      } else {
        this.msg = res.data.msg
      }
    })
    testMock().then((res)=> {
      console.log(res.data.data)
    })

    testInCache().then((res)=> {
      console.log(res.data.msg)
    })
    login().then((res)=> {
      console.log(res.data.data)
    })
  }
}
</script>

<style lang="less" scoped>

.hello {
  width: 100%;
}
</style>
