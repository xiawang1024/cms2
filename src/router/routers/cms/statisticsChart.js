import Layout from '@/views/layout/Layout'

import {
  cmsPath
} from '../config'
const path = `views/${cmsPath}/statisticsChart`


// TODO:左侧菜单 网站

const statisticsChart = {
  path: `/${cmsPath}/statisticsChart`,
  component: Layout,
  meta: {
    title: 'statisticsChart',
    icon: 'tongji',
    role: 'cms:statisticCharts'
  },
  name: 'statisticsChart',
  children: [

    {
      /**
       * 移动端统计
       */
      path: 'mobileCharts',
      component: () => import(`@/${path}/mobileCharts`),
      name: 'mobileCharts',
      meta: {
        title: 'mobileCharts',
        icon: 'apponly',
        role: 'cms:mobileCharts'
      }
    },
    {
      /**
       * PC端统计
       */
      path: 'pcSiteCharts',
      component: () => import(`@/${path}/pcSiteCharts`),
      name: 'pcSiteCharts',
      meta: {
        title: 'pcSiteCharts',
        icon: 'pc',
        role: 'cms:pcSiteCharts',
      }
    },
    {
      /**
       * 发稿量统计(按频率)
       */
      path: 'ArticleStatisticsByChanel',
      component: () => import(`@/${path}/ArticleStatisticsByChanel`),
      name: 'ArticleStatisticsByChanel',
      meta: {
        title: 'ArticleStatisticsByChanel',
        icon: 'pindao',
        role: 'cms:articleBychanel',
      }
    },

    {
      /**
       * 发稿量统计（按作者）
       */
      path: 'ArticleStatisticsByAuthor',
      component: () => import(`@/${path}/ArticleStatisticsByAuthor`),
      name: 'ArticleStatisticsByAuthor',
      meta: {
        title: 'ArticleStatisticsByAuthor',
        icon: 'zuozhe',
        role: 'cms:articleByAuthor',
      }
    },

    {
      /**
       * 发稿量统计（按租户）
       */
      path: 'ArticleStatisticsByTenantId',
      component: () => import(`@/${path}/ArticleStatisticsByTenantId`),
      name: 'ArticleStatisticsByTenantId',
      meta: {
        title: 'ArticleStatisticsByTenantId',
        icon: 'wangzhan',
        role: 'cms:articleByTenantId',
      }
    },
    {
      /**
       * 租户下文章点击量统计（按租户）
       */
      path: 'ArticleClickStaticByTenantId',
      component: () => import(`@/${path}/ArticleClickStaticByTenantId`),
      name: 'ArticleClickStaticByTenantId',
      meta: {
        title: 'ArticleClickStaticByTenantId',
        icon: 'commonManuscript',
        role: 'cms:articleClickByTenantId',
      }
    },
    {
      /**
       * 记者文章点击量统计（按时间）
       */
      path: 'writerStaticDetail',
      component: () => import(`@/${path}/writerStaticDetail`),
      name: 'writerStaticDetail',
      meta: {
        title: 'writerStaticDetail',
        icon: 'commonManuscript',
        role: 'cms:articleClickByAuthor'
      },
      hidden: true
    },
    {
      /**
       * 大象发稿统计
       */
      path: 'dxDocument',
      component: () => import(`@/${path}/dxDocument`),
      name: 'dxDocument',
      meta: {
        title: 'dxDocument',
        icon: '32-elephant',
        role: 'cms:dxDocumentStatistics'
      }

    },
    {
      /**
       * 部门统计
       */
      path: 'departmentStatistics',
      component: () => import(`@/${path}/departmentStatistics`),
      name: 'departmentStatistics',
      meta: {
        title: 'departmentStatistics',
        icon: 'department',
        role: 'cms:departmentStatistics'
      }

    }, {
      /**
       * 大象个人统计
       */
      path: 'dxCreateUser',
      component: () => import(`@/${path}/dxCreateUser`),
      name: 'dxCreateUser',
      meta: {
        title: 'dxCreateUser',
        icon: 'zuozhe',
        role: 'cms:dxCreateUser'
      }

    },
    {
      /**
       * 文章打分统计
       */
      path: 'articleMark',
      component: () => import(`@/${path}/articleMark`),
      name: 'articleMark',
      meta: {
        title: 'articleMark',
        icon: 'clipboard',
        role: 'cms:dxnewsScoreDownload'
      }

    },
    {
      /**
       * 大象内部编辑考核
       */
      path: 'dxCreateUserCheck',
      component: () => import(`@/${path}/dxCreateUserCheck`),
      name: 'dxCreateUserCheck',
      meta: {
        title: 'dxCreateUserCheck',
        icon: 'dxCheck',
        role: 'cms:dxCreateUserCheck'
      },
      hidden: true
    },


  ]
}

export default statisticsChart
