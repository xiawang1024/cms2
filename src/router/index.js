import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/**
 *公共路由
 */
import constantRouterMap from './public'

/**
 * cms系统路由
 */

import webSite from './routers/cms/webSite'
import systemSet from './routers/cms/systemSet'
import systemStatus from './routers/cms/systemStatus'
import personAndAuthor from './routers/cms/personAndAuthor'
import extensions from './routers/cms/extensions'
const cmsRouterMap = [webSite, systemSet, systemStatus, personAndAuthor, extensions]

/**
 * 用户中心系统路由
 */
import userDemo from './routers/user/userDemo'
const userRouterMap = [userDemo]

/**
 * 路由map
 */
export const routerMap = [
  {
    type: '0',
    route: cmsRouterMap
  },
  {
    type: '1',
    route: userRouterMap
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
