import Layout from '@/views/layout/Layout'
import {
  newcommandPath
} from '@/router/routers/config'
// 组件所在位置
const path = `views/${newcommandPath}/classifyManage`
// TODO:左侧菜单 线索管理
const classifyManage = {
  path: `/${newcommandPath}/classifyManage`,
  component: Layout,
  meta: {
    title: 'classifyManage',
    icon: 'manageClue',
    role: 'newsCommand:baoliao'
  },
  name: 'classifyManage',
  children: [{
      /**
       * 大象新闻列表
       */
      path: 'breakingType',
      component: () => import(`@/${path}/breakingType`),
      name: 'classifyManage',
      meta: {
        title: 'classifyManage',
        icon: 'discloseList',
        role: 'newsCommand:baoliao'
      }
    }
  ]
}
export default classifyManage
  /**
{
   *
   */
 