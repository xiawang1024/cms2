<template>
  <div class="program-manage">
    <div class="el-card__header">
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div>
    <div class="tool-bar">
      <router-link :to="'/program/program/create'">
        <el-button v-waves type="primary" size="small">{{ $t('table.add') }}</el-button>
      </router-link>
    </div>
    

    <el-table v-loading="listLoading" :data="list" fit highlight-current-row size="small" style="width: 100%">
      <el-table-column label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.programlistId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="排单名称">
        <template slot-scope="scope">
          <span>{{ scope.row.programlistName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属频率">
        <template slot-scope="scope">
          <span>{{ scope.row.channelInfo.channelName }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" width="200">
        <template slot-scope="scope">
          <router-link :to="'/program/program/edit/'+scope.row.programlistId">
            <el-button v-waves type="primary" size="mini">{{ $t('table.edit') }}</el-button>
          </router-link>
          <el-button v-waves type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">{{ $t('table.delete') }}
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

  </div>
</template>

<script>
import { fetchList, removeProgram } from '@/api/program/program'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ProgramList',
  components: { Pagination },
  directives: { waves },
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
            label: '排单名称',
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
    //删除
    handleDel(index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        removeProgram(row.programlistId).then((res) => {
          this.listLoading = false
          //NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getList()
        });
      }).catch(() => {

      });
    },
    searchItem(searchData) {
      this.searchData.type = searchData.type
      this.searchData.content = searchData.content
      this.getList()
    },
    handleFilter() {
      this.searchData.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.searchData.limit = val
      this.getList()``
    },
    handleCurrentChange(val) {
      this.searchData.page = val
      this.getList()
    }
  }
}
</script>

<style lang='scss'>
.program-manage {
  margin:30px;
  .tool-bar {
    margin-top:22px;
  }
  .pagination {
    margin-top:20px;
    margin-bottom:20px;
  }
  .el-table {
    // td, th{
    //   padding:0;
    // }
    .space-holder {
      width: 2px;
      height: 20px;
      background-color: #67C23A;
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
    .space-length{
      width: 10px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
    }
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
