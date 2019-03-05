import axios from 'axios'
import { Message } from 'element-ui'

import { getAuth, setAuth, getRefreshToken, isTokenExpired, isNotGetTokenApi } from './auth.js'
import { refreshToken } from '@/api/login'

const request = axios.create({
  baseURL: 'http://172.20.5.4:53010',
  timeout: 30000
})

/**
 * 是否有请求正在刷新token
 */
window.isRefreshing = false
/**
 * 被挂起的请求数组
 */
let refreshSubscribers = []

/**
 * push所有请求到数组中
 * @param {Function} cb
 */
function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb)
}

/**
 * 刷新请求（refreshSubscribers 数组中的请求得到新的token之后会自执行，用新的token去请求数据）
 * @param {String} token
 */
function onRefreshed(token) {
  refreshSubscribers.map((cb) => cb(token))
}

/**
 * 请求拦截器
 */
request.interceptors.request.use(
  (config) => {
    const auth = getAuth()
    /**
     * 判断是否已登录
     */

    if (auth && isNotGetTokenApi(config)) {
      config.headers.Authorization = `${auth.token_type} ${auth.access_token}`

      /**
       * 判断 token 是否将要过期
       */

      if (isTokenExpired()) {
        /**
         * 判断是否正在刷新token
         */
        if (!window.isRefreshing) {
          /**
           * 将刷新 token 的标志置为true
           */
          window.isRefreshing = true
          /**
           * 发起刷新token的请求
           */

          refreshToken(getRefreshToken())
            .then((res) => {
              /**
           * 将刷新 token 的标志置为false
           */
              window.isRefreshing = false
              /**
           * 成功刷新token
           */
              config.headers.Authorization = `${auth.token_type} ${auth.access_token}`
              const { data } = res
              /**
             * 更新auth
             */
              setAuth(data)
              /**
             * 执行数组里的函数 重新发起被挂起的请求
             */
              onRefreshed(data.access_token)
              /**
             * 执行onRefreshed函数后清空数组中保存的请求
             */
              refreshSubscribers = []
            })
            .catch((err) => {
              // eslint-disable-next-line no-console
              console.log(err)
            })
        }
        /* 把请求(token)=>{....}都push到一个数组中*/
        const retry = new Promise((resolve) => {
          /* (token) => {...}这个函数就是回调函数*/
          subscribeTokenRefresh((token) => {
            config.headers.Authorization = 'Bearer ' + token
            /* 将请求挂起*/
            resolve(config)
          })
        })
        // console.log(subscribeTokenRefresh)
        return retry
      }
      return config
    } else {
      /**
       * 未登录直接返回配置信息
       */
      console.log('nologin')
      return config
    }
  },
  /* 错误操作*/
  (err) => {
    return Promise.reject(err)
  }
)
/**
 * 响应拦截器
 */
request.interceptors.response.use(
  (res) => {
    return res
  },
  (error) => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default request
