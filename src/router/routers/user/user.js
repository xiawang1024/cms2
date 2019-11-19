import Layout from '@/views/layout/Layout'

import {
  userPath
} from '../config'
const path = `views/${userPath}/user`

console.log(path)

const user = {
  path: `/${userPath}/user`,
  component: Layout,
  meta: {
    title: 'user',
    icon: 'peoples',
    permission: 'admin',
    role: "userCenter:user"
  },
  children: [{
    path: '',
    component: () => import(`@/${path}/index`),
    name: 'user',
    meta: {
      title: 'user',
      icon: 'peoples',
      permission: 'admin',
      role: "userCenter:user"
    },
    hidden: true
  }]
}

export default user
