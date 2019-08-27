import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import store from './store'
import './common/scss/index.scss'

Vue.config.productionTip = false
Vue.use(ElementUI, {size: 'medium', zIndex: 3000})

// 处理刷新后vuex被清空的问题
if (window.sessionStorage.user) {
  store.dispatch('setUser', JSON.parse(window.sessionStorage.user))
}

// 当用户没有登录时,无论前往那个页面,直接跳转login
router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.state.user.userid) {
    next({
      path: '/login',
      query: {
        redirect: encodeURIComponent(to.fullPath)
      }
    })
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
