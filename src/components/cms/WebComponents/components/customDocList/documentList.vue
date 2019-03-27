<template>
  <div class="define-doc-list">
    <el-table
      ref="multipleTable"
      :data="tableData"
      :highlight-current-row="true"
      tooltip-effect="dark"
      style="width: 100%"
      size="small"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
    >
      <!-- :default-sort="{prop: 'publishTime', order: 'descending'}" -->
      <el-table-column type="selection" width="55"/>
      <el-table-column fixed prop="articleTitle" label="标题" min-width="160" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="checkAuth('cms:article:stick')" class="titleClick" @click="editDoc(scope.row.articleId)">{{ scope.row.articleTitle }}</span>
          <span v-else>{{ scope.row.articleTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="channelName" label="所属栏目" min-width="100" show-overflow-tooltip/>
      <!-- <el-table-column label="查看" width="60">
        <template slot-scope="scope">
          <i class="el-icon-view" style="cursor:pointer" @click="openWindow(scope.row.outLink)"/>
        </template>
      </el-table-column> -->

      <!-- <el-table-column prop="mark" label="标记" width="100"/> -->
      <el-table-column
        prop="publishTime"
        label="发布时间"
        min-width="120"
        show-overflow-tooltip
      />
      <el-table-column prop="articleAuthor" label="撰稿人" width="100"/>
    </el-table>
  </div>
</template>

<script>
import { deleteDocument, topDocument} from '@/api/cms/article'
export default {
  components: {
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
      documentInfor: {}
    }
  },
  methods: {
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
.define-doc-list {
  width: 100%;
  padding: 0 10px;
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

