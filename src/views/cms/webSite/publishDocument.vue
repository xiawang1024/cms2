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
            <tree :tree-data = "tableData" ref="tree"/>
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
import store from 'store'
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
  /**
   * columnAll 全部栏目列表
   */
  computed: {
    ...mapGetters(['contextMenu', 'choosedColumn', 'columnAll', 'treeTags'])
  },
  watch: {
    columnAll(val) {
      this.tableData = val
      this.barSet()
    }
  },
  mounted() {
    this.tableData = this.columnAll.length ? this.columnAll : store.get('columnsAll')
    this.$store.dispatch('toggleSideBar')
    this.barSet()
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
    },
    barSet() {
      console.log(this.tableData, 'tableData')
      console.log(this.treeTags, 'this.treeTags')
      console.log(this.$refs.tree.$refs.websitTree, 'this.websitTree')
      if(this.tableData.length) {
        if(this.treeTags && this.treeTags.length) {
          this.$nextTick(() => {
            this.$refs.tree.$refs.websitTree.setCurrentKey(this.treeTags[this.treeTags.length - 1].id)
          })
        } else {
          let webSiteTags = []
          if(this.tableData[0].children && this.tableData[0].children.length) {
            webSiteTags = [{
              channelCode: this.tableData[0].children[0].channelCode,
              id: this.tableData[0].children[0].channelId,
              label: this.tableData[0].children[0].channelName
            }]
          } else {
            webSiteTags = [{
              channelCode: this.tableData[0].channelCode,
              id: this.tableData[0].channelId,
              label: this.tableData[0].channelName
            }]
          }
          this.$store.dispatch('setTreeTags', webSiteTags)
          this.$nextTick(() => {
            if(this.tableData && this.tableData.length) {
              if(this.tableData[0].children) {
                document.querySelectorAll('.el-tree-node')[1].classList.add('is-current')
              } else {
                document.querySelectorAll('.el-tree-node')[0].classList.add('is-current')
              }
            }
          })
        }
      }
    },
    columnList() {
      var _this = this
      return new Promise((resolve, reject) => {
        columnList({}, _this.pageNum, _this.pageSize)
          .then((response) => {
            _this.tableData = _this.toTree(response.data.result.content)
            if(_this.tableData.length) {
              let webSiteTags = []
              if(_this.tableData[0].children && _this.tableData[0].children.length) {
                webSiteTags = [{
                  channelCode: _this.tableData[0].children[0].channelCode,
                  id: _this.tableData[0].children[0].channelId,
                  label: _this.tableData[0].children[0].channelName
                }]
              } else {
                webSiteTags = [{
                  channelCode: _this.tableData[0].channelCode,
                  id: _this.tableData[0].channelId,
                  label: _this.tableData[0].channelName
                }]
              }
              this.$store.dispatch('setTreeTags', webSiteTags)
              this.$nextTick(() => {
                if(_this.tableData && _this.tableData.length) {
                  if(_this.tableData[0].children) {
                    document.querySelectorAll('.el-tree-node')[1].classList.add('is-current')
                  } else {
                    document.querySelectorAll('.el-tree-node')[0].classList.add('is-current')
                  }
                }
              })
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
.splitter-pane-resizer {
  background: #ccc !important;
}
.left-container {
  /* background-color: #f38181; */
  height: 100%;
  /* overflow: hidden; */
}

.right-container {
  // background-color: #fce38a;
  height: 100%;
  padding-left: 10px;
}
</style>
