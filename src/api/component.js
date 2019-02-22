import request from '@/utils/request'

export function fetchComponentList(queryObj, pageNo, pageSize) {
  return request({
    url: '/component/page?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
    data: queryObj
  })
}

export function fetchComponent(id) {
  return request({
    url: '/component/' + id,
    method: 'get'
  })
}

export function createComponent(data) {
  return request({
    url: '/component',
    method: 'post',
    data
  })
}

export function updateComponent(data) {
  return request({
    url: '/component',
    method: 'put',
    data
  })
}
