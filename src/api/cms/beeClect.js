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
export function getRuleById(data) {
  return request({
    url: '/content-grab/newslist/saverule',
    method: 'post',
    data:QS.stringify(data)
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

export function currentuser(data) {
  return request({
    url:'/userb/user/currentuser',
    method: 'get',
    data
  })
}

