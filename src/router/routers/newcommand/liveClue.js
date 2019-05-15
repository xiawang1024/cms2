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
    icon: 'liveClue',
    role: 'newsCommand'
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
        icon: 'liveClue',
        role: 'newsCommand'
      },
      redirect: '/newCommand/manageClue/discloseList', 
    }
  ]
}
export default webSite
