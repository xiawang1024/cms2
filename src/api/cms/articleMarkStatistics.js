
import axios from 'axios'
import { Message} from 'element-ui'
import {download} from '@/utils/common'
import baseUrl from "@/config/base-url";
import request from "@/utils/request";

export function downloadCheck(data) {
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
      download(`${data.downText}.xlsx`, res.data)
      Message.success('导出成功')
    })
    .catch(error => {
      Message.warning(error.msg ? error.msg : '导出失败')
    })
}
// let Cpath='http://192.168.8.60:53015';
/**
 *   查询大象稿件打分数据(按来源聚合)(已将非空部门的数据过滤/过滤空数据)(即大象号考核)
 * 
 */
export function getArticleScoreByOrigin(data){
  return request({
    url:`/cms/score/getArticleScoreByOrigin?tenantId=${data.tenantId}&beginPublishTime=${data.beginPublishTime}&endPublishTime=${data.endPublishTime}`,
    method: "get"
  });
} 