import request from '@/utils/request'

/**
 *  query 分页数据查询
 * @param data  搜索框对象，搜索条件
 * @param paginationPageNo  分页数据信息: 页码
 * @param paginationPageSize 分页数据信息: 每页条数
 * @constructor
 */
export function ApplicationList(data, paginationPageNo, paginationPageSize) {
  return request({
    url: '/userb/sysapplication/page?pageNo=' + paginationPageNo + '&pageSize=' + paginationPageSize,
    method: 'post',
    data: data
  })
}

/**
 *  create 用户数据创建
 * @param data  对象，用户对象
 * @constructor
 */
export function ApplicationCreate(data) {
  return request({
    url: '/userb/sysapplication',
    method: 'POST',
    data
  })
}

/**
 *  update 用户数据更新
 * @param data  对象，用户对象
 * @constructor
 */
export function ApplicationUpdate(data) {
  return request({
    url: '/userb/sysapplication',
    method: 'PUT',
    data
  })
}

/**
 *  delete 用户数据删除
 * @param data  对象，用户对象
 * @constructor
 */
export function ApplicationDelete(data) {
  return request({
    url: '/userb/sysapplication',
    method: 'DELETE',
    data
  })
}

/**
 *  show 用户数据详情
 * @param data  对象，用户对象
 * @constructor
 */
export function ApplicationShow(data) {
  return request({
    url: '/userb/sysapplication/' + data.userId,
    method: 'GET',
    data
  })
}
