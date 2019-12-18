import request from '@/utils/request'

let Dpath = '';
//获取标签列表
export function tagsList(tenantId) {
    return request({
        url:
            Dpath + `/sht/channel/tagruls?tenantId=${tenantId}`,
        method: "get",
        loadingConfig: {
            noLoading: true
        }
    });
}

//编辑标签对应的图片
export function editTags(id, url,sqNo) {
    return request({
        url:
            Dpath + `/sht/channel/update?id=${id}&url=${url}&sqNo=${sqNo}`,
        method: "put",
        loadingConfig: {
            noLoading: true
        }
    });
}
