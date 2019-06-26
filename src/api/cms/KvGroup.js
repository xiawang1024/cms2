import request from "@/utils/request";
// import baseUrl from '@/config/base-url'
// import QS from "qs"
// let  Cpath='http://172.20.5.103:50350/kvconfig'
// let Cpath="http://192.168.7.40:53040/kvconfig"
let Cpath = "/kvconfig";

//配置组管理
//分页条件检索应用
export function getAllGroup(pageNo, pageSize, data) {
  return request({
    url: Cpath + "/kvgroup/page?pageNo=" + pageNo + "&pageSize=" + pageSize,
    method: "post",
    data: data,
    loadingConfig:{
      noLoading:true
    }
  });
}

//修改配置组
export function groupSave(obj) {
  return request({
    url:
      Cpath +
      "/kvgroup/updateKVGroup?id=" +
      obj.id +
      "&tenantId =" +
      obj.tenantId +
      "&description=" +
      obj.description +
      "&tag=" +
      obj.tag +
      "&sort=" +
      obj.sort,
    method: "put",
    loadingConfig:{
      noLoading:true
    }
  });
}
//添加组
export function addGroupRequest(obj) {
  return request({
    url:
      Cpath +
      "/kvgroup/addKVGroup?tenantId=" +
      obj.tenantId +
      "&description=" +
      obj.description +
      "&sort=" +
      obj.sort +
      "&tag=" +
      obj.tag,
    method: "post",
    loadingConfig:{
      noLoading:true
    }
  });
}

//删除组
export function deleteGroup(kvGroupId) {
  return request({
    url: Cpath + "/kvgroup/deleteKVGroupById?kvGroupId=" + kvGroupId,
    method: "delete",
    loadingConfig:{
      noLoading:true
    }
  });
}

//根据配置组id查询配置组
export function getAppDetail(id) {
  return request({
    url: Cpath + "/kvgroup/findKVGroupById?kvGroupId=" + id,
    method: "get",
    loadingConfig:{
      noLoading:true
    }
  });
}

//配置组属性管理

//添加配置组属性
export function addGroupAttribute(data) {
  return request({
    url:
      Cpath +
      "/kvfield/addKVField",
      data,
    method: "post",
    loadingConfig:{
      noLoading:true
    }
  });
}
//删除配置组属性

export function deleteGroupAttribute(kvFieldId) {
  return request({
    url: Cpath + "/kvfield/deleteKVGroupById?kvFieldId=" + kvFieldId,
    method: "delete",
    loadingConfig:{
      noLoading:true
    }
  });
}

//根据配置属性id查询配置组属性
export function getGroupAttributeBykvFieldId(kvFieldId) {
  return request({
    url: Cpath + "/kvfield/findKVFieldById?kvFieldId=" + kvFieldId,
    method: "get",
    // loadingConfig:{
    //   noLoading:true
    // }
  });
}

//分页条件检索应用

export function getAllField(pageNo, pageSize, obj) {
  return request({
    url: Cpath + "/kvfield/page?pageNo=" + pageNo + "&pageSize=" + pageSize,
    method: "post",
    data: obj,
    loadingConfig:{
      noLoading:true
    }
    
  });
}

//更新配置组属性

export function updateFieldAttribute(data) {
  return request({
    url:
      Cpath +
      "/kvfield/updateKVField" ,
      data,
    method: "put",
    loadingConfig:{
      noLoading:true
    }
  });
}
