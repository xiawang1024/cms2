<template>
  <div class="channel-manage">
    <div class="v-search-header">
      <!-- <el-select v-model="listQuery.type" :placeholder="$t('table.type')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in channelTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-input :placeholder="$t('table.content')" v-model="listQuery.content" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/> -->
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div>
    <!-- <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button> -->
    <div class="tool-bar">
      <router-link :to="'/program/channel/create'">
        <el-button v-waves type="primary" size="small">{{ $t('table.add') }}</el-button>
      </router-link>
    </div>

    <el-table v-loading="listLoading" :data="list" fit highlight-current-row style="width: 100%">
      <el-table-column label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.channelId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="频率名称">
        <template slot-scope="scope">
          <span>{{ scope.row.channelName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属类别">
        <template slot-scope="scope">
          <span>{{ scope.row.classId | classFilter }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否点播" width="200">
        <template slot-scope="scope">
          <el-button size="mini" v-waves type="success" 
                     v-if="JSON.parse(scope.row.channelInfo).vod_set == 0"
                     @click="changeVodStatus(scope.row, '1')">{{ $t('table.open') }}</el-button>
          <el-button size="mini" v-waves type="danger" 
                     v-else @click="changeVodStatus(scope.row, '0')">{{ $t('table.close') }}</el-button>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.status')" class-name="status-col" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusStyleFilter">{{ scope.row.status | statusFilter }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" width="300">
        <template slot-scope="scope">
          <router-link :to="'/program/channel/edit/'+scope.row.channelId">
            <el-button type="primary" size="mini" v-waves>{{ $t('table.edit') }}</el-button>
          </router-link>
          <el-button type="warning" size="mini" v-if="scope.row.status == 1"
                     @click="handleDel(scope.row, 0)" v-waves>{{ $t('table.disable') }}
          </el-button>
          <el-button type="success" size="mini" v-waves v-else
                     @click="handleDel(scope.row, 1)">{{ $t('table.enable') }}
          </el-button>
          <el-button type="danger" size="mini" style="margin-left: 0px"
                     @click="remove(scope.row)" v-waves>{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="searchData.page"
      :page-sizes="[20,50,100]"
      :page-size="searchData.limit"
      :total="totalCount"
      background
      class="pagination"
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

  </div>
</template>

<script>
import { fetchList, removeChannel, updateVod, updateChannel } from '@/api/program/channel'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

// const channelTypeOptions = [
//   { key: 'ID', display_name: 'ID' },
//   { key: 'name', display_name: '频率名称' }
// ]

export default {
  name: 'ChannelList',
  components: { Pagination },
  directives: { waves },
  filters: {
    classFilter(value) {
      if (!value) return ''
      const classMap = {
        1: '河南台',
        2: '网络广播',
        3: '市县台',
        4: '警广之声',
        5: '中央台',
        6: '听电视'
      }
      // 去掉前后','
      if (value.startsWith(',')) {
        value=value.substring(1)
      }
      if(value.endsWith(',')) {
        value = value.substring(0, value.lastIndexOf(','))
      }
      let classArr = value.split(',')
      let class_arr = classArr.map(item => { 
          return classMap[item]
      })
      return class_arr.join('、')
    },
    statusStyleFilter(status) {
      const statusStyleMap = {
        1: 'success',
        0: 'danger'
      }
      return statusStyleMap[status]
    },
    statusFilter(status) {
      const statusMap = {
        1: '已启用',
        0: '已停用'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      totalCount: 0,
      listLoading: false,
      searchSettings: [{
        label: '类型',
        name: 'type',
        placeholder: '类型',
        visible: true,
        type: 'select',
        options: [
          {
            label: 'ID',
            value: 'ID'         
          },
          {
            label: '频率名称',
            value: 'name'         
          }
        ]
      }, {
        label: '内容',
        name: 'content',
        placeholder: '内容',
        visible: true,
        type: 'text'
      }],
      // listQuery: {
      //   page: 1,
      //   limit: 20,
      //   type: undefined,
      //   content: undefined,
      //   userId: this.$store.getters.tenantId
      // },
      searchData: {
        page: 1,
        limit: 20,
        type: undefined,
        content: undefined,
        userId: this.$store.getters.tenantId
      }
    }
  },
  watch:{
    //监视路由的变化来确定是否要再次获取数据
    //避免返回列表时不刷新数据 
    '$route':["getList"]
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.searchData).then(response => {
        this.list = response.data.result.content
        this.totalCount = response.data.result.totalElements
        this.listLoading = false
      })
    },
    // 更改状态
    handleDel(row, status) {
        this.listLoading = true
        updateChannel(row.channelId, status).then((res) => {
          this.listLoading = false
          this.$message({
            message: '更改成功',
            type: 'success'
          });
          row.status = status
        }).catch(() => {

        });
    },
    searchItem(searchData) {
      this.searchData.type = searchData.type
      this.searchData.content = searchData.content
      this.getList()
    },
    // 删除频率信息
    remove(row) {
      this.$confirm('是否删除该频率?该操作会删除所有与该频率相关联的信息', '提示', {
          type: 'warning'
          

          
				}).then(() => {
        this.listLoading = true
        removeChannel(row.channelId).then((res) => {
          this.listLoading = false
          this.$message({
            message: '更改成功',
            type: 'success'
          });
          this.getList()
          });
        }).catch(() => {

				});
    },
    // 改变点播状态
    changeVodStatus(row, status) {
      this.$confirm('是否开启/关闭点播?', '提示', {
					type: 'warning'
				}).then(() => {
        this.listLoading = true
        updateVod(row.channelId, status).then((res) => {
          this.listLoading = false
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          let channelInfoJSON = JSON.parse(row.channelInfo)
          channelInfoJSON.vod_set = status
          row.channelInfo = JSON.stringify(channelInfoJSON)
          });
        }).catch(() => {

				});
    },

    handleFilter() {
      this.searchData.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.searchData.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.searchData.page = val
      this.getList()
    }
  }
}
</script>
<style lang='scss'>
.channel-manage {
  // margin:30px;
  .tool-bar {
    margin-top:22px;
  }
  .pagination {
    margin-top:20px;
    margin-bottom:20px;
  }
}
</style>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>