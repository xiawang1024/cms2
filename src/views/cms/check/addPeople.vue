<template>
  <div class="check-choose-people">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose">
      <el-select v-model="choosedPeople" multiple filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:dialogVisible', false)" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { UserList } from '@/api/user/user'
export default {
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      page: 1,
      pageSize: 100,
      title: '审核人员',
      options: [],
      choosedPeople: []
    }
  },
  watch: {
    dialogVisible(val) {
      if(val) {
        this.getUserList()
      }
    }
  },
  methods: {
    confirm() {
      // this.$emit('update:dialogVisible', false)
      console.log(this.choosedPeople)
      this.$emit('peopleList', this.choosedPeople)
    },
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    getUserList () {
      return new Promise((resolve, reject) => {
        UserList({}, this.page, this.pageSize).then(async res => {
          this.options = res.data.result.content.map((ele) => {
            return {
              label: ele.userName,
              value: ele.userId
            }
          })
          // this.total = res.data.result.total
          // this.tableData = res.data.result.content
          // 结束
          resolve()
        })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },
  }
}
</script>
<style lang="scss">
  .check-choose-people{
    .el-dialog__body{
      .el-select{
        width:100%;
      }
    }
  }
</style>