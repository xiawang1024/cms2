<template>
  <div class="sensitive-word">
    <div class="v-search-header">
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div>
    <div class="tool-bar">
      <el-button type="primary" size="mini" @click="handel('add')">新增</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" highlight-current-row >
      <el-table-column prop="word" label="敏感词" min-width="150" show-overflow-tooltip/>
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
import { createSensitive, fetchSensitiveList, updateSensitive, deleteSensitive } from "@/api/cms/sensitiveWord";
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
              label: '敏感词',
              name: 'word',
              type: 'text',
              valueType: 'string',
              required: true,
              placeholder: '请输入敏感词'
            }
          ]
        }
      ],
      formData: {},
      isLoading: false,
      handelType: 'add',
      searchSettings: [{
        label: '敏感词',
        name: 'word',
        type: 'text',
        placeholder: '请输入敏感词',
        visible: true
      }],
      searchData: {
        word: ''
      },
      page: 1,
      pageSize: 10,
      total: 0,
      tableData: []
    }
  },
  mounted() {
    this.getSensitiveList()
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val
      this.getSensitiveList()
    },
    pageChange(val) {
      this.page = val
      this.getSensitiveList()
    },
    getSensitiveList() {
      return new Promise((resolve, reject) => {
        fetchSensitiveList(this.searchData.word, this.page, this.pageSize).then(async res => {
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
      this.getSensitiveList()
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
      this.$confirm('确定删除该敏感词吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return new Promise((resolve, reject) => {
          deleteSensitive(row.sensitiveId)
            .then(response => {
              this.$message.success('删除成功')
              this.getSensitiveList()
              resolve()
            })
            .catch(error => {
              reject(error)
            })
      })
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
      }).catch(() => {     
      })
    },
    submitSave(data) {
      this.isLoading = true
      if(this.handelType === 'add') {
        this.addSensitive(data)
      } else {
        this.editSensitive(data, this.formData.sensitiveId)
      }
    },
    editSensitive(data, id) {
      data.sensitiveId = id
      return new Promise((resolve, reject) => {
        updateSensitive(data)
          .then(response => {
            this.$message.success('编辑成功')
            this.dialogVisible = false
            this.isLoading = false
            this.getSensitiveList()
            resolve()
          })
          .catch(error => {
            this.isLoading = false
            reject(error)
          })
      })
    },
    addSensitive(data) {
      return new Promise((resolve, reject) => {
        createSensitive(data)
          .then(response => {
            this.$message.success('添加成功')
            this.dialogVisible = false
            this.isLoading = false
            this.getSensitiveList()
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
  .sensitive-word{
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