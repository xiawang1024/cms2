<template>
  <div class="column-mange-template">
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
                <el-table-column prop="templateName" label="地址">
                  <template slot-scope="scope">
                    <div> 
                      <span class="title-color">{{ scope.row.templateName }}</span> 
                      <span class="fz-12">{{ scope.row.managerId }}</span>
                    </div>
                    <div>{{ scope.row.templateDescription }}</div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="地址"
                  width="50">
                  <template slot-scope="scope">
                    <i class="el-icon-error" @click="removeColumn(scope.$index, tableData, scope.row)"/>
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
              :data="templateList"
              style="width: 100%">
              <el-table-column prop="templateName" label="名称" min-width="120"/>
              <el-table-column prop="templateFormat" label="平台/类别" width="100"/>
              <el-table-column prop="channelName" label="所属栏目" min-width="120"/>
              <el-table-column prop="createTime" label="创建时间" width="180"/>
              <el-table-column
                label=""
                width="70">
                <template slot-scope="scope">
                  <div v-if="scope.row.isChoosed">已选择</div>
                  <el-button type="text" @click="addTemplate(scope.row)" v-else>添加</el-button>
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
    <div class="btn">
      <el-button type="primary" size="mini" class="save-btn" @click="submitSave" :loading="isLoading">保存</el-button>
    </div>
  </div>
</template>
<script>
import { fetchList } from '@/api/cms/template'
import { columnInfor, editColumn, columnTemplateList } from '@/api/cms/columnManage'
export default {
  name: 'ColumnTemplate',
  props: {
    columnRow: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      tableData: [],
      columnType: 'own',
      pageNum: 1,
      pageSize: 10,
      templateList: [],
      totalCount: 0,
      channelId: '',
      isLoading: false,
      columnData: {}
    }
  },
  watch: {
    columnType(val) {
      switch (val) {
        case 'own':
          this.channelId = this.columnRow.channelId
          this.fetchList()
          break
        case 'father':
          this.channelId = this.columnRow.parentChannelId
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
    console.log(this.columnRow, 'this.columnRow')
    this.channelId = this.columnRow.channelId
    this.fetchList()
    this.getColumnInfor()
    // this.columnTemplateList()
  },
  methods: {
    columnTemplateList(ids) {
      var _this = this
      return new Promise((resolve, reject) => {
        columnTemplateList(ids)
          .then((response) => {
             _this.tableData = response.data.result
            // if(_this.isEdit) {
            //   _this.formData = response.data.result
            //   if(_this.formData.iconUrl) {
            //     _this.formData.iconUrl = [{
            //       url: _this.formData.iconUrl
            //     }]
            //   } else {
            //     _this.formData.iconUrl = []
            //   }
            // } else {
            //   _this.formData = {
            //     parentChannelNames: response.data.result.channelName
            //   }
            // }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getColumnInfor() {
      var _this = this
      return new Promise((resolve, reject) => {
        columnInfor(this.channelId)
          .then((response) => {
            _this.columnData = response.data.result
            // _this.tagRule = response.data.result.tagRule ? response.data.result.tagRule :  _this.tagRule
            if(response.data.result.templateIds) {
              _this.columnTemplateList(response.data.result.templateIds)
            }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    removeColumn(index, rows, row) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rows.splice(index, 1)
        this.templateList.map((ele) => {
          if(ele.templateId === row.templateId) {
            ele.isChoosed = false
          }
        })
        this.$nextTick(() => {
          this.templateList = this.templateList.slice(0)
        })
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
            _this.templateList = response.data.result.content
            _this.totalCount = response.data.result.total
            for(let i=0; i< _this.templateList.length; i++) {
              for(let j=0; j< _this.tableData.length; j++) {
                if( _this.tableData[j].templateId === _this.templateList[i].templateId) {
                  _this.templateList[i].isChoosed = true
                }
              }
            }
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
      this.tableData.push(row)
      this.templateList.map((ele) => {
        if(ele.templateId === row.templateId) {
          ele.isChoosed = true
        }
      })
      this.$nextTick(() => {
        this.templateList = this.templateList.slice(0)
      })
    },
    submitSave() {
      let templateIds = []
      if(this.tableData.length) {
        this.tableData.forEach((ele) => {
          templateIds.push(ele.templateId)
        })
      }
      this.isLoading = true
      var _this = this
      return new Promise((resolve, reject) => {
        _this.columnData.templateIds = templateIds.length ? templateIds.join(',') : ''
        editColumn(_this.columnData)
          .then((response) => {
            _this.$message({ showClose: true, message: '操作成功!', type: 'success' })
            _this.isLoading = false
            resolve()
          })
          .catch((error) => {
            _this.isLoading = false
            reject(error)
          })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// .column-mange-template {
//   .
// }
.btn{
  margin-top:30px;
  margin-bottom:20px;
}
.column-template {
  border-bottom: 1px solid #e8e8e8;
  padding-bottom:20px;
  .used-template {
     padding-right: 10px;
    .used-template-title {
      margin-bottom: 22px;
    }
    .el-table {
      .title-color {
        color: #409EFF;
      }
      .fz-12{
        font-size: 12px;
      }
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

