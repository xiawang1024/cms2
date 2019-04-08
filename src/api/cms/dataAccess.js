import request from '@/utils/request'
// 用户权限设置
export function setDataAccess(data) {
  return request({
    url: '/cms/channelUserRel',
    method: 'put',
    data
  })
}