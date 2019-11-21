// import request from '@/utils/request'
// request.defaults.headers.contentType = 'application/json;charset=utf-8'
import axios from 'axios'
import {
  Message
} from 'element-ui'
import {
  download
} from '@/utils/common'
import baseUrl from "@/config/base-url";

export function downloadCheck(data) {
  // return request({
  //   url: 'http://gw.test.dianzhenkeji.com/news-comment/敏感词模板.xlsx',
  //   method: 'get',
  //   responseType:'blob',
  //   headers: {
  //     'Content-Type': 'application/json;charset=utf-8'
  //   }
  // })
  postAjax(data)
}

function postAjax(data) {
  axios({
      // baseURL: baseUrl || '/',
      method: 'get',
      url: `${baseUrl.BASE_URL}${data.url}`,
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': data.hnrToken,
        'hnrVersion': data.hnrVersion
      }
    })
    .then(res => {
      download('文章打分.xlsx', res.data)
      Message.success('下载成功')
    })
    .catch(error => {
      Message.warning(error.msg ? error.msg : '导出失败')
    })
}
