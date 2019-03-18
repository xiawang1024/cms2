import Layout from '@/views/layout/Layout'
import { programPath } from '../config'
const path = `views/${programPath}/program`
// TODO:左侧菜单 节目排单管理
const channel = {
    path: `/${programPath}/program`,
    component: Layout,
    redirect: '/program/list',
    name: 'Program',
    meta: {
      title: 'programAdmin',
      icon: 'excel'
    },
    children: [
      {
        path: 'create',
        component: () => import(`@/${path}/create`),
        name: 'CreateProgram',
        meta: { title: 'createProgram' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import(`@/${path}/list`),
        name: 'ProgramList',
        meta: { title: 'programList' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import(`@/${path}/edit`),
        name: 'EditProgram',
        meta: { title: 'editProgram', noCache: true },
        hidden: true
      }
    ]
}

export default channel
