<template>
  <transition
    name="fade"
    mode="out-in"
  >
    <component :is="currentComponent" />
  </transition>
</template>
<script>
import { ComponentMap, Components } from './componentMap.js'

export default {
  name: 'WebComponents',
  components: Components,
  props: {
    componentType: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      currentComponent: ''
    }
  },
  watch: {
    componentType: function(newType, oldType) {
      this.$nextTick(() => {
        this.initComponent(newType)
      })
    }
  },
  mounted() {
    this.initComponent(this.componentType)
  },
  methods: {
    initComponent(type) {
      const current = ComponentMap.filter((item, index) => {
        return item.type === type
      })
      this.currentComponent = Object.keys(current[0])[1]
    }
  }
}
</script>
<style lang='scss' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
