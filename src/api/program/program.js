import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/system/program/list',
    method: 'get',
    params: query
  })
}

export function fetchProgram(id) {
  return request({
    url: '/system/program/detail',
    method: 'get',
    params: { id }
  })
} 

export function fetchProgramInfo(id) {
  return request({
    url: '/system/program/getProraminfo',
    method: 'get',
    params: { id }
  })
}

export function removeProgram(id) {
  return request({
    url: '/system/program/remove',
    method: 'delete',
    params: { id }
  })
}


export function createProgram(data) {
  return request({
    url: '/system/program/create',
    method: 'post',
    data
  })
}
