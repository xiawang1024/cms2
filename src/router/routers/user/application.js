import Layout from '@/views/layout/Layout'

import { userPath } from '../config'
const path = `views/${userPath}/application`

console.log(path)

const application = {
  path: `/${userPath}/application`,
  component: Layout,
  meta: { title: 'application', icon: 'webSite', permission: 'admin' },
  children: [
    {
      path: '',
      component: () => import(`@/${path}/index`),
      name: 'application',
      meta: { title: 'application', icon: 'webSite', permission: 'admin' },
      hidden: true
    }
  ]
}

export default application
