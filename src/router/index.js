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
import personAndAuthor from './routers/cms/personAndAuthor'
// 配置和文章审核
import checkSetting from './routers/cms/checkSetting'
import articleCheck from './routers/cms/articleCheck'
// import extensions from './routers/cms/extensions'
import commentModeration from './routers/cms/commentModeration'
import statisticsChart from './routers/cms/statisticsChart'
import pushMessage from './routers/cms/pushMessage'
// const cmsRouterMap = [webSite, systemSet, personAndAuthor,commentModeration]
const cmsRouterMap = [webSite, systemSet, personAndAuthor, checkSetting, articleCheck, commentModeration, statisticsChart, pushMessage]

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
import userInfo from './routers/user/userInfo'


const userRouterMap = [userInfo,userDemo, operation, application, organization, department, user, role, permissiongroup, permission]

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
import dsClue from './routers/newCommand/dsClue'
import dxClue from './routers/newCommand/dxClue'
import nyClue from './routers/newCommand/nyClue'
import commandDispatch from './routers/newCommand/commandDispatch'
import manuscriptClue from './routers/newCommand/manuscriptClue'
import fileClue from './routers/newCommand/fileClue'
import liveClue from './routers/newCommand/liveClue'
import operationRecord from './routers/newCommand/operationRecord'
import classifyManage from './routers/newCommand/classifyManage'
import newCommandPermission from './routers/newCommand/dataPermission1'

const newscommandRouterMap = [dsClue, dxClue,nyClue,commandDispatch, manuscriptClue, fileClue, liveClue, operationRecord, classifyManage, newCommandPermission]

/**
 * 直播
 */
import livePage from './routers/live/livePage';
import fileManage from './routers/live/fileManage';

const liveRouterMap = [livePage,fileManage]

/**
 * 系统设置
 */
import dataPermission from './routers/systemSet/dataPermission'
const systemSetRouterMap = [dataPermission]
/**
 * 稿库
 */
import searchIndex from './routers/document/searchIndex'
const documentRouterMap = [searchIndex]

/**
 * 路由map
 */
// ['cms', 'userCenter', 'interaction', 'program','newsCommand'],
export const routerMap = [{
    type: 'cms',
    route: cmsRouterMap
  },
  {
    type: 'userCenter',
    route: userRouterMap
  },
  {
    type: 'interaction',
    route: internalRouterMap
  },
  {
    type: 'program',
    route: programRouterMap
  },
  {
    type: 'newsCommand',
    route: newscommandRouterMap
  },
  {
    type: 'live',
    route: liveRouterMap
  },
  {
    type: 'systemSet',
    route: systemSetRouterMap
  },
  {
    type: 'library',
    route: documentRouterMap
  }

]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
