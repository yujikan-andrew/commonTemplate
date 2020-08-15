<template>
  <div class="hello">
    <h1 class="warp-margin warp-padding">{{ msg }}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    ...mapGetters([
      'screenWidth',
      'screenHeight'
    ])
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1 {
  .boxshadow();
  .borderRadius()
}
</style>
