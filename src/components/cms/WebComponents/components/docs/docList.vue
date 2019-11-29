<template>
  <div class="doc-list">
    <el-table
      ref="multipleTable"
      :data="newList"
      :highlight-current-row="true"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column
        prop="articleId"
        label="ID/序号"
        width="70"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span class="article-id">{{ scope.row.articleId }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="articleTitle"
        label="标题"
        min-width="400"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span
            v-if="checkAuth('cms:article:edit')"
            class="titleClick"
            @click="editDoc(scope.row)"
          >{{ scope.row.articleTitle }}</span
          >
          <span v-else>{{ scope.row.articleTitle }}</span>
          <i
            class="el-icon-picture-outline"
            title="正文有图"
            v-if="
              scope.row.contentImagesList && scope.row.contentImagesList.length
            "
          />
          <i
            class="el-icon-folder-opened"
            title="附件有图"
            v-if="documentHasImg(scope.row.articleAttachmentsList)"
          />
          <i class="el-icon-top" title="置顶" v-if="scope.row.topFlag == 1" />
          <i
            class="iconfont iconlink"
            title="引用"
            v-if="scope.row.articleType == 3"
          />
        </template>
      </el-table-column>

      <el-table-column label="查看" width="50">
        <template slot-scope="scope">
          <i
            class="el-icon-share"
            style="cursor:pointer"
            @click.stop="openWindow(scope.row.articleId)"
          />
        </template>
      </el-table-column>

      <el-table-column label="预览" width="50">
        <template slot-scope="scope">
          <i
            class="el-icon-view"
            style="cursor:pointer"
            @click.stop="openReview(scope.row)"
            title="预览"
          />
        </template>
      </el-table-column>
      <el-table-column prop="articleType" label="类型" width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.articleType == 0" style="cursor:default"
          >图文</span
          >
          <span v-if="scope.row.articleType == 1" style="cursor:default"
          >图集</span
          >
          <span v-if="scope.row.articleType == 2" style="cursor:default"
          >拼条</span
          >
          <span
            v-if="scope.row.articleType == 3"
            :title="
              scope.row.referArticleParentChannelNames
                ? '引用自：' + scope.row.referArticleParentChannelNames
                : ''
            "
            style="cursor:default"
          >引用</span
          >
          <span v-if="scope.row.articleType == 4" style="cursor:default"
          >转载</span
          >
          <span v-if="scope.row.articleType == 5" style="cursor:default"
          >外链</span
          >
        </template>
      </el-table-column>
      <el-table-column prop="articleStatus" label="状态" width="80">
        <template slot-scope="scope">
          <div class="docunmnt-status">
            <span v-if="scope.row.articleStatus == 0" style="color:#909399"
            >新稿</span
            >
            <span v-if="scope.row.articleStatus == 1" style="color:#3498db"
            >提交审核</span
            >
            <span v-if="scope.row.articleStatus == 2" style="color:#f67a61"
            >审核未通过</span
            >
            <span v-if="scope.row.articleStatus == 3" style="color:#E6A23C"
            >已撤</span
            >
            <span v-if="scope.row.articleStatus == 4" style="color:#F56C6C"
            >已删</span
            >
            <span v-if="scope.row.articleStatus == 10" style="color:#409EFF"
            >待发布</span
            >
            <span v-if="scope.row.articleStatus == 11" style="color:#67C23A"
            >已发布</span
            >
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="mark" label="标记" width="100"/> -->
      <el-table-column
        prop="tagIdsList"
        label="标记"
        width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ tagsChange(scope.row.tagIdsList) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="155"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.createTime | timeFilter }}
        </template>
      </el-table-column>
      <el-table-column
        prop="publishTime"
        label="发布时间"
        width="155"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.publishTime | timeFilter }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createUser"
        label="撰稿人"
        width="70"
        show-overflow-tooltip
      />
      <el-table-column
        prop="clickNum"
        label="点击"
        width="70"
        show-overflow-tooltip
      />
      <el-table-column fixed="right" label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.stop="checkProcess(scope.row)"
          >审核进度</el-button
          >
          <el-button
            :disabled="scope.row.articleStatus == 1"
            v-if="checkAuth('cms:article:stick') && scope.row.topFlag == 1"
            type="text"
            size="small"
            @click.stop="setUntop(scope.row.articleId)"
          >取消置顶</el-button
          >
          <el-button
            :disabled="scope.row.articleStatus == 1"
            v-if="checkAuth('cms:article:stick') && scope.row.topFlag !== 1"
            type="text"
            size="small"
            @click.stop="setTop(scope.row.articleId)"
          >置顶</el-button
          >
          <el-button
            :disabled="scope.row.articleStatus == 1"
            v-if="checkAuth('cms:article:edit')"
            type="text"
            size="small"
            @click.stop="editDoc(scope.row)"
          >编辑</el-button
          >
          <!-- <el-button v-if="checkAuth('cms:article:delete')" type="text" size="small" @click.stop="deleteConfiorm(scope.row.articleId)">撤销</el-button>
          <el-button v-if="checkAuth('cms:article:delete')" type="text" size="small" @click.stop="deleteConfiorm(scope.row.articleId)">审核</el-button>-->
          <el-button
            :disabled="scope.row.articleStatus == 1"
            v-if="checkAuth('cms:article:deleteReal')"
            type="text"
            size="small"
            @click.stop="deleteConfiorm(scope.row.articleId)"
          >删除</el-button
          >
          <el-button
            v-if="scope.row.scoreType"
            type="text"
            size="mini"
            @click.stop="articleMark(scope.row)"
          >
            <span v-if="scope.row.scoreType==&quot;DXNewsCheckScore&quot;&&scope.row.articleStatus == 11&&(scope.row.articleType == 0||scope.row.articleType == 4)" >内部打分</span>
            <span v-if="scope.row.scoreType==&quot;DXNewsArticleScore&quot;&&scope.row.articleStatus == 11&&(scope.row.articleType == 0||scope.row.articleType == 4)">大象号打分</span>
            <span v-if="scope.row.scoreType==&quot;DXNewsCheckScoreDone&quot;&&scope.row.articleStatus == 11&&(scope.row.articleType == 0||scope.row.articleType == 4)" >已打分(内)</span>
            <span v-if="scope.row.scoreType==&quot;DXNewsArticleScoreDone&quot;&&scope.row.articleStatus == 11&&(scope.row.articleType == 0||scope.row.articleType == 4)" >已打分(号)</span>
          </el-button >

        </template>
      </el-table-column>
    </el-table>
    <review-dialog
      :dialog-visible.sync="dialogVisible"
      :article="documentInfor"
    />
    <step-dialog
      :dialog-visible.sync="stepVisible"
      :process-data="processData"
    />
    <mark-dialog
      :dialog-visible.sync="markVisible"
      :process-data="processData"
      :score-pro="scorePro"
      @refrashTable="refrashTable"
    />
  </div>
</template>

<script>
import {
  deleteDocument,
  topDocument,
  untopDocument,
  articalSort,
  articleUrl,
  // markAuthority
} from "@/api/cms/article";
import { getProcess } from "@/api/cms/articleCheck";
import reviewDialog from "./review";
import stepDialog from "./step";
import markDialog from "./articleMark";
import Sortable from "sortablejs";
import { mapGetters } from "vuex";
export default {
  components: {
    reviewDialog,
    stepDialog,
    markDialog
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        [];
      }
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    searchData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      multipleSelection: [],
      dialogVisible: false,
      documentInfor: {},
      oldList: [],
      newList: [],
      stepVisible: false,
      markVisible: false,
      processData: [],
      scorePro: {}
    };
  },
  computed: {
    ...mapGetters(["treeTags", "contextMenu"])
  },
  watch: {
    tableData: function(val) {
      this.newList = val.slice();
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.checkAuth("cms:article:nodrag")) {
        this.setSort();
      }
    });
    // this.getMarkAuthor();
  },
  methods: {
    // 获取打分权限
    // getMarkAuthor() {
    //   return new Promise((resolve, reject) => {
    //     markAuthority()
    //       .then(response => {
    //         this.scorePro = {
    //           authorityType: response.data.result
    //         };
    //         resolve();
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // },
    // 打分
    articleMark(row) {
      this.scorePro.articleId = row.articleId;
      this.scorePro.scoreType = row.scoreType;
      this.markVisible = true;
    },
    // 查看审核进度
    checkProcess(row) {
      return new Promise((resolve, reject) => {
        getProcess({ businessId: row.articleId })
          .then(response => {
            this.stepVisible = true;
            this.processData = response.data.result;
            // this.tableData = response.data.result.content
            // this.totalCount = response.data.result.total
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 文章排序
    articalSort(data) {
      console.log(this.searchData);
      return new Promise((resolve, reject) => {
        let params = Object.assign(data, this.searchData);
        articalSort(params, this.pageNum, this.pageSize)
          .then(response => {
            this.$message.success("排序成功");

            this.$emit("handelSuccess");
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    setSort() {
      var that = this;
      const el = this.$refs.multipleTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        // ghostClass: 'sortable-ghost',
        onUpdate: function(event) {
          var newIndex = event.newIndex,
            oldIndex = event.oldIndex,
            $li = el.children[newIndex],
            $oldLi = el.children[oldIndex];
          // 先删除移动的节点
          el.removeChild($li);
          // 再插入移动的节点到原有节点，还原了移动的操作
          if (newIndex > oldIndex) {
            el.insertBefore($li, $oldLi);
          } else {
            el.insertBefore($li, $oldLi.nextSibling);
          }
          // 更新items数组
          var item = that.newList.splice(oldIndex, 1);
          that.newList.splice(newIndex, 0, item[0]);
          // 下一个tick就会走patch更新
          let ids = that.newList.map(ele => {
            return ele.articleId;
          });
          let params = {
            articleIdList: ids
          };
          that.articalSort(params);
        }
      });
    },
    // 点击行
    rowClick(row) {
      if (row) {
        let singelRow = [row];
        singelRow.forEach(ele => {
          this.$refs.multipleTable.toggleRowSelection(ele);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    documentHasImg(val) {
      let hasImg = false;
      if (val && val.length) {
        hasImg = val.some(item => {
          return item.category === "IMG";
        });
      } else {
        hasImg = false;
      }
      return hasImg;
    },
    tagsChange(tags) {
      let tagName = "";
      if (tags && tags.length) {
        tagName = tags
          .map(ele => {
            return ele.tagName;
          })
          .join(",");
      } else {
        tagName = "";
      }
      return tagName;
    },
    // 置顶的文章加背景色
    tableRowClassName({ row, rowIndex }) {
      if (row.topFlag == 1) {
        return "top-row";
      }
    },
    checkAuth(authKey) {
      // console.log(this.$store.getters.authorities, 'this.$store.getters.authorities')
      if (this.$store.getters.authorities.indexOf(authKey) === -1) {
        return false;
      } else {
        return true;
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    /**
     * 多选钩子
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit("multipleChoose", val);
    },
    /**
     * 获取多选的id列表
     */
    getMultipleSelectionId() {
      const multipleSelection = this.multipleSelection;
      const len = multipleSelection.length;
      let multipleId = [];
      if (len) {
        multipleId = multipleSelection.map(item => item.id);
      }
      return multipleId;
    },
    // 置顶文章
    setTop(id) {
      this.$confirm("是否置顶该文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.setTopConform(id);
        })
        .catch(() => {});
    },
    // 取消置顶
    setUntop(id) {
      this.$confirm("是否取消置顶该文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.setUntopConform(id);
        })
        .catch(() => {});
    },
    // 取消置顶
    setUntopConform(id) {
      return new Promise((resolve, reject) => {
        untopDocument(id)
          .then(response => {
            this.$emit("handelSuccess");
            this.$message.success("取消置顶成功");
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 置顶
    setTopConform(id) {
      return new Promise((resolve, reject) => {
        topDocument(id)
          .then(response => {
            this.$emit("handelSuccess");
            this.$message.success("置顶成功");
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /**
     * 删除单个
     */
    deleteConfiorm(id) {
      this.$confirm("是否删除该文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.handleClickDel(id);
        })
        .catch(() => {});
    },
    // 删除单个
    handleClickDel(id) {
      return new Promise((resolve, reject) => {
        deleteDocument({ articleId: id })
          .then(response => {
            this.$emit("handelSuccess");
            this.$message.success("删除成功");
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //预览
    openReview(val) {
      this.documentInfor = val;
      this.dialogVisible = true;
    },
    /**
     * 查看预览
     */
    openWindow(id) {
      return new Promise((resolve, reject) => {
        articleUrl(id)
          .then(response => {
            if (response.data.result) {
              window.open("https://" + response.data.result);
            } else {
              this.$message.warning("该文章暂无链接");
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    editDoc(row) {
      const select = {
        id: "1",
        label: "新建文档",
        docId: row.articleId,
        articleType: row.articleType,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      this.$store.dispatch("setContextMenu", select);
      this.$store.dispatch("setAttachmentsList", []);
    },
    refrashTable(){
       this.$emit("refrashTable");
    }
  }
};
</script>
<style lang="scss">
$color-maintain: #34dcf0;
$color-purple: #950bff;
$color-yellow: #ffcb02;
$color-blue: #3498db;
.docunmnt-status {
  span {
    cursor: pointer;
  }
}

.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
.fa-icon {
  width: 15px;
  height: 15px;

  /* 要在 Safari 中正常工作，需要再引入如下两行代码 */
  max-width: 100%;
  max-height: 100%;
  color: #606266;
  vertical-align: text-bottom;
}
.doc-list {
  width: 100%;
  // padding: 0 10px;
  box-sizing: border-box;
  .hover-color {
    &:hover {
      color: #67c23a;
    }
  }
  .fz-16 {
    font-size: 16px;
  }
  .titleClick {
    cursor: pointer;
    color: #409eff;
  }
  .article-id {
    font-size: 12px;
  }
  .el-table {
    .top-row {
      background: #f0f9eb;
    }
  }
  // tbody{
  //   tr {
  //     background-color: #DCDFE6;
  //   }
  // }
}
</style>
