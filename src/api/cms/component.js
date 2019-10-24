import request from '@/utils/request'

export function fetchComponentList(queryObj, pageNo, pageSize) {
  return request({
    url: '/cms/component/page?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
    data: queryObj
  })
}

export function fetchComponent(id) {
  return request({
    url: '/cms/component/' + id,
    method: 'get'
  })
}

export function createComponent(data) {
  return request({
    url: '/cms/component',
    method: 'post',
    data
  })
}

export function updateComponent(data) {
  return request({
    url: '/cms/component',
    method: 'put',
    data
  })
}

export function deleteComponent(data) {
  return request({
    url: '/cms/component',
    method: 'delete',
    data
  })
}
