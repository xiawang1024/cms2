import request from '@/utils/request'

/**
 *  query 分页数据查询
 * @param data  搜索框对象，搜索条件
 * @param paginationPageNo  分页数据信息: 页码
 * @param paginationPageSize 分页数据信息: 每页条数
 * @constructor
 */
export function RoleList() {
  return request({
    url: '/userb/role/tree',
    method: 'get'
  })
}

/**
 *  create 用户数据创建
 * @param data  对象，用户对象
 * @constructor
 */
export function RoleCreate(data) {
  return request({
    url: '/userb/role',
    method: 'POST',
    data
  })
}

/**
 *  update 用户数据更新
 * @param data  对象，用户对象
 * @constructor
 */
export function RoleUpdate(data) {
  return request({
    url: '/userb/role',
    method: 'PUT',
    data
  })
}

/**
 *  delete 用户数据删除
 * @param data  对象，用户对象
 * @constructor
 */
export function RoleDelete(data) {
  return request({
    url: '/userb/role',
    method: 'DELETE',
    data
  })
}

/**
 *  show 用户数据详情
 * @param data  对象，用户对象
 * @constructor
 */
export function RoleShow(data) {
  return request({
    url: '/userb/role/' + data.roleId,
    method: 'GET',
    data
  })
}

/**
 *  RoleUserRelSave 组织机构下属用户信息关联关系保存
 * @param data  对象，组织机构与用户集合关联关系
 * @constructor
 */
export function RolePerissionRelSave(data) {
  return request({
    url: '/userb/rolepermissionrel/rels',
    method: 'POST',
    data
  })
}

/**
 *  RoleUserRelUserInfoByOrgId 组织机构下属用户信息关联关系保存
 * @param roleId  组织机构编号
 * @constructor
 */
export function RolePermissionRelPermissionByRoleId(roleId) {
  return request({
    url: '/userb/rolepermissionrel/permissiongroupinfobyroleid/' + roleId,
    method: 'GET',
    loadingConfig: {
      target: '.el-dialog__body'
    }
  })
}
