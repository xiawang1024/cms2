import Layout from '@/views/layout/Layout'
import { cmsPath } from '../config'
const path = `views/${cmsPath}/personAndAuthor`
// TODO:左侧菜单 人员和权限
const personAndAuthor = {
  path: `/${cmsPath}/personAndAuthor`,
  component: Layout,
  name: 'personAndAuthor',
  meta: {
    title: 'personAndAuthor',
    icon: 'personAndAuthor',
    role: 'admin'
  },
  children: [
    {
      /**
       * 权限分组
       */
      path: 'permissionGroup',
      component: () => import(`@/${path}/permissionGroup`),
      name: 'permissionGroup',
      meta: { title: 'permissionGroup', icon: 'permissionGroup', role: 'admin' }
    },
    {
      /**
       * 权限分组编辑
       */
      path: 'permissionGroupEdit',
      component: () => import(`@/${path}/permissionGroupEdit`),
      name: 'permissionGroupEdit',
      meta: { title: 'permissionGroupEdit', icon: 'permissionGroupEdit', role: 'admin' },
      hidden: true
    },
    {
      /**
       * 角色设定
       */
      path: 'character',
      component: () => import(`@/${path}/character`),
      name: 'character',
      meta: { title: 'character', icon: 'character' }
    },
    {
      /**
       * 角色编辑
       */
      path: 'characterEdit',
      component: () => import(`@/${path}/characterEdit`),
      name: 'characterEdit',
      meta: { title: 'characterEdit', icon: 'characterEdit' },
      hidden: true
    },
    {
      /**
       * 人员角色管理
       */
      path: 'personRole',
      component: () => import(`@/${path}/personRole`),
      name: 'personRole',
      meta: { title: 'personRole', icon: 'personRole' }
    },
    {
      /**
       * 人员角色分配
       */
      path: 'personRoleDistribute',
      component: () => import(`@/${path}/personRoleDistribute`),
      name: 'personRoleDistribute',
      meta: { title: 'personRoleDistribute', icon: 'personRoleDistribute' },
      hidden: true
    },
    {
      /**
       * 系统功能
       */
      path: 'systemFunc',
      component: () => import(`@/${path}/systemFunc`),
      name: 'systemFunc',
      meta: { title: 'systemFunc', icon: 'systemFunc' }
    }
  ]
}

export default personAndAuthor
