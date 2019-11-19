import Layout from '@/views/layout/Layout'
import {
  cmsPath
} from '../config'
const path = `views/${cmsPath}/articleCheck`
// TODO:左侧菜单 人员和权限
const personAndAuthor = {
  path: `/${cmsPath}/article`,
  component: Layout,
  name: 'article',
  meta: {
    title: 'check',
    icon: 'personAndAuthor',
    role: 'cms:articleCheck'
  },
  children: [{
    /**
     * 权限分组
     */
    path: 'articleCheck',
    component: () => import(`@/${path}/articleCheck`),
    name: 'articleCheck',
    meta: {
      title: 'articleCheck',
      icon: 'check',
      role: 'cms:articleCheck'
    }
  }]
}

export default personAndAuthor
