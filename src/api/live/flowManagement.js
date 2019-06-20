import request from "@/utils/request";
let Cpath=''

//app配置

//流管理

export function appinfo(pageNo, pageSize, data) {
  return request({
    url:
      Cpath +
      `/appinfoconfig/appinfo/queryAppInfo?tenantId=${
        data.tenantId
      }&pageNo=${pageNo}&pageSize=${pageSize}`,
    method: "get",
    loadingConfig: {
      noLoading: true
    }
  });
}