import request from '@/utils/request'
import baseUrl from '@/config/base-url'
import QS from "qs"
  let cpath=baseUrl['BASE_URL'].split(":");
  let  Cpath=cpath[0].toString()+':'+cpath[1].toString()
  // let  Cpath='http://192.168.25.148'
export function getRuler(data) {
    return request({
      url: Cpath+':19080/content-grab/newslist/getAllRuleById',
      method: 'post',
      data:QS.stringify(data)
    })
}

export function getCloumRule(data) {
    return request({
      url: Cpath+':19080/content-grab/newslist/getAllRuleByClumnId',
      method: 'post',
      data:QS.stringify(data)
    })
}

export function getFullRuleSend(data) {
    return request({
      url: Cpath+':19080/content-grab/newslist/getallrule',
      method: 'get',
      data:QS.stringify(data)
    })
}