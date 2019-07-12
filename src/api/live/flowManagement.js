import request from "@/utils/request";
let Cpath = "/live-stream";

//直播流
//删除
export function deleteStream(id) {
  return request({
    url: Cpath + `/stream/deletebyid?id=${id}`,
    method: "delete"
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}
//禁用流信息
export function disableStream(id) {
  return request({
    url: Cpath + `/stream/disable?id=${id}`,
    method: "put"
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}

//解禁流信息
export function undisableStream(id) {
  return request({
    url: Cpath + `/stream/notdisable?id=${id}`,
    method: "put"
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
    method: "put"
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
      }&order=${data.order}&streamType=${data.streamType}`,
    method: "get"
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}

//禁止转码

export function stopTranscoding(id) {
  return request({
    url:
      Cpath +
      `/stream/stoptranscoding?id=${id}`,
    method: "post",
    loadingConfig: {
      noLoading: true
    }
  });
}
//启用转码

export function startTranscoding(id) {
  return request({
    url:
      Cpath +
      `/stream/allowtranscoding?id=${id}`,
    method: "post",
    loadingConfig: {
      noLoading: true
    }
  });
}