<template>
  <div class="warp-margin warp-padding">{{msg}}</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      msg: '请求中……index 页面！',
      password: '',
      username: ''
    }
  },
  computed: {
    ...mapGetters([
      'screenWidth',
      'screenHeight'
    ])
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>

div {

}
</style>
