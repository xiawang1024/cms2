<template>
  <div class="column-template">
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
        <div class="used-template">
          <div class="used-template-title">使用的模板</div>
          <el-table
            :data="tableData"
            :show-header="false"
            style="width: 100%">
            <el-table-column prop="address" label="地址"/>
            <el-table-column
              label="地址"
              width="50">
              <template slot-scope="scope">
                <i class="el-icon-error" @click="removeColumn"/>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="16" :lg="16" :xl="16">
        <div class="useble-template">
          <div class="useble-template-title">
            <div class="useble-template-title-left">可用模板</div>
            <el-radio-group v-model="columnType">
              <el-radio label="own">此栏目</el-radio>
              <el-radio label="father">父栏目</el-radio>
              <el-radio label="global">全局</el-radio>
            </el-radio-group>
          </div>
          <el-table
            :data="temlateList"
            style="width: 100%">
            <el-table-column prop="templateName" label="名称" width="180"/>
            <el-table-column prop="templateType" label="平台/类别" width="120"/>
            <el-table-column prop="channelName" label="所属栏目"/>
            <el-table-column prop="createTime" label="创建时间" width="180"/>
            <el-table-column
              label=""
              width="50">
              <template slot-scope="scope">
                <el-button type="text">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="pageNum"
            :page-sizes="[10,30,60,100]"
            :page-size="pageSize"
            :total="totalCount"
            background
            class="pagination"
            layout="total, sizes, prev, pager, next, jumper"
            style="float: right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { fetchList } from '@/api/cms/template'
export default {
  name: 'ColumnTemplate',
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      columnType: 'own',
      pageNum: 1,
      pageSize: 10,
      temlateList: [],
      totalCount: 0,
      channelId: ''
    }
  },
  watch: {
    columnType(val) {
      switch (val) {
        case 'own':
          this.channelId = this.$route.query.channelId
          this.fetchList()
          break
        case 'father':
          this.channelId = this.$route.query.parentChannelId
          this.fetchList()
          break
        case 'global':
          this.channelId = ''
          this.fetchList()
          break
      }
    }
  },
  mounted() {
    this.fetchList()
  },
  methods: {
    removeColumn() {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      }).catch(() => {
      })
    },
    fetchList() {
      var _this = this
      var searchObjTmp = {
        channelId: _this.channelId,
        enableFlag: 0
      }
      return new Promise((resolve, reject) => {
        fetchList(searchObjTmp, _this.pageNum, _this.pageSize)
          .then((response) => {
            _this.temlateList = response.data.result.content
            _this.totalCount = response.data.result.total
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.fetchList()
    }
  }
}
</script>
<style lang="scss" scoped>
.column-template {
  margin: 30px;
  .used-template {
     border-right: 1px solid  #ebeef5;
     padding-right: 10px;
    //  border-bottom: 1px solid  #fff;
    .used-template-title {
    }
    .el-table {
      margin-top:44px;
    }
    .el-icon-error {
      cursor: pointer;
      color: #F56C6C;
    }
  }
  .useble-template {
    .useble-template-title {
      display: flex;
      .useble-template-title-left {
        margin-right: 30px;
      }
    }
    .pagination {
      margin-top:30px;
    }
  }
}
</style>

