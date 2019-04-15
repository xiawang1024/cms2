// optimus
let BASE_URL = ' http://gw.test.dianzhenkeji.com' // 测试地址
let UP_URL = 'http://fupload.test.dianzhenkeji.com:55030/basefile/upload?fileRefId='
let DOWN_URL = 'http://cmsres.test.dianzhenkeji.com'
// console.log(process.env, 'process')
if (process.env.NODE_ENV) {
  if (process.env.NODE_ENV == 'development') {
    BASE_URL = ' http://gw.test.dianzhenkeji.com' // 测试地址
    UP_URL = 'http://fupload.test.dianzhenkeji.com:55030/basefile/upload?fileRefId='
    DOWN_URL = 'http://cmsres.test.dianzhenkeji.com'
  } else if (process.env.NODE_ENV == 'production') {
    BASE_URL = 'http://gw.dianzhenkeji.com' // 正式地址
    UP_URL = 'http://fupload.dianzhenkeji.com:55030/basefile/upload?fileRefId='
    DOWN_URL = 'http://cmsres.dianzhenkeji.com'
  } else if (process.env.NODE_ENV == 'sit') {
    BASE_URL = 'http://gw.c1.dxhmt.cn' // 白沙地址
    UP_URL = 'http://fupload.c1.dxhmt.cn:55030/basefile/upload?fileRefId='
    DOWN_URL = 'http://cmsres.c1.dxhmt.cn'
  }
}

// export  UP_URL

// 文件上传地址
// export const UP_URL = 'http://172.20.5.4:55030/basefile/upload?fileRefId=jkhjkhjkhj'
// // 图片下载地址
// export const DOWN_URL = 'http://172.20.5.4:55030'

// 第二基准路径
export const serviceUser = '/service-user/' // 用户
export const serviceCarStation = '/service-car-station/' // 网点
export const serviceCar = '/service-car/cars/' // 车辆

export const optimusCars = '/optimus/cars/' // 导入导出
export const serviceCommon = '/service-common/common/' // 运营城市

// BASE_URL = 'http://phpmroservice.net' // 正式地址
// export const servicePhp = '/' // php微服务
export const servicePhp = '/service-php/' // php微服务
// 充电桩
export const serviceCharging = '/service-charging/'

// export default BASE_URL
export default {
  BASE_URL,
  UP_URL,
  DOWN_URL
}