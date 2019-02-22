import Layout from '@/views/layout/Layout'
import { userPath } from '../config'

const path = `views/${userPath}/components`
// TODO:左侧菜单 系统设置
const userDemo = {
  path: `/${userPath}/components`,
  component: Layout,
  redirect: 'noredirect',
  name: 'ComponentDemo',
  meta: {
    title: 'components',
    icon: 'component',
    role: 'admin'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import(`@/${path}/tinymce`),
      name: 'TinymceDemo',
      meta: { title: 'tinymce' }
    },
    {
      path: 'dnd-list',
      component: () => import(`@/${path}/dndList`),
      name: 'DndListDemo',
      meta: { title: 'dndList', role: 'admin' }
    },
    {
      path: 'drag-kanban',
      component: () => import(`@/${path}/dragKanban`),
      name: 'DragKanbanDemo',
      meta: { title: 'dragKanban', role: 'editor' }
    }
  ]
}

export default userDemo
