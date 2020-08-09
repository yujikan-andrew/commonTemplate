import { setToken, removeToken } from '@/utils/cookie.js'
export default {
  LOGIN(state, data) {
    state.user = data.user
    setToken(data.token)
  },
  LOGOUT(state) {
    state.userInfo = null
    removeToken()
  },
  SET_USER(state, user) {
    state.user = user
  },
  setScreenHeight(state, isResize) {
    state.screenHeight = isResize
  },
  setScreenWidth(state, isResize) {
    state.screenWidth = isResize
  }
}
