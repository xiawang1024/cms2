import Layout from '@/views/layout/Layout'

import {
  newcommandPath
} from '../config'
// 组件所在位置
const path = `views/${newcommandPath}/manuscriptClue`

console.log(path)
// TODO:左侧菜单 稿件管理
const manuscriptClue = {
  path: `/${newcommandPath}/manuscriptClue`,
  component: Layout,
  meta: {
    title: 'manuscriptClue',
    icon: 'manuscriptClue',
  },
  name: 'manuscriptClue',
  children: [{
      /**
       * 我的稿件
       */
      path: 'myManuscript',
      component: () => import(`@/${path}/myManuscript`),
      name: 'myManuscript',
      meta: {
        title: 'myManuscript',
        icon: 'myManuscript',
      }
    },
    {
      /**
       * 待审稿件
       */
      path: 'pendingManuscript',
      component: () => import(`@/${path}/pendingManuscript`),
      name: 'pendingManuscript',
      meta: {
        title: 'pendingManuscript',
        icon: 'pendingManuscript',
      },

    },
    {
      /**
       * 公共稿件
       */
      path: 'commonManuscript',
      component: () => import(`@/${path}/commonManuscript`),
      name: 'commonManuscript',
      meta: {
        title: 'commonManuscript',
        icon: 'commonManuscript',
      }
    },

  ]
}

export default manuscriptClue