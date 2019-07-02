import request from "@/utils/request";

let Cpath = "/live-stream";

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
//编辑视频

export function editeStreamfile(data) {
    return request({
      url:
        Cpath +
        `/editvideo/edit`,
      method: "post",
      data,
      loadingConfig: {
        noLoading: true
      }
    });
  }
  