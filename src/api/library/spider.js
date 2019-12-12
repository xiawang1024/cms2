import request from '@/utils/request'
//获取所有的文章来源信息
export function sourceList() {
  return request({
    url: `/library/source/getallSource`,
    method:'get'
  })
}

//获取所有文章top来源信息
export function topSourceList() {
  return request({
    url: `/library/source/getalltopSource`,
    method:'get'
  })
}

//从稿库中查询稿件(根据关键词，平台)
export function selectArticleByPage(data) {
  return request({
    url: `/library/selectArticle/findByKeyword?keyword=${data.keyword}&pageNo=${data.pageNo}&pageSize=${data.pageSize}&platform=${data.platform}`,
    method:'get'
  })
}
//根据文章id查询文章详细信息

export function selectArticleById(id) {
  return request({
    url: `/library/selectArticle/searchArticle?id=${id}`,
    method:'get'
  })
}
//添加订阅关键字
export function addKeyWord(userId,userName,keyWord) {
  return request({
    url: `/library/keywords/addKeyWord?userId=${userId}&userName=${userName}&keyWord=${keyWord}`,
    method:'post'
  })
}
//删除订阅关键字
export function deleteKeyWord(id) {
  return request({
    url: `/library/keywords/deletebyid?id=${id}`,
    method:'delete'
  })
}
//查询订阅关键字


export function searchKeyWord(userId) {
  return request({
    url: `/library/keywords/findByuserId?userId=${userId}`,
    method:'get'
  })
}