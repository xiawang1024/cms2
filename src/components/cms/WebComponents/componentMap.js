export const ComponentMap = [
  {
    /**
     * 文档列表
     */
    type: '0',
    docList: () => import('./components/docs/index')
  },
  {
    /**
     * 新建文档
     */
    type: '1',
    CreateArticle: () => import('./components/createDoc/index')
  },
  {
    /**
     * 增量发布
     */
    type: '2',
    IncrementalRelease: () => import('./components/incrementalRelease/index')
  },
  {
    /**
     * 发布栏目首页
     */
    type: '3',
    ReleaseColumn: () => import('./components/releaseColumn/index')
  },
  {
    /**
     * 修改栏目
     */
    type: '4',
    AlterColumn: () => import('./components/column/columnEdit')
  },
  {
    /**
     * 新建子栏目
     */
    type: '5',
    CreateColumn: () => import('./components/column/columnEdit')
  },
  {
    /**
     * 批量发布
     */
    type: '6',
    ArticleList: () => import('./components/List/list.vue')
  },
  {
    /**
     * 栏目模板
     */
    type: '7',
    ColumnTemp: () => import('./components/List/list.vue')
  },
  {
    /**
     * 扩展字段
     */
    type: '8',
    ExtendsField: () => import('./components/List/list.vue')
  },
  {
    /**
     * 标记设置
     */
    type: '9',
    SignSetting: () => import('./components/List/list.vue')
  },
  {
    /**
     * 图片水印
     */
    type: '10',
    ImageWatermarking: () => import('./components/imageWatermarking/index')
  },
  {
    /**
     * 图片组
     */
    type: '11',
    ImageGroup: () => import('./components/imageGroup/index')
  },
  {
    /**
     * 自定义文档列表
     */
    type: '12',
    CustomDocList: () => import('./components/customDocList/index')
  },
  {
    /**
     * 静态网页片段
     */
    type: '13',
    StaticWebFragment: () => import('./components/staticWebFragment/index')
  },
  {
    /**
     * 废件箱
     */
    type: '14',
    RecycleBin: () => import('./components/recycleBin/index')
  },
  {
    /**
     * 栏目模板
     */
    type: '15',
    ColumnModel: () => import('./components/columnModel/index')
  },
  {
    /**
     * 评论管理
     */
    type: '16',
    ColumnManage: () => import('./components/commentManage/index')
  },
  {
    /**
     * 浏览统计
     */
    type: '17',
    ViewSum: () => import('./components/viewSum/index')
  }
]

export const Components = filterComponent(ComponentMap)

function filterComponent(list) {
  const temp = {}
  list.forEach((item) => {
    const key = Object.keys(item)[1]
    temp[key] = item[key]
  })
  return temp
}
