import Vue from 'vue'
import SvgIcon from '@/components/svg_icon'// svg component
import vLoading from '@/components/loading'
// register globally
Vue.component('svg-icon', SvgIcon)
Vue.component('v-loading', vLoading)

const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)