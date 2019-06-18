import Layout from '@/views/layout/Layout'

import { userPath } from '../config'
const path = `views/${userPath}/permissiongroup`

console.log(path)

const permissiongroup = {
  path: `/${userPath}/permissiongroup`,
  component: Layout,
  meta: { title: 'permissiongroup', icon: 'personAndAuthor', permission: 'admin' },
  children: [
    {
      path: '',
      component: () => import(`@/${path}/index`),
      name: 'permissiongroup',
      meta: { title: 'permissiongroup', icon: 'personAndAuthor', permission: 'admin' },
      hidden: true
    }
  ]
}

export default permissiongroup
