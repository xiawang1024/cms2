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
      <el-table-column prop="msgType" label="类型" width="100" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ pushType[scope.row.msgType] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="发布时间" width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operatorId" label="发布人员" width="150" show-overflow-tooltip/>
      <!-- <el-table-column prop="createTime" label="送达" min-width="150" show-overflow-tooltip/>
      <el-table-column prop="createTime" label="失败" min-width="150" show-overflow-tooltip/> -->
      <el-table-column prop="viewedDeviceCount" label="打开率" width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.viewedDeviceCount }}%</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" @sizeChange="sizeChange" @pageChange="pageChange" ref="pagination"/>
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
import { messageList, appList } from "@/api/cms/pushMessage";
import Pagination from '@/common/Pagination'
import addMessage from './addMessage'
import { searchSetting } from './setting'
import { handleDate } from '@/utils/date-filter'
// import { download } from '@/utils/common'
export default {
  components: {
    Pagination,
    addMessage
  },
  data () {
    return {
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
  mounted() {
    this.getMessageList()
    this.getAppList()
  },
  methods: {
    goBack() {
      this.showAdd = false
      this.getMessageList()
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
      this.$refs.pagination.currentPage = 1
      this.page = 1
      this.searchData = data
      if (this.searchData.publistTime && this.searchData.publistTime.length) {
        this.searchData.startTime = handleDate(this.searchData.publistTime[0], 'day')
        this.searchData.endTime = handleDate(this.searchData.publistTime[1], 'day')
      }
      delete this.searchData.publistTime
      this.getMessageList()
    },
    handel() {
      this.showAdd = true
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