import store from 'store'
const StorageName = 'hnDt_token'

/**
 * set token
 * @param {Object} token
 */
export const setAuth = (auth) => {
  setTokenExpireTime(auth)
  store.set(StorageName, auth)
}

/**
 * get token
 */
export const getAuth = () => {
  return store.get(StorageName)
}
/**
 * remove token
 */
export const removeAuth = () => store.remove(StorageName)
/**
 *获取刷新 token
 */
export const getRefreshToken = () => getAuth()['refresh_token']
/**
 * 判断是否刷新token
 */
export const isTokenExpired = () => {
  const currentTime = getCurrentTime()
  const expireTime = getAuth()['expires_in']
  const diffTime = 10 * 60
  /**
   * 如果当前时间大于过期时间，token失效
   * 过期时间前10分钟内刷新token
   * true 过期， false 未过期
   */
  if (currentTime - diffTime > expireTime) {
    return true
  } else {
    return false
  }
}
/**
 * 判断api需要 token， login 不需要token
 * @param {*} config
 */
export const isNotGetTokenApi = (config) => {
  if (config.url.indexOf('/uua/oauth/token') === -1) {
    return true
  } else {
    return false
  }
}
/**
 * 设置token过期时间
 */
function setTokenExpireTime(auth) {
  auth['expires_in'] += getCurrentTime()
}
/**
 * 获取当前时间戳，记录token过期时间
 * 单位s（秒）
 */
function getCurrentTime() {
  return Date.parse(new Date()) / 1000
}
