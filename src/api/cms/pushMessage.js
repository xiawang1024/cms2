import request from '@/utils/request'

export function messageList(data) {
  return request({
    url: '/hnradio-message-service/push/list',
    method: 'post',
    data
  })
}
export function appList(data) {
  return request({
    url: '/hnradio-push-service/external/appInfo/list',
    method: 'post',
    data
  })
}
export function userList(data) {
  return request({
    url: '/hnradio-message-service/push/listBinding',
    method: 'post',
    data
  })
}
export function bindUserList(data) {
  return request({
    url: '/hnradio-message-service/push/listBinding',
    method: 'post',
    data
  })
}
export function addPush(data) {
  return request({
    url: '/hnradio-push-service/external/push/add',
    method: 'post',
    data
  })
}
