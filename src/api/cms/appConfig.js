import request from '@/utils/request'
// import baseUrl from '@/config/base-url'
// import QS from "qs"
// let  Cpath='http://10.99.1.246:53006'
let Cpath = "http://172.20.5.103:55001"
    // let Cpath='http://10.50.7.11:53001'
    // let Cpath=''

//app配置

//分页条件检索应用
export function appinfo(pageNo, pageSize, data) {
    return request({
        url: Cpath + `/appinfoconfig/appinfo/queryAppInfo?tenantId=${data.tenantId}&pageNo=${pageNo}&pageSize=${pageSize}`,
        method: 'get',
    })

}

export function searchAappinfo(pageNo, pageSize, data) {
    return request({
        url: Cpath + `/appinfoconfig/appinfo/queryAppInfo?tenantId=${data.tenantId}&name=${data.appName}&version=${data.version}&description=${data.description}&IOSURL=${data.IOSURL}&androidURL=${data.androidURL}&sort=${data.sort}&pageNo=${pageNo}&pageSize=${pageSize}`,
        method: 'get',
    })
}
//更新app信息
export function updateAppInfo(data) {
    return request({
        url: Cpath + `/appinfoconfig/appinfo/updateAppInfo?id=${data.id}&tenantId=${data.tenantId}&name=${data.appName}&version=${data.version}&description=${data.description}&startingImage=${data.startingImage}&icon=${data.icon}&IOSURL=${data.IOSURL}&androidURL=${data.androidURL}&sort=${data.sort}`,
        method: 'put'

    })
}

//删除app信息

export function deleteAppInfo(id) {
    return request({
        url: Cpath + '/appinfoconfig/appinfo/deleteAppInfo?id=' + id,
        method: 'delete',
    })
}

//查询app
export function findAppInfoById(id) {
    return request({
        url: Cpath + '/appinfoconfig/appinfo/findAppInfoById?id=' + id,
        method: 'get',
    })
}

//添加app信息

export function addAppInfo(data) {
    return request({
        url: Cpath + '/appinfoconfig/appinfo/addAppInfo?tenantId=' + data.tenantId + '&name=' + data.appName + '&version=' + data.version + '&description=' + data.description + '&startingImage=' + data.startingImage + '&icon=' + data.icon + '&IOSURL=' + data.IOSURL + '&androidURL=' + data.androidURL + '&sort=' + data.sort,
        method: 'post',

    })
}
//


//APP导航页

//列表初始化
export function initNavigation(pageNo, pageSize, id) {
    return request({
        url: Cpath + `/appinfoconfig/navigation/queryNavigation?appInfoId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`,
        method: 'get',

    })
}

//分页条件检索应用
export function navigation(pageNo, pageSize, id) {
    return request({
        url: Cpath + `/appinfoconfig/navigation/queryNavigation?appInfoId=${id}&pageNo=${pageNo}&pageSize=${pageSize}`,
        method: 'get',

    })
}

//添加

export function addNavigation(data) {
    return request({
        url: Cpath + `/appinfoconfig/navigation/addNavigation?appInfoId=${data.appInfoId}&name=${data.name}&description=${data.description}&icon=${data.icon}&type=${data.type}&sort=${data.sort}`,
        method: 'post',

    })
}

//删除

export function deleteNavigation(id) {
    return request({
        url: Cpath + `/appinfoconfig/navigation/deleteNavigation?id=${id}`,
        method: 'delete',

    })
}
//编辑

export function editNavigation(data) {
    return request({
        url: Cpath + `/appinfoconfig/navigation/updateNavigation?id=${data.id}&name=${data.name}&description=${data.description}&icon=${data.icon}&type=${data.type}&sort=${data.sort}`,
        method: 'put',

    })
}


//app顶部分类控制器

export function topTableSwitch(pageNo, id) {
    return request({
        url: Cpath + `/appinfoconfig/topType/queryTopType?navigationId=${id}&pageNo=1&pageSize=999`,
        method: 'get',

    })
}

//添加

export function addtopTable(data) {

    return request({
        url: Cpath + `/appinfoconfig/topType/addTopType?navigationId=${data.navigationId}&have=${data.have}&name=${data.name}&description=${data.description}&url=${data.url}&sort=${data.sort}`,
        method: 'post',

    })
}

//删除

export function deletetopTable(id) {
    return request({
        url: Cpath + `/appinfoconfig/topType/deleteTopType?id=${id}`,
        method: 'delete',

    })
}
//编辑

export function edittopTable(data) {
    return request({
        url: Cpath + `/appinfoconfig/topType/updateTopType?id=${data.id}&navigationId=${data.navigationId}&have=${data.have}&name=${data.name}&description=${data.description}&url=${data.url}&sort=${data.sort}`,
        method: 'put',

    })
}


//app页面配置

//条件检索

export function searchPageConfig(id) {

    return request({
        url: Cpath + `/appinfoconfig/pageConfig/queryPageConfig?topTypeId=${id}&pageNo=1&pageSize=999`,
        method: 'get',

    })
}

//组件添加
export function addPageConfig(data) {
    return request({
        url: Cpath + `/appinfoconfig/pageConfig/addPageConfig?topTypeId=${data.topTypeId}&name=${data.name}&description=${data.description}&type=${data.type}&url=${data.url}&sort=${data.sort}`,
        method: 'post',

    })
}


//删除组件
export function deletePageConfig(id) {
    return request({
        url: Cpath + `/appinfoconfig/pageConfig/deletePageConfig?id=${id}`,
        method: 'delete',

    })
}

//更新组件
export function editPageConfig(data) {
    return request({
        url: Cpath + `/appinfoconfig/pageConfig/updatePageConfig?id=${data.id}&topTypeId=${data.topTypeId}&name=${data.name}&description=${data.description}&type=${data.type}&url=${data.url}&sort=${data.sort}`,
        method: 'put',

    })
}
//添加轮播组件
export function putPicture(data) {
    return request({
        url: Cpath + `/appinfoconfig/pageConfig/addPageConfig?pictureList%5B0%5D.url=${data.Purl}&pictureList%5B0%5D.path=${data.Ppath}&pictureList%5B0%5D.name=${data.Pname}&pictureList%5B0%5D.description=${data.Pdescription}&pictureList%5B0%5D.sort=${data.Psort}&topTypeId=${data.topTypeId}&name=${data.name}&description=${data.description}&type=${data.type}&url=${data.url}&sort=${data.sort}`,
        method: 'post',

    })
}
//添加轮播图片
export function updatePicture(data) {
    return request({
        url: Cpath + `/appinfoconfig/pageConfig/addPageConfig?pictureList%5B${data.order}%5D.pageConfigId=${data.id}&pictureList%5B${data.order}%5D.url=${data.Purl}&pictureList%5B${data.order}%5D.path=${data.Ppath}&pictureList%5B${data.order}%5D.name=${data.Pname}&pictureList%5B${data.order}%5D.description=${data.Pdescription}&pictureList%5B${data.order}%5D.sort=${data.Psort}&id=${data.id}&topTypeId=${data.topTypeId}&name=${data.name}&description=${data.description}&type=${data.type}&url=${data.url}&sort=${data.sort}`,
        method: 'post',

    })
}

//查询页面详细配置

export function searchPage(id) {

    return request({
        url: Cpath + `/appinfoconfig/pageConfig/findPageConfigById?id=${id}`,
        method: 'get',

    })
}




//删除图片
export function deletetopList(id) {
    return request({
        url: Cpath + `/appinfoconfig/picture/deletePicture?id=${id}`,
        method: 'delete',
    })
}