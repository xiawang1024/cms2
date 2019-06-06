import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/system/column/list',
    method: 'get',
    params: query
  })
}

export function fetchColumnNames(channelId) {
  return request({
    url: '/system/column/findNameList',
    method: 'get',
    params: {channelId}
  })
}

export function fetchColumn(id) {
  return request({
    url: '/system/column/detail',
    method: 'get',
    params: { id }
  })
}

export function removeColumn(id) {
  return request({
    url: '/system/column/remove',
    method: 'delete',
    params: { id }
  })
}


export function createColumn(data) {
  return request({
    url: '/system/column/create',
    method: 'post',
    data
  })
}
