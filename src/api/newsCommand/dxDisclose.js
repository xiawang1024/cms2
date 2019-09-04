import request from '@/utils/request'
import QS from "qs"
// const Cpath='http://172.20.5.2:58021'
const Cpath=''
//查询爆料列表


/**
 * 查询审核状态0 :大象爆料 ，1： 拍客
 *  */ 
export function discloseList(params) {
  return request({
    url: '/dxnews/breakingNews/queryBreakingNews',
    method: 'post',
    params:params
  })
}


/**
 * 查询审核状态0:待审核 1：已通过 2：`已拒绝
 *  */ 
export function discloseState(num) {
  return request({
    url: Cpath +'/dxnews/breakingNews/getAuditStatusCount?auditStatus='+num,
    method: 'get',
  })
}

/**
 * 修改审核状态0：待审核 1：审核通过 2：拒绝
 *  */ 
export function amendDiscloseState(params) {
  return request({
    url: Cpath +'/dxnews/breakingNews/updateAuditStatus',
    method: 'post',
    params:params
  })
}
// 爆料分类列表
export function discloseClassify() {
  return request({
    url: Cpath +'/dxnews/auditConfig/findBreakeingType',
    method: 'post',
  })
}
// 修改爆料
export function editDisclose(queryObj) {
  return request({
    url: Cpath +'/dxnews/breakingNews/updteBareakingNews',
    method: 'post',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    data:QS.stringify(queryObj)
  })
}
//add爆料
export function createDisclose(data) {
  return request({
    url: Cpath +'/dxnews/breakingNews/saveBreakingNews',
    method: 'post',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    data:QS.stringify(data)
  })
}

//删除爆料
export function deleteDisclose(id) {
  return request({
    url: Cpath +'/dxnews/breakingNews/deleteBreakingNews'+id,
    method: 'post',
   
  })
}



// 获取爆料详情
export function discloseInfor(id) {
  return request({
    url: Cpath +'/dxnews/breakingNews/getBreakingNewsById?id=' + id,
    method: 'get'
  })
}


//添加操作记录

export function addOprate(data) {
  return request({
    url: Cpath +`/dxnews/operateRecord/saveOperateRecord?operateId=${data.discloseId}&operateReply=${data.description}`,
    method: 'post'
  })
}