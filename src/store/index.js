import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  userInfo: {
    login: false,
    id: '',
    roles: [],
    username: ''
  },
  screenHeight: document.documentElement.clientHeight || document.body.clientHeight,
  screenWidth: document.documentElement.clientWidth || document.body.clientWidth,
  headHeight: 60
}

const store = new Vuex.Store({
  state,
  getters,
  mutations
})

export default store