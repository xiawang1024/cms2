import Layout from '@/views/layout/Layout'

import { cmsPath } from '../config'
const path = `views/${cmsPath}/webSite`

console.log(path)
// TODO:左侧菜单 网站

const webSite = {
  path: `/${cmsPath}/website`,
  component: Layout,
  redirect: `${cmsPath}/website/doc`,
  meta: { title: 'webSite', icon: 'webSite', role: 'ROLE_TEST' },
  children: [
    {
      path: 'doc',
      component: () => import(`@/${path}/index`),
      name: 'webSite',
      meta: { title: 'webSite', icon: 'webSite', role: 'ROLE_TEST' },
      hidden: true
    }
  ]
}

export default webSite
