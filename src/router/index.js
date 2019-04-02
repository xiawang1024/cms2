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
// import systemStatus from './routers/cms/systemStatus'
// import personAndAuthor from './routers/cms/personAndAuthor'
// import extensions from './routers/cms/extensions'
const cmsRouterMap = [webSite, systemSet]

/**
 * 用户中心系统路由
 */
import userDemo from './routers/user/userDemo'
import organization from './routers/user/organization'
import department from './routers/user/department'
import user from './routers/user/user'
import role from './routers/user/role'
import permission from './routers/user/permission'
import permissiongroup from './routers/user/permissiongroup'
import operation from './routers/user/operation'
import application from './routers/user/application'
const userRouterMap = [userDemo, operation, application, organization, department, user, role, permissiongroup, permission]

/**
 * 互动中心
 * @type {Array}
 */
const internalRouterMap = []

/**
 * 节目编排系统路由
 */
import channel from './routers/program/channel'
import class1 from './routers/program/class'
import column from './routers/program/column'
import compere from './routers/program/compere'
import program from './routers/program/program'
const programRouterMap = [channel, class1, column, compere, program]
/**
 * 新闻指挥
 */
import manageClue from './routers/newcommand/manageClue'
import commandDispatch from './routers/newcommand/commandDispatch'
import manuscriptClue from './routers/newcommand/manuscriptClue'
import fileClue from './routers/newcommand/fileClue'
import liveClue from './routers/newcommand/liveClue'
import operationRecord from './routers/newcommand/operationRecord'
const newscommandRouterMap = [manageClue,commandDispatch,manuscriptClue,fileClue,liveClue,operationRecord]

/**
 * 路由map
 */
export const routerMap = [{
    type: '0',
    route: cmsRouterMap
  },
  {
    type: '1',
    route: userRouterMap
  },
  {
    type: '2',
    route: internalRouterMap
  },
  {
    type: '3',
    route: programRouterMap
  },
  {
    type: '4',
    route: newscommandRouterMap
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
