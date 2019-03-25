import Layout from '@/views/layout/Layout'

import { userPath } from '../config'
const path = `views/${userPath}/permission`


const permission = {
  path: `/${userPath}/permission`,
  component: Layout,
  meta: { title: 'permission', icon: 'webSite', role: 'platform:permission' },
  children: [
    {
      path: '',
      component: () => import(`@/${path}/index`),
      name: 'permission',
      meta: { title: 'permission', icon: 'webSite', role: 'platform:permission' },
      hidden: true
    }
  ]
}

export default permission
