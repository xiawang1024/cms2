import request from '@/utils/request'
// 用户权限设置
export function setDataAccess(data) {
  return request({
    url: '/cms/channelUserRel',
    method: 'put',
    data,
    loadingConfig: {
      target: '.el-dialog__body'
    }
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
    data,
    loadingConfig: {
      target: '.el-dialog__body'
    }
  })
}
// 来源权限读取
export function getSourceAccess(id) {
  return request({
    url: `/cms/articleoriginuserrel/show/${id}`,
    method: 'get'
  })
}