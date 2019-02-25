import request from '@/utils/request'

export function fetchChannelList(query, pageNo, pageSize) {
  return request({
    url: '/cms/channel/page?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
    data: query
  })
}

export function fetchChannel(id) {
  return request({
    url: '/cms/channel/' + id,
    method: 'get'
  })
}

export function createChannel(data) {
  return request({
    url: '/cms/channel',
    method: 'post',
    data
  })
}

export function updateChannel(data) {
  return request({
    url: '/cms/channel',
    method: 'put',
    data
  })
}
