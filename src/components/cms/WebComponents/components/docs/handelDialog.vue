<template>
  <div class="choose-handel-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      :title="title"
      width="60%"
      :before-close="colseMe"
    >
      <el-button type="primary" size="small" @click="startHandel">开始{{ title }}</el-button>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="articleTitle"
          label="标题"
          show-overflow-tooltip
          width="180"/>
        <el-table-column
          prop="articleTitle"
          label="发布人"
          width="100"/>
        <el-table-column
          prop="sendTime"
          label="提交时间">
          <template slot-scope="scope">
            <span>{{ scope.row.sendTime|timeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="handelTime"
          label="执行时间">
          <template slot-scope="scope">
            <span>{{ scope.row.sendTime|timeFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="modifyTime"
          label="完成时间">
          <template slot-scope="scope">
            <div>
              <i v-if="!scope.row.modifyTime" class="el-icon-loading"/>
              <span v-else>{{ scope.row.modifyTime }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:dialogVisible', false)" size="small">取消</el-button>
        <el-button type="primary" @click="$emit('update:dialogVisible', false)" size="small">确定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
import { deleteDocumentMore, cancelDocumentMore, publishDocumentMore } from '@/api/cms/article'
export default {
  name: 'DocFoot',
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    },
    title: {
      default: '',
      type: String
    },
    multipleList: {
      default: ()=> {
        []
      },
      type: Array
    }
  },
  data() {
    return {
      tableData: [],
      chooseIds: []
    }
  },
  watch: {
    dialogVisible(val) {
      if(val) {
        this.chooseIds = []
        this.tableData = this.multipleList
        this.tableData.forEach((ele) => {
          ele.sendTime = Date.now()
          ele.handelTime =  Date.now()
          ele.modifyTime =  ''
          this.chooseIds.push(ele.articleId)
        })
      }
    }
  },
  methods: {
    startHandel() {
      if(!this.tableData.length) {
        this.$message.warning('请选择文章')
        return
      }
      switch(this.title) {
        case '发布':
          this.publishDocumentMore(this.chooseIds.join(','))
          break
        case '撤销发布':
          this.cancelDocumentMore(this.chooseIds.join(','))
          break
        case '删除':
          this.deleteMore(this.chooseIds.join(','))
          break
        default:
      }
    },
    // 批量发布
    publishDocumentMore(id) {
      return new Promise((resolve, reject) => {
        publishDocumentMore({articleId: id})
          .then((response) => {
            // this.$emit('handelSuccess')
            this.$message.success('发布成功')
            this.tableData.forEach((ele) => {
              ele.modifyTime = response.data.result.modifyTime
            })
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 批量撤销
    cancelDocumentMore(id) {
      return new Promise((resolve, reject) => {
        cancelDocumentMore({articleId: id})
          .then((response) => {
            // this.$emit('handelSuccess')
            this.$message.success('撤销成功')
            this.tableData.forEach((ele) => {
              ele.modifyTime = response.data.result.modifyTime
            })
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 删除多个
    deleteMore(id) {
      return new Promise((resolve, reject) => {
        deleteDocumentMore({articleId: id})
          .then((response) => {
            // this.$emit('handelSuccess')
            this.$message.success('删除成功')
            this.tableData.forEach((ele) => {
              ele.modifyTime = response.data.result.modifyTime
            })
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    colseMe() {
      this.$emit('update:dialogVisible', false)
      if(this.tableData.length) {
        this.$emit('handelSuccess')
      }
    }
    // show() {
    //   this.dialogVisible = true
    // }
  }
}
</script>
<style lang="scss">
.choose-handel-dialog {
  .el-dialog {
    .el-dialog__header{
      border-bottom: 1px solid #ebeef5;
    }
  }
}
</style>

