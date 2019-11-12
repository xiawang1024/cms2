import request from '@/utils/request'
import QS from "qs"
//查询爆料列表

export function discloseList(params) {
  return request({
    url: '/cmsnews/breakingNews/queryBreakingNews',
    method: 'post',
    params:params
  })
}


/**
 * 查询审核状态0:待审核 1：已通过 2：`已拒绝
 *  */ 
export function discloseState(num) {
  return request({
    url: '/cmsnews/breakingNews/getAuditStatusCount?auditStatus='+num,
    method: 'get',
  })
}

/**
 * 修改审核状态0：待审核 1：审核通过 2：拒绝
 *  */ 
export function amendDiscloseState(params) {
  return request({
    url: '/cmsnews/breakingNews/updateAuditStatus',
    method: 'post',
    params:params
  })
}
// 爆料分类列表
export function discloseClassify() {
  return request({
    url: '/cmsnews/auditConfig/findBreakeingType',
    method: 'post',
  })
}
// 修改爆料
export function editDisclose(queryObj) {
  return request({
    url: '/cmsnews/breakingNews/updteBareakingNews',
    method: 'post',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    data:QS.stringify(queryObj)
  })
}

/**
 * 爆料公开 0：不公开 1：公开
 *  */
//add爆料
export function createDisclose(data) {
  return request({
    url: '/cmsnews/breakingNews/saveBreakingNews',
    method: 'post',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    data:QS.stringify(data)
  })
}

//删除爆料
export function deleteDisclose(id) {
  return request({
    url: '/cmsnews/breakingNews/deleteBreakingNews'+id,
    method: 'post',
   
  })
}



// 获取爆料详情
export function discloseInfor(id) {
  return request({
    url: '/cmsnews/breakingNews/getBreakingNewsById?id=' + id,
    method: 'get'
  })
}


//添加操作记录

export function addOprate(data) {
  return request({
    url: `/cmsnews/operateRecord/saveOperateRecord?operateId=${data.discloseId}&operateReply=${data.description}&remindFlag=${data.remindFlag}`,
    method: 'post'
  })
}

//批量公开-不公开
export function batchQueryUser(data){
  return request({
    url: '/cmsnews/breakingNews/batchQueryUser?'+data.list+'zzjgName='+data.zzjgName,
    method: 'get'
  })
}

//获取机构列表
export function getZzjgList(){
  return request({
    url: '/cmsnews/breakingNews/getZzjgList',
    method: 'get'
  })
}

