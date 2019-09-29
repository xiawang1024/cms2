import axios from 'axios'
import {
  Message,
  Loading
} from 'element-ui'
import baseUrl from '@/config/base-url'
import {
  getAuth,
  setAuth,
  getRefreshToken,
  isTokenExpired,
  isNotGetTokenApi,
  isRefreshTokenExpired,
  removeAuth
} from './auth.js'
import {
  refreshToken
} from '@/api/login'
import qs from 'qs' // 序列化表单数据
const request = axios.create({
  baseURL: baseUrl.BASE_URL || '/',
  timeout: 10000,
  // headers: {
  //   'Content-Type': 'application/json;charset=utf-8'
  // }
})

// 请求接口loading页面
const requestLoading = (() => {
  const loadingStack = new Map()

  function openLoading(loadingConfig = {}, baseURL, url) {
    if (url === '/uua/oauth/check_token' || url === '/uua/oauth/token') {
      return
    }
    if (url && !url.match('http')) {
      url = baseURL + url
    }
    if (loadingStack.has(url)) {
      return
    }
    if (loadingConfig.noLoading) {
      return
    }
    loadingStack.set(url, Loading.service({
      target: loadingConfig.target || '.main-container .app-main',
      lock: true,
      text: loadingConfig.text || '加载中...',
      spinner: 'el-icon-loading',
      background: `rgba(255,255,255,${loadingConfig.background || 0.7})`
    }))
  }

  function closeLoading(url) {
    if (loadingStack.get(url)) {
      loadingStack.get(url).close()
      loadingStack.delete(url)
    }
  }
  return {
    open: openLoading,
    close: closeLoading
  }
})()

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
    console.log(config, 'config')
    // config.headers[Content-Type] = 'application/json;charset=UTF-8'
    const auth = getAuth()
    /**
     * 判断是否已登录
     */
    // console.log(isTokenExpired(), 'isTokenExpired')
    if (auth && isNotGetTokenApi(config)) {
      // console.log('check-token')
      config.headers.Authorization = `${auth.token_type} ${auth.access_token}`
      /** 
       * 判断token是否过期
       */
      // console.log(isRefreshTokenExpired())
      if (isRefreshTokenExpired()) {
        removeAuth()
        console.log('过期')
        location.reload()
        return
      }
      /**
       * 判断 token 是否将要过期
       */
      // isTokenExpired()
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
              const {
                data
              } = res
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
              console.log('error')
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
        return retry
      }
      if (config.requestBodyType && config.requestBodyType === 'formData') {
        config.data = qs.stringify(config.data)
      }
      if (config.method === 'get') {
        //  给data赋值以绕过if判断
        config.data = true
      }
      requestLoading.open(config.loadingConfig, config.baseURL, config.url)
      return config
    } else {
      requestLoading.open(config.loadingConfig, config.baseURL, config.url)
      /**
       * 未登录直接返回配置信息
       */

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
    requestLoading.close(res.config.url)
    console.log(res.data.code, 'res')
    if (res.data.code === 0) {
      return res
    }
    // 对响应数据做些事
    if (res.data && res.data.code === -1) {
      if (!res.config.requestConfig || !res.config.requestConfig.noErrorMsg) {
        let msg = res.data.msg || res.data.message || '系统错误'
        Message({
          message: msg,
          type: 'error'
        })
      }
      return Promise.reject(res.data)
    }
    return res
  },
  (error) => {
    requestLoading.close(error.config.url)
    let msg = ''
    try {
      msg =
        error.response.data.msg ||
        error.response.data.message ||
        '请求出错，请稍后再试'
    } catch (e) {
      msg = error.message || '请求出错，请稍后再试'
    }
    if (msg.match('timeout')) {
      msg = '请求超时，请稍后再试'
    }
    if (msg.match('Network Error')) {
      msg = '网络异常，请检查本地网络连接'
    }
    Message({
      message: msg,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

export default request
