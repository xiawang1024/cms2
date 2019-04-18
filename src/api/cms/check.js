import request from '@/utils/request'
// 添加审核设置
export function addCheck(data) {
  return request({
    url: '/cmsnews/auditConfig/saveAuditConfig',
    method: 'post',
    data,
    requestBodyType: 'formData'
  })
}
//修改审核和
export function editCheck(data) {
  return request({
    url: '/cmsnews/auditConfig/updateAuditConfig',
    method: 'post',
    data,
    requestBodyType: 'formData'
  })
}
// 删除审核
export function deleteCheck(data) {
  return request({
    url: '/cmsnews/auditConfig/deleteAuditConfig',
    method: 'post',
    data,
    requestBodyType: 'formData'
  })
}
// 审核详情
export function getCheckInfor(id) {
  return request({
    url: `/cmsnews/auditConfig/findAuditConfigById?id=${id}`,
    method: 'get'
  })
}
// 审核列表
export function getCheckList(pageNum, pageSize) {
  return request({
    url: `/cmsnews/auditConfig/queryAuditConfig?pageNo=${pageNum}&pageSize=${pageSize}`,
    method: 'get',
    loadingConfig: {
    }
  })
}