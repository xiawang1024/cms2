import Layout from '@/views/layout/Layout'
import { cmsPath } from '../config'
const path = `views/${cmsPath}/pushMessage`
// TODO:左侧菜单 人员和权限
const pushMessage = {
  path: `/${cmsPath}/pushMessage`,
  component: Layout,
  name: 'pushMessage',
  meta: {
    title: 'pushMessage',
    icon: 'character',
    role: 'cms'
  },
  children: [
    {
      /**
       * 权限分组
       */
      path: 'pMessage',
      component: () => import(`@/${path}/index`),
      name: 'permissionGroup',
      meta: { title: 'pushMessage', icon: 'message', role: 'cms' }
    }
  ]
}

export default pushMessage
