<template>
  <div class="article-check">
    <el-table :data="tableData" style="width: 100%" highlight-current-row >
      <el-table-column prop="id" label="ID/序号" width="180" show-overflow-tooltip/>
      <el-table-column prop="articleTitle" label="标题" min-width="180" show-overflow-tooltip/>
      <!-- <el-table-column prop="channelCode" label="排序" min-width="80"/> -->
      <el-table-column prop="multiAudit" label="预览" width="50">
        <template slot-scope="scope">
          <span class="preview"><i class="el-icon-view" title="预览" @click="preview(scope.row)"/></span>
        </template>
      </el-table-column>
      <el-table-column prop="articleType" label="类型" width="50">
        <template slot-scope="scope">
          <span>{{ articleTypeChange(scope.row.articleType) }}</span>
        </template>
      </el-table-column>
      
      <el-table-column prop="articleStatus" label="审核状态" width="80">
        <template slot-scope="scope">
          <span>{{ articleStatusChange(scope.row.articleStatus) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tagIdsList" label="标记" min-width="100" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>
            {{ tagListchange(scope.row.tagIdsList) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="160"/>
      <el-table-column prop="createUser" label="撰稿人" width="100px"/>
      <el-table-column prop="createUser" label="栏目来源" min-width="100px"/>
      <el-table-column prop="previousAuditUser" label="审稿来源" min-width="100px" />
      <el-table-column label="操作" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="check(scope.row)" v-if="scope.row.auditMark">审核</el-button>
          <el-button size="mini" type="success" @click="lookProcess(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="totalCount" @sizeChange="sizeChange" @pageChange="pageChange"/>
    <process-dialog :dialog-visible.sync="showProcess" :process-data="processData"/>
    <check-dialog :dialog-visible.sync="showCheck" :row-data="rowData" @handelSuccess="getCheckList"/>
    <preview-dialog :dialog-visible.sync="showPreview" :article-id="articleId"/>
  </div>
</template>

<script>
// import { fetchDictByDictName } from '@/api/cms/dict'

import {  checkArticleList, getProcess  } from '@/api/cms/articleCheck'
import Pagination from '@/common/Pagination'
import mixins from '@/components/cms/mixins'
import processDialog from './processDialog'
import checkDialog from './checkDialog'
import previewDialog from './previewDialog'
export default {
  name: 'ArticleCheck',
  components: {
    Pagination,
    processDialog,
    checkDialog,
    previewDialog
  },
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      searchData: {},
      showProcess: false,
      showCheck: false,
      showPreview: false,
      processData: [],
      rowData: {},
      articleId: ''
    }
  },
  watch:{
  },
  mounted() {
    this.getCheckList()
  },
  methods: {
    // 标签转换
    tagListchange(val) {
      let res = val.map((ele) => {
        return ele.tagName
      })
      return res.join(',')
    },
    // 文章类型转换
    articleTypeChange(val) {
      switch(val) {
        case '0':
          return '图文'
        case '1':
          return '图集'
        case '2':
          return '拼条'
        case '3':
          return '引用'
        case '4':
          return '转载'
        case '5':
          return '投票'
        case '6':
          return '调查'
        case '7':
          return '单页'
      }
    },
    articleStatusChange(val) {
      switch(val) {
        case '0':
          return '待审核'
        case '1':
          return '审核通过'
        case '2':
          return '审核拒绝'
        case '3':
          return '返回上一级 '
        case '4':
          return '审核中'
      }
    },
    preview(row) {
      this.showPreview = true
      this.articleId = row.articleId
    },
    check(row) {
      this.showCheck = true
      this.rowData = row
    },
    lookProcess(row) {
      return new Promise((resolve, reject) => {
        getProcess({businessId: row.articleId})
          .then((response) => {
            this.showProcess = true
            this.processData = response.data.result
            // this.tableData = response.data.result.content
            // this.totalCount = response.data.result.total
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    sizeChange(val) {
      this.pageSize = val
      this.getCheckList()
    },
    pageChange(val) {
      this.pageNum = val
      this.getCheckList()
    },
    getCheckList() {
      return new Promise((resolve, reject) => {
        checkArticleList({pageNo:this.pageNum, pageSize:this.pageSize})
          .then((response) => {
            this.tableData = response.data.result.content
            this.totalCount = response.data.result.total
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}
</script>

<style lang='scss'>
.article-check{
  margin:30px;
  .preview{
    cursor: pointer;
  }
}
</style>
