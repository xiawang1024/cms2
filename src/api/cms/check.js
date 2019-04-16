import request from '@/utils/request'
// 添加审核设置
export function addCheck(data) {
  return request({
    url: '/auditConfig/saveAuditConfig',
    method: 'post',
    data
  })
}
//修改审核和
export function editCheck(data) {
  return request({
    url: '/auditConfig/updateAuditConfig',
    method: 'post',
    data
  })
}
// 删除审核
export function deleteCheck(data) {
  return request({
    url: '/auditConfig/deleteAuditConfig',
    method: 'post',
    data
  })
}
// 审核详情
export function getCheckInfor(id) {
  return request({
    url: `/auditConfig/findAuditConfigById/${id}`,
    method: 'get'
  })
}
// 审核列表
export function getCheckList(id) {
  return request({
    url: `/auditConfig/queryAuditConfig/${id}`,
    method: 'get'
  })
}