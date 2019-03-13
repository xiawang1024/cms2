// 引入ElementUI
// import '~/theme/index.css' // 自定义主题
import ELEMENT from 'element-ui'

// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css'
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'

// 引入自定义全局组件
// import vPage from '@/components/page/'
import vSearch from '@/common/search'
import vForm from '@/common/form'
// import formGenerator from '@/components/formGenerator'

// 引入本地化存储接口
// import localforage from 'localforage'
// 引入上传文件组件
import upLoader from '@/common/uploader'
export function initComponent(Vue) {
  Vue.use(ELEMENT)
  Vue.component(CollapseTransition.name, CollapseTransition)
  Vue.use(upLoader)
  Vue.use(vSearch)
  Vue.use(vForm)
  // Vue.component('formGenerator', formGenerator)

  // Object.defineProperty(Vue.prototype, '$localforage', {
  //   value: localforage,
  //   writable: false
  // })
}
