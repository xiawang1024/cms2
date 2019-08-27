import request from '@/utils/request'
// request.defaults.headers.contentType = 'application/json;charset=utf-8'
import axios from 'axios'
import { Message } from 'element-ui'
import { download } from '@/utils/common'
import baseUrl from "@/config/base-url";
export function fetchSensitiveList(word, pageNo, pageSize) {
  let selectWord = word ? word : ''
  return request({
    url: '/news-comment/sensitive-words/select-page?pageNo=' + pageNo + '&pageSize=' + pageSize + '&word=' + selectWord,
    method: 'get',
  })
}

export function getSensitive(id) {
  return request({
    url: '/news-comment/sensitive-words/' + id,
    method: 'get'
  })
}

export function createSensitive(data) {
  return request({
    url: '/news-comment/sensitive-words/save',
    method: 'post',
    data
  })
}
export function importSensitive(data) {
  return request({
    url: '/news-comment/sensitive-words/import-excel',
    method: 'post',
    data
  })
}
export function updateSensitive(data) {
  return request({
    url: '/news-comment/sensitive-words/update',
    method: 'put',
    data
  })
}
export function deleteSensitive(id) {
  return request({
    url: `/news-comment/sensitive-words/${id}`,
    method: 'delete'
  })
}
export function downloadExcel(accessToken) {
  // return request({
  //   url: 'http://gw.test.dianzhenkeji.com/news-comment/敏感词模板.xlsx',
  //   method: 'get',
  //   responseType:'blob',
  //   headers: {
  //     'Content-Type': 'application/json;charset=utf-8'
  //   }
  // })
  postAjax(accessToken)
}
function postAjax (accessToken) {
  axios({
    // baseURL: baseUrl || '/',
    method: 'get',
    url: baseUrl.BASE_URL + '/news-comment/template.xlsx',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': accessToken
    }
  })
    .then(res => {
      download('template.xlsx', res.data)
      Message.success('下载成功')
    })
    .catch(error => {
      Message.warning(error.msg ? error.msg : '导出失败')
    })
}