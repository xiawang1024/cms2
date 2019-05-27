<template>
  <div>
    <div class="add-btn">
      <el-button type="primary" size="mini" @click="handelLive">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" highlight-current-row >
      <el-table-column prop="articleLiveCommentUser" label="直播人" min-width="100" show-overflow-tooltip/>
      <!-- <el-table-column prop="channelCode" label="排序" min-width="80"/> -->
      <el-table-column prop="articleLiveCommentTime" label="发布时间" min-width="220">
        <template slot-scope="scope">
          {{ scope.row.articleLiveCommentTime | timeFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="articleLiveCommentContent" label="信息" min-width="220"/>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editLive(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteLive(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="totalCount" @sizeChange="sizeChange" @pageChange="pageChange"/>
    <handel-dialog :dialog-visible.sync="showHandel" :title="title" :live-row="liveRow" @handelSuccess="handelSuccess"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import Tinymce from '@/components/Tinymce'
import handelDialog from './handelDialog'
import { getLiveList, deleteLive } from '@/api/cms/article'
import Pagination from '@/common/Pagination'
export default {
  components: {
    handelDialog,
    Pagination
  },
  props: {
    activeName: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      showHandel: false,
      title: '添加',
      tableData: [],
      liveRow: {}
    }
  },
  computed: {
    ...mapGetters(['treeTags', 'contextMenu'])
  },
  watch: {
    activeName(val) {
      if(val == 'liveInformation') {
        this.getliveList()
      }
    }
  },
  mounted() {
    this.getliveList()
  },
  methods: {
    handelSuccess () {
      this.getliveList()
    },
    editLive(row) {
      this.title = '编辑',
      this.showHandel = true
      this.liveRow = row
    },
    deleteLive(row) {
      this.$confirm('是否删除该直播?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return new Promise((resolve, reject) => {
            let params = {
              articleId: this.contextMenu.docId,
              articleLiveCommentId: row.articleLiveCommentId
            }
            deleteLive(params)
              .then((response) => {
                this.$message.success('删除成功')
                this.getliveList()
                resolve()
              })
              .catch((error) => {
                reject(error)
              })
          })
        }).catch(() => {       
        })
    },
    submitSave() {

    },
    goBack() {

    },
    handelLive() {
      this.showHandel = true
      this.title = '添加'
      this.liveRow = {}
    },
    getliveList() {
      return new Promise((resolve, reject) => {
        getLiveList({ articleId: this.contextMenu.docId }, this.pageNum, this.pageSize)
          .then((response) => {
            this.tableData = response.data.result.content
            this.totalCount = response.data.result.total
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    sizeChange(val) {
      this.pageSize = val
      this.getliveList()
    },
    pageChange(val) {
      this.pageNum = val
      this.getliveList()
    }
  }
}
</script>
<style lang="scss">
  .column-live-infor{
    .add-btn {
    }
  }
</style>