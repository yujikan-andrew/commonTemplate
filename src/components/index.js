import Vue from 'vue'
import SvgIcon from './sz_svg_icon'// svg component
import VLoading from './sz_loading'
import VTree from './sz_tree'
import NoData from './sz_no_data'
import SzEchart from './sz_echart'

// register globally
Vue.component('sz-svgicon', SvgIcon)
Vue.component('sz-loading', VLoading)
Vue.component('sz-tree', VTree)
Vue.component('sz-nodata', NoData)
Vue.component('sz-echart', SzEchart)