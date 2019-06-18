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
    role: 'cms:systemset'
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
        role: 'cms:siteSet'
      }
    },
    {
      /**
       * 文稿来源
       */
      path: 'docSource',
      component: () => import(`@/${path}/docSource`),
      name: 'DocSource',
      meta: { title: 'docSource', icon: 'docSource', role: 'cms:docSource' }
    },
    {
      /**
       * 文稿来源
       */
      path: 'sourceClass',
      component: () => import(`@/${path}/sourceClass`),
      name: 'SourceClass',
      meta: { title: 'sourceClass', icon: 'docSource', role: 'cms' }
    },
    {
      /**
       * 发布平台设置
       */
      path: 'platformSet',
      component: () => import(`@/${path}/platformSet`),
      name: 'platformSet',
      meta: { title: 'platformSet', icon: 'platformSet', role: 'cms:platformSet' }
    },
    {
      /**
       * 栏目类型设置
       */
      path: 'columnTypeSet',
      component: () => import(`@/${path}/columnTypeSet`),
      name: 'columnTypeSet',
      meta: { title: 'columnTypeSet', icon: 'docSource', role: 'cms:columnTypeSet' }
    },
    {
      /**
       * 模板管理
       */
      path: 'temManager',
      component: () => import(`@/${path}/temManager`),
      name: 'temManager',
      meta: { title: 'temManager', icon: 'temManager', role: 'cms:template' }
    },
    {
      /**
       * 模板添加与修改
       */
      path: 'temEdit',
      component: () => import(`@/${path}/temEdit`),
      name: 'temEdit',
      meta: { title: 'temEdit', icon: 'temEdit', role: 'cms' },
      hidden: true
    },
    {
      /**
       * 资源文件管理
       */
      path: 'sourceManage',
      component: () => import(`@/${path}/sourceManage`),
      name: 'sourceManage',
      meta: { title: 'sourceManage', icon: 'sourceManage', role: 'cms:sourceManage' }
    },
    {
      /**
       * 公用组件管理
       */
      path: 'comComponent',
      component: () => import(`@/${path}/comComponent`),
      name: 'comComponent',
      meta: { title: 'comComponent', icon: 'comComponent', role: 'cms:component' }
    },
    {
      /**
       * 公共组件添加与修改
       */
      path: 'componentEdit',
      component: () => import(`@/${path}/componentEdit`),
      name: 'componentEdit',
      meta: { title: 'componentEdit', icon: 'componentEdit', role: 'cms' },
      hidden: true
    },
    // {
    //   /**
    //    * 帮助文档管理
    //    */
    //   path: 'helpDoc',
    //   component: () => import(`@/${path}/helpDoc`),
    //   name: 'helpDoc',
    //   meta: { title: 'helpDoc', icon: 'helpDoc', role: 'cms:helpDoc' }
    // },
    {
      /**
       * 帮助文档添加与修改
       */
      path: 'helpDocEdit',
      component: () => import(`@/${path}/helpDocEdit`),
      name: 'helpDocEdit',
      meta: { title: 'helpDocEdit', icon: 'helpDocEdit', role: 'cms' },
      hidden: true
    },
    {
      /**
       * 蜜蜂采集
       */
      path: 'collection',
      component: () => import(`@/${path}/form`),
      name: 'collection',
      meta: { title: 'collection', icon: 'bee', role: 'cms:bee' },
    },
    {
      /**
       * 配置组管理
       */
      path: 'KvGroupController',
      component: () => import(`@/${path}/KvGroupController`),
      name: 'KvGroupController',
      meta: { title: 'KvGroupController', icon: 'kvGroup', role: 'cms:KvGroupController' },
      
    },
    {
      /**
       * 配置组管理详情
       */
      path: 'Kvdetail',
      component: () => import(`@/${path}/Kvdetail`),
      name: 'Kvdetail',
      meta: { title: 'Kvdetail', icon: 'kvGroup', role: 'cms' },
      hidden: true
    },
    {
      /**
       * app配置
       */
      path: 'appConfig',
      component: () => import(`@/${path}/appConfig`),
      name: 'appConfig',
      meta: { title: 'appConfig', icon: 'appConfig', role: 'cms' },
      
    },
    {
      /**
       * 导航列表
       */
      path: 'appTabList',
      component: () => import(`@/${path}/appTabList`),
      name: 'appTabList',
      meta: { title: 'appTabList', icon: 'appConfig', role: 'cms' },
      hidden:true
      
    },
    
    {
      /**
       * app顶部列表
       */
      path: 'appTopList',
      component: () => import(`@/${path}/appTopList`),
      name: 'appTopList',
      meta: { title: 'appTopList', icon: 'appConfig', role: 'cms' },
      hidden:true
      
    },
    {
      /**
       * app列表页面
       */
      path: 'appPages',
      component: () => import(`@/${path}/appPages`),
      name: 'appPages',
      meta: { title: 'appPages', icon: 'appConfig', role: 'cms' },
      hidden:true
      
    },
    {
      /**
       * umeng统计报表
       */
      path: 'liveCharts',
      component: () => import(`@/${path}/liveCharts`),
      name: 'liveCharts',
      meta: { title: 'liveCharts', icon: 'appConfig', role: 'cms' },
      // hidden:true
    },
    {
      /**
       * web统计报表
       */
      path: 'webSiteCharts',
      component: () => import(`@/${path}/webSiteCharts`),
      name: 'webSiteCharts',
      meta: { title: 'webSiteCharts', icon: 'appConfig', role: 'cms' },
      // hidden:true
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

export default systemSet
