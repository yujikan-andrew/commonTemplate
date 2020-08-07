<template>
  <div class="hello">
    <hello :msg="msg"></hello>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { userInfo, testMock, testInCache } from '@/api/req.js'
import hello from '@/components/HelloWorld.vue'
export default {
  components: { hello },
  data() {
    return {
      msg: ''
    }
  },
  computed: {
    ...mapGetters([
      'screenWidth',
      'screenHeight'
    ])
  },
  mounted() {
    console.log(this.screenWidth, this.screenHeight)
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
