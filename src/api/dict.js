import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/dict/page',
    method: 'post',
    params: query
  })
}

export function fetchDict(id) {
  return request({
    url: '/dict/' + id,
    method: 'get'
  })
}

export function fetchDictByDictName(dictName) {
  return request({
    url: '/dict/findbydictname?dictName=' + dictName,
    method: 'get'
  })
}

export function createDict(data) {
  return request({
    url: '/dict',
    method: 'post',
    data
  })
}

export function updateDict(data) {
  return request({
    url: '/dict',
    method: 'put',
    data
  })
}
