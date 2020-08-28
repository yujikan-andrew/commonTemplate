import Vue from 'vue'
import SvgIcon from './svg_icon'// svg component
import VLoading from './loading'
import VTree from './tree'
import NoData from './no_data'
import SzEchart from './sz_echart'

// register globally
Vue.component('svg-icon', SvgIcon)
Vue.component('v-loading', VLoading)
Vue.component('v-tree', VTree)
Vue.component('no-data', NoData)
Vue.component('sz-echart', SzEchart)