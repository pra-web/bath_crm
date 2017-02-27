// Import System requirements
import Vue from 'vue'
import Resource from 'vue-resource'
import VueRouter from 'vue-router'

import routes from './routes'
import store from './store'

// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'

// Import Views - Top level

import AppView from './components/App.vue'

// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)

// Resource logic
Vue.use(Resource)

Vue.use(VueRouter)

Vue.http.interceptors.push((request, next) => {
  // Enable this when you have a backend that you authenticate against
  var headers = request.headers
  if (window.location.pathname !== '/login' && !headers.hasOwnProperty('Authorization')) {
    headers.Authorization = store.state.token
  }
  console.log(headers)
  // continue to next interceptor without modifying the response
  next()
})

// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})
// Check local storage to handle refreshes
if (window.localStorage) {
  if (store.state.user !== window.localStorage.getItem('user')) {
    store.commit('SET_USER', JSON.parse(window.localStorage.getItem('user')))
    store.commit('SET_TOKEN', window.localStorage.getItem('token'))
  }
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.token === null) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router: router,
  store: store,
  render: h => h(AppView)
})
