import vForm from './vForm.vue'

/* istanbul ignore next */
vForm.install = function (Vue) {
  Vue.component(vForm.name, vForm)
}

export default vForm
