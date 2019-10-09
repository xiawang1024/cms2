// 权限分组
import request from '@/utils/request'
// 全部权限获取
export function getDataPermission() {
  return request({
    url: `/userb/userattribute/findenum`,
    method: 'get'
  })
}
export function getDataAccess(userId) {
  return request({
    url: `/userb/userattribute/enum/${userId}`,
    method: 'get',
    loadingConfig: {
      target: '.el-dialog__body'
    }
  })
}

// 权限设置
export function setDataAccess(data) {
  return request({
    url: '/userb/userattribute',
    method: 'post',
    data,
    loadingConfig: {
      target: '.el-dialog__body'
    }
  })
}
