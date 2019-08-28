<template>
  <div class="class-manage">
    <div class="v-search-header">
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div>
    <div class="tool-bar">
      <router-link :to="'/program/class/create'">
        <el-button v-waves type="primary" size="small">{{ $t('table.add') }}</el-button>
      </router-link>
    </div>

    <el-table v-loading="listLoading" :data="list" fit highlight-current-row style="width: 100%">
      <el-table-column label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.classid }}</span>
        </template>
      </el-table-column>

      <el-table-column label="类目名称">
        <template slot-scope="scope">
          <span>{{ scope.row.classname }}</span>
        </template>
      </el-table-column>

      <el-table-column label="父级类目">
        <template slot-scope="scope">
          <span>{{ scope.row.parentid }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('table.actions')" width="200">
        <template slot-scope="scope">
          <router-link :to="'/program/class/edit/'+scope.row.classid">
            <el-button v-waves type="primary" size="mini">{{ $t('table.edit') }}</el-button>
          </router-link>
          <el-button v-waves type="danger" size="mini" @click="handleDel(scope.$index, scope.row)" >{{ $t('table.delete') }}
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
import { fetchList, removeClass } from '@/api/program/class'
import waves from '@/directive/waves' // Waves directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination


export default {
  name: 'ClassList',
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
            label: '类别名称',
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
        content: undefined
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
        console.log(row.classid)
        this.listLoading = true
        removeClass(row.classid).then((res) => {
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
      this.searchData.page = 1
      this.searchData.limit = 20
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
.class-manage {
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
