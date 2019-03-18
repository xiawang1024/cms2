import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/system/class/list',
    method: 'get',
    params: query
  })
}

export function fetchClassAll() {
  return request({
    url: '/system/class/allList',
    method: 'get',
  })
}

export function fetchClass(id) {
  return request({
    url: '/system/class/detail',
    method: 'get',
    params: { id }
  })
}

export function removeClass(id) {
  return request({
    url: '/system/class/remove',
    method: 'delete',
    params: { id }
  })
}

export function createClass(data) {
  return request({
    url: '/system/class/create',
    method: 'post',
    data
  })
}