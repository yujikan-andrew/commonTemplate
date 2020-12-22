import router from './router'
import store from './store'
import { getToken } from '@/utils/cookie' // get token from cookie
import { userInfo } from '@/api/login.js'
import { setPageTitle } from '@/utils/set_title'


const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // next()
  // return
  // set page title
  setPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/index' })

    } else {
      store.commit('LOADING', true)
      // check privalige
      userInfo().then((res)=> {
        if (res.status === 200 && res.data.success) {
          store.commit('SET_USER', res.data.data)
          next()

        } else {
          store.commit("LOGOUT")
          next(`/login`)
        }
        store.commit('LOADING', false)
      })
      
    }
  } else {  // no token

    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      store.commit("LOGOUT")
      next(`/login?redirect=${to.path}`)
    }
  }
})

