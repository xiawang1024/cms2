import Layout from '@/views/layout/Layout'

import { userPath } from '../config'
const path = `views/${userPath}/role`

console.log(path)

const role = {
  path: `/${userPath}/role`,
  component: Layout,
  meta: { title: 'role', icon: 'webSite', role: 'admin' },
  children: [
    {
      path: '',
      component: () => import(`@/${path}/index`),
      name: 'role',
      meta: { title: 'role', icon: 'webSite', role: 'admin' },
      hidden: true
    }
  ]
}

export default role
