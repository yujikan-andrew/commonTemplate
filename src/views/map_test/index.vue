<template>
  <div class="warp-margin warp-padding">
    核验方案
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
export default {
  props: {},
  components: {},
  data() {
    return {
      value: ''
    }
  },
  computed: {
    ...mapGetters([
        'userInfo'
    ])
  },
  filters: {},
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        
      }
    }
  },
  mounted() {},
  methods: {

  }
}
</script>
<style 
  lang="less" scoped>
  
</style>