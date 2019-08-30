<template>
  <div class="push-message">
    <div class="v-search-header">
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div>
    <div class="push-message-tool-bar">
      <el-button size="mini" type="primary" @click="handel('add')">群发消息</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" highlight-current-row >
      <el-table-column prop="title" label="推送标题" min-width="150" show-overflow-tooltip/>
      <el-table-column prop="title" label="推送内容" min-width="150" show-overflow-tooltip/>
      <el-table-column prop="msgType" label="类型" min-width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ pushType[scope.row.msgType] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="发布时间" min-width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="tenantId" label="发布人员" min-width="150" show-overflow-tooltip/>
      <!-- <el-table-column prop="createTime" label="送达" min-width="150" show-overflow-tooltip/>
      <el-table-column prop="createTime" label="失败" min-width="150" show-overflow-tooltip/> -->
      <el-table-column prop="viewedDeviceCount" label="打开率" min-width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.viewedDeviceCount }}%</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" @sizeChange="sizeChange" @pageChange="pageChange"/>
    <v-page :visible.sync="showAdd">
      <h3 slot="title">app消息推送</h3>
      <template slot="content">
        <!-- 详情页组件 -->
        <add-message @goBack="goBack"/>
      </template>
    </v-page>
  </div>
</template>
<script>
import { createSensitive, updateSensitive, deleteSensitive, downloadExcel } from "@/api/cms/sensitiveWord";
import { messageList, appList } from "@/api/cms/pushMessage";
import Pagination from '@/common/Pagination'
import baseUrl from "@/config/base-url";
import addMessage from './addMessage'
import { searchSetting } from './setting'
// import { download } from '@/utils/common'
export default {
  components: {
    Pagination,
    addMessage
  },
  data () {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      formData: {},
      isLoading: false,
      handelType: 'add',
      searchSettings: searchSetting,
      searchData: {
      },
      page: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      showAdd: false,
      pushType: {
        'NEWS': '新闻',
        'LIVE': '直播',
        'VIDEO': '视频',
        'URL': 'ULR',
      }
    }
  },
  computed: {
    importUrl() {
      return  `${baseUrl.BASE_URL}/news-comment/sensitive-words/import-excel`
    },
    uploadHeaders() {
      return {
        Authorization: 'bearer ' + this.$store.getters.token.access_token
      }
    }
  },
  mounted() {
    this.getMessageList()
    this.getAppList()
  },
  methods: {
    goBack() {
      this.showAdd = false
      this.getMessageList()
    },
    downModel() {
      downloadExcel('bearer ' + this.$store.getters.token.access_token)
    },
    uploadSuccess() {
      this.$message.success('批量导入成功')
      this.getMessageList()
    },
    beforeAvatarUpload(file) {
      let isXls
      if (file.name) {
        isXls = file.name.split('.')[file.name.split('.').length -1]
      }
      if ((isXls !== 'xls') && (isXls !== 'xlsx')) {
        this.$message.warning('导入文件只能是.xls 或 .xlsx 格式')
        return false
      }
      return isXls
    },
    onError() {

    },
    sizeChange(val) {
      this.pageSize = val
      this.getMessageList()
    },
    pageChange(val) {
      this.page = val
      this.getMessageList()
    },
    getMessageList() {
      this.searchData.pageNo = this.page
      this.searchData.pageSize = this.pageSize
      return new Promise((resolve, reject) => {
        messageList(this.searchData).then(async res => {
          console.log(res.data.result.content)
          this.total = parseInt(res.data.result.totalElements)
          this.tableData = res.data.result.content
          // 结束
          resolve()
        })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },
    getAppList() {
      return new Promise((resolve, reject) => {
        appList(this.searchData).then(async res => {
          this.total = res.data.result.total
          this.tableData = res.data.result.records
          // 结束
          resolve()
        })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },
    searchItem(data) {
      this.searchData = data
      this.getMessageList()
    },
    handel() {
      this.showAdd = true
    },
    handleDelete(row) {
      this.$confirm('确定删除该敏感词吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return new Promise((resolve, reject) => {
          deleteSensitive(row.sensitiveId)
            .then(response => {
              this.$message.success('删除成功')
              this.getMessageList()
              resolve()
            })
            .catch(error => {
              reject(error)
            })
      })
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
      }).catch(() => {     
      })
    },
    submitSave(data) {
      this.isLoading = true
      if(this.handelType === 'add') {
        this.addSensitive(data)
      } else {
        this.editSensitive(data, this.formData.sensitiveId)
      }
    },
    editSensitive(data, id) {
      data.sensitiveId = id
      return new Promise((resolve, reject) => {
        updateSensitive(data)
          .then(response => {
            this.$message.success('编辑成功')
            this.dialogVisible = false
            this.isLoading = false
            this.getMessageList()
            resolve()
          })
          .catch(error => {
            this.isLoading = false
            reject(error)
          })
      })
    },
    addSensitive(data) {
      return new Promise((resolve, reject) => {
        createSensitive(data)
          .then(response => {
            this.$message.success('添加成功')
            this.dialogVisible = false
            this.isLoading = false
            this.getMessageList()
            resolve()
          })
          .catch(error => {
            this.isLoading = false
            reject(error)
          })
      })
    }
  }
}
</script>
<style lang="scss">
  .push-message{
    .upload{
      display: inline-block;
    }
    .push-message-tool-bar{
      margin-top:10px;
    }
    .v-form{
      .save-btn{
        margin-bottom:0px;
      }
    }
  }
</style>