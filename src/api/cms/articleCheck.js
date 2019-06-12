import request from '@/utils/request'

//审核
export function checkHandel(data) {
  return request({
    url: '/cmsnews/auditProcess/updateAuditProcess',
    method: 'post',
    data,
    requestBodyType: 'formData'
  })
}
// 查看审核进度
export function getProcess(data) {
  return request({
    url: '/cmsnews/auditProcess/queryAuditProcess',
    method: 'post',
    data,
    requestBodyType: 'formData',
    loadingConfig: {
      noLoading: true
    }
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
export function checkArticleList(data) {
  return request({
    url: `/cmsnews/auditProcess/toDoListaArticle`,
    method: 'post',
    data,
    requestBodyType: 'formData',
    loadingConfig: {
    }
  })
}
// 获取文章详情
export function documentInfor(id) {
  return request({
    url: '/cms/article/' + id,
    method: 'get',
    loadingConfig: {
      target: '.el-dialog__body'
    }
  })
}