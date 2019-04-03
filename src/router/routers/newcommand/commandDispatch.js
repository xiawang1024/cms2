import Layout from '@/views/layout/Layout'

import {
  newcommandPath
} from '../config'
// 组件所在位置
const path = `views/${newcommandPath}/commandDispatch`

console.log(path)
// TODO:左侧菜单 指挥调度
const commandDispatch = {
  path: `/${newcommandPath}/commandDispatch`,
  component: Layout,
  meta: {
    title: 'commandDispatch',
    icon: 'commandDispatch',
  },
  name: 'commandDispatch',
  children: [{
      /**
       * 所有任务
       */
      path: 'allTask',
      component: () => import(`@/${path}/allTask`),
      name: 'allTask',
      meta: {
        title: 'allTask',
        icon: 'allTask',
      }
    },
    {
      /**
       * 我的任务
       */
      path: 'myTask',
      component: () => import(`@/${path}/myTask`),
      name: 'myTask',
      meta: {
        title: 'myTask',
        icon: 'myTask',
      },

    },


  ]
}

export default commandDispatch
