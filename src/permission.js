import router from './router'
import store from './store'
import { getToken } from '@/utils/cookie' // get token from cookie
import req from '@/api/req.js'


const whiteList = ['/login', '/home'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // set page title
  document.title = to.meta.title

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/home' })

    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()

      } else {
        try {
          req.userInfo().then((res) => {
            if (res.status === 200 && res.data.success) {
              
              next()
            } else {
              store.commit('LOGOUT')
            }
          })
        } catch (error) {
          // remove token and go to login page to re-login
          store.commit('LOGOUT')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    /* no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

