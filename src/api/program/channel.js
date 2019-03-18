import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/system/channel/list',
    method: 'get',
    params: query
  })
}

export function fetchChannel(id) {
  return request({
    url: '/system/channel/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchChannelAll(userid) {
  return request({
    url: '/system/channel/allList',
    method: 'get',
    params: { userid }
  })
}

export function removeChannel(id) {
  return request({
    url: '/system/channel/remove',
    method: 'delete',
    params: { id }
  })
}

export function updateChannel(id, status) {
  return request({
    url: '/system/channel/updateStatus',
    method: 'put',
    params: { id, status }
  })
}

export function updateVod(id, status) {
  return request({
    url: '/system/channel/updateVod',
    method: 'put',
    params: { id, status}
  })
}

export function createChannel(data) {
  return request({
    url: '/system/channel/create',
    method: 'post',
    data
  })
}
