import request from "@/utils/request";
let Cpath = "/live-stream";

//app配置

//录制文件分页检索

export function streamfile(data) {
  return request({
    url:
      Cpath +
      `/streamfile/page?pageNo=${data.pageNo}&pageSize=${
        data.pageSize
      }&sortBy=${data.sortBy}&order=${data.order}`,
    method: "post"
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}

//直播流
//删除
export function deleteStream(id) {
  return request({
    url: Cpath + `stream?id=${id}`,
    method: "delete"
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}

//开始推流
export function startPushStream(data) {
  return request({
    url:
      Cpath +
      `/stream/auth?tcurl=${data.tcurl}&name=${data.name}&live=${
        data.live
      }&type=${data.type}`,
    method: "post"
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}
//结束推流

export function endPushStream(data) {
  return request({
    url:
      Cpath +
      `/stream/down?name=${data.name}&live=${data.live}&type=${data.type}`,
    method: "post"
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}

//检索直播流信息

export function getStreamInfo(data) {
  return request({
    url:
      Cpath +
      `/stream/page?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${
        data.sortBy
      }&order=${data.order}`,
    method: "post"
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}


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