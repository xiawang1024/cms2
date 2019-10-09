import request from '@/utils/request'

/**
 *  query 分页数据查询
 * @param data  搜索框对象，搜索条件
 * @param paginationPageNo  分页数据信息: 页码
 * @param paginationPageSize 分页数据信息: 每页条数
 * @constructor
 */
export function OrganizationList(data, paginationPageNo, paginationPageSize) {
  return request({
    url: '/userb/organization/page?pageNo=' + paginationPageNo + '&pageSize=' + paginationPageSize,
    method: 'post',
    data: data
  })
}

/**
 *  create 租户数据创建
 * @param data  对象，租户对象
 * @constructor
 */
export function OrganizationCreate(data) {
  return request({
    url: '/userb/organization',
    method: 'POST',
    data
  })
}

/**
 *  update 租户数据更新
 * @param data  对象，租户对象
 * @constructor
 */
export function OrganizationUpdate(data) {
  return request({
    url: '/userb/organization',
    method: 'PUT',
    data
  })
}

/**
 *  update 租户数据更新 - 审核操作
 * @param data  对象，租户对象
 * @constructor
 */
export function OrganizationUpdateForEnable(data) {
  return request({
    url: '/userb/organization/enable',
    method: 'PUT',
    data
  })
}

/**
 *  delete 租户数据删除
 * @param data  对象，租户对象
 * @constructor
 */
export function OrganizationDelete(data) {
  return request({
    url: '/userb/organization',
    method: 'DELETE',
    data
  })
}

/**
 *  show 租户数据详情
 * @param data  对象，租户对象
 * @constructor
 */
export function OrganizationShow(data) {
  return request({
    url: '/userb/organization/' + data.userId,
    method: 'GET',
    data
  })
}

/**
 *  编码是否重复
 * @param organizationCode
 * @constructor
 */
export function OrganizationCheckCode(organizationCode) {
  return request({
    url: '/userb/organization/checkcode/' + organizationCode,
    method: 'GET'
  })
}
export function OrganizationPermission(data) {
  return request({
    url: '/userb/organization/refreshpermissioninfo',
    method: 'POST',
    data
  })
}
