<template>
  <div class="no-data" :style="{height: height+ 'px', lineHeight: height+ 'px'}">
    {{ title }}
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    height: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: '暂无数据'
    }
  },
  methods: {

  }
}
</script>
<style
  lang="less" scoped>
  @import '../../assets/common/index.less';
  .no-data {
    font-size: 14px;
    text-align: center;
    color: @subFontColor;
  }
</style>
