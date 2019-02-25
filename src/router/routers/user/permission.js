import Layout from '@/views/layout/Layout'

import { userPath } from '../config'
const path = `views/${userPath}/permission`

console.log(path)

const permission = {
  path: `/${userPath}/permission`,
  component: Layout,
  meta: { title: 'permission', icon: 'webSite', permission: 'admin' },
  children: [
    {
      path: '',
      component: () => import(`@/${path}/index`),
      name: 'permission',
      meta: { title: 'permission', icon: 'webSite', permission: 'admin' },
      hidden: true
    }
  ]
}

export default permission
