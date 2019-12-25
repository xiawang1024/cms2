import Layout from '@/views/layout/Layout'
import {
  newcommandPath
} from '@/router/routers/config'
// 组件所在位置
const path = `views/${newcommandPath}/dxClue`
// TODO:左侧菜单 线索管理
const dxClue = {
  path: `/${newcommandPath}/dxClue`,
  component: Layout,
  meta: {
    title: 'dxClue',
    icon: 'manageClue',
    role: 'newsCommand:baoliao'
  },
  name: 'dxClue',
  children: [{
      /**
       * 大象新闻列表
       */
      path: 'discloseList',
      component: () => import(`@/${path}/discloseList`),
      name: 'dxClueList',
      meta: {
        title: 'dxClueList',
        icon: 'discloseList',
        role: 'newsCommand:baoliao'
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
export default dxClue
  /**
{
   *
   */
 