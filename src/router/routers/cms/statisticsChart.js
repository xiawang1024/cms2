import Layout from '@/views/layout/Layout'

import { cmsPath } from '../config'
const path = `views/${cmsPath}/statisticsChart`


// TODO:左侧菜单 网站

const statisticsChart = {
  path: `/${cmsPath}/statisticsChart`,
  component: Layout,
  meta: { title: 'statisticsChart', icon: 'message_unread', role: 'cms' },
  name: 'statisticsChart',
  children: [
   
    {
      /**
       * 移动端统计
       */
      path: 'mobileCharts',
      component: () => import(`@/${path}/mobileCharts`),
      name: 'mobileCharts',
      meta: { title: 'mobileCharts', icon: 'docSource', role: 'cms' }
    },
    {
        /**
         * PC端统计
         */
        path: 'pcSiteCharts',
        component: () => import(`@/${path}/pcSiteCharts`),
        name: 'pcSiteCharts',
        meta: { title: 'pcSiteCharts', icon: 'docSource', role: 'cms', }
      },
      
    {
        /**
         * 统计报表首页
         */
        path: 'indexchart',
        component: () => import(`@/${path}/indexchart`),
        name: 'indexchart',
        meta: { title: 'indexchart', icon: 'appConfig', role: 'cms' },
        hidden:true
      },
   
  ]
}

export default statisticsChart
