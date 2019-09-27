import request from "@/utils/request";
let Cpath = "/live-stream";
//直播流地址管理

export function managaStreamAddress(data) {
    return request({
      url:
        Cpath +
        `/streamaddress/page?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${
          data.sortBy
        }&order=${data.order}&username=${data.username}`,
      method: "post"
      // loadingConfig: {
      //   noLoading: true
      // }
    });
}
//根据父ID查询所有的剪辑信息

export function childrenStreamAdressfile(id) {
  return request({
    url:
      Cpath +
      `/streamaddress/selectbypereid?id=${id}`,
    method: "post",
    loadingConfig: {
      noLoading: true
    }
  });
}
//删除
export function deleteSource(id){
  return request({
    url:
      Cpath +
      `/streamaddress/deletebyid?id=${id}`,
    method: "delete",
    loadingConfig: {
      noLoading: true
    }
  });
}

//转播流地址管理
//添加转播流信息
export function addrebroadcast(data) {
  return request({
    url:
      Cpath +
      `/relaystream/addRelayStream`,
    method: "post",
    data,
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}
//分页条件检索

export function rebroadcastList(data) {
  return request({
    url:
      Cpath +
      `/relaystream/page?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${
        data.sortBy
      }&order=${data.order}`,
    method: "post",
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}

//分发直播流接口
export function addDistribute(data) {
  return request({
    url:
      Cpath +
      `/relaystream/addDistributeStream`,
    method: "post",
    data:data,
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}

//分页条件检索分发流信息
export function distributeList(data) {
  return request({
    url:
      Cpath +
      `/relaystream/distributepage?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${
        data.sortBy
      }&order=${data.order}`,
    method: "post",
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}
//根据分发流信息的id查子信息
export function distributeChildrenList(id) {
  return request({
    url:
      Cpath +
      `/relaystream/distributbyPid?id=${id}`,
    method: "get",
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}

//恢复转发信息
export function distributeRecover(id){
  return request({
    url:Cpath+`/relaystream/recoverybyid?id=${id}`,
    method:"put",
  })
}

//删除转发信息
export function distributeDelete(id){
  return request({
    url:Cpath+`/relaystream/deletebydistributeid?id=${id}`,
    method:"delete",
  })
}

//中断拉转直播
export function interruptRelay(id) {
  return request({
    url: Cpath + `/relaystream/interruptRelay?id=${id}`,
    method: "get",
    loadingConfig: {
      noLoading: true
    }
  });
}

//删除已结束的拉转直播
export function deletRelay(id) {
  return request({
    url: Cpath + `/relaystream/deletRelay?id=${id}`,
    method: "delete",
    loadingConfig: {
      noLoading: true
    }
  });
}
