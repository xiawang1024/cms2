import request from "@/utils/request";
// import baseUrl from '@/config/base-url'
// import QS from "qs"
// let  Cpath='http://10.99.1.246:53006'
// let Cpath = 'http://172.20.5.103:55001'
// let Cpath = 'http://gw.test.dianzhenkeji.com' //测试环境
// let Cpath = 'http://gw.dianzhenkeji.com' //北京正式环境
// let Cpath = 'http://192.168.7.40:53006'
// let Cpath='http://10.50.7.11:53001'
var Cpath = "";

//app配置

//分页条件检索应用
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

export function searchAappinfo(pageNo, pageSize, data) {
  return request({
    url:
      Cpath +
      `/appinfoconfig/appinfo/queryAppInfo?tenantId=${data.tenantId}&name=${
        data.appName
      }&version=${data.version}&versionIOS=${data.versionIOS}&description=${data.description}&IOSURL=${
        data.IOSURL
      }&androidURL=${data.androidURL}&sort=${
        data.sort
      }&pageNo=${pageNo}&pageSize=${pageSize}`,
    method: "get",
    loadingConfig: {
      noLoading: true
    }
  });
}
//更新app信息
export function updateAppInfo(data) {
  return request({
    url:
      Cpath +
      `/appinfoconfig/appinfo/updateAppInfo?id=${data.id}&tenantId=${
        data.tenantId
      }&name=${data.appName}&version=${data.version}&versionIOS=${data.versionIOS}&description=${
        data.description
      }&startingImage=${data.startingImage}&icon=${data.icon}&IOSURL=${
        data.IOSURL
      }&androidURL=${data.androidURL}&sort=${data.sort}`,
    method: "put",
    loadingConfig: {
      noLoading: true
    }
  });
}

//删除app信息

// export function deleteAppInfo(id) {
//   return request({
//     url: Cpath + "/appinfoconfig/appinfo/deleteAppInfo?id=" + id,
//     method: "delete",
//     loadingConfig: {
//       noLoading: true
//     }
//   });
// }

//查询app
export function findAppInfoById(id) {
  return request({
    url: Cpath + "/appinfoconfig/appinfo/findAppInfoById?id=" + id,
    method: "get",
    loadingConfig: {
      noLoading: true
    }
  });
}


//添加app信息

export function addAppInfo(data) {
  return request({
    url:
      Cpath +
      "/appinfoconfig/appinfo/addAppInfo" ,
    method: "post",
    data:data,
    loadingConfig: {
      noLoading: true
    }
  });
}

export function checkName(data) {
  return request({
    url:
      Cpath +
      `/appinfoconfig/appinfo/queryAppInfoByTenantIdAndName?tenantId=${
        data.tenantId
      }&name=${data.name}`,
    method: "get",
    loadingConfig: {
      noLoading: true
    }
  });
}
//APP导航页

//列表初始化

export function initNavigation(pageNo, pageSize, id) {
  return request({
    url:
      Cpath +
      `/appinfoconfig/navigation/queryNavigation?appInfoId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`,
    method: "get",
    loadingConfig: {
      noLoading: true
    }
  });
}

//分页条件检索应用
export function navigation(pageNo, pageSize, id) {
  return request({
    url:
      Cpath +
      `/appinfoconfig/navigation/queryNavigation?appInfoId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`,
    method: "get",
    loadingConfig: {
      noLoading: true
    }
  });
}

//添加

export function addNavigation(data) {
  return request({
    url:
      Cpath +
      `/appinfoconfig/navigation/addNavigation?appInfoId=${
        data.appInfoId
      }&name=${data.name}&description=${data.description}&icon=${
        data.icon
      }&type=${data.type}&sort=${data.sort}`,
    method: "post",
    loadingConfig: {
      noLoading: true
    }
  });
}

//删除

export function deleteNavigation(id) {
  return request({
    url: Cpath + `/appinfoconfig/navigation/deleteNavigation?id=${id}`,
    method: "delete",
    loadingConfig: {
      noLoading: true
    }
  });
}
//编辑
export function editNavigation(data) {
  return request({
    url:
      Cpath +
      `/appinfoconfig/navigation/updateNavigation?id=${data.id}&name=${
        data.name
      }&description=${data.description}&icon0=${data.icon0}&icon1=${
        data.icon1
      }&enable=${data.enable}&sort=${data.sort}`,
    method: "put",
    loadingConfig: {
      noLoading: true
    }
  });
}
//底部导航是否启用
export function enableNavigation(data) {
    return request({
      url:
        Cpath +`/appinfoconfig/navigation/enableNavigation?id=${data.id}&enable=${data.enable}`,
      method: "put",
      loadingConfig: {
        noLoading: true
      }
    });
  }


// -------------------------------------------------------------------------------------------------
let Dpath='http://192.168.7.38:8080'
  //新增开机图片
export function addOpenimage(data) {
  return request({
    url:
      Dpath +`/autoconfig/openimage/save?operationUser=${data.operationUser}&clientLicenseId=${data.clientLicenseId}`,
    method: "post",
    data,
    loadingConfig: {
      noLoading: true
    }
  });
}
  //修改开机图片
  export function updateOpenimage(data) {
    return request({
      url:
        Dpath +`/autoconfig/openimage/update?operationUser=${data.operationUser}&clientLicenseId=${data.clientLicenseId}`,
      method: "put",
      data,
      loadingConfig: {
        noLoading: true
      }
    });
  }
  

//根据appId 查询开机图


export function getOpenimage(data) {
  return request({
    url:
      Dpath +`/autoconfig/openimage/tenantId?tenantId=${data.tenantId}&appId=${data.appId}`,
    method: "get",
    loadingConfig: {
      noLoading: true
    }
  });
}

//添加app 导航栏主题

export function addthemeimage(data) {
  return request({
    url:
      Dpath +`/autoconfig/themeimage/save`,
    method: "post",
    data,
    loadingConfig: {
      noLoading: true
    }
  });
}

//根据appId 查询导航图
export function getThemeimage(data) {
  return request({
    url:
      Dpath +`/autoconfig/themeimage/search?tenantId=${data.tenantId}&appId=${data.appId}`,
    method: "get",
    loadingConfig: {
      noLoading: true
    }
  });
}

//添加我的主题图片

export function addMyimage(data) {
  return request({
    url:
      Dpath +`/autoconfig/myimage/save`,
    method: "post",
    data,
    loadingConfig: {
      noLoading: true
    }
  });
}

//根据appId 查询我的主题图片
export function getMyimage(data) {
  return request({
    url:
      Dpath +`/autoconfig/myimage/search?tenantId=${data.tenantId}&appId=${data.appId}`,
    method: "get",
    loadingConfig: {
      noLoading: true
    }
  });
}

//根据id 查询底部icon

export function geticon(data) {
  return request({
    url:
      Dpath +`/autoconfig/navigation/findNavigationIsEnable?appInfoId=${data.appId}&enable=true`,
    method: "get",
    loadingConfig: {
      noLoading: true
    }
  });
}