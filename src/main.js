import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './permission.js'
import './icons' // icon

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
