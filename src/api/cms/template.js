import request from '@/utils/request'

export function fetchList(queryObj, pageNo, pageSize) {
  return request({
    url: '/cms/template/page?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
    data: queryObj
  })
}

export function fetchTemplate(id) {
  return request({
    url: '/cms/template/' + id,
    method: 'get'
  })
}

export function createTemplate(data) {
  return request({
    url: '/cms/template',
    method: 'post',
    data
  })
}

export function updateTemplate(data) {
  return request({
    url: '/cms/template',
    method: 'put',
    data
  })
}
export function deleteTemplate(data) {
  return request({
    url: '/cms/template',
    method: 'delete',
    data
  })
}