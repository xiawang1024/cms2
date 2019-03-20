// optimus
// const BASE_URL = 'http://api.optimus.1byongche.com'
let BASE_URL = 'http://172.20.5.4:53010' // 测试地址1
let UP_URL = 'http://172.20.5.4:55030/basefile/upload?fileRefId=jkhjkhjkhj'
let DOWN_URL = 'http://172.20.5.4:55030'
// console.log(process.env, 'process')
if (process.env.NODE_ENV) {
  if (process.env.NODE_ENV == 'development') {
    BASE_URL = 'http://172.20.5.4:53010' // 测试地址
    UP_URL = 'http://172.20.5.4:55030/basefile/upload?fileRefId=jkhjkhjkhj'
    DOWN_URL = 'http://172.20.5.4:55030'
    // BASE_URL = 'http://api.optimus.1byongche.com' // 正式地址
  } else if (process.env.NODE_ENV == 'production') {
    BASE_URL = 'http://api.optimus.1byongche.com' // 正式地址
  } else if (process.env.VUE_APP_ENV == 'development2') {
    BASE_URL = 'http://172.20.5.4:53010' // 开发环境
    UP_URL = 'http://172.20.5.4:55030/basefile/upload?fileRefId=jkhjkhjkhj'
    DOWN_URL = 'http://172.20.5.4:55030'
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