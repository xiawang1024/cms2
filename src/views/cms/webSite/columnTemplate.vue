<template>
  <div>
    <div class="column-template">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
          <div class="used-template">
            <div class="used-template-title">选择的模板</div>
            <el-card class="templet-card">
              <el-table
                :data="tableData"
                :show-header="false"
                style="width: 100%">
                <el-table-column prop="address" label="地址">
                  <template slot-scope="scope">
                    <div>{{ scope.row.templateName }}</div>
                    <div>{{ scope.row.templateDescription }}</div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="地址"
                  width="50">
                  <template slot-scope="scope">
                    <i class="el-icon-error" @click="removeColumn(scope.$index, tableData)"/>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </div>
        </el-col>
        <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
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
                  <el-button type="text" @click="addTemplate(scope.row)">添加</el-button>
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
    <div>
      <el-button type="primary" size="small" class="save-btn">保存</el-button>
    </div>
  </div>
</template>
<script>
import { fetchList } from '@/api/cms/template'
export default {
  name: 'ColumnTemplate',
  data() {
    return {
      tableData: [],
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
    this.channelId = this.$route.query.channelId
    this.fetchList()
  },
  methods: {
    removeColumn(index, rows) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rows.splice(index, 1);
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
    },
    addTemplate(row) {
      console.log(row)
      this.tableData.push(row)
    }
  }
}
</script>
<style lang="scss" scoped>
.column-template {
  margin: 30px;
  border-bottom: 1px solid #e8e8e8;
  padding-bottom:20px;
  .used-template {
     padding-right: 10px;
    //  border-bottom: 1px solid  #fff;
    .used-template-title {
      margin-bottom: 22px;
    }
    .el-table {
    }
    .el-icon-error {
      cursor: pointer;
      color: #F56C6C;
    }
  }
  .useble-template {
    .useble-template-title {
       margin-bottom: 22px;
      // display: flex;
      .useble-template-title-left {
        margin-bottom: 22px;
      }
    }
    .pagination {
      margin-top:30px;
    }
  }
}
.save-btn {
  margin-left: 30px;
}
</style>

