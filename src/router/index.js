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
import department from './routers/user/department'
import user from './routers/user/user'
import role from './routers/user/role'
import permission from './routers/user/permission'
import operation from './routers/user/operation'
const cmsRouterMap = [webSite, systemSet, systemStatus, personAndAuthor, extensions, department, user, role, permission, operation]

/**
 * 用户中心系统路由
 */
import userDemo from './routers/user/userDemo'
const userRouterMap = [userDemo, department]

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
