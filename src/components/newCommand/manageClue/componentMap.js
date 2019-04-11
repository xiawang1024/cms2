export const ComponentMap = [
  {
    /**
     * 爆料列表
     */
    type: '0',
    discloseList: () => import('./components/discloseList/index')
  },
  {
    /**
     * 新增爆料
     */
    type: '1',
    addDisclose: () => import('./components/addDisclose/index')
  },
  {
    /**
     * 爆料修改
     */
    type: '2',
    editDisclose: () => import('./components/editDisclose/index')
  },
  {
    /**
     * 爆料详情
     */
    type: '3',
    columnDetails: () => import('./components/columnDetails/index')
  }
]

export const Components = filterComponent(ComponentMap)
// liyu
// Components 是所有定义的组件

function filterComponent(list) {
  const temp = {}
  list.forEach((item) => {
    const key = Object.keys(item)[1]
    temp[key] = item[key]
  })
  return temp
}
