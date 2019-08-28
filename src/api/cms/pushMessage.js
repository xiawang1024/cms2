import request from '@/utils/request'

export function fetchSwitchsList(objectId, pageNo, pageSize) {
  let selectObjectId = objectId ? objectId : ''
  return request({
    url: '/news-comment/switches/select-page?pageNo=' + pageNo + '&pageSize=' + pageSize + '&objectId=' + selectObjectId,
    method: 'get',
  })
}

// export function getSwitch(id) {
//   return request({
//     url: '/news-comment/sensitive-words/' + id,
//     method: 'get'
//   })
// }

export function messageList(data) {
  return request({
    url: '/msg/push/list',
    method: 'post',
    data
  })
}
export function appList(data) {
  return request({
    url: '/push-service/appInfo/list',
    method: 'post',
    data
  })
}
export function importSensitive(data) {
  return request({
    url: '/news-comment/sensitive-words/import-excel',
    method: 'post',
    data
  })
}
export function updateSwitch(data) {
  return request({
    url: '/news-comment/switches/update',
    method: 'put',
    data
  })
}
export function deleteSwitch(id) {
  return request({
    url: `/news-comment/switches/${id}`,
    method: 'delete'
  })
}