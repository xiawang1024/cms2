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
  meta: {
    title: 'fileClue',
    icon: 'filesClue',
  },
  name: 'fileClue',
  children: [{
    /**
     * 文件管理
     */
    path: 'filesClue',
    component: () => import(`@/${path}/filesClue`),
    name: 'filesClue',
    meta: {
      title: 'filesClue',
      icon: 'filesClue',
    }
  }
]
}

export default webSite
