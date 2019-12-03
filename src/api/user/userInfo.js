import request from '@/utils/request'

/**
 *  query 分页数据查询
 * @param   搜索框对象，搜索条件
 * @param   分页数据信息: 页码
 * @param  分页数据信息: 每页条数
 * @constructor
 */
export function userInfoList(data) {
  return request({
    url: `/userc/user/queryUserInfor?pageNo=${data.pageNo}&pageSize=${data.pageSize}&nickname=${data.nickname}&mobile=${data.mobile}`,
    method: 'post'
  })
}

/**
 *  query 分组数据查询
 */
export function groupingList() {
  return request({
    url: `/userc/org/queryOrg`,
    method: 'post'
  })
}

/**
 *  query 批量更新用户组织
 */
export function batchUserGroup(data) {
  return request({
    url: `/userc/user/batchUpdateOrg`,
    method: 'post',
    data
  })
}

