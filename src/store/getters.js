/**
 * 基础
 */
const app = {
  sidebar: (state) => state.app.sidebar,
  language: (state) => state.app.language,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  setting: (state) => state.user.setting,
  permission_routers: (state) => state.permission.routers,
  addRouters: (state) => state.permission.addRouters,
  errorLogs: (state) => state.errorLog.logs
}
/**
 * 用户
 */
const userInfo = {
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  authorities: (state) => state.user.authorities,
  sysList: (state) => state.user.sysList,
  sysType: (state) => state.user.sysType,
  tenantId: (state) => state.user.tenantId,
  siteName: (state) => state.user.siteName,
  currentInfor: (state) => state.user.currentInfor,
  columnAll: (state) => state.user.columnAll,
  columnAllOrigin: (state) => state.user.columnAllOrigin,

}
/**
 * cms
 */
const cms = {
  viewType: (state) => state.cms.viewType,
  viewTypeShow: (state) => state.cms.viewTypeShow,
  treeTags: (state) => state.cms.tags,
  contextMenu: (state) => state.cms.contextMenu,
  getDocInformation: (state) => state.cms.docInformation,
  recycleCnannelId: (state) => state.cms.recycleChannelId
}
/**
 * newCommand
 */
const newCommand = {
  discloseClassifys: (state) => state.newCommand.discloseClassifys,

}
/**
 * live
 */
const live = {
  discloseClassifys: (state) => state.live.discloseClassifys,

}
const getters = {
  ...app,
  ...userInfo,
  ...cms,
  ...newCommand,
  ...live
}
export default getters
