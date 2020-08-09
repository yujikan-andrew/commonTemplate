import { login, logout } from '@/api/login'
import { getJse } from '@/utils/get_jse'
import router from '@/router'

export default {
  login({ commit }, params) {
    var { username, password } = params
    password = getJse(password)

    login({userId: username, password}).then((res)=> {
      if (res) {
        commit('LOGIN', res)
        router.push('/index')
      }
    })
  },
  async logout({ commit }, params) {
    await logout()
    commit('LOGOUT')
    router.push('/login')
  },
}
