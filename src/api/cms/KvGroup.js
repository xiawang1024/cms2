import request from '@/utils/request'
// import baseUrl from '@/config/base-url'
// import QS from "qs"
let  Cpath='http://172.20.5.103:58018/kvconfig'
// let Cpath="http://192.168.7.54:53040/kvconfig"

export function getAllGroup(pageNo,pageSize,data) {
    return request({       
    url: Cpath+'/kvgroup/page?pageNo='+pageNo+'&pageSize='+pageSize,    
    method: 'post',    
    data:data
    })
}

export function getAppDetail(id) {
    return request({
      url: Cpath+'/kvgroup/findKVGroupById?kvGroupId='+id,
      method: 'get',
      
    })
}

export function deleteGroup(kvGroupId) {
   
    return request({
      url: Cpath+'/kvgroup/deleteKVGroupById?kvGroupId='+kvGroupId,
      method: 'delete',
      
    })
}

export function groupSave(kvGroupId) {
   //还没有写完
  return request({
    url: Cpath+'/kvgroup/deleteKVGroupById?kvGroupId='+kvGroupId,
    method: 'delete',
    
  })
}
