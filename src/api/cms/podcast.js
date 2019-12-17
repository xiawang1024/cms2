import request from '@/utils/request'

let Dpath = '';
//获取标签列表
export function tagsList() {
    return request({
        url:
            Dpath + `/autoconfig/appConfig/tags`,
        method: "get",
        loadingConfig: {
            noLoading: true
        }
    });
}

//编辑标签对应的图片
export function editTags(id, url,order) {
    return request({
        url:
            Dpath + `/autoconfig/appConfig/update?id=${id}&url=${url}&order=${order}`,
        method: "put",
        loadingConfig: {
            noLoading: true
        }
    });
}
