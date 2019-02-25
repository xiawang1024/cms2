import Layout from '@/views/layout/Layout'
import { cmsPath } from '../config'

const path = `views/${cmsPath}/extensions`

// TODO:左侧菜单 扩展功能
const extensions = {
  path: `/{cmsPath}/extensions`,
  component: Layout,
  name: 'extensions',
  meta: {
    title: 'extensions',
    icon: 'extensions',
    role: 'ROLE_TEST'
  },
  children: [
    {
      /**
       * CDN 刷新
       */
      path: 'cdnFresh',
      component: () => import(`@/${path}/cdnFresh`),
      name: 'cdnFresh',
      meta: { title: 'cdnFresh', icon: 'cdnFresh', role: 'ROLE_TEST' }
    },
    {
      /**
       * 扩展字段
       */
      path: 'extendField',
      component: () => import(`@/${path}/extendField`),
      name: 'extendField',
      meta: { title: 'extendField', icon: 'extendField', role: 'ROLE_TEST' }
    },
    {
      /**
       * 综合统计
       */
      path: 'statistics',
      component: () => import(`@/${path}/statistics`),
      name: 'statistics',
      meta: { title: 'statistics', icon: 'statistics' }
    },
    {
      /**
       * 采集源配置
       */
      path: 'acqSource',
      component: () => import(`@/${path}/acqSource`),
      name: 'acqSource',
      meta: { title: 'acqSource', icon: 'acqSource' }
    }
  ]
}

export default extensions
