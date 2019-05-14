<template>
  <div class="relatedDocuments-wrap">
    <div class="save-btn">
      <el-button type="primary" size="mini" @click="saveHandelRelation">保存</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" highlight-current-row>
      <el-table-column prop="articleTitle" label="标题" min-width="200" show-overflow-tooltip/>
      <el-table-column prop="articleType" label="类型">
        <template slot-scope="scope">
          <div>
            <span v-if="scope.row.articleType == 0">图文</span>
            <span v-if="scope.row.articleType == 1">图集</span>
            <span v-if="scope.row.articleType == 2">拼条</span>
            <span v-if="scope.row.articleType == 3">引用</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="channelName" label="所属栏目" show-overflow-tooltip/>
      <el-table-column prop="articleStatus" label="状态" width="80">
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
      <el-table-column prop="tagIdsList" label="标记" min-width="120" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ tagsChange(scope.row.tagIdsList) }}
        </template>
      </el-table-column>
      <el-table-column prop="modifyTime" label="修改时间" width="200"/>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-button type="text" @click="handleAdd" size="mini">添加</el-button>
          <!-- <el-button type="text" style="color:#f95757" @click="handleAutoGet">自动获取</el-button> -->
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <document-dialog :dialog-visible.sync = "dialogVisible" @getChoosed = "getChoosed" :list="tableData"/>
  </div>
</template>
<script>
import { TreeData } from './mockData.js'
import { mapGetters } from 'vuex'
import { getRelationDoc, saveRelationDoc } from '@/api/cms/article'
import documentDialog from './relationComponents/documentDialog.vue'
export default {
  name: 'RelatedDocuments',
  components: {
    documentDialog
  },
  props: {
    activeName: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      search: '',
      tableData: [],
      treeData: TreeData,
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['contextMenu'])
  },
  watch: {
    activeName(val, oldval) {
      if(val === 'relatedDocuments') {
        if(this.contextMenu.docId) {
          this.getRelationDoc(this.contextMenu.docId)
        }
      }
    }
    
  },
  methods: {
    // 保存选择文章
    saveHandelRelation() {
      console.log(this.tableData, 'tableData')
      let articleIdList = []
      if(this.tableData.length) {
        this.tableData.forEach((ele) => {
          articleIdList.push(ele.articleId)
        })
      } else {
        articleIdList = []
      }
      return new Promise((resolve, reject) => {
        saveRelationDoc(this.contextMenu.docId, { articleIdList: articleIdList })
          .then((response) => {
            this.$message.success('保存成功')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取选中的文章
    getChoosed(list) {
      this.tableData = this.tableData.concat(list)
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
    // 获取该文章下的关联文章
    getRelationDoc(id) {
      return new Promise((resolve, reject) => {
        getRelationDoc(id)
          .then((response) => {
            this.tableData = response.data.result ? response.data.result : []
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    handleAdd() {
      this.dialogVisible = true
    },
    // handleAutoGet() {},
    handleEdit() {},
    handleDelete(index, row) {
      this.$confirm('确定删除该文章吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
      }).catch(() => { 
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 0px;
}
</style>
<style lang="scss">
.relatedDocuments-wrap {
  .save-btn{
    text-align: right;
  }
}
</style>

