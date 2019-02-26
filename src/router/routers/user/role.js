import Layout from '@/views/layout/Layout'

import { userPath } from '../config'
const path = `views/${userPath}/role`

console.log(path)

const role = {
  path: `/${userPath}/role`,
  component: Layout,
  meta: { title: 'role', icon: 'webSite', permission: 'admin' },
  children: [
    {
      path: '',
      component: () => import(`@/${path}/index`),
      name: 'role',
      meta: { title: 'role', icon: 'webSite', permission: 'admin' },
      hidden: true
    }
  ]
}

export default role
