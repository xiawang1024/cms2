import Vue from 'vue'
import moment from 'moment'
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import '@/assets/iconfont/iconfont.css' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog' // error log
import './permission' // permission control
import * as filters from './filters' // global filters
import initVue from '@/utils/init/'
import Moment from 'moment'
import VueClipboard from 'vue-clipboard2'
import uploader from '@/common/uploader'
Vue.use(uploader)
Vue.prototype.moment=Moment
initVue(Vue)
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use( VueClipboard )

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
// 时间格式化过滤器
Vue.filter('timeFilter', function (value, format) {
  if (!format) {
    format = 'YYYY-MM-DD HH:mm:ss'
  }
  if (!isNaN(value)) {
    if (String(value).length === 10) {
      return moment.unix(value).format(format)
    } else if (String(value).length === 13) {
      return moment(value).format(format)
    } else {
      return '暂无'
    }
  }
  let date = new Date(value)
  if (!isNaN(date.getTime())) {
    return moment(value).format(format)
  }
  return '暂无'
})
// 移动端禁止访问
router.beforeEach((to, from, next) => {
  if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    // router.replace({path: '/404'});
    alert('禁止访问')
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: (h) => h(App)
})

// router.onError(function() {
//   console.log(1111)
//   router.replace({path: '/404'});
// })
// router.beforeEach((to, from, next) => {
//   // 侧边栏路由已经动态生成ok 一期特殊需求 首页为站点设置
//   if (!(store.getters.addRouters.length == 0 && store.getters.addRouters[0].redirect == "/404")) {
//     if (!window.localStorage.getItem("shouye")) {
//       window.localStorage.setItem("shouye", true)
//       store.getters.addRouters.forEach(element => {
//         if (element.name == "systemSet") {
//           router.push({
//             path: '/cms/systemSet/siteSet',
//           });
//         }
//       });
//     }
//   }
//   next();
// })