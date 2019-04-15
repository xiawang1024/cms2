import Layout from '@/views/layout/Layout'

import {
  newcommandPath
} from '@/router/routers/config'
// 组件所在位置
const path = `views/${newcommandPath}/manageClue`

console.log(path)
// TODO:左侧菜单 线索管理
const manageClue = {
  path: `/${newcommandPath}/manageClue`,
  component: Layout,
  meta: {
    title: 'manageClue',
    icon: 'manageClue',
    role: 'cms'
  },
  name: 'manageClue',
  children: [{
      /**
       * 爆料列表
       */
      path: 'discloseList',
      component: () => import(`@/${path}/discloseList`),
      name: 'discloseList',
      meta: {
        title: 'discloseList',
        icon: 'discloseList',
        role: 'cms'
      }
    },
    {
    path: 'addDisclose',
    component: () => import(`@/${path}/addDisclose`),
    name: 'addDisclose',
    meta: {
      title: 'addDisclose',
      icon: 'addDisclose',
    role: 'cms'
     
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
    role: 'cms'
     
    },
    hidden: true
  
  }

  ]
}

export default manageClue
  /**
{
   *
   */
 