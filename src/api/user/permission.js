import request from '@/utils/request'

/**
 *  query 分页数据查询
 * @param data  搜索框对象，搜索条件
 * @param paginationPageNo  分页数据信息: 页码
 * @param paginationPageSize 分页数据信息: 每页条数
 * @constructor
 */
export function PermissionList(data, paginationPageNo, paginationPageSize) {
  return request({
    url: '/userb/permission/resource/url/page?pageNo=' + paginationPageNo + '&pageSize=' + paginationPageSize,
    method: 'post',
    data: data
  })
}

/**
 *  create 用户数据创建
 * @param data  对象，用户对象
 * @constructor
 */
export function PermissionCreate(data) {
  return request({
    url: '/userb/permission/resource/url',
    method: 'POST',
    data
  })
}

/**
 *  update 用户数据更新
 * @param data  对象，用户对象
 * @constructor
 */
export function PermissionUpdate(data) {
  return request({
    url: '/userb/permission/resource/url',
    method: 'PUT',
    data
  })
}

/**
 *  delete 用户数据删除
 * @param data  对象，用户对象
 * @constructor
 */
export function PermissionDelete(data) {
  return request({
    url: '/userb/permission/resource/url',
    method: 'DELETE',
    data
  })
}

/**
 *  show 用户数据详情
 * @param data  对象，用户对象
 * @constructor
 */
export function PermissionShow(data) {
  return request({
    url: '/userb/permission/resource/url/' + data.permissionId,
    method: 'GET',
    data
  })
}
