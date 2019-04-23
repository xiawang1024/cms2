import request from '@/utils/request'

/**
 *  query 分页数据查询
 * @param data  搜索框对象，搜索条件
 * @param paginationPageNo  分页数据信息: 页码
 * @param paginationPageSize 分页数据信息: 每页条数
 * @constructor
 */
export function UserList(data, paginationPageNo, paginationPageSize) {
  return request({
    url: '/userb/user/page?pageNo=' + paginationPageNo + '&pageSize=' + paginationPageSize,
    method: 'post',
    data: data
  })
}

/**
 *  create 用户数据创建
 * @param data  对象，用户对象
 * @constructor
 */
export function UserCreate(data) {
  return request({
    url: '/userb/user',
    method: 'POST',
    data
  })
}

/**
 *  update 用户数据更新
 * @param data  对象，用户对象
 * @constructor
 */
export function UserUpdate(data) {
  return request({
    url: '/userb/user',
    method: 'PUT',
    data
  })
}

/**
 *  delete 用户数据删除
 * @param data  对象，用户对象
 * @constructor
 */
export function UserDelete(data) {
  return request({
    url: '/userb/user',
    method: 'DELETE',
    data
  })
}

/**
 *  show 用户数据详情
 * @param data  对象，用户对象
 * @constructor
 */
export function UserShow(data) {
  return request({
    url: '/userb/user/' + data.userId,
    method: 'GET',
    data
  })
}

/**
 *  当前登录用户
 * @constructor
 */
export function UserCurrent() {
  return request({
    url: '/userb/user/currentuser',
    method: 'GET',
    loadingConfig: {
      noLoading: true
    }
  })
}
// 修改当前用户密码
export function resetPassword(data) {
  return request({
    url: '/userb/user/changeuserpwd',
    method: 'POST',
    data
  })
}
/**
 *  disableFlag 用户可用状态更新
 * @param data  对象，用户对象
 * @constructor
 */
export function UserModifyEnableFlagByUserIds (data) {
  return request({
    url: '/userb/user/disableFlag/' + data.enableFlag + '/' + data.userIds,
    method: 'GET',
    data
  })
}

/**
 *  UserUserRelSave 组织机构下属用户信息关联关系保存
 * @param data  对象，组织机构与用户集合关联关系
 * @constructor
 */
export function UserRoleRelSave(data) {
  return request({
    url: '/userb/userrolerel/rels',
    method: 'POST',
    data
  })
}

/**
 *  UserRoleRelRoleInfoByUserId 组织机构下属用户信息关联关系查询
 * @param userId  组织机构编号
 * @constructor
 */
export function UserRoleRelRoleInfoByUserId(userId) {
  return request({
    url: '/userb/userrolerel/roleinfobyuserid/' + userId,
    method: 'GET'
  })
}

/**
 *  名称是否重复
 * @param organizationCode
 * @constructor
 */
export function UserCheckCode(userName) {
  return request({
    url: '/userb/user/checkusername/' + userName,
    method: 'GET'
  })
}
