import request from '@/utils/request.js'
import Qs from 'qs'

import { getAuth } from '@/utils/auth.js'

// request.defaults.headers.contentType = 'application/x-www-form-urlencoded'
if(request) {
  request.defaults.headers.contentType = 'application/x-www-form-urlencoded'
}
/**
 * 密码模式登陆获取auth token refreshToken
 * @param {String} username
 * @param {String} password
 * @param {String} grant_type
 * @param {String} client_id
 * @param {String} client_secret
 * @param {String} domain
 * @param {String} authenticationType
 */
export const loginByUsername = (
  username,
  password,
  grant_type = 'password',
  client_id = 'dev3rd',
  client_secret = '123456',
  domain = 'b',
  authenticationType = 'password'
) => {
  return request.post(
    '/uua/oauth/token',
    Qs.stringify({
      username,
      password,
      grant_type,
      client_id,
      client_secret,
      domain,
      authenticationType
    })
  )
}

/**
 * 刷新token 获取token
 */
export const refreshToken = (
  refresh_token,
  grant_type = 'refresh_token',
  client_id = 'dev3rd',
  client_secret = '123456'
) =>
  request.post(
    '/uua/oauth/token',
    Qs.stringify({
      refresh_token,
      grant_type,
      client_id,
      client_secret
    })
  )
/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  const token = getAuth()['access_token']
  return request.post('/uua/oauth/check_token', Qs.stringify({ token }))
}
/**
 * 退出
 */
export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export const getSource = () =>
  request({
    method: 'get',
    baseURL: '/source/',
    url: 'resource-test/hi'
  })
