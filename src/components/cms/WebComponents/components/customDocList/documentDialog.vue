<template>
  <div class="choose-handel-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      title="选择文章"
      width="70%"
      :before-close="colseMe"
      :append-to-body = "true"
    >
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:dialogVisible', false)" size="small">取消</el-button>
        <el-button type="primary" @click="$emit('update:dialogVisible', false)" size="small">确定</el-button>
      </span> -->
      <div class="left-list-container">
        <split-pane
          :min-percent="10"
          :max-percent="30"
          :default-percent="12"
          class="pane-wrap"
          split="vertical"
        >
          <template slot="paneL">
            <div class="left-container">
              <el-scrollbar
                wrap-class="scrollbar-wrapper"
                style="height:100%;"
              > 
                <tree :tree-data = "tableData" @chooseColumn="documentList"/>
              </el-scrollbar>
            </div>
          </template>
          <template slot="paneR">
            <div class="right-container">
              <el-scrollbar
                wrap-class="scrollbar-wrapper"
                style="height:100%;"
              > 
                <document-lists ref="multipleSelect" :table-data="documentsData"/>
                <div>
                  <el-button type="primary" size="small" @click="saveDocument">保存</el-button>
                </div>
              </el-scrollbar>
            </div>
          </template>
        </split-pane>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import splitPane from 'vue-splitpane'
import { columnList } from '@/api/cms/columnManage'
import { documentList } from '@/api/cms/article'
import mixins from '@/components/cms/mixins'
import documentLists from './documentList'
import tree from './tree'
export default {
  name: '',
  components: {
    splitPane,
    tree,
    documentLists
  },
  mixins: [mixins],
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      chooseIds: [],
      pageNum: 1,
      pageSize: 1000,
      tableData: [],
      documentsData: [],
      searchData: {}
    }
  },
  watch: {
    dialogVisible(val) {
    }
  },
  created() {
    this.columnList()
    // this.$store.dispatch('toggleSideBar')
  },
  methods: {
    saveDocument() {
      this.$emit('getChoosed', this.$refs.multipleSelect.multipleSelection)
      this.$emit('update:dialogVisible', false)
    },
    // 栏目下的文档列表
    documentList(column) {
      var _this = this
      _this.searchData.channelId = column.channelId
      return new Promise((resolve, reject) => {
        documentList(_this.searchData, _this.pageNum, _this.pageSize)
          .then((response) => {
            _this.documentsData = response.data.result.content
            // _this.totalCount = response.data.result.total
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    colseMe() {
      console.log(111)
      this.$emit('update:dialogVisible', false)
    },
    columnList() {
      var _this = this
      return new Promise((resolve, reject) => {
        columnList({}, _this.pageNum, _this.pageSize)
          .then((response) => {
            _this.tableData = _this.toTree(response.data.result.content)
            if(_this.tableData.length) {
              // let webSiteTags = []
              // if(_this.tableData[0].children && _this.tableData[0].children.length) {
              //   webSiteTags = [{
              //     channelCode: _this.tableData[0].children[0].channelCode,
              //     id: _this.tableData[0].children[0].channelId,
              //     label: _this.tableData[0].children[0].channelName
              //   }]
              // } else {
              //   webSiteTags = [{
              //     channelCode: _this.tableData[0].channelCode,
              //     id: _this.tableData[0].channelId,
              //     label: _this.tableData[0].channelName
              //   }]
              // }
              // this.$store.dispatch('setTreeTags', webSiteTags)
              // this.$nextTick(() => {
              //   if(_this.tableData && _this.tableData.length) {
              //     if(_this.tableData[0].children) {
              //       document.querySelectorAll('.el-tree-node')[1].classList.add('is-current')
              //     } else {
              //       document.querySelectorAll('.el-tree-node')[0].classList.add('is-current')
              //     }
              //   }
              // })
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
.choose-handel-dialog {
  // position: relative;
  // height: calc(100vh - 124px);
  // margin: 12px 10px;
}
.left-list-container {
  height: 500px;
}
.pane-wrap {
  margin-top: 12px;
}
.left-container {
  height: 100%;
  overflow: hidden; 
}

.right-container {
 
  height: 100%;
}
</style>

