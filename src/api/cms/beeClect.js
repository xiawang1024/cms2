import request from '@/utils/request'
import QS from "qs"
export function getRuler(data) {
    return request({
      url: '/content-grab/newslist/getAllRuleById',
      method: 'post',
      data:QS.stringify(data)
    })
}

export function getCloumRule(data) {
    return request({
      url: '/content-grab/newslist/getAllRuleByClumnId',
      method: 'post',
      data:QS.stringify(data)
    })
}

export function getFullRuleSend(data) {
    return request({
      url: '/content-grab/newslist/getallrule?clientLicenseId='+data,
      method: 'get',
    })
}
//测试接口
export function testRequest(data) {
  return request({
    url: '/content-grab/newslist/getnewslist',
    method: 'post',
    data:QS.stringify(data),
    timeout: 20000

  })
}
//保存接口
export function saveRequest(data) {
  return request({
    url: '/content-grab/newslist/saverule',
    method: 'post',
    data:QS.stringify(data)
  })
}

//根据id获取全部规则信息接口
export function getRuleById(id) {
  return request({
    url: '/content-grab/newslist/getAllRuleById?ruleid='+id,
    method: 'post'
  })
}
//微信测试接口
export function wxTestRequest(id) {
  return request({
    url: '/content-grab/wechatarticle/testwechat?number='+id,
    method: 'post',
    
  })
}

//微信保存
export function wxSaveRequest(number,name) {
  return request({
    url: '/content-grab/wechatarticle/saveWechatRule?number='+number+"&name="+name,
    method: 'post',
    
  })
}

//开启爬虫
export function startBee() {
  return request({
    url:'/content-grab/newslist/contentGrabSaveCache',
    method: 'get',
    timeout: 20000
  })
}


//清理库存
export function clearStore() {
  return request({
    url:'/content-grab/newslist/delte',
    method: 'get',
    timeout: 20000
  })
}

//上传文档
export function  saveCms() {
  return request({
    url:'/content-grab/newslist/SaveCms',
    method: 'get',
    timeout: 20000
  })
}