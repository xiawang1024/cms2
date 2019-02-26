import request from '@/utils/request'

/**
 *  query 分页数据查询
 * @param data  搜索框对象，搜索条件
 * @param paginationPageNo  分页数据信息: 页码
 * @param paginationPageSize 分页数据信息: 每页条数
 * @constructor
 */
export function PermissionGroupList() {
  return request({
    url: '/userb/permissiongroup/tree',
    method: 'get'
  })
}

/**
 *  create 权限组数据创建
 * @param data  对象，权限组对象
 * @constructor
 */
export function PermissionGroupCreate(data) {
  return request({
    url: '/userb/permissiongroup',
    method: 'POST',
    data
  })
}

/**
 *  update 权限组数据更新
 * @param data  对象，权限组对象
 * @constructor
 */
export function PermissionGroupUpdate(data) {
  return request({
    url: '/userb/permissiongroup',
    method: 'PUT',
    data
  })
}

/**
 *  delete 权限组数据删除
 * @param data  对象，权限组对象
 * @constructor
 */
export function PermissionGroupDelete(data) {
  return request({
    url: '/userb/permissiongroup',
    method: 'DELETE',
    data
  })
}

/**
 *  show 权限组数据详情
 * @param data  对象，权限组对象
 * @constructor
 */
export function PermissionGroupShow(data) {
  return request({
    url: '/userb/permissiongroup/' + data.PermissionGroupId,
    method: 'GET',
    data
  })
}

/**
 *  PermissionGroupPermissionRelSave 权限组下属权限信息关联关系保存
 * @param data  对象，权限组与权限信息集合关联关系
 * @constructor
 */
export function PermissionGroupPermissionRelSave(data) {
  return request({
    url: '/userb/permissiongrouprel/rels',
    method: 'POST',
    data
  })
}

/**
 *  PermissionGroupPermissionRelPermissionInfoByGroupId 权限组下属权限信息关联关系查询
 * @param permissionGroupId  权限组编号
 * @constructor
 */
export function PermissionGroupPermissionRelPermissionInfoByGroupId(permissionGroupId) {
  return request({
    url: '/userb/permissiongrouprel/permissioninfobypermissiongroupid/' + permissionGroupId,
    method: 'GET'
  })
}
