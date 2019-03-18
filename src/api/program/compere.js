import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/system/compere/list',
    method: 'get',
    params: query
  })
}

export function fetchCompere(id) {
  return request({
    url: '/system/compere/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchCompereAll(userid) {
  return request({
    url: '/system/compere/allList',
    method: 'get',
    params: { userid }
  })
}

export function removeCompere(id) {
  return request({
    url: '/system/compere/remove',
    method: 'delete',
    params: { id }
  })
}


export function createCompere(data) {
  return request({
    url: '/system/compere/create',
    method: 'post',
    data
  })
}
