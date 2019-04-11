/* Layout */
import Layout from '@/views/layout/Layout'

const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/public/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/public/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/public/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/public/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/public/errorPage/401'),
    hidden: true
  },
  {
    path: '/userSetting',
    component: Layout,
    name: 'userSetting',
    hidden: true,
    children: [
      {
        path: '/userSetting/userCenter',
        name: 'userCenter',
        component: () => import('@/views/public/userCenter'),
        meta: { title: 'userCenter', icon: 'permissionGroup', role: '' }
      }
    ]
  },
  // {
  //   path: '',
  //   redirect: 'cms/systemSet/siteSet',
  // },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/public/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
]
export default constantRouterMap
