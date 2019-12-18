import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/cms/dict/page',
    method: 'post',
    data: query
  })
}

export function fetchDict(id) {
  return request({
    url: '/cms/dict/' + id,
    method: 'get'
  })
}

export function fetchDictByDictName(dictName) {
  return request({
    url: '/cms/dict/findarticleoriginfilterbydictname?dictName=' + encodeURIComponent(dictName),
    method: 'get',
    loadingConfig: {
      noLoading: true
    }
  })
}
// 编辑员列表http://gw.test.dianzhenkeji.com/cms/article/queryAllTenantId
export function getEditorList(dictName) {
  return request({
    url: '/cms/article/queryAllTenantId',
    method: 'post',
    loadingConfig: {
      noLoading: true
    }
  })
}
// 获取全部来源
export function fetchDictAllByDictName(dictName) {
  return request({
    url: '/cms/dict/findbydictname?dictName=' + encodeURIComponent(dictName),
    method: 'get',
    loadingConfig: {
      noLoading: true
    }
  })
}

export function createDict(data) {
  return request({
    url: '/cms/dict',
    method: 'post',
    data
  })
}

export function updateDict(data) {
  return request({
    url: '/cms/dict',
    method: 'put',
    data
  })
}
