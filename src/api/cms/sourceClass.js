import request from '@/utils/request'
// 添加分类
export function addClass(data) {
  return request({
    url: '/cms/sourcematrix',
    method: 'post',
    data
  })
}
// 修改分类
export function editClass(data) {
  return request({
    url: `/cms/sourcematrix`,
    method: 'put',
    data
  })
}
// 删除分类
export function deleteClass(data) {
  return request({
    url: `/cms/sourcematrix`,
    method: 'delete',
    data
  })
}
// 分类详情
export function getClass(id) {
  return request({
    url: `/cms/sourcematrix/${id}`,
    method: 'get'
  })
}
// 分类查询
export function searchClass(data, pageNo, pageSize) {
  return request({
    url: '/cms/sourcematrix/page?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
    data
  })
}
