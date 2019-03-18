import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control

import * as filters from './filters' // global filters
import initVue from '@/utils/init/'
initVue(Vue)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: (h) => h(App)
})
router.beforeEach((to, from, next) => {
  // 侧边栏路由已经动态生成ok 一期特殊需求 首页为站点设 置
  if (!(store.getters.addRouters.length == 0 && store.getters.addRouters[0].redirect == "/404")) {
    if (!window.localStorage.getItem("shouye")) {
      window.localStorage.setItem("shouye", true)
      store.getters.addRouters.forEach(element => {
        if (element.name == "systemSet") {
          router.push({
            path: '/cms/systemSet/siteSet',
          });
        }
      });
    }
  }
  next();
})