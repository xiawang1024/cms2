<template>
  <div class="doc-list">
    <el-table
      ref="multipleTable"
      :data="tableData"
      :highlight-current-row="true"
      tooltip-effect="dark"
      style="width: 100%"
      size="mini"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column prop="articleId" label="ID/序号" width="150" show-overflow-tooltip/>
      <el-table-column prop="articleTitle" label="标题" min-width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="checkAuth('cms:article:stick')" class="titleClick" @click="editDoc(scope.row.articleId)">{{ scope.row.articleTitle }}</span>
          <span v-else>{{ scope.row.articleTitle }}</span>
          <icon name="file-alt" title="正文有图" v-if="scope.row.contentImagesList && scope.row.contentImagesList.length"/>
          <icon name="file-image" title="附件有图" v-if="documentHasImg(scope.row.articleAttachmentsList)"/>
        </template>
      </el-table-column>
      <!-- <el-table-column label="查看" width="60">
        <template slot-scope="scope">
          <i class="el-icon-view" style="cursor:pointer" @click="openWindow(scope.row.outLink)"/>
        </template>
      </el-table-column> -->

      <el-table-column label="预览" width="50">
        <template slot-scope="scope">
          <i class="el-icon-question" style="cursor:pointer" @click="openReview(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column prop="articleType" label="类型" width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.articleType == 0">图文</span>
          <span v-if="scope.row.articleType == 1">图集</span>
          <span v-if="scope.row.articleType == 2">拼条</span>
          <span v-if="scope.row.articleType == 3">引用</span>
        </template>
      </el-table-column>
      <el-table-column prop="articleStatus" label="状态" width="80">
        <template slot-scope="scope">
          <div class="docunmnt-status" @click.stop="reviewStep(scope.row)">
            <span v-if="scope.row.articleStatus == 0" style="color:#909399">新稿</span>
            <span v-if="scope.row.articleStatus == 1" style="color:#3498db">提交审核</span>
            <span v-if="scope.row.articleStatus == 2" style="color:#f67a61">审核未通过</span>
            <span v-if="scope.row.articleStatus == 3" style="color:#E6A23C">已撤</span>
            <span v-if="scope.row.articleStatus == 4" style="color:#F56C6C">已删</span>
            <span v-if="scope.row.articleStatus == 10" style="color:#409EFF">待发布</span>
            <span v-if="scope.row.articleStatus == 11" style="color:#67C23A">已发布</span>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="mark" label="标记" width="100"/> -->
      <el-table-column prop="tagIdsList" label="标记" width="100" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ tagsChange(scope.row.tagIdsList) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="135"
        show-overflow-tooltip
      />
      <el-table-column
        prop="publishTime"
        label="发布时间"
        width="135"
        show-overflow-tooltip
      />
      <el-table-column prop="createUser" label="撰稿人" width="100" show-overflow-tooltip/>
      <el-table-column prop="clickNum" label="点击" width="50"/>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button v-if="checkAuth('cms:article:stick')" type="text" size="small" @click.stop="setTop(scope.row.articleId)">置顶</el-button>
          <el-button v-if="checkAuth('cms:article:edit')" type="text" size="small" @click.stop="editDoc(scope.row.articleId)">编辑</el-button>
          <el-button v-if="checkAuth('cms:article:delete')" type="text" size="small" @click.stop="deleteConfiorm(scope.row.articleId)">撤销</el-button>
          <el-button v-if="checkAuth('cms:article:delete')" type="text" size="small" @click.stop="deleteConfiorm(scope.row.articleId)">审核</el-button>
          <el-button v-if="checkAuth('cms:article:delete')" type="text" size="small" @click.stop="deleteConfiorm(scope.row.articleId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <review-dialog :dialog-visible.sync="dialogVisible" :document-infor="documentInfor"/>
    <step-dialog :dialog-visible.sync="stepVisible" :document-infor="documentInfor"/>
  </div>
</template>

<script>
import { deleteDocument, topDocument, articalSort} from '@/api/cms/article'
import reviewDialog from './review'
import stepDialog from './step'
import Sortable from 'sortablejs'
import { mapGetters } from 'vuex'
export default {
  components: {
    reviewDialog,
    stepDialog
  },
  props: {
    tableData: {
      type: Array,
      default: ()=> {
        []
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
      stepVisible: false
    }
  },
  computed: {
    ...mapGetters(['treeTags'])
  },
  watch: {
    tableData: function(val) {
      this.oldList = val.map(v => v.articleId)
      this.newList = this.oldList.slice()
      this.$nextTick(() => {
        this.setSort()
      })
    }
  },
  
  methods: {
    // 查看审核进度
    reviewStep(row) {
      console.log(row)
      this.documentInfor = row
      this.stepVisible = true
    },
    // 文章排序
    articalSort(data) {
      return new Promise((resolve, reject) => {
        articalSort(data)
          .then((response) => {
            this.$message.success('排序成功')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    setSort() {
      const el = this.$refs.multipleTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        // ghostClass: 'sortable-ghost',
        setData: function(dataTransfer) {
        },
        onEnd: evt => {
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
          let params = {
            articleIdList: this.newList,
            // channelId: this.treeTags[this.treeTags.length - 1].id
          }
          this.articalSort(params)
        }
      })
    },
    // 点击行
    rowClick(row) {
      if(row) {
        let singelRow = [row]
        singelRow.forEach(ele => {
          this.$refs.multipleTable.toggleRowSelection(ele);
        })
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    documentHasImg(val) {
      let hasImg = false
      if(val && val.length) {
        hasImg = val.some((item)=> {
          return item.category === 'IMG'
        })
      } else {
        hasImg = false
      }
      return hasImg
    },
    tagsChange(tags) {
      let tagName = ''
      if(tags && tags.length) {
        tagName = tags.map((ele) => {
          return ele.tagName
        }).join(',')
      } else {
        tagName = ''
      }
      return tagName
    },
    // 置顶的文章加背景色
    tableRowClassName({row, rowIndex}) {
      if(row.topFlag == 1) {
        return 'top-row';
      }
    },
    checkAuth (authKey) {
      // console.log(this.$store.getters.authorities, 'this.$store.getters.authorities')
      if (this.$store.getters.authorities.indexOf(authKey) === -1) {
        return false
      } else {
        return true
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    /**
     * 多选钩子
     */
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.$emit('multipleChoose', val)
    },
    /**
     * 获取多选的id列表
     */
    getMultipleSelectionId() {
      const multipleSelection = this.multipleSelection
      const len = multipleSelection.length
      let multipleId = []
      if (len) {
        multipleId = multipleSelection.map(item => item.id)
      }
      return multipleId
    },
    // 置顶文章
    setTop(id) {
      this.$confirm('是否置顶该文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.setTopConform(id)
      }).catch(() => {  
      })
    },
    setTopConform(id) {
      return new Promise((resolve, reject) => {
        topDocument(id)
          .then((response) => {
            this.$emit('handelSuccess')
            this.$message.success('置顶成功')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    /**
     * 删除单个
     */
    deleteConfiorm(id) {
      this.$confirm('是否删除该文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleClickDel(id)
      }).catch(() => {  
      })
    },
    // 删除单个
    handleClickDel(id) {
      return new Promise((resolve, reject) => {
        deleteDocument({articleId: id})
          .then((response) => {
            this.$emit('handelSuccess')
            this.$message.success('删除成功')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    //预览
    openReview(val) {
      this.documentInfor = val
      this.dialogVisible = true
    },
    /**
     * 查看预览
     */
    openWindow(link) {
      // window.location.href = link
      window.open(link)
    },
    editDoc(docId) {
      const select = { id: '1', label: '新建文档', docId: docId}
      this.$store.dispatch('setContextMenu', select)
    }
  }
}
</script>
<style lang="scss">
$color-maintain: #34dcf0;
$color-purple: #950bff;
$color-yellow: #ffcb02;
$color-blue: #3498db;
.docunmnt-status{
  span{
    cursor: pointer;
  }
}

.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
.fa-icon{
  width:15px;
  height:15px;

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
  .titleClick{
    cursor: pointer;
    color: #409EFF;
  }
  .el-table{
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

