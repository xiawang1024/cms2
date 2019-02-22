import Layout from '@/views/layout/Layout'
import { cmsPath } from '../config'
const path = `views/${cmsPath}/system-set`
// TODO:左侧菜单 系统设置
const systemSet = {
  path: `/${cmsPath}/systemSet`,
  component: Layout,
  name: 'systemSet',
  meta: {
    title: 'systemSet',
    icon: 'systemSet',
    role: 'admin'
  },
  children: [
    {
      /**
       * 站点设置
       */
      path: 'siteSet',
      component: () => import(`@/${path}/siteSet`),
      name: 'SiteSet',
      meta: {
        title: 'siteSet',
        icon: 'siteSet',
        role: 'admin'
      }
    },
    {
      /**
       * 文稿来源
       */
      path: 'docSource',
      component: () => import(`@/${path}/docSource`),
      name: 'DocSource',
      meta: { title: 'docSource', icon: 'docSource', role: 'admin' }
    },
    {
      /**
       * 发布平台设置
       */
      path: 'platformSet',
      component: () => import(`@/${path}/platformSet`),
      name: 'platformSet',
      meta: { title: 'platformSet', icon: 'platformSet', role: 'admin' }
    },
    {
      /**
       * 模板管理
       */
      path: 'temManager',
      component: () => import(`@/${path}/temManager`),
      name: 'temManager',
      meta: { title: 'temManager', icon: 'temManager', role: 'editor' }
    },
    {
      /**
       * 模板添加与修改
       */
      path: 'temEdit',
      component: () => import(`@/${path}/temEdit`),
      name: 'temEdit',
      meta: { title: 'temEdit', icon: 'temEdit', role: 'editor' },
      hidden: true
    },
    {
      /**
       * 资源文件管理
       */
      path: 'sourceManage',
      component: () => import(`@/${path}/sourceManage`),
      name: 'sourceManage',
      meta: { title: 'sourceManage', icon: 'sourceManage', role: 'editor' }
    },
    {
      /**
       * 公用组件管理
       */
      path: 'comComponent',
      component: () => import(`@/${path}/comComponent`),
      name: 'comComponent',
      meta: { title: 'comComponent', icon: 'comComponent', role: 'editor' }
    },
    {
      /**
       * 公共组件添加与修改
       */
      path: 'componentEdit',
      component: () => import(`@/${path}/ComponentEdit`),
      name: 'componentEdit',
      meta: { title: 'componentEdit', icon: 'componentEdit', role: 'editor' },
      hidden: true
    },
    {
      /**
       * 帮助文档管理
       */
      path: 'helpDoc',
      component: () => import(`@/${path}/helpDoc`),
      name: 'helpDoc',
      meta: { title: 'helpDoc', icon: 'helpDoc', role: 'editor' }
    },
    {
      /**
       * 帮助文档添加与修改
       */
      path: 'helpDocEdit',
      component: () => import(`@/${path}/helpDocEdit`),
      name: 'helpDocEdit',
      meta: { title: 'helpDocEdit', icon: 'helpDocEdit', role: 'editor' },
      hidden: true
    }
  ]
}

export default systemSet
