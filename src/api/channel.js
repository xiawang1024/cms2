import request from '@/utils/request'

export function fetchChannelList(query, pageNo, pageSize) {
  return request({
    url: '/channel/page?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
    data: query
  })
}

export function fetchChannel(id) {
  return request({
    url: '/channel/' + id,
    method: 'get'
  })
}

export function createChannel(data) {
  return request({
    url: '/channel',
    method: 'post',
    data
  })
}

export function updateChannel(data) {
  return request({
    url: '/channel',
    method: 'put',
    data
  })
}
