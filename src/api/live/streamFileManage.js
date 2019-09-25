import request from "@/utils/request";

let Cpath = "/live-stream";

//录制文件分页检索

export function streamfile(data) {
  return request({
    url:
      Cpath +
      `/streamfile/page?pageNo=${data.pageNo}&pageSize=${data.pageSize}&sortBy=${data.sortBy}&order=${data.order}&userName=${data.username}`,
    method: "post"
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}
//编辑视频

export function editeStreamfile(data) {
  return request({
    url: Cpath + `/editvideo/edit`,
    method: "post",
    data,
    loadingConfig: {
      noLoading: true
    },
    timeout: 60 * 1000
  });
}
//根据父id查询子节点信息
export function childrenStreamfile(id) {
  return request({
    url: Cpath + `/streamfile/selectbypereid?id=${id}`,
    method: "post",
    loadingConfig: {
      noLoading: true
    }
  });
}
//删除
export function deleteStreamFile(id) {
  return request({
    url: Cpath + `/streamfile/deletebyid?id=${id}`,
    method: "delete",
    loadingConfig: {
      noLoading: true
    }
  });
}

//合并视频


export function merge(data) {
  return request({
    url: Cpath + `/editvideo/merge?prentId=${data.parentId}&username=${data.username}`,
    method: "post",
    data:data.childIds,
    loadingConfig: {
      noLoading: true
    }
  });
}
