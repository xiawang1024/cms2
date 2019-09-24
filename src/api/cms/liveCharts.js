import request from "@/utils/request";
// import baseUrl from '@/config/base-url'
// let Cpath = "http://192.168.7.40:53006";

let Cpath = "";
// let umengPath = "http://192.168.7.40:53006/baiduStatistics/umengAppList";
let umengPath = "/baiduStatistics/umengAppList";
//发稿量前缀
// let articlePath='http://192.168.7.38:53015/baiduStatistics/articleStatistics';
let articlePath='/baiduStatistics/articleStatistics';

//百度接口
//获取用户的站点列表
export function getSiteList() {
  return request({
    url: Cpath + "/baiduStatistics/siteInfo/getSiteList",
    method: "post"
  });
}
// 网站概况
export function siteProfile(data) {
  return request({
    url:Cpath+`/baiduStatistics/siteInfo/getData` ,
    method: "post",
    data
  });
}



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

//------发稿量统计接口-----------------------------------------


//根据租户id获取所有的作者和频道(频道id和频道name)

export function fullChanelList(tenantId) {
  return request({
    url: articlePath + `/getArticleStatisticsUserByTenantId?tenantId=${tenantId}&flag=1`,
    method: "get"
  });
}
export function fullAuthorList(tenantId) {
  return request({
    url: articlePath + `/getArticleStatisticsUserByTenantId?tenantId=${tenantId}&flag=0`,
    method: "get"
  });
}

  //获取文章点击量和发稿量整体趋势(按频道)
export function articleTrend(channelId) {
  return request({
    url: articlePath + "/getArticleTrendByChannelId?channelId=" + channelId,
    method: "get"
  });
}

  //获取文章点击量和发稿量整体趋势(按作者)
  export function articleTrendByAuthor(tenantId,author) {
    return request({
      url: articlePath + `/getArticleTrendByAuthor?tenantId=${tenantId}&author=${author}`,
      method: "get"
    });
  }
  //获取文章点击量和发稿量整体趋势(总站)
  export function articleTrendBytenantId(tenantId) {
    return request({
      url: articlePath + `/getArticleTrendTotal?tenantId=${tenantId}`,
      method: "get"
    });
  }



  //按频道获取文章点击次数、发稿量(每天和累计)

  export function articleStatisticsByChannelId(data) {
    return request({
      url: articlePath + `/getArticleStatisticsByChannelId?channelId=${data.channelId}&startDate=${data.startDate}&endDate=${data.endDate}`,
      method: "get"
    });

  }

  //按作者获取文章点击次数、发稿量(每天和累计)
  export function articleStatisticsByAuthor(data) {
    return request({
      url: articlePath + `/getArticleStatisticsByAuthor?tenantId=${data.tenantId}&author=${data.author}&startDate=${data.startDate}&endDate=${data.endDate}`,
      method: "get"
    });

  }
  

    //以租户维度统计作者文章点击量（）
    export function clickArticleStatisticsByWriter() {
      return request({
        url:Cpath+`/cms/article/querystatisticsclickgroupwithwriterbytenantid`,
        method: "post"
      });
  
    }
  //  以作者维度统计时间区间文章点击量（）
   export function writerArticleStatisticsByTime(data) {
    return request({
      url:Cpath+`/cms/article/queryarticleclickbytenantidandwriterandtime?writer=${data.writer}&sortBy=actualClickNumInt&beginTime=${data.beginTime}&endTime=${data.endTime}`,
      method: "post"
    });
  }
   //频道发稿统计（大象）
   export function getdxDocumentStatistics(data) {
    return request({
      url:Cpath+`/cms/article/queryarticleclickbytenantidandchannelidandtime?channelId=${data.channelId}&sortBy=actualClickNumInt&beginTime=${data.beginTime}&endTime=${data.endTime}`,
      method: "post"
    });

  }


