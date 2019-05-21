import request from '@/utils/request'
// import baseUrl from '@/config/base-url'
// import QS from "qs"
let  Cpath='http://172.20.5.103:50350/kvconfig'
// let Cpath="http://192.168.0.105:8089"
// let Cpath=''
//配置组管理
//分页条件检索应用
export function getAllGroup(pageNo,pageSize,data) {
    return request({       
    url: Cpath+'/kvgroup/page?pageNo='+pageNo+'&pageSize='+pageSize,    
    method: 'post',    
    data:data
    })
}


//修改配置组
export function groupSave(obj) {
  
  return request({
    url: Cpath+'/kvgroup/updateKVGroup?kvGroupId='+obj.id+'&description='+obj.description+'&sort='+obj.sort+'&tag='+obj.tag,
    method: 'put',
    
  })
}
//添加组
export function addGroupRequest(obj) {
  
 return request({
   url: Cpath+'/kvgroup/addKVGroup?tenantId='+obj.tenantId+'&description='+obj.description+'&sort='+obj.sort+'&tag='+obj.tag,
   method: 'post',
 })
}


//删除组
export function deleteGroup(kvGroupId) {
   
  return request({
    url: Cpath+'/kvgroup/deleteKVGroupById?kvGroupId='+kvGroupId,
    method: 'delete',
    
  })
}

//根据配置组id查询配置组
export function getAppDetail(id) {
  return request({
    url: Cpath+'/kvgroup/findKVGroupById?kvGroupId='+id,
    method: 'get',
    
  })
}


//配置组属性管理

//添加配置组属性

export function addGroupAttribute(obj) {
 
  return request({
    url: Cpath+'/kvfield/addKVField?groupId='+obj.groupId+'&description='+obj.description+'&name='+obj.name+'&valueType='+obj.valueType+'&value='+obj.value,
    method: 'post',
  })
 }

//删除配置组属性
 
 export function deleteGroupAttribute(kvFieldId) {   
  return request({
    url: Cpath+'/kvfield/deleteKVGroupById?kvFieldId='+kvFieldId,
    method: 'delete',
    
  })
}

//根据配置属性id查询配置组属性
export function getGroupAttributeBykvFieldId(kvFieldId) {
  return request({
    url: Cpath+'/kvfield/findKVFieldById?kvFieldId='+kvFieldId,
    method: 'get',
    
  })
}

//分页条件检索应用

export function getAllField(pageNo,pageSize,obj) {
  return request({       
  url: Cpath+'/kvfield/page?pageNo='+pageNo+'&pageSize='+pageSize,    
  method: 'post',    
  data:obj
  })
}

//更新配置组属性

export function updateFieldAttribute(obj) {
  
  return request({
    url: Cpath+'/kvfield/updateKVField?kvFieldId='+obj.id+'&description='+obj.description+'&name='+obj.name+'&valueType='+obj.valueType+'&value='+obj.value,
    method: 'put',
    
  })
}