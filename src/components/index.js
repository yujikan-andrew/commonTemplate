import Vue from 'vue'
import SvgIcon from './sz_svg_icon'// svg component
import szLoading from './sz_loading'
import szTree from './sz_tree'
import szNoData from './sz_no_data'
import SzEchart from './sz_echart'
import SzMap from './sz_map'

// register globally
Vue.component('sz-svgicon', SvgIcon)
Vue.component('sz-loading', szLoading)
Vue.component('sz-tree', szTree)
Vue.component('sz-nodata', szNoData)
Vue.component('sz-echart', SzEchart)
Vue.component('sz-map', SzMap)