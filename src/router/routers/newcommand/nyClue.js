import Layout from '@/views/layout/Layout'
import {
  newcommandPath
} from '@/router/routers/config'
// 组件所在位置
const path = `views/${newcommandPath}/nyClue`
console.log(path)
// TODO:左侧菜单 线索管理
const nyClue = {
  path: `/${newcommandPath}/nyClue`,
  component: Layout,
  meta: {
    title: 'nyClueList',
    icon: 'manageClue',
    role: 'newsCommand:nybaoliao'
  },
  name: 'nyClueList',
  children: [{
      /**
       * 爆料列表
       */
      path: 'discloseList',
      component: () => import(`@/${path}/discloseList`),
      name: 'nyClueList',
      meta: {
        title: 'nyClueList',
        icon: 'discloseList',
        role: 'newsCommand:nybaoliao'
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
export default nyClue
  /**
{
   *
   */
 