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
// 获取栏目下的模板
export function columnTemplateList(id) {
  return request({
    url: '/cms/template/ids/' + id,
    method: 'get'
  })
}
export function getRoot() {
  return request({
    url: '/cms/channel/root',
    method: 'get'
  })
}

export function columnList(queryObj, pageNo, pageSize, sortBy='seqNo') {
  return request({
    url: '/cms/channel/page?pageNo=' + pageNo + '&pageSize=' + pageSize + '&sortBy=' + sortBy,
    method: 'post',
    data: queryObj
  })
}
// 扩展字段创建
export function createExtendsWord(channelId, data) {
  return request({
    url: '/cms/channel/extfield/' +  channelId,
    method: 'post',
    data
  })
}
// 扩展字段修改
export function editExtendsWord(channelId, data) {
  return request({
    url: '/cms/channel/extfield/' +  channelId,
    method: 'put',
    data
  })
}
// 扩展字段删除
export function deleteExtendsWord(channelId, data) {
  return request({
    url: '/cms/channel/extfield/' +  channelId,
    method: 'delete',
    data
  })
}
// 栏目编码是否重复
export function isColumnRepet(channelCode) {
  return request({
    url: '/cms/channel/channelcoderepeatcheck/' + channelCode,
    method: 'get'
  })
}

