import request from "@/utils/request";
// import baseUrl from '@/config/base-url'
// let Cpath = "http://192.168.7.40:53006";
let Cpath = "";
// let BaiduPath = "/baiduapi/json/tongji/v1/ReportService/getData";
// let BaiduPath='https://api.baidu.com/json/tongji/v1/ReportService/getData'
let umengPath = "/baiduStatistics/umengAppList";

//百度接口
//获取用户的站点列表
export function getSiteList() {
  return request({
    url: Cpath + "/baiduStatistics/siteInfo/getSiteList",
    method: "post"
  });
}

//获取最近七天信息
export function getSevendayData(siteId,startDate,endDate) {
  return request({
    url: Cpath + `/baiduStatistics/siteInfo/getTimeTrendRpt?siteId=${siteId}&startDate=${startDate}&endDate=${endDate}`,
    method: "get"
  });
}
//获取实时访客信息
export function getCurrenViewer(siteId) {
  return request({
    url: Cpath + `/baiduStatistics/siteInfo/getTrendLatest?siteId=${siteId}`,
    method: "get"
  });
}


//获取趋势数据
export function getTrendData(siteId,startDate,endDate) {
  return request({
    url: Cpath + `/baiduStatistics/siteInfo/getTrendTime?siteId=${siteId}&startDate=${startDate}&endDate=${endDate}`,
    method: "get"
  });
}
// 网站概况
// export const siteProfile = (params) => post(params);
//原百度接口，弃用
// export function siteProfile(data) {
//   return request({
//     baseURL: "",
//     url: BaiduPath,
//     method: "post",
//     data
//   });
// }

//-------------------------------------------------------------------
//友盟接口
//  获取App活跃用户数

export function getActiveUser(data) {
  return request({
    url:
      umengPath +
      `/getActiveUsers?appkey=${data.appkey}&startDate=${
        data.startDate
      }&endDate=${data.endDate}&periodType=${data.periodType}`,
    method: "get"
  });
}
//获取当前用户的所有App列表
export function getAppList(page, perPage) {
  return request({
    url: umengPath + `/getAppList?page=${page}&perPage=${perPage}`,
    method: "post"
  });
}

//获取App统计数据(返回结果：统计日期,活跃用户数,总用户数,启动数,新增用户数)

export function getDailyData(appkey, date) {
  return request({
    url: umengPath + `/getDailyData?appkey=${appkey}&date=${date}`,
    method: "get"
  });
}

//获取App使用时长

export function getDurations(appkey, date, periodType) {
  return request({
    url:
      umengPath +
      `/getDurations?appkey=${appkey}&date=${date}&periodType=${periodType}`,
    method: "get"
  });
}

//获取App启动次数

export function getLaunches(appkey, startDate, endDate, periodType) {
  return request({
    url:
      umengPath +
      `/getLaunches?appkey=${appkey}&startDate=${startDate}&endDate=${endDate}&periodType=${periodType}`,
    method: "get"
  });
}
//

//获取App新增用户数

export function getNewUsers(appkey, startDate, endDate, periodType) {
  return request({
    url:
      umengPath +
      `/getNewUsers?appkey=${appkey}&startDate=${startDate}&endDate=${endDate}&periodType=${periodType}`,
    method: "get"
  });
}

//获取App用户留存率
export function getRetentions(appkey, startDate, endDate, periodType) {
  return request({
    url:
      umengPath +
      `/getRetentions?appkey=${appkey}&startDate=${startDate}&endDate=${endDate}&periodType=${periodType}`,
    method: "get"
  });
}

//获取App累计用户数
export function getTotalUsers(appkey, startDate, endDate) {
  return request({
    url:
      umengPath +
      `/getTotalUsers?appkey=${appkey}&startDate=${startDate}&endDate=${endDate}`,
    method: "get"
  });
}

//获取App整体趋势
export function getTrend(appkey) {
  return request({
    url: umengPath + "/getTrend?appkey=" + appkey,
    method: "get"
  });
}