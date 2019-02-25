import Layout from '@/views/layout/Layout'

import { userPath } from '../config'
const path = `views/${userPath}/department`

console.log(path)
// TODO:左侧菜单 网站

const department = {
  path: `/${userPath}/department`,
  component: Layout,
  meta: { title: 'department', icon: 'webSite', role: 'admin' },
  children: [
    {
      path: '',
      component: () => import(`@/${path}/index`),
      name: 'department',
      meta: { title: 'department', icon: 'webSite', role: 'admin' },
      hidden: true
    }
  ]
}

export default department