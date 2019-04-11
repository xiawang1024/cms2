import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/cms/dict/page',
    method: 'post',
    data: query
  })
}

export function fetchDict(id) {
  return request({
    url: '/cms/dict/' + id,
    method: 'get'
  })
}

export function fetchDictByDictName(dictName) {
  return request({
    url: '/cms/dict/findbydictname?dictName=' + dictName,
    method: 'get'
  })
}

export function createDict(data) {
  return request({
    url: '/cms/dict',
    method: 'post',
    data
  })
}

export function updateDict(data) {
  return request({
    url: '/cms/dict',
    method: 'put',
    data
  })
}