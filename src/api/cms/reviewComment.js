import request from "@/utils/request";
var Cpath = "http://192.168.7.55:8093/news-comment";
import QS from "qs";

export function saveAudit(data) {
  return request({
    url: Cpath + `/permission/save`,
    method: "post",
    data
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}

export function getComment(data) {
  return request({
    url: Cpath + `/get-comment`,
    data: QS.stringify(data),
    method: "post"
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}

export function checkBatch(data) {
  return request({
    url: Cpath + `/check-batch`,
    method: "put",
    data: QS.stringify(data)
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}

export function deleteComment(data) {
  return request({
    url: Cpath + `/comment/` + data,
    method: "delete"
    // data,
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}

export function toTop(data) {
  return request({
    url: Cpath + `/top/` + data.flag + "/" + data.commentId,
    method: "put"
    // data,
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}

export function getColumnList(userId) {
  return request({
    url: Cpath + `/permission/get-channel-by-user?userId=` + userId,
    method: "get"
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}
//超级管理员页面用
export function deleteLimite(userId) {
  return request({
    url: Cpath + `/permission/` + userId,
    method: "delete"
    // loadingConfig: {
    //   noLoading: true
    // }
  });
}

// 查看用户
export function seeUser(userId) {
  return request({
    url: Cpath + `/permission/channel/` + userId,
    method: "get"
  });
}

//查询权限用户信息

export function getUserInfo(data) {

  return request({
    url: Cpath + `/permission/get-user-with-permission`,
    method: "get",
    data,
  });
}