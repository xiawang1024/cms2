import Layout from '@/views/layout/Layout'

import { cmsPath } from '../config'
const path = `views/${cmsPath}/webSite`


// TODO:左侧菜单 网站

const webSite = {
  path: `/${cmsPath}/website`,
  component: Layout,
  // redirect: `${cmsPath}/website/doc`,
  meta: { title: 'webSite', icon: 'webSite', role: 'cms' },
  name: 'website',
  // role: 'cms:article1133',
  children: [
    /**
       * 发布文章
       */
    // {
    //   path: 'doc',
    //   component: () => import(`@/${path}/index`),
    //   name: 'webSite',
    //   meta: { title: 'webSite', icon: 'webSite', role: 'cms' },
    //   hidden: true
    // },
    {
      /**
       * 发布管理
       */
      path: 'document',
      component: () => import(`@/${path}/publishDocument`),
      name: 'PublishDocument',
      meta: { title: 'publishDocument', icon: 'docSource', role: 'cms:article' }
    },
    {
      /**
       * 栏目管理
       */
      path: 'column',
      component: () => import(`@/${path}/columnManage`),
      name: 'ColumnManage',
      meta: { title: 'columnManage', icon: 'docSource', role: 'cms:channel' }
    },
    {
      /**
       * 栏目添加与修改
       */
      path: 'columnHandel',
      component: () => import(`@/${path}/columnHandel`),
      name: 'columnHandel',
      meta: { title: 'columnHandel', icon: 'temEdit', role: 'cms' },
      hidden: true
    },
    {
      /**
       * 栏目模板
       */
      path: 'columnTemplate',
      component: () => import(`@/${path}/columnTemplate`),
      name: 'ColumnTemplate',
      meta: { title: 'columnTemplate', icon: 'docSource', role: 'cms' },
      hidden: true
    },
    {
      /**
       * 扩展字段
       */
      path: 'extendsWord',
      component: () => import(`@/${path}/extendsWord`),
      name: 'ExtendsWord',
      meta: { title: 'extendsWord', icon: 'temEdit', role: 'cms' },
      hidden: true
    },
    {
      /**
       * 标签设置
       */
      path: 'tagSetting',
      component: () => import(`@/${path}/tagSetting`),
      name: 'TagSetting',
      meta: { title: 'tagSetting', icon: 'docSource', role: 'cms' },
      hidden: true
    },
    {
      /**
       * 水印设置
       */
      path: 'waterSetting',
      component: () => import(`@/${path}/waterSetting`),
      name: 'WaterSetting',
      meta: { title: 'waterSetting', icon: 'temEdit', role: 'cms' },
      hidden: true
    }
  ]
}

export default webSite
