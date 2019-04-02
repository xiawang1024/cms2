import Layout from '@/views/layout/Layout'

import {
  newcommandPath
} from '../config'
// 组件所在位置
const path = `views/${newcommandPath}/liveClue`

console.log(path)
// TODO:左侧菜单 线索管理
const webSite = {
  path: `/${newcommandPath}/liveClue`,
  component: Layout,
  meta: {
    title: 'liveClue',
    icon: 'webSite',
  },
  name: 'liveClue',
  children: [{
      /**
       * 直播列表
       */
      path: 'liveList',
      component: () => import(`@/${path}/liveList`),
      name: 'liveList',
      meta: {
        title: 'liveList',
        icon: 'docSource',
      }
    },
    {
      /**
       * 通话列表
       */
      path: 'connectionList',
      component: () => import(`@/${path}/connectionList`),
      name: 'connectionList',
      meta: {
        title: 'connectionList',
        icon: 'docSource',
      },

    },


  ]
}

export default webSite
