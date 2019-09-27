
import request from "@/utils/request";

let Cpath = "/live-stream";

//录制文件分页检索

export function streamfile(data) {
  return request({
    url:
      Cpath +
      `/transcoding/page?pageNo=${data.pageNo}&pageSize=${
        data.pageSize
      }&tanentId=${data.tanentId}&fileType=${data.fileType}&createUser=${data.createUser}&title=${data.title}&state=${data.state}`,
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

  //重试转码
  export function retranscode(id) {
    return request({
      url:
        Cpath +
        `/transcoding/updatebyid?id=${id}`,
      method: "get",
    });
  }
