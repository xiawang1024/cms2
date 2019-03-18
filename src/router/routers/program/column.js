import Layout from '@/views/layout/Layout'
import { programPath } from '../config'
const path = `views/${programPath}/column`
// TODO:左侧菜单 栏目管理
const column = {
    path: `/${programPath}/column`,
    component: Layout,
    redirect: '/column/list',
    name: 'Column',
    meta: {
      title: 'columnAdmin',
      icon: 'excel'
    },
    children: [
      {
        path: 'create',
        component: () => import(`@/${path}/create`),
        name: 'CreateColumn',
        meta: { title: 'createColumn' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import(`@/${path}/list`),
        name: 'ColumnList',
        meta: { title: 'columnList' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import(`@/${path}/edit`),
        name: 'EditColumn',
        meta: { title: 'editColumn', noCache: true },
        hidden: true
      }
    ]
}

export default column
