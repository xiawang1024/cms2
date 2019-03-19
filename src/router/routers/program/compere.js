import Layout from '@/views/layout/Layout'
import { programPath } from '../config'
const path = `views/${programPath}/compere`
// TODO:左侧菜单 主播管理
const compere = {
    path: `/${programPath}/compere`,
    component: Layout,
    redirect: '/compere/list',
    name: 'Compere',
    meta: {
      title: 'compereAdmin',
      icon: 'peoples',
      role: 'program:compere'
    },
    children: [
      {
        path: 'create',
        component: () => import(`@/${path}/create`),
        name: 'CreateCompere',
        meta: { title: 'createCompere', role: 'program:compere:create' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import(`@/${path}/list`),
        name: 'CompereList',
        meta: { title: 'compereList', role: 'program:compere:list' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import(`@/${path}/edit`),
        name: 'EditCompere',
        meta: { title: 'editCompere', noCache: true, role: 'program:compere:edit' },
        hidden: true
      }
    ]
}

export default compere
