import Layout from '@/views/layout/Layout'

import {
  newcommandPath
} from '../config'
// 组件所在位置
const path = `views/${newcommandPath}/operationRecord`

console.log(path)
// TODO:左侧菜单 操作记录
const webSite = {
  path: `/${newcommandPath}/operationRecord`,
  component: Layout,
  meta: {
    title: 'operationRecord',
    icon: 'webSite',
  },
  name: 'operationRecord',
  children: [{
    /**
     * 操作记录
     */
    path: 'operationsRecord',
    component: () => import(`@/${path}/operationsRecord`),
    name: 'operationsRecord',
    meta: {
      title: 'operationsRecord',
      icon: 'docSource',
    }
  }]
}

export default webSite
