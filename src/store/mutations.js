import { removeToken } from '@/utils/cookie.js'
export default {
  LOGOUT(state) {
    state.userInfo = null
    removeToken()
  },
  SET_USER(state, user) {
    state.userInfo = user
  },
  setScreenHeight(state, isResize) {
    state.screenHeight = isResize
  },
  setScreenWidth(state, isResize) {
    state.screenWidth = isResize
  }
}
