import request from "@/utils/request";

let Cpath = "/live-stream";
//直播流地址管理

export function managaStreamAddress(data) {
    return request({
      url:
        Cpath +
        `/streamaddress/page?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${
          data.sortBy
        }&order=${data.order}`,
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