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
    role: 'cms'
  },
  name: 'commandDispatch',
  children: [{
      /**
       * 所有任务
       */
      path: 'allTask',
      component: () => import(`@/${path}/allTask`),
      name: 'allTask',
      redirect: '/newCommand/manageClue/discloseList', 
      meta: {
        title: 'allTask',
        icon: 'allTask',
    role: 'cms'
      }
    },
    {
      /**
       * 我的任务
       */
      path: 'myTask',
      component: () => import(`@/${path}/myTask`),
      name: 'myTask',
      redirect: '/newCommand/manageClue/discloseList', 
      meta: {
        title: 'myTask',
        icon: 'myTask',
    role: 'cms'
      },
    },
  ]
}
export default commandDispatch
