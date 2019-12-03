import Layout from '@/views/layout/Layout'

import {
  userPath
} from '../config'
const path = `views/${userPath}/userInfo`
// TODO:左侧菜单 用户中心
const userInfo = {
  path: `/${userPath}/userInfo`,
  component: Layout,
  meta: {
    title: 'userInfo',
    icon: 'userInfo',
    role: 'userCenter:userInfo'

  },
  children: [{
    path: '',
    component: () => import(`@/${path}/index`),
    name: 'userInfo',
    meta: {
      title: 'userInfo',
      icon: 'userInfo',
      role: 'userCenter:userInfo'
    }
  }]
}

export default userInfo
