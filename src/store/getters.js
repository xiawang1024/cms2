const getters = {
  sidebar: (state) => state.app.sidebar,
  language: (state) => state.app.language,
  size: (state) => state.app.size,
  device: (state) => state.app.device,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  introduction: (state) => state.user.introduction,
  status: (state) => state.user.status,

  authorities: (state) => state.user.authorities,
  sysList: (state) => state.user.sysList,
  sysType: (state) => state.user.sysType,
  setting: (state) => state.user.setting,
  permission_routers: (state) => state.permission.routers,
  addRouters: (state) => state.permission.addRouters,
  errorLogs: (state) => state.errorLog.logs,

  viewType: (state) => state.webSite.viewType,
  viewTypeShow: (state) => state.webSite.viewTypeShow,
  treeTags: (state) => state.webSite.tags,
  contextMenu: (state) => state.webSite.contextMenu
}
export default getters
