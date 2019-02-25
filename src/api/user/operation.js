import request from '@/utils/request'

/**
 *  query 分页数据查询
 * @param data  搜索框对象，搜索条件
 * @param paginationPageNo  分页数据信息: 页码
 * @param paginationPageSize 分页数据信息: 每页条数
 * @constructor
 */
export function OperationList(data, paginationPageNo, paginationPageSize) {
  return request({
    url: '/userb/sysoperation/page?pageNo=' + paginationPageNo + '&pageSize=' + paginationPageSize,
    method: 'post',
    data: data
  })
}

/**
 *  create 用户数据创建
 * @param data  对象，用户对象
 * @constructor
 */
export function OperationCreate(data) {
  return request({
    url: '/userb/sysoperation',
    method: 'POST',
    data
  })
}

/**
 *  update 用户数据更新
 * @param data  对象，用户对象
 * @constructor
 */
export function OperationUpdate(data) {
  return request({
    url: '/userb/sysoperation',
    method: 'PUT',
    data
  })
}

/**
 *  delete 用户数据删除
 * @param data  对象，用户对象
 * @constructor
 */
export function OperationDelete(data) {
  return request({
    url: '/userb/sysoperation',
    method: 'DELETE',
    data
  })
}

/**
 *  show 用户数据详情
 * @param data  对象，用户对象
 * @constructor
 */
export function OperationShow(data) {
  return request({
    url: '/userb/sysoperation/' + data.userId,
    method: 'GET',
    data
  })
}
