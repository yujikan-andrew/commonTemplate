<template>
  <div>
    <sz-echart id="lineChart" 
      :loading="timeLoading" 
      :option="timeLineOption"
      width="900px"
      height="500px">
    </sz-echart>
  </div>
</template>
<script>

export default {
  name: 'dataInfo',
  components: {
  },
  data() {
      return {
        timeLineOption: {},
        timeLoading: false,
      }
  },
  mounted() {
      this.setLineOption()
  },
  methods: {
    setLineOption() {
      this.timeLineOption = {
        tooltip: {
          show: true
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
      }
    },
  }
}
</script>
<style lang="less" scoped>
#test-echart {
  
}
</style>