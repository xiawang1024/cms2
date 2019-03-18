import Layout from '@/views/layout/Layout'
import { programPath } from '../config'
const path = `views/${programPath}/channel`
// TODO:左侧菜单 频率管理
const channel = {
    path: `/${programPath}/channel`,
    redirect: '/channel/list',
    component: Layout,
    name: 'Channel',
    meta: {
      title: 'channelAdmin',
      icon: 'excel'
    },
    children: [
      {
        path: 'create',
        component: () => import(`@/${path}/create`),
        name: 'CreateChannel',
        meta: { title: 'createChannel' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import(`@/${path}/list`),
        name: 'ChannelList',
        meta: { title: 'channelList' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import(`@/${path}/edit`),
        name: 'EditChannel',
        meta: { title: 'editChannel', noCache: true },
        hidden: true
      }
    ]
}

export default channel
