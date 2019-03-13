import Layout from '@/views/layout/Layout'

import { userPath } from '../config'
const path = `views/${userPath}/organization`

console.log(path)

const organization = {
  path: `/${userPath}/organization`,
  component: Layout,
  meta: { title: 'organization', icon: 'webSite', role: 'platform:tenant' },
  children: [
    {
      path: '',
      component: () => import(`@/${path}/index`),
      name: 'organization',
      meta: { title: 'organization', icon: 'webSite', role: 'platform:tenant' },
      hidden: true
    }
  ]
}

export default organization
