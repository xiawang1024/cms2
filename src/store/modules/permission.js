import { routerMap } from '@/router/index.js'
import constantRouterMap from '@/router/public'

/**
 * 过滤子系统路由
 * @param {*} routerMap
 * @param {*} sysType
 */
function filterSysRouter(sysType) {
  console.log(routerMap)
  return routerMap.filter((item) => item.type === sysType)[0].route
}
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param authorities
 * @param route
 */
function hasPermission(authorities, route) {
  if (route.meta && route.meta.role) {
    return authorities.includes(route.meta.role)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param authorities
 */
function filterAsyncRouter(routes, authorities) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(authorities, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, authorities)
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
      /**
       * 动态路由刷新404bug
       */
      routers = routers.concat({ path: '*', redirect: '/404', hidden: true })
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit, getters }, data) {
      return new Promise((resolve) => {
        const { authorities } = data
        let asyncSysRouterMap = null

        asyncSysRouterMap = filterSysRouter(getters.sysType)
        const accessedRouters = filterAsyncRouter(asyncSysRouterMap, authorities)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
