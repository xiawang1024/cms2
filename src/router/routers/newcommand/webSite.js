import Layout from '@/views/layout/Layout'

import {
  newcommandPath
} from '../config'
// 组件所在位置
const path = `views/${newcommandPath}/manageClue`

console.log(path)
// TODO:左侧菜单 线索管理

const webSite = {
  path: `/${newcommandPath}/manageclue`,
  component: Layout,
  // redirect: `${cmsPath}/website/doc`,
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
    },
    {
      /**
       * 栏目模板
       */
      path: 'columnTemplate',
      component: () => import(`@/${path}/columnTemplate`),
      name: 'ColumnTemplate',
      meta: {
        title: 'columnTemplate',
        icon: 'docSource',
      },
      hidden: true
    }

  ]
}

export default webSite
