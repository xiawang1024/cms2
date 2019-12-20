
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

/**
 *   查询大象稿件打分数据(按来源聚合)(已将非空部门的数据过滤/过滤空数据)(即大象号考核)
 * 
 */
export function getArticleScoreByOrigin(data){
  return request({
    url:`/cms/score/getArticleScoreByOrigin?articleOrigin=${data.articleOrigin}&beginPublishTime=${data.beginPublishTime}&endPublishTime=${data.endPublishTime}`,
    method: "get"
  });
} 

/**
 * 查询大象稿件打分数据明细(已将非空部门的数据过滤/过滤空数据)(即大象号考核)
 * 
 */

export function getArticleScoreDetailByPage(data,selfdata){
  return request({
    url:`/cms/score/getArticleScoreDetailByPage?articleOrigin=${data.articleOrigin}&itemName=${selfdata.itemName}&beginPublishTime=${data.beginPublishTime}&endPublishTime=${data.endPublishTime}&pageNo=${selfdata.pageNo}&pageSize=${selfdata.pageSize}`,
    method: "get"
  });
} 
/**
 * 查询大象(内部)考核打分数据(分页)
 *  
 */

export function getCheckScoreResultByPage(data){
  return request({
    url:`/cms/score/getCheckScoreResultByPage?itemName=${data.itemName}&beginPublishTime=${data.beginPublishTime}&endPublishTime=${data.endPublishTime}&pageNo=${data.pageNo}&pageSize=${data.pageSize}`,
    method:'get'
  })
}