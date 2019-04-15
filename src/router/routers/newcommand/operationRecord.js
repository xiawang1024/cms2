import Layout from '@/views/layout/Layout'
import {
  newcommandPath
} from '../config'
// 组件所在位置
const path = `views/${newcommandPath}/operationRecord`
console.log(path)
// TODO:左侧菜单 操作记录
const operationRecord = {
  path: `/${newcommandPath}/operationRecord`,
  component: Layout,
  meta: {
    title: 'operationsRecord',
    icon: 'docSource',
    role: 'cms'
  },
  children: [{
    /**
     * 操作记录
     */
    path: '',
    // component: () => import(`@/${path}/operationsRecord`),
    name: 'operationRecord',
    meta: {
      title: 'operationsRecord',
      icon: 'docSource',
    },
    redirect: '/newCommand/manageClue/discloseList', 
    hidden:true
  }]
}
export default operationRecord
