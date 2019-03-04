import request from '@/utils/request'

/**
 *  query 分页数据查询
 * @param data  搜索框对象，搜索条件
 * @param paginationPageNo  分页数据信息: 页码
 * @param paginationPageSize 分页数据信息: 每页条数
 * @constructor
 */
export function DepartmentList() {
  return request({
    url: '/userb/department/tree',
    method: 'get'
  })
}

/**
 *  create 用户数据创建
 * @param data  对象，用户对象
 * @constructor
 */
export function DepartmentCreate(data) {
  return request({
    url: '/userb/department',
    method: 'POST',
    data
  })
}

/**
 *  update 用户数据更新
 * @param data  对象，用户对象
 * @constructor
 */
export function DepartmentUpdate(data) {
  return request({
    url: '/userb/department',
    method: 'PUT',
    data
  })
}

/**
 *  delete 用户数据删除
 * @param data  对象，用户对象
 * @constructor
 */
export function DepartmentDelete(data) {
  return request({
    url: '/userb/department',
    method: 'DELETE',
    data
  })
}

/**
 *  show 用户数据详情
 * @param data  对象，用户对象
 * @constructor
 */
export function DepartmentShow(data) {
  return request({
    url: '/userb/department/' + data.departmentId,
    method: 'GET',
    data
  })
}

/**
 *  DepartmentUserRelSave 部门下属用户信息关联关系保存
 * @param data  对象，部门与用户集合关联关系
 * @constructor
 */
export function DepartmentUserRelSave(data) {
  return request({
    url: '/userb/departmentuserrel/rels',
    method: 'POST',
    data
  })
}

/**
 *  DepartmentUserRelUserInfoByOrgId 部门下属用户信息关联关系查询
 * @param departmentId  部门编号
 * @constructor
 */
export function DepartmentUserRelUserInfoByDepId(departmentId) {
  return request({
    url: '/userb/departmentuserrel/userinfobydepartmentid/' + departmentId,
    method: 'GET'
  })
}
