<template>
  <div class="user-switch">
    <div class="v-search-header">
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div>
    <div class="tool-bar">
      <el-button type="primary" size="mini" @click="handel('add')">新增</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" highlight-current-row >
      <el-table-column prop="objectId" label="租户" min-width="150" show-overflow-tooltip/>
      <el-table-column prop="state" label="审核类型" min-width="150" show-overflow-tooltip>
        <template slot-scope="scope">
          <span v-if="scope.row.state == true">先发后审</span>
          <span v-else>先审后发</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建日期" min-width="150" show-overflow-tooltip/>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handel('edit', scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" @sizeChange="sizeChange" @pageChange="pageChange"/>
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" width="30%">
      <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" label-width="80px" :btn-loading = "isLoading"/>
    </el-dialog>
  </div>
</template>
<script>
import { createSwitch, fetchSwitchsList, updateSwitch, deleteSwitch } from "@/api/cms/userSwitch";
import Pagination from '@/common/Pagination'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      dialogVisible: false,
      dialogTitle: '新增',
      formSettings: [
        {
          items: [
            {
              label: '租户',
              name: 'objectId',
              type: 'text',
              valueType: 'string',
              required: true,
              placeholder: '请输入租户'
            },
            {
              label: '审核方式',
              name: 'state',
              type: 'switch',
              activeText: '先发后审',
              inactiveText: '先审后发',
              inactiveColor: '#13ce66',
              activeValue: true,
              inactiveValue: false,
              value: true
            }
          ]
        }
      ],
      formData: {},
      isLoading: false,
      handelType: 'add',
      searchSettings: [{
        label: '租户',
        name: 'objectId',
        type: 'text',
        placeholder: '请输入租户',
        visible: true
      }],
      searchData: {
        objectId: ''
      },
      page: 1,
      pageSize: 10,
      total: 0,
      tableData: []
    }
  },
  computed: {
  },
  mounted() {
    this.getSwitchList()
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val
      this.getSwitchList()
    },
    pageChange(val) {
      this.page = val
      this.getSwitchList()
    },
    getSwitchList() {
      return new Promise((resolve, reject) => {
        fetchSwitchsList(this.searchData.objectId, this.page, this.pageSize).then(async res => {
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
      this.getSwitchList()
    },
    handel(type, row) {
      this.isLoading = false
      this.handelType = type
      this.dialogTitle = type === 'add' ? '添加' : '编辑'
      if(row) {
        this.formData = row
      } else {
        this.formData = {}
      }
      this.dialogVisible = true
    },
    handleDelete(row) {
      this.$confirm('确定删除该审核设置吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return new Promise((resolve, reject) => {
          deleteSwitch(row.switchId)
            .then(response => {
              this.$message.success('删除成功')
              this.getSwitchList()
              resolve()
            })
            .catch(error => {
              reject(error)
            })
      })
      }).catch(() => {     
      })
    },
    submitSave(data) {
      this.isLoading = true
      if(this.handelType === 'add') {
        this.addSwitch(data)
      } else {
        this.editSwitch(data, this.formData.switchId)
      }
    },
    editSwitch(data, id) {
      data.switchId = id
      return new Promise((resolve, reject) => {
        updateSwitch(data)
          .then(response => {
            this.$message.success('编辑成功')
            this.dialogVisible = false
            this.isLoading = false
            this.getSwitchList()
            resolve()
          })
          .catch(error => {
            this.isLoading = false
            reject(error)
          })
      })
    },
    addSwitch(data) {
      return new Promise((resolve, reject) => {
        createSwitch(data)
          .then(response => {
            this.$message.success('添加成功')
            this.dialogVisible = false
            this.isLoading = false
            this.getSwitchList()
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
  .user-switch{
    .tool-bar{
      margin-top:10px;
    }
    .v-form{
      .save-btn{
        margin-bottom:0px;
      }
    }
  }
</style>