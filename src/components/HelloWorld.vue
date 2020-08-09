<template>
  <div class="hello">
    <h1 class="warp-margin warp-padding">{{ msg }}</h1>
    <div class="warp-margin warp-padding">
      <p class="p-title">标题</p>
      <p class="p-line-warp">
        <span class="p-label">这是前面：</span>
        <span class="p-label">这是后面内容</span>
      </p>
      <p class="p-line-warp">
        <span class="p-label">这是前面：</span>
        <span class="p-label">后面内容</span>
      </p>
      <p class="p-line-warp">
        <span class="p-label">这是前面：</span>
        <span class="p-label">是后面内容</span>
      </p>
      <p class="p-line-warp">
        <span class="p-label">这是前面：</span>
        <span class="p-label">这是后面内容</span>
      </p>
    </div>
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
  color: @gray;
  .boxshadow();
  .borderRadius()
}
</style>
