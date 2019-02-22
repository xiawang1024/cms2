import { routerMap } from '@/router/index.js'
import constantRouterMap from '@/router/public'

/**
 * 过滤子系统路由
 * @param {*} routerMap
 * @param {*} sysType
 */
function filterSysRouter(sysType) {
  return routerMap.filter((item) => item.type === sysType)[0].route
}
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.includes(route.meta.role)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = []
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit, getters }, data) {
      return new Promise((resolve) => {
        const { roles } = data
        let asyncSysRouterMap = null
        console.log(getters.sysType)
        asyncSysRouterMap = filterSysRouter(getters.sysType)
        const accessedRouters = filterAsyncRouter(asyncSysRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
