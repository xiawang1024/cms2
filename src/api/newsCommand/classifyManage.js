import request from '@/utils/request'

//查询爆料分类列表

export function classifyList() {
  return request({
    url: '/cmsnews/auditConfig/findBreakeingType',
    method: 'post'
  })
}

//查询启用爆料分类列表

export function enableClassifyList() {
    return request({
      url: '/cmsnews/auditConfig/findBreakeingType?startFlag=1',
      method: 'post'
    })
  }

//保存爆料分类信息

/**
 * 启用标志0：不启用 1：启用 默认为1
 */
export function saveClassify(data) {
    return request({
      url: `/cmsnews/auditConfig/saveBreakeingType?typeName=${data.typeName}&startFlag=${data.startFlag}`,
      method: 'post'
    })
  }

  //更新爆料信息
  
  export function updataClassify(data) {
    return request({
      url: `/cmsnews/auditConfig/updateBreakeingType?id=${data.id}&typeName=${data.typeName}&startFlag=${data.startFlag}`,
      method: 'post'
    })
  }