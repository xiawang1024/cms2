import request from '@/utils/request'

// export function fetchTemplate(id) {
//   return request({
//     url: '/cms/template/' + id,
//     method: 'get'
//   })
// }

export function editColumn(data) {
  return request({
    url: '/cms/channel',
    method: 'put',
    data
  })
}

export function addColumn(data) {
  return request({
    url: '/cms/channel',
    method: 'post',
    data
  })
}

export function deleteColumn(data) {
  return request({
    url: '/cms/channel',
    method: 'delete',
    data
  })
}

export function columnInfor(id) {
  return request({
    url: '/cms/channel/' + id,
    method: 'get'
  })
}

export function getRoot() {
  return request({
    url: '/cms/channel/root',
    method: 'get'
  })
}

export function columnList(queryObj, pageNo, pageSize) {
  return request({
    url: '/cms/channel/page?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
    data: queryObj
  })
}
