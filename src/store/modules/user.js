/**
 * 用户相关
 */

import { loginByUsername, logout, getUserInfo, userCurrent } from '@/api/login'
import { columnListAll } from '@/api/cms/columnManage'
import { UserCurrent } from '@/api/user/user'
import { getAuth, setAuth, removeAuth, setBaseInfor, setColumnAll } from '@/utils/auth'
import { sha1 } from '@/utils/index'
import router from '@/router'
// 获取当前用户
// var getCurrentInfor = function() {
//   return new Promise((resolve, reject) => {
//     UserCurrent()
//       .then((response) => {
//         setBaseInfor(response.data.result)
//         resolve()
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }
var toTree = (data)=> {
  // 删除 所有 children,以防止多次调用
  data.forEach(function(item) {
    delete item.children
  })
  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  var map = {}
  data.forEach(function(item) {
    map[item.channelId] = item
  })
  var val = []
  data.forEach(function(item) {
    item.label = item.channelName
    item.id = item.channelId
    item.value = item.channelId
    // 以当前遍历项，的pid,去map对象中找到索引的id
    var parent = map[item.parentChannelId]
    // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      // item.label = item[channelName]
      (parent.children || (parent.children = [])).push(item)
    } else {
      // item.label = item[channelName]
      val.push(item)
    }
  })
  return val
}
const user = {
  state: {
    token: getAuth(),
    name: '',
    avatar: 'http://www.hndt.com/podcast/976/1131/res/EEghUGNE.jpg?1511506999379',
    authorities: [],
    sysList: ['0', '1', '2', '3','4'],
    // sysType: '0',
    sysType: window.sessionStorage.getItem('sysType') || '0',
    setting: {
      articlePlatform: []
    },
    siteName: '内容发布子系统',
    currentInfor: {},
    columnAll: []
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

    SET_AUTHORITIES: (state, authorities) => {
      state.authorities = authorities
    },
    SET_SYS_LIST: (state, sysList) => {
      state.sysList = sysList
    },
    SET_SYS_TYPE: (state, sysType) => {
      window.sessionStorage.setItem('sysType', sysType)
      state.sysType = sysType
    },
    SET_TENANT_ID: (state, tenantId) => {
      state.tenantId = tenantId
    },
    SET_SITE_NAME: (state, siteName) => {
      state.siteName = siteName
    },
    SET_CURRENT_INFOR: (state, currentInfor) => {
      state.currentInfor = currentInfor
    },
    SET_COLUMN_ALL: (state, columnAll) => {
      state.columnAll = columnAll
    }
  },

  actions: {
    // 站点名称
    SetSiteName({ commit }, siteName) {
      console.log(siteName)
      commit('SET_SITE_NAME', siteName)
    },
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then((response) => {
            const data = response.data
            commit('SET_TOKEN', data.access_token)
            setAuth(data)
            // getCurrentInfor()
            // userCurrent()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取当前登陆用户信息
    GetCurrentInfor({ commit, state }) {
      setBaseInfor({})
      return new Promise((resolve, reject) => {
        userCurrent(state.token)
          .then((res) => {
            // commit('SET_TOKEN', '')

            commit('SET_CURRENT_INFOR', res.data.result)
            setBaseInfor(res.data.result)
            // removeAuth()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取登陆用户全部栏目
    GetColumnAll({ commit, state }) {
      setColumnAll([])
      return new Promise((resolve, reject) => {
        columnListAll({}, 1, 1000)
          .then((res) => {
            commit('SET_COLUMN_ALL', toTree(res.data.result.content))
            setColumnAll(toTree(res.data.result.content))
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

            if (data.user_authorities.permissionCodeList && data.user_authorities.permissionCodeList.length > 0) {
              // 验证返回的authorities是否是一个非空数组

              commit('SET_AUTHORITIES', data.user_authorities.permissionCodeList)
            } else {
              reject('getInfo: authorities must be a non-null array !')
            }
            /**
             * 子系统列表
             */
            // commit('SET_SYS_LIST', data.sysList)
            commit('SET_NAME', data.name)
            commit('SET_TENANT_ID', data.tenant_id)
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
        console.log('loginOut')
        commit('SET_TOKEN', '')

        commit('SET_AUTHORITIES', [])
        removeAuth()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, authority) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', authority)
        setAuth(authority)
        getUserInfo(authority).then((response) => {
          const data = response.data

          commit('SET_AUTHORITIES', data.authorities)
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
      dispatch('GenerateRoutes', { authorities: getters.authorities }).then(() => {
        /**
         * 更新动态路由
         */
        router.addRoutes(getters.addRouters)
      }) // 动态修改权限后 重绘侧边菜单
      if (sysType === '2') {
        var redirectUrl = ''
        return new Promise((resolve, reject) => {
          UserCurrent()
            .then(async res => {
              console.log(res)
              if (res.data.code === 0) {
                // 20190319 互动中心的访问，跳转到外部地址
                let Base64 = require("js-base64").Base64//还是require
                let nameBase64 = Base64.encodeURI(res.data.result.userName)//还是那些操作
                let timestamp = new Date().getTime()
                let token = '/api/manager/login.do?name=' + nameBase64 + '&id=' + res.data.result.userId + '&time=' +  timestamp + '&appID=3a155aaea71de649f2de2171da173280&secret=d875465ae925eac87354bab6f053967137521e90'
                let url = 'http://hudong.hndt.com/h5/hd/api/manager/login.do?name=' + nameBase64 + '&id=' + res.data.result.userId + '&time=' +  timestamp + '&appID=3a155aaea71de649f2de2171da173280&token=' + sha1(token)
                console.log(nameBase64, url)
                redirectUrl = url
                window.open(redirectUrl)
                resolve()
              }
            })
            .catch((error) => {
              reject(error)
            })
        })
      }
    }
  }
}

export default user
