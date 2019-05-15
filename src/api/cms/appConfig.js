import request from '@/utils/request'
// import baseUrl from '@/config/base-url'
// import QS from "qs"
// let  Cpath='http://10.99.1.246:53006'
// let Cpath = 'http://172.20.5.103:55001'
let Cpath = 'http://gw.test.dianzhenkeji.com' //测试环境
// let Cpath = 'http://gw.dianzhenkeji.com' //北京正式环境
    // let Cpath = 'http://192.168.7.40:53006'
    // let Cpath='http://10.50.7.11:53001'
    // let Cpath=''

//app配置

//分页条件检索应用
export function appinfo(pageNo, pageSize, data) {
    return request({
        url: Cpath + `/appinfoconfig/appinfo/queryAppInfo?tenantId=${data.tenantId}&pageNo=${pageNo}&pageSize=${pageSize}`,
        method: 'get'
    })
}

export function searchAappinfo(pageNo, pageSize, data) {
    return request({
        url: Cpath +
            `/appinfoconfig/appinfo/queryAppInfo?tenantId=${data.tenantId}&name=${data.appName}&version=${data.version}&description=${data.description}&IOSURL=${data.IOSURL}&androidURL=${data.androidURL}&sort=${data.sort}&pageNo=${pageNo}&pageSize=${pageSize}`,
        method: 'get'
    })
}
//更新app信息
export function updateAppInfo(data) {
    return request({
        url: Cpath +
            `/appinfoconfig/appinfo/updateAppInfo?id=${data.id}&tenantId=${data.tenantId}&name=${data.appName}&version=${data.version}&description=${data.description}&startingImage=${data.startingImage}&icon=${data.icon}&IOSURL=${data.IOSURL}&androidURL=${data.androidURL}&sort=${data.sort}`,
        method: 'put'
    })
}

//删除app信息

export function deleteAppInfo(id) {
    return request({
        url: Cpath + '/appinfoconfig/appinfo/deleteAppInfo?id=' + id,
        method: 'delete'
    })
}

//查询app
export function findAppInfoById(id) {
    return request({
        url: Cpath + '/appinfoconfig/appinfo/findAppInfoById?id=' + id,
        method: 'get'
    })
}

//添加app信息

export function addAppInfo(data) {
    return request({
        url: Cpath +
            '/appinfoconfig/appinfo/addAppInfo?tenantId=' +
            data.tenantId +
            '&name=' +
            data.appName +
            '&version=' +
            data.version +
            '&description=' +
            data.description +
            '&startingImage=' +
            data.startingImage +
            '&icon=' +
            data.icon +
            '&IOSURL=' +
            data.IOSURL +
            '&androidURL=' +
            data.androidURL +
            '&sort=' +
            data.sort,
        method: 'post'
    })
}

export function checkName(data) {
    return request({
        url: Cpath + `/appinfoconfig/appinfo/queryAppInfoByTenantIdAndName?tenantId=${data.tenantId}&name=${data.name}`,
        method: 'get'
    })
}
//APP导航页

//列表初始化

export function initNavigation(pageNo, pageSize, id) {
    return request({
        url: Cpath + `/appinfoconfig/navigation/queryNavigation?appInfoId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`,
        method: 'get'
    })
}

//分页条件检索应用
export function navigation(pageNo, pageSize, id) {
    return request({
        url: Cpath + `/appinfoconfig/navigation/queryNavigation?appInfoId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`,
        method: 'get'
    })
}

//添加

export function addNavigation(data) {
    return request({
        url: Cpath +
            `/appinfoconfig/navigation/addNavigation?appInfoId=${data.appInfoId}&name=${data.name}&description=${data.description}&icon=${data.icon}&type=${data.type}&sort=${data.sort}`,
        method: 'post'
    })
}

//删除

export function deleteNavigation(id) {
    return request({
        url: Cpath + `/appinfoconfig/navigation/deleteNavigation?id=${id}`,
        method: 'delete'
    })
}
//编辑
export function editNavigation(data) {
    return request({
        url: Cpath +
            `/appinfoconfig/navigation/updateNavigation?id=${data.id}&name=${data.name}&description=${data.description}&icon0=${data.icon0}&icon1=${data.icon1}&enable=${data.enable}&sort=${data.sort}`,
        method: 'put'
    })
}

