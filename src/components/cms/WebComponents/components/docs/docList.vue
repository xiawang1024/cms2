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
          <i class="el-icon-view" style="cursor:pointer" @click="openWindow(scope.row.preview)"/>
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
          <span v-if="scope.row.articleStatus == 5">待发</span>
          <span v-if="scope.row.articleStatus == 6">已发</span>
        </template>
      </el-table-column>
      <el-table-column prop="mark" label="标记" width="100"/>
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
      <el-table-column fixed="right" label="操作" width="130">
        <template slot-scope="scope">
          <el-button v-if="checkAuth('cms:article:stick')" type="text" size="small">置顶</el-button>
          <el-button v-if="checkAuth('cms:article:edit')" type="text" size="small" @click="editDoc(scope.row.articleId)">编辑</el-button>
          <!-- <el-button v-if="checkAuth('cms:article:delete')" type="text" size="small" @click="handleClickDel(scope.row.articleId)">删除</el-button> -->
          <el-button v-if="checkAuth('cms:article:delete')" type="text" size="small" @click="deleteConfiorm(scope.row.articleId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deleteDocument } from '@/api/cms/article'
export default {
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
      multipleSelection: []
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

