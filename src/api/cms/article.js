import request from '@/utils/request'
//新增
//查询文章列表
export function documentList(queryObj, pageNo, pageSize, sortBy='topFlag', order='desc,desc,desc') {
  return request({
    url: '/cms/article/page?pageNo=' + pageNo + '&pageSize=' + pageSize + '&sortBy=' + sortBy + ',seqNo,createTime&order=' + order,
    method: 'post',
    data: queryObj
    // requestBodyType: 'formData'
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
// 置顶文章
export function topDocument(id) {
  return request({
    url: '/cms/article/top/' + id,
    method: 'post'
    // data: data
  })
}
//删除单个文章
export function deleteDocument(data) {
  return request({
    url: '/cms/article',
    method: 'delete',
    data: data
  })
}
// 匹量删除
export function deleteDocumentMore(data) {
  return request({
    url: '/cms/article/cutouts',
    method: 'post',
    data: data
  })
}
// 批量撤销
export function cancelDocumentMore(data) {
  return request({
    url: '/cms/article/cancels',
    method: 'post',
    data: data
  })
}
// 批量发布
export function publishDocumentMore(data) {
  return request({
    url: '/cms/article/senteds',
    method: 'post',
    data: data
  })
}
// 复制到
export function copyTo(articleId,channelId) {
  return request({
    url: `/cms/article/copys/${articleId}/${channelId}`,
    method: 'get'
  })
}
// 移动到
export function moveTo(articleId,channelId) {
  return request({
    url: `/cms/article/moves/${articleId}/${channelId}`,
    method: 'get'
  })
}
// 引用到
export function quoteTo(articleId,channelId) {
  return request({
    url: `/cms/article/refers/${articleId}/${channelId}`,
    method: 'get'
  })
}
// 获取文章详情
export function documentInfor(id) {
  return request({
    url: '/cms/article/' + id,
    method: 'get'
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
/** 
 * 自定义文档列表
 */
export function createDefineArticle(data) {
  return request({
    url: '/cms/document',
    method: 'post',
    data
  })
}
export function editDefineArticle(data) {
  return request({
    url: '/cms/document',
    method: 'put',
    data
  })
}
export function defineArticleList(queryObj, pageNo, pageSize) {
  return request({
    url: '/cms/document/page?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
    data: queryObj
  })
}
export function deleteDefineArticle(data) {
  return request({
    url: '/cms/document',
    method: 'delete',
    data
  })
}
export function defineDocumentInfor(id) {
  return request({
    url: '/cms/document/' + id,
    method: 'get'
  })
}
/*
  相关文档
*/
// 获取文章下的关联文档
export function getRelationDoc(id) {
  return request({
    url: `/cms/article/relatedarticleshow/${id}`,
    method: 'post'
  })
}
// 保存文章下的关联文档
export function saveRelationDoc(id, data) {
  return request({
    url: `/cms/article/relatedarticleoperation/${id}`,
    method: 'post',
    data
  })
}
/**
 * 栏目图片组
 */
// 栏目下的图片组
export function columnImageList(queryObj, pageNo, pageSize) {
  return request({
    url: '/cms/picGroup/page?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
    data: queryObj
  })
}
// 新增栏目组
export function createImageList(data) {
  return request({
    url: `/cms/picGroup`,
    method: 'post',
    data
  })
}
// 获取图片组详情
export function getImageListInfor(id) {
  return request({
    url: `/cms/picGroup/${id}`,
    method: 'get',
  })
}
// 修改图片组
export function editImageList(data) {
  return request({
    url: `/cms/picGroup`,
    method: 'put',
    data
  })
}
// 删除图片组
export function deleteImageList(data) {
  return request({
    url: `/cms/picGroup`,
    method: 'delete',
    data
  })
}
// 文章拖拽
export function articalSort(data) {
  return request({
    url: `/cms/article/sort`,
    method: 'post',
    data
  })
}
/**直播消息
 * 
 * 
 */
// 新增直播消息
export function addLive(data) {
  return request({
    url: `/cms/articleLiveComment`,
    method: 'post',
    data
  })
}
// 修改直播消息
export function editLive(data) {
  return request({
    url: `/cms/articleLiveComment`,
    method: 'put',
    data
  })
}
// 删除直播消息
export function deleteLive(data) {
  return request({
    url: `/cms/articleLiveComment`,
    method: 'delete',
    data
  })
}
//直播检索
export function getLiveList(queryObj, pageNo, pageSize) {
  return request({
    url: '/cms/articleLiveComment/page?pageNo=' + pageNo + '&pageSize=' + pageSize,
    method: 'post',
    data: queryObj
  })
}
// 直播详情
export function getLiveInfor(id) {
  return request({
    url: `/cms/articleLiveComment/${id}`,
    method: 'get',
    loadingConfig: {
      target: '.el-dialog__body'
    }
  })
}