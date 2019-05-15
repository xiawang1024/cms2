import Layout from '@/views/layout/Layout'
import {
  newcommandPath
} from '../config'
// 组件所在位置
const path = `views/${newcommandPath}/fileClue`
console.log(path)
// TODO:左侧菜单 文件管理
const webSite = {
  path: `/${newcommandPath}/fileClue`,
  component: Layout,
  redirect: '/newCommand/manageClue/discloseList', 
  meta: {
    title: 'filesClue',
    icon: 'filesClue',
    role: 'newsCommand'
  },
  children: [{
    /**
     * 文件管理
     */
    path: '',
    component: () => import(`@/${path}/filesClue`),
    name: 'filesClue',
    meta: {
      title: 'filesClue',
      icon: 'filesClue',
      role: 'newsCommand'
    },
    redirect: '/newCommand/manageClue/discloseList', 
    hidden: true
  }
]
}
export default webSite
