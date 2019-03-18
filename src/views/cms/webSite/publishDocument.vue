<template>
  <div class="components-container">
    <WebSiteTag />
    <split-pane
      :min-percent="10"
      :max-percent="30"
      :default-percent="12"
      class="pane-wrap"
      split="vertical"
      @resize="resize"
    >
      <template slot="paneL">
        <div class="left-container">
          <el-scrollbar
            wrap-class="scrollbar-wrapper"
            style="height:100%;"
          >
            <tree :tree-data = "tableData"/>
          </el-scrollbar>
        </div>
      </template>
      <template slot="paneR">
        <div class="right-container">
          <el-scrollbar
            wrap-class="scrollbar-wrapper"
            style="height:100%;"
          >
            <WebComponents :component-type="contextMenu.id" />
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
import { columnList } from '@/api/cms/columnManage'
import mixins from '@/components/cms/mixins'
export default {
  name: 'WebSiteWrap',
  components: { WebSiteTag, splitPane, Tree, WebComponents },
  mixins: [mixins],
  data() {
    return {
      componentType: '1',
      pageNum: 1,
      pageSize: 1000,
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['contextMenu', 'choosedColumn'])
  },
  mounted() {
    this.columnList()
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
    console.log(from)
    const { path } = from
    if (path === '/website/doc') {
      this.$store.dispatch('setViewTypeShow', false)
    }
    next()
  },
  methods: {
    resize() {
      console.log('resize')
    },
    columnList() {
      var _this = this
      return new Promise((resolve, reject) => {
        columnList({}, _this.pageNum, _this.pageSize)
          .then((response) => {
            _this.tableData = _this.toTree(response.data.result.content)
            if(_this.tableData.length) {
              let webSiteTags = [{
                channelCode: _this.tableData[0].channelCode,
                id: _this.tableData[0].channelId,
                label: _this.tableData[0].channelName
              }]
              this.$store.dispatch('setTreeTags', webSiteTags)
            }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  }
}
</script>

<style lang='scss' scoped>
.components-container {
  position: relative;
  height: calc(100vh - 124px);
  margin: 12px 10px;
}
.pane-wrap {
  margin-top: 12px;
}
.left-container {
  /* background-color: #f38181; */
  height: 100%;
  /* overflow: hidden; */
}

.right-container {
  // background-color: #fce38a;
  height: 100%;
}
</style>
