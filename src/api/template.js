import request from '@/utils/request'

export function fetchList(queryObj, pageNo, pageSize) {
  return request({
    url: '/template/page?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
    data: queryObj
  })
}

export function fetchTemplate(id) {
  return request({
    url: '/template/' + id,
    method: 'get'
  })
}

export function createTemplate(data) {
  return request({
    url: '/template',
    method: 'post',
    data
  })
}

export function updateTemplate(data) {
  return request({
    url: '/template',
    method: 'put',
    data
  })
}
