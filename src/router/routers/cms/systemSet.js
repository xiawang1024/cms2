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
    role: 'ROLE_TEST'
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
        role: 'ROLE_TEST'
      }
    },
    {
      /**
       * 文稿来源
       */
      path: 'docSource',
      component: () => import(`@/${path}/docSource`),
      name: 'DocSource',
      meta: { title: 'docSource', icon: 'docSource', role: 'ROLE_TEST' }
    },
    {
      /**
       * 发布平台设置
       */
      path: 'platformSet',
      component: () => import(`@/${path}/platformSet`),
      name: 'platformSet',
      meta: { title: 'platformSet', icon: 'platformSet', role: 'ROLE_TEST' }
    },
    {
      /**
       * 模板管理
       */
      path: 'temManager',
      component: () => import(`@/${path}/temManager`),
      name: 'temManager',
      meta: { title: 'temManager', icon: 'temManager', role: 'ROLE_TEST' }
    },
    {
      /**
       * 模板添加与修改
       */
      path: 'temEdit',
      component: () => import(`@/${path}/temEdit`),
      name: 'temEdit',
      meta: { title: 'temEdit', icon: 'temEdit', role: 'ROLE_TEST' },
      hidden: true
    },
    {
      /**
       * 资源文件管理
       */
      path: 'sourceManage',
      component: () => import(`@/${path}/sourceManage`),
      name: 'sourceManage',
      meta: { title: 'sourceManage', icon: 'sourceManage', role: 'ROLE_TEST' }
    },
    {
      /**
       * 公用组件管理
       */
      path: 'comComponent',
      component: () => import(`@/${path}/comComponent`),
      name: 'comComponent',
      meta: { title: 'comComponent', icon: 'comComponent', role: 'ROLE_TEST' }
    },
    {
      /**
       * 公共组件添加与修改
       */
      path: 'componentEdit',
      component: () => import(`@/${path}/ComponentEdit`),
      name: 'componentEdit',
      meta: { title: 'componentEdit', icon: 'componentEdit', role: 'ROLE_TEST' },
      hidden: true
    },
    {
      /**
       * 帮助文档管理
       */
      path: 'helpDoc',
      component: () => import(`@/${path}/helpDoc`),
      name: 'helpDoc',
      meta: { title: 'helpDoc', icon: 'helpDoc', role: 'ROLE_TEST' }
    },
    {
      /**
       * 帮助文档添加与修改
       */
      path: 'helpDocEdit',
      component: () => import(`@/${path}/helpDocEdit`),
      name: 'helpDocEdit',
      meta: { title: 'helpDocEdit', icon: 'helpDocEdit', role: 'ROLE_TEST' },
      hidden: true
    }
  ]
}

export default systemSet
