<template>
  <div class="article-check">
    <el-table :data="tableData" style="width: 100%" highlight-current-row >
      <el-table-column prop="id" label="ID/序号" min-width="250" show-overflow-tooltip/>
      <el-table-column prop="articleTitle" label="标题" min-width="100" show-overflow-tooltip/>
      <!-- <el-table-column prop="channelCode" label="排序" min-width="80"/> -->
      <el-table-column prop="multiAudit" label="预览"/>
      <el-table-column prop="articleType" label="类型"/>
      <el-table-column prop="articleStatus" label="审核状态"/>
      <el-table-column prop="tagIdsList" label="标记">
        <template slot-scope="scope">
          <span>
            {{ scope.row.tagIdsList.join(',') }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="220"/>
      <el-table-column prop="createUser" label="撰稿人" min-width="100px"/>
      <el-table-column prop="createUser" label="栏目来源" min-width="100px"/>
      <el-table-column prop="previousAuditUser" label="审稿来源" min-width="100px" />
      <el-table-column label="操作" width="160" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="check(scope.row)">审核</el-button>
          <el-button size="mini" type="success" @click="lookProcess(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="totalCount" @sizeChange="sizeChange" @pageChange="pageChange"/>
    <process-dialog :dialog-visible.sync="showProcess" :process-data="processData"/>
  </div>
</template>

<script>
// import { fetchDictByDictName } from '@/api/cms/dict'

import {  checkArticleList, getProcess  } from '@/api/cms/articleCheck'
import Pagination from '@/common/Pagination'
import mixins from '@/components/cms/mixins'
import processDialog from './processDialog'
export default {
  name: 'ArticleCheck',
  components: {
    Pagination,
    processDialog
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
      processData: {}
    }
  },
  watch:{
  },
  mounted() {
    this.getCheckList()
  },
  methods: {
    check(row) {

    },
    lookProcess(row) {
      return new Promise((resolve, reject) => {
        getProcess({businessId: row.articleId})
          .then((response) => {
            this.showProcess = true
            // this.processData = response.data.
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
}
</style>
