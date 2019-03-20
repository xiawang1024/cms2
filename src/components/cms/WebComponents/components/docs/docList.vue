<template>
  <div class="doc-list">
    <el-table
      ref="multipleTable"
      :data="tableData"
      :default-sort="{prop: 'publishTime', order: 'descending'}"
      :highlight-current-row="true"
      tooltip-effect="dark"
      style="width: 100%"
      size="small"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column fixed prop="articleId" label="ID/序号" width="150" show-overflow-tooltip/>
      <el-table-column fixed prop="articleTitle" label="标题" min-width="160" show-overflow-tooltip/>
      <el-table-column label="查看" width="60">
        <template slot-scope="scope">
          <i class="el-icon-view" style="cursor:pointer" @click="openWindow(scope.row.outLink)"/>
        </template>
      </el-table-column>

      <el-table-column label="预览" width="60">
        <template slot-scope="scope">
          <i class="el-icon-question" style="cursor:pointer" @click="openReview(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column prop="articleType" label="类型" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.articleType == 0">图文</span>
          <span v-if="scope.row.articleType == 1">图集</span>
          <span v-if="scope.row.articleType == 2">拼条</span>
          <span v-if="scope.row.articleType == 3">引用</span>
        </template>
      </el-table-column>
      <el-table-column prop="articleStatus" label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.articleStatus == 0">新稿</span>
          <span v-if="scope.row.articleStatus == 1">提交审核</span>
          <span v-if="scope.row.articleStatus == 2">审核未通过</span>
          <span v-if="scope.row.articleStatus == 3">已撤</span>
          <span v-if="scope.row.articleStatus == 4">已删</span>
          <span v-if="scope.row.articleStatus == 10">待发</span>
          <span v-if="scope.row.articleStatus == 11">已发</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="mark" label="标记" width="100"/> -->
      <el-table-column
        prop="createTime"
        label="创建时间"
        min-width="120"
        sortable
        show-overflow-tooltip
      />
      <el-table-column
        prop="publishTime"
        label="发布时间"
        min-width="120"
        sortable
        show-overflow-tooltip
      />
      <el-table-column prop="articleAuthor" label="撰稿人" width="100"/>
      <el-table-column prop="clickNum" label="点击" sortable width="80"/>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button v-if="checkAuth('cms:article:stick')" type="text" size="small" @click="setTop(scope.row.articleId)">置顶</el-button>
          <el-button v-if="checkAuth('cms:article:edit')" type="text" size="small" @click="editDoc(scope.row.articleId)">编辑</el-button>
          <!-- <el-button v-if="checkAuth('cms:article:delete')" type="text" size="small" @click="handleClickDel(scope.row.articleId)">删除</el-button> -->
          <el-button v-if="checkAuth('cms:article:delete')" type="text" size="small" @click="deleteConfiorm(scope.row.articleId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <review-dialog :dialog-visible.sync="dialogVisible" :document-infor="documentInfor"/>
  </div>
</template>

<script>
import { deleteDocument, topDocument} from '@/api/cms/article'
import reviewDialog from './review'
export default {
  components: {
    reviewDialog
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
    checkAuth (authKey) {
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
<style lang="scss" scoped>
.doc-list {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>

