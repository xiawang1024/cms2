<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.type" :placeholder="$t('table.type')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in columnTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-input :placeholder="$t('table.content')" v-model="listQuery.content" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <router-link :to="'/column/create'">
        <el-button v-waves class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">{{ $t('table.add') }}</el-button>
      </router-link>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.columnId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="栏目名称">
        <template slot-scope="scope">
          <span>{{ scope.row.columnName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属频率">
        <template slot-scope="scope">
          <span>{{ JSON.parse(scope.row.columnInfo).channel_name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.actions')" width="200">
        <template slot-scope="scope">
          <router-link :to="'/column/edit/'+scope.row.columnId">
            <el-button v-waves type="primary" size="small" icon="el-icon-edit">{{ $t('table.edit') }}</el-button>
          </router-link>
          <el-button v-waves type="danger" size="small" @click="handleDel(scope.$index, scope.row)" icon="el-icon-delete">{{ $t('table.delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import { fetchList, removeColumn } from '@/api/program/column'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

const columnTypeOptions = [
  { key: 'ID', display_name: 'ID' },
  { key: 'name', display_name: '栏目名称' }
]

export default {
  name: 'ColumnList',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
        type: undefined,
        content: undefined,
        userId: 1     //登陆用户先默认1
      },
      columnTypeOptions
    }
  },
  created() {
    this.getList()
  },
  watch:{
    //监视路由的变化来确定是否要再次获取数据
    //避免返回列表时不刷新数据 
    '$route':["getList"]
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.result.content
        this.total = response.data.result.totalElements
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
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>

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
