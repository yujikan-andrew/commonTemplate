<template>
  <div class="module-container" :style="{width:width}">
    <div
      :id="chartId"
      class="module-body bg"
      :style="{height:height,width:width}">
    </div>
  </div>
</template>
<script>
 
export default {
    name: 'sz-echart',
    props: {
        chartId: { // 图表id
            type: String,
            default() {
                return new Date().getTime().toString()
            }
        },
        height: { // 折线图高
            type:String,
            default() {
                return '500px'
            }
        },
        width: { // 折线图宽
            type: String,
            default() {
                return '700px'
            }
        },
        option: { // 折线图配置
            type: Object,
            required: true // 数据
        },
        loading: { // 图形加载
          type: Boolean,
          default() {
              return false
          }
        },
    },
    data() {
        return {
          chart: null,
          empty: false,
        }
    },
    watch: {
      option(option) {
        if (option) {
          this.chart.setOption(this.option)
        } else {
          this.chart.clear()
        }
        
      },
    },
    mounted() {
      if (this.chart === null) {
        this.chart = this.$echarts.init(document.getElementById(this.chartId), null, this.opts)
      }
        
    },
    beforeDestroy() {
      if (this.chart !== null && this.chart !== '' && !(typeof this.chart === 'undefined')) {
          this.chart.clear()
      }
    },
    methods: {
       
    }
}
</script>