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
  },
  { path: '*', redirect: '/404', hidden: true }
]
export default constantRouterMap
