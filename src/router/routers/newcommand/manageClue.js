import Layout from '@/views/layout/Layout'

import {
  newcommandPath
} from '../config'
// 组件所在位置
const path = `views/${newcommandPath}/manageClue`

console.log(path)
// TODO:左侧菜单 线索管理
const manageClue = {
  path: `/${newcommandPath}/manageclue`,
  component: Layout,
  meta: {
    title: 'manageClue',
    icon: 'webSite',
  },
  name: 'manageclue',
  children: [{
      /**
       * 爆料列表
       */
      path: 'discloselist',
      component: () => import(`@/${path}/discloseList`),
      name: 'discloseList',
      meta: {
        title: 'discloseList',
        icon: 'docSource',
      }
    },
    {
      /**
       * 添加爆料
       */
      path: 'addDisclose',
      component: () => import(`@/${path}/addDisclose`),
      name: 'addDisclose',
      meta: {
        title: 'addDisclose',
        icon: 'docSource',
      },

    },
    {
      /**
       * 热点新闻
       */
      path: 'hotNews',
      component: () => import(`@/${path}/hotNews`),
      name: 'hotNews',
      meta: {
        title: 'hotNews',
        icon: 'docSource',
      }
    }

  ]
}

export default manageClue
