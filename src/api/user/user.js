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
 *  UserUserRelSave 组织机构下属用户信息关联关系保存
 * @param data  对象，组织机构与用户集合关联关系
 * @constructor
 */
export function UserRoleRelSave(data) {
  return request({
    url: '/userb/userrolerel/saverels',
    method: 'POST',
    data
  })
}

/**
 *  UserUserRelUserInfoByOrgId 组织机构下属用户信息关联关系保存
 * @param userId  组织机构编号
 * @constructor
 */
export function UserRoleRelUserInfoByOrgId(userId) {
  return request({
    url: '/userb/userrolerel/selectuserIdsbyroleId?userId=' + userId,
    method: 'GET'
  })
}
