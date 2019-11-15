import Layout from '@/views/layout/Layout'
import {
  newcommandPath
} from '@/router/routers/config'
// 组件所在位置
const path = `views/${newcommandPath}/dsClue`
console.log(path)
// TODO:左侧菜单 线索管理
const dsClue = {
  path: `/${newcommandPath}/dsClue`,
  component: Layout,
  meta: {
    title: 'dsClueList',
    icon: 'manageClue',
    role: 'newsCommand:dsbaoliao'
  },
  name: 'dsClueList',
  children: [{
      /**
       * 爆料列表
       */
      path: 'discloseList',
      component: () => import(`@/${path}/discloseList`),
      name: 'dsClueList',
      meta: {
        title: 'dsClueList',
        icon: 'discloseList',
        role: 'newsCommand:dsbaoliao'
      }
    },
    {
    path: 'addDisclose',
    component: () => import(`@/${path}/addDisclose`),
    name: 'addDisclose',
    meta: {
      title: 'addDisclose',
      icon: 'addDisclose',
    },
    hidden: true
  },
  {
    path: 'discloseDetails',
    component: () => import(`@/${path}/discloseDetails`),
    name: 'discloseDetails',
    meta: {
      title: 'discloseDetails',
      icon: 'discloseDetails',
    },
    hidden: true
  }
  ]
}
export default dsClue
  /**
{
   *
   */
 