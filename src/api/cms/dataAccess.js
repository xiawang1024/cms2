import request from '@/utils/request'
// 用户权限设置
export function setDataAccess(data) {
  return request({
    url: '/cms/channelUserRel',
    method: 'put',
    data
  })
}
// 用户权限获取
export function getDataAccess(id) {
  return request({
    url: `/cms/channelUserRel/show/${id}`,
    method: 'get'
  })
}
// 来源权限设置
export function setSourceAccess(data) {
  return request({
    url: '/cms/articleoriginuserrel',
    method: 'post',
    data
  })
}
// 来源权限读取
export function getSourceAccess(id) {
  return request({
    url: `/cms/articleoriginuserrel/show/${id}`,
    method: 'get'
  })
}