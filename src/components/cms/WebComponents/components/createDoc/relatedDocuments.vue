<template>
  <div class="relatedDocuments-wrap">
    <el-table :data="tableData" style="width: 100%">
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
      <el-table-column prop="belongColumn" label="所属栏目" show-overflow-tooltip/>
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
          <el-button type="text" @click="handleAdd">添加</el-button>/
          <el-button type="text" style="color:#f95757" @click="handleAutoGet">自动获取</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" title="选择相关文章">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <el-tree
            ref="websitTree"
            :data="treeData"
            :highlight-current="true"
            :check-on-click-node="true"
            @node-click="handleNodeClick"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection" width="55"/>
            <el-table-column prop="title" label="标题"/>
            <el-table-column prop="belongColumn" label="所属栏目"/>
            <el-table-column prop="releaseTime" label="发布时间"/>
            <el-table-column prop="author" label="发布时间"/>
          </el-table>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { TreeData } from './mockData.js'
import { mapGetters } from 'vuex'
import { getRelationDoc } from '@/api/cms/article'
export default {
  name: 'RelatedDocuments',
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
            // _this.docInformation = response.data.result
            // _this.formData =  response.data.result
            // _this.formData.contentVideosList = _this.differenceFile(response.data.result.articleAttachmentsList, 'VIDEO')
            // _this.formData.contentImagesList = _this.differenceFile(response.data.result.articleAttachmentsList, 'IMG')
            // _this.formData.contentAudioList = _this.differenceFile(response.data.result.articleAttachmentsList, 'AUDIO')
            // _this.formData.articleAttachmentsList = _this.differenceFile(response.data.result.articleAttachmentsList, 'OTHER')
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
    handleNodeClick() {
      this.changeOptionalData()
    },
    changeOptionalData() {
      console.log('假装改变一下数据')
    },
    handleAutoGet() {},
    handleEdit() {},
    handleDelete() {}
  }
}
</script>
<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 0px;
}

.relatedDocuments-wrap {
}
</style>

