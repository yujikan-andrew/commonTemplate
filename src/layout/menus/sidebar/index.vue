<template>
  <div>
    <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import router from '@/router'

export default {
  components: { SidebarItem },
  data() {
    return {
      routes: []  // route role config here
    }
  },
  computed: {
    ...mapGetters([
      
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  mounted() {
    this.routes = router.options.routes
  },
  methods: {
  }
}
</script>
