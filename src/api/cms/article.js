import request from '@/utils/request'
//新增
//查询文章列表
export function documentList(queryObj, pageNo, pageSize) {
  return request({
    url: '/cms/article/page?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
    data: queryObj
  })
}
// 修改文章
export function editDocument(queryObj) {
  return request({
    url: '/cms/article',
    method: 'put',
    data: queryObj
  })
}
//创建文章
export function createDocument(data) {
  return request({
    url: '/cms/article',
    method: 'post',
    data
  })
}
//删除文章
export function deleteDocument(data) {
  return request({
    url: '/cms/article',
    method: 'delete',
    data: data
  })
}
// 之前
export function fetchList(query) {
  return request({
    url: '/article',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
