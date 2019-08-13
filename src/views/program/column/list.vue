<template>
  <div class="column-manage">
    <div class="v-search-header">
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div>
    <div class="tool-bar">
      <router-link :to="'/program/column/create'">
        <el-button v-waves type="primary" size="small">{{ $t('table.add') }}</el-button>
      </router-link>
    </div>
    

    <el-table v-loading="listLoading" :data="list" fit highlight-current-row style="width: 100%">
      <el-table-column label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.columnId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="栏目名称">
        <template slot-scope="scope">
          <span>{{ scope.row.columnName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="所属频率">
        <template slot-scope="scope">
          <span>{{ JSON.parse(scope.row.columnInfo).channel_name }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" width="200">
        <template slot-scope="scope">
          <router-link :to="'/program/column/edit/'+scope.row.columnId">
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
import { fetchList, removeColumn } from '@/api/program/column'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  name: 'ColumnList',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      totalCount: 0,
      listLoading: false,
      searchSettings: [{
        label: '栏目名称',
        name: 'type',
        placeholder: '栏目名称',
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
        removeColumn(row.columnId).then((res) => {
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
.column-manage {
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
