<template>
  <div class="components-container">
    <WebSiteTag />
    <split-pane
      :min-percent="10"
      :max-percent="30"
      :default-percent="15"
      class="pane-wrap"
      split="vertical"
      @resize="resize"
    >
      <template slot="paneL">
        <div class="left-container">
          <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%;">
            <tree />
          </el-scrollbar>
        </div>
      </template>
      <template slot="paneR">
        <div class="right-container">
          <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%;">
            <WebComponents :component-type="contextMenu.id" />
            {{ contextMenu }}
          </el-scrollbar>
        </div>
      </template>
    </split-pane>
  </div>
</template>

<script>
import WebSiteTag from '@/components/cms/WebSiteTag'
import splitPane from 'vue-splitpane'
import Tree from '@/components/cms/Tree'
import WebComponents from '@/components/cms/WebComponents'

import { mapGetters } from 'vuex'

export default {
  name: 'WebSiteWrap',
  components: { WebSiteTag, splitPane, Tree, WebComponents },
  data() {
    return {
      componentType: '1'
    }
  },
  // TODO:webSiteViewType
  beforeRouteEnter(to, from, next) {
    const { path } = to
    if (path === '/website/doc') {
      next(vm => {
        vm.$store.dispatch('setViewTypeShow', true)
      })
    }
    next()
  },
  beforeRouteLeave(to, from, next) {
    // console.log(from)
    const { path } = from
    if (path === '/website/doc') {
      this.$store.dispatch('setViewTypeShow', false)
    }
    next()
  },
  computed: {
    ...mapGetters(['contextMenu'])
  },
  methods: {
    resize() {
      // console.log('resize')
    }
  }
}
</script>

<style lang='scss' scoped>
.components-container {
  margin: 30px;
}
</style>
