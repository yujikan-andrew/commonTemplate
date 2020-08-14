<template>
  <div class="warp-margin warp-padding">
    <p class="warp-margin p-title">1. flex 实现居中</p>
    <div class="flex__container-1">
      <div class="flex__item"></div>
    </div>

    <div class="warp-margin"></div>
    <p class="warp-margin p-title">2. flex 实现居中，使用svg-icon</p>

    <div class="flex__container-2">
      <svg-icon icon-class="juese"></svg-icon>
      <svg-icon icon-class="gongzuotai"></svg-icon>
    </div>

    <div class="warp-margin"></div>
    <p class="warp-margin p-title">3. flex 实现多个居中</p>
    <div class="flex__container-3">
      <div class="avatar">很多元素也可以居中</div>
      <div class="media__heading">
        <svg-icon icon-class="juese"></svg-icon>
        <svg-icon icon-class="gongzuotai"></svg-icon>
      </div>
      <div class="media__content">居中</div>
      <div class="action">很多元素也可以居中很多元素也可以居中很多元素也可以居中</div>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import svgIcon from '@/components/SvgIcon'
export default {
  components: {
    svgIcon
  },
  data() {
    return {
      msg: 'flex 实现居中',
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

.flex__container-1, .flex__container-2, .flex__container-3 {
  width: 50vw;
  height: 42px;
  background: #eee;
}
.flex__container-1 {
  display: flex;
  justify-content: center;
  align-items: center;
  .flex__item {
    width: 32px;
    height: 32px;
    background: #fff;
  }
}
.flex__container-2 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.flex__container-3  {
  height: 142px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
