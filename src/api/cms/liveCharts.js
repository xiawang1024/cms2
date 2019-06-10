import request from "@/utils/request";
// import baseUrl from '@/config/base-url'
let Cpath = "/";

export function getAllGroup(pageNo, pageSize, data) {
    return request({
      url: Cpath + "/kvgroup/page?pageNo=" + pageNo + "&pageSize=" + pageSize,
      method: "post",
      data: data
    });
  }