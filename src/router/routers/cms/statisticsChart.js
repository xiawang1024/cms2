import Layout from '@/views/layout/Layout'

import { cmsPath } from '../config'
const path = `views/${cmsPath}/statisticsChart`


// TODO:左侧菜单 网站

const statisticsChart = {
  path: `/${cmsPath}/statisticsChart`,
  component: Layout,
  meta: { title: 'statisticsChart', icon: 'tongji', role: 'cms:mobileCharts' },
  name: 'statisticsChart',
  children: [
   
    {
      /**
       * 移动端统计
       */
      path: 'mobileCharts',
      component: () => import(`@/${path}/mobileCharts`),
      name: 'mobileCharts',
      meta: { title: 'mobileCharts', icon: 'apponly', role: 'cms:mobileCharts' }
    },
    {
        /**
         * PC端统计
         */
        path: 'pcSiteCharts',
        component: () => import(`@/${path}/pcSiteCharts`),
        name: 'pcSiteCharts',
        meta: { title: 'pcSiteCharts', icon: 'pc', role: 'cms:pcSiteCharts', }
      },
      {
        /**
         * 发稿量统计(按频率)
         */
        path: 'ArticleStatisticsByChanel',
        component: () => import(`@/${path}/ArticleStatisticsByChanel`),
        name: 'ArticleStatisticsByChanel',
        meta: { title: 'ArticleStatisticsByChanel', icon: 'pindao', role: 'cms:pcSiteCharts', }
      },
      
      {
        /**
         * 发稿量统计（按作者）
         */
        path: 'ArticleStatisticsByAuthor',
        component: () => import(`@/${path}/ArticleStatisticsByAuthor`),
        name: 'ArticleStatisticsByAuthor',
        meta: { title: 'ArticleStatisticsByAuthor', icon: 'zuozhe', role: 'cms:pcSiteCharts', }
      },
      
      {
        /**
         * 发稿量统计（按租户）
         */
        path: 'ArticleStatisticsByTenantId',
        component: () => import(`@/${path}/ArticleStatisticsByTenantId`),
        name: 'ArticleStatisticsByTenantId',
        meta: { title: 'ArticleStatisticsByTenantId', icon: 'wangzhan', role: 'cms:pcSiteCharts', }
      },
      
   
  ]
}

export default statisticsChart
