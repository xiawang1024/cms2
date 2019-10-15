<template>
  <div class="relation-doc-handel-dialog">
    <el-dialog :visible.sync="dialogVisible" title="选择文章" width="80%" :before-close="colseMe">
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
              <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%;">
                <tree :tree-data="tableData" @chooseColumn="documentList" />
              </el-scrollbar>
            </div>
          </template>
          <template slot="paneR">
            <div class="right-container">
              <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%;">
                <div class="v-search-header">
                  <v-search ref="vSearch" :search-settings="searchSettings" @search="searchList" />
                </div>
                <div class="add-btn">
                  <el-button type="primary" size="mini" @click="saveDocument">添加</el-button>
                  <!-- <el-button type="primary" size="small" @click="choosed">选中</el-button> -->
                </div>
                <!-- <document-lists ref="multipleSelect" :table-data="documentsData" :multiple = "list"/> -->
                <div>
                  <el-table
                    v-loading="loading"
                    element-loading-text="加载中"
                    ref="multipleTable"
                    :data="documentsData"
                    :highlight-current-row="true"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    :row-class-name="tableRowClassName"
                  >
                    <!-- :default-sort="{prop: 'publishTime', order: 'descending'}" -->
                    <el-table-column type="selection" width="55" />
                    <el-table-column
                      fixed
                      prop="articleTitle"
                      label="标题"
                      min-width="160"
                      show-overflow-tooltip
                    >
                      <template slot-scope="scope">
                        <span>{{ scope.row.articleTitle }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="channelName"
                      label="所属栏目"
                      min-width="100"
                      show-overflow-tooltip
                    />
                    <el-table-column
                      prop="publishTime"
                      label="发布时间"
                      min-width="120"
                      show-overflow-tooltip
                    />
                    <el-table-column prop="createUser" label="撰稿人" width="100" />
                  </el-table>
                </div>
                <doc-foot
                  ref="pagnation"
                  :total="totalCount"
                  @sizeChange="sizeChange"
                  @pageChange="pageChange"
                  :page-size="pageSize"
                />
              </el-scrollbar>
            </div>
          </template>
        </split-pane>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import splitPane from "vue-splitpane";
import { columnList } from "@/api/cms/columnManage";
import { documentList } from "@/api/cms/article";
import mixins from "@/components/cms/mixins";
// import documentLists from './documentList'
import DocFoot from "@/common/Pagination/index.vue";
import tree from "./tree";
export default {
  name: "",
  components: {
    splitPane,
    tree,
    // documentLists,
    DocFoot
  },
  mixins: [mixins],
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    },
    list: {
      default: () => {
        [];
      },
      type: Array
    }
  },
  data() {
    return {
      chooseIds: [],
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      documentsData: [],
      searchData: {},
      totalCount: 0,
      multipleSelection: [],
      searchSettings: [
        {
          label: "撰稿人",
          name: "createUser",
          placeholder: "请输入撰稿人",
          visible: true,
          options: [],
          type: "text"
        }
      ],
      loading: false
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.columnList();
      }
    }
  },
  created() {},
  methods: {
    searchList(data) {
      this.searchData.createUser = data.createUser;
      this.pageNum = 1;
      this.$refs.pagnation.currentPage = 1;
      this.getDocumentList();
    },
    // choosed() {
    //   this.documentsData.forEach(row => {
    //     this.$refs.multipleTable.toggleRowSelection(row)
    //   })
    // },
    /**
     * 文章列表方法
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 置顶的文章加背景色
    tableRowClassName({ row, rowIndex }) {
      if (row.topFlag == 1) {
        return "top-row";
      }
    },
    /**
     * 文章弹框方法
     */
    sizeChange(val) {
      this.pageSize = val;
      this.getDocumentList();
    },
    pageChange(val) {
      this.pageNum = val;
      this.getDocumentList();
    },
    saveDocument() {
      this.$emit("getChoosed", this.multipleSelection);
      this.$emit("update:dialogVisible", false);
    },
    // 栏目下的文档列表
    documentList(column) {
      this.searchData.channelId = column.channelId;
      this.searchData.createUser = "";
      this.$refs.vSearch.onReset();
      this.getDocumentList();
    },
    getDocumentList() {
      this.loading = true;
      var _this = this;
      return new Promise((resolve, reject) => {
        documentList(_this.searchData, _this.pageNum, _this.pageSize)
          .then(response => {
            _this.documentsData = response.data.result.content;
            _this.totalCount = response.data.result.total;
            this.$nextTick(() => {
              _this.documentsData.forEach(row => {
                _this.list.forEach(ele => {
                  if (ele.articleId == row.articleId) {
                    _this.$refs.multipleTable.toggleRowSelection(row);
                  }
                });
              });
            });
            this.loading = false;
            resolve();
          })
          .catch(error => {
            this.loading = false;
            reject(error);
          });
      });
    },
    colseMe() {
      this.$emit("update:dialogVisible", false);
    },
    columnList() {
      var _this = this;
      return new Promise((resolve, reject) => {
        columnList({}, 1, 1000)
          .then(response => {
            _this.tableData = _this.toTree(response.data.result.content);
            if (_this.tableData.length) {
              this.$nextTick(() => {
                if (_this.tableData && _this.tableData.length) {
                  if (_this.tableData[0].children) {
                    document
                      .querySelectorAll(".el-dialog__body .el-tree-node")[1]
                      .classList.add("is-current");
                    this.searchData.channelId =
                      _this.tableData[0].children[0].channelId;
                  } else {
                    document
                      .querySelectorAll(".el-dialog__body .el-tree-node")[0]
                      .classList.add("is-current");
                    this.searchData.channelId = _this.tableData[0].channelId;
                  }
                }
              });
            }
            this.getDocumentList();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
</script>

<style lang='scss'>
.relation-doc-handel-dialog {
  // .el-form-item {
  //   width: 300px;
  // }
  .add-btn {
    margin-top: 10px;
    padding-left: 10px;
  }
  .el-dialog__body {
    height: calc(100% - 60px);
  }
  .el-dialog {
    height: 80%;
  }
  .el-dialog__header {
    border-bottom: 1px solid #e8e8e8;
  }
  .left-list-container {
    height: 100%;
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
  .top-row {
    background: #f0f9eb;
  }
}
</style>

