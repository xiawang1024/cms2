<template>
  <div class="push-message">
    <div class="v-search-header">
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div>
    <div class="push-message-tool-bar">
      <el-button size="mini" type="primary" @click="handel('add')">群发消息</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" highlight-current-row >
      <el-table-column prop="word" label="敏感词" min-width="150" show-overflow-tooltip/>
      <el-table-column prop="createTime" label="创建日期" min-width="150" show-overflow-tooltip/>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handel('edit', scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" @sizeChange="sizeChange" @pageChange="pageChange"/>
    <v-page :visible.sync="showAdd" @goBack="goBack">
      <h3 slot="title">app消息推送</h3>
      <template slot="content">
        <!-- 详情页组件 -->
        <add-message/>
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
      formSettings: [
        {
          items: [
            {
              label: '敏感词',
              name: 'word',
              type: 'text',
              valueType: 'string',
              required: true,
              placeholder: '请输入敏感词'
            }
          ]
        }
      ],
      formData: {},
      isLoading: false,
      handelType: 'add',
      searchSettings: [{
        label: '消息标题',
        name: 'word',
        type: 'text',
        placeholder: '请输入消息标题',
        visible: true
      }, {
        label: '发布人员',
        name: 'word2',
        type: 'select',
        placeholder: '请选择',
        visible: true,
        options: []
      }, {
        label: '发布时间',
        name: 'word3',
        type: 'date',
        placeholder: '请选择'
      }],
      searchData: {
      },
      page: 1,
      pageSize: 10,
      total: 0,
      tableData: [],


      showAdd: false
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