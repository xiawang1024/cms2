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
  redirect: '/newCommand/dsClue/dsClueList', 
  meta: {
    title: 'filesClue',
    icon: 'filesClue',
    role: 'newsCommand:filesClue'
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
      role: 'newsCommand:filesClue'
    },
    redirect: '/newCommand/dsClue/dsClueList', 
    hidden: true
  }
]
}
export default webSite
