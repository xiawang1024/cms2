import Layout from '@/views/layout/Layout'
import {
  cmsPath
} from '../config'
const path = `views/${cmsPath}/check`
// TODO:左侧菜单 人员和权限
const personAndAuthor = {
  path: `/${cmsPath}/check`,
  component: Layout,
  name: 'check',
  meta: {
    title: 'check',
    icon: 'personAndAuthor',
    role: 'cms:checkSetting'
  },
  children: [{
      /**
       * 权限分组
       */
      path: 'checkSetting',
      component: () => import(`@/${path}/checkSetting`),
      name: 'checkSetting',
      meta: {
        title: 'checkSetting',
        icon: 'permissionGroup',
        role: 'cms:checkSetting'
      }
    },
    // {
    //   /**
    //    * 权限分组编辑
    //    */
    //   path: 'permissionGroupEdit',
    //   component: () => import(`@/${path}/permissionGroupEdit`),
    //   name: 'permissionGroupEdit',
    //   meta: { title: 'permissionGroupEdit', icon: 'permissionGroupEdit', role: 'cms' },
    //   hidden: true
    // },
    // {
    //   /**
    //    * 角色设定
    //    */
    //   path: 'character',
    //   component: () => import(`@/${path}/character`),
    //   name: 'character',
    //   meta: { title: 'character', icon: 'character', role: 'cms' }
    // },
    // {
    //   /**
    //    * 角色编辑
    //    */
    //   path: 'characterEdit',
    //   component: () => import(`@/${path}/characterEdit`),
    //   name: 'characterEdit',
    //   meta: { title: 'characterEdit', icon: 'characterEdit', role: 'cms' },
    //   hidden: true
    // },
    // {
    //   /**
    //    * 人员角色管理
    //    */
    //   path: 'personRole',
    //   component: () => import(`@/${path}/personRole`),
    //   name: 'personRole',
    //   meta: { title: 'personRole', icon: 'personRole', role: 'cms' }
    // },
    // {
    //   /**
    //    * 人员角色分配
    //    */
    //   path: 'personRoleDistribute',
    //   component: () => import(`@/${path}/personRoleDistribute`),
    //   name: 'personRoleDistribute',
    //   meta: { title: 'personRoleDistribute', icon: 'personRoleDistribute', role: 'cms' },
    //   hidden: true
    // },
    // {
    //   /**
    //    * 系统功能
    //    */
    //   path: 'systemFunc',
    //   component: () => import(`@/${path}/systemFunc`),
    //   name: 'systemFunc',
    //   meta: { title: 'systemFunc', icon: 'systemFunc', role: 'cms' }
    // }
  ]
}

export default personAndAuthor
