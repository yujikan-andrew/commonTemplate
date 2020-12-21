<template>
  <div class="map-container">
    <sz-map></sz-map>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import szMap from '@/components/sz_map'
export default {
  name: "map",
  props: {},
  components: {
    szMap
  },
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
  .map-container {
    height: 100%;
  }
</style>