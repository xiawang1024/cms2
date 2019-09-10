import store from 'store'
const StorageName = 'hnDt_token'
const BaseInfor = 'BaseInfor'

/**
 * set token
 * @param {Object} token
 */
export const setAuth = (auth) => {
  setTokenExpireTime(auth)
  store.set(StorageName, auth)
}
export const setBaseInfor = (data) => {
  console.log('setBaseInfor')
  store.set(BaseInfor, data)
}
/**
 * get token
 */
export const getAuth = () => {
  return store.get(StorageName)
}
/** 
 * 保存全部栏目
 */
export const setColumnAll = (colums) => {
  return store.set('columnsAll', colums)
}
export const setColumnAllOrigin = (colums) => {
  return store.set('columnsAllOrigin', colums)
}
/**
 * remove token
 */
export const removeAuth = () => {
  store.remove(StorageName)
  store.remove(BaseInfor)
  store.remove('shouye')
}
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
  // console.log(expireTime, 'expireTime')
  if (currentTime + diffTime > expireTime) {
    return true
  } else {
    return false
  }

  // 测试修改
  // return true
}
/**
 * 
 * 判断是否登陆过期
 */
export const isRefreshTokenExpired = () => {
  const currentTime = getCurrentTime()
  const expireTime = getAuth()['expires_in']
  /**
   * 如果当前时间大于过期时间，token失效
   * true 过期， false 未过期
   */
  if (currentTime > expireTime) {
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

/**
 * 设置cookie
 * 
 */
//将用户信息存入cookie
export const setCookie=(state,cname,cvalue,exdays)=>{
let d = new Date();
d.setTime(d.getTime()+(exdays*24*60*60*1000));
let expires = "expires="+d.toGMTString();
let domain='domain=.dianzhenkeji.com'
document.cookie = cname + "=" + cvalue+";" + expires+';'+domain+';path=/'
//清除localstorage信息，再次登录避免进入
localStorage.removeItem('hnDt_token');
localStorage.removeItem('BaseInfor');
localStorage.removeItem('columnsAllOrigin');
localStorage.removeItem('columnsAll');
//保存过之后页面跳转
if(state.skipUrl){
location.href='http://'+state.skipUrl

}
  
}