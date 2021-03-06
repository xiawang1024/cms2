import Layout from '@/views/layout/Layout'

import { cmsPath } from '../config'
const path = `views/${cmsPath}/comment-moderation`


// TODO:左侧菜单 网站

const commentModeration = {
  path: `/${cmsPath}/comment-moderation`,
  component: Layout,
  meta: { title: 'commentModeration', icon: 'docSource', role: 'cms:newsComment' },
  name: 'commentModeration',
  children: [
   
    {
      /**
       * 评论审核
       */
      path: 'checkComment',
      component: () => import(`@/${path}/checkComment`),
      name: 'checkComment',
      meta: { title: 'checkComment', icon: 'docSource', role: 'cms:checkComment' }
    },
    {
      /**
       * 分配审核栏目权限
       */
      path: 'assignAuditAuthority',
      component: () => import(`@/${path}/assignAuditAuthority`),
      name: 'assignAuditAuthority',
      meta: { title: 'assignAuditAuthority', icon: 'docSource', role: 'cms:assignmentRight', }
    },
    {
      /**
       *  敏感词过滤
       */
      path: 'sensitiveWord',
      component: () => import(`@/${path}/sensitiveWord`),
      name: 'sensitiveWord',
      meta: { title: 'sensitiveWord', icon: 'sensitive', role: 'cms:sensitiveWord', }
    },
    {
      /**
       *  扩展对象
       */
      path: 'userExtend',
      component: () => import(`@/${path}/userSwitch`),
      name: 'userSwitch',
      meta: { title: 'userExtend', icon: 'extend', role: 'cms:commentCheckSet', }
    }
  ]
}

export default commentModeration
