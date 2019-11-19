import Layout from '@/views/layout/Layout'

import {
  userPath
} from '../config'
const path = `views/${userPath}/department`

console.log(path)
// TODO:左侧菜单 网站

const department = {
  path: `/${userPath}/department`,
  component: Layout,
  meta: {
    title: 'department',
    icon: 'guide',
    permission: 'admin',
    role: 'userCenter:department'
  },
  children: [{
    path: '',
    component: () => import(`@/${path}/index`),
    name: 'department',
    meta: {
      title: 'department',
      icon: 'guide',
      permission: 'admin',
      role: 'userCenter:department'
    },
    hidden: true
  }]
}

export default department
