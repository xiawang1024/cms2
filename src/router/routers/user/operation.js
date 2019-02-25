import Layout from '@/views/layout/Layout'

import { userPath } from '../config'
const path = `views/${userPath}/operation`

console.log(path)

const operation = {
  path: `/${userPath}/operation`,
  component: Layout,
  meta: { title: 'operation', icon: 'webSite', permission: 'admin' },
  children: [
    {
      path: '',
      component: () => import(`@/${path}/index`),
      name: 'operation',
      meta: { title: 'operation', icon: 'webSite', permission: 'admin' },
      hidden: true
    }
  ]
}

export default operation
