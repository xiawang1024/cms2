import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getAuth, setAuth, removeAuth } from '@/utils/auth'
import router from '@/router'

const user = {
  state: {
    token: getAuth(),
    name: '',
    avatar: 'http://www.hndt.com/podcast/976/1131/res/EEghUGNE.jpg?1511506999379',
    authorities: [],
    roles: [],
    sysList: ['0'],
    sysType: '0',
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },

    SET_SETTING: (state, setting) => {
      state.setting = setting
    },

    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_AUTHORITIES: (state, authorities) => {
      state.authorities = authorities
    },
    SET_SYS_LIST: (state, sysList) => {
      state.sysList = sysList
    },
    SET_SYS_TYPE: (state, sysType) => {
      state.sysType = sysType
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then((response) => {
            const data = response.data
            console.log(data)
            commit('SET_TOKEN', data.access_token)
            setAuth(data)

            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then((response) => {
            const data = response.data

            if (data.client_authorities && data.client_authorities.length > 0) {
              // 验证返回的roles是否是一个非空数组
              // commit('SET_ROLES', data.client_authorities)
              commit('SET_AUTHORITIES', data.client_authorities)
            } else {
              reject('getInfo: roles must be a non-null array !')
            }
            /**
             * 子系统列表
             */
            // commit('SET_SYS_LIST', data.sysList)
            commit('SET_NAME', data.name)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_AUTHORITIES', [])
            removeAuth()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_AUTHORITIES', [])
        removeAuth()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', role)
        setAuth(role)
        getUserInfo(role).then((response) => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_AUTHORITIES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    },
    /**
     * 选择子系统，动态修改路由
     */
    selectSysType({ commit, dispatch, getters, state }, sysType) {
      commit('SET_SYS_TYPE', sysType)
      router.push({ path: '/' })
      dispatch('delAllViews') // 清除tagViews
      dispatch('GenerateRoutes', { roles: getters.roles }).then(() => {
        /**
         * 更新动态路由
         */
        router.addRoutes(getters.addRouters)
      }) // 动态修改权限后 重绘侧边菜单
    }
  }
}

export default user
