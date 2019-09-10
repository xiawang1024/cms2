
import request from "@/utils/request";

let Cpath = "/live-stream";

//录制文件分页检索

export function streamfile(data) {
  return request({
    url:
      Cpath +
      `/transcoding/page?pageNo=${data.pageNo}&pageSize=${
        data.pageSize
      }`,
    method: "get"
  });
}

//添加音视频转码信息

export function addTranscode(data) {
    return request({
      url:
        Cpath +
        `/transcoding/creatTranscoding`,
      method: "post",
      data
    });
  }

  //删除转码资源
 
  export function deleteTranscode(id) {
    return request({
      url:
        Cpath +
        `/transcoding/deletebyid?id=${id}`,
      method: "delete",
    });
  }