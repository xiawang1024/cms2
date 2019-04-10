import request from '@/utils/request'
// import baseUrl from '@/config/base-url'
import QS from "qs"
  // let cpath=baseUrl['BASE_URL'].split(":");
  // let  Cpath=cpath[0].toString()+':'+cpath[1].toString()
  // let  Cpath='http://172.20.5.4'
  //本地接口
  // let  Cpath='http://192.168.25.148:19080'
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
      url: '/content-grab/newslist/getallrule',
      method: 'get',
      data:QS.stringify(data)
    })
}
//测试接口
export function testRequest(data) {
  return request({
    url: '/content-grab/newslist/getnewslist',
    method: 'post',
    data:QS.stringify(data)
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

