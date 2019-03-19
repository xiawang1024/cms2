import Layout from '@/views/layout/Layout'
import { programPath } from '../config'
const path = `views/${programPath}/class`
// TODO:左侧菜单 分类管理
const class1 = {
    path: `/${programPath}/class`,
    component: Layout,
    redirect: '/class/list',
    name: 'Class',
    meta: {
      title: 'classAdmin',
      icon: 'nested',
      role: 'program:class'
    },
    children: [
      {
        path: 'create',
        component: () => import(`@/${path}/create`),
        name: 'CreateClass',
        meta: { title: 'createClass', role: 'program:class:create' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import(`@/${path}/list`),
        name: 'ClassList',
        meta: { title: 'classList', role: 'program:class:list' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import(`@/${path}/edit`),
        name: 'EditClass',
        meta: { title: 'editClass', noCache: true, role: 'program:class:edit' },
        hidden: true
      }
    ]
}

export default class1
