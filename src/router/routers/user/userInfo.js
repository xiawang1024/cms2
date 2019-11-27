import Layout from '@/views/layout/Layout'

import {
  userPath
} from '../config'
const path = `views/${userPath}/userInfo`
// TODO:左侧菜单 网站
const userInfo = {
  path: `/${userPath}/userInfo`,
  component: Layout,
  meta: {
    title: 'userInfo',
    icon: 'userInfo',
    role: 'userCenter'
    // role: 'userCenter:userInfo'

  },
  children: [{
    path: '',
    component: () => import(`@/${path}/index`),
    name: 'userInfo',
    meta: {
      title: 'userInfo',
      icon: 'userInfo',
      role: 'userCenter'
    }
  }]
}

export default userInfo
