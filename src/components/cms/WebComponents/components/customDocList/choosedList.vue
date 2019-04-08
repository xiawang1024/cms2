<template>
  <div class="document-dialog">
    <el-table
      :data="tableData"
      style="width: 100%"
      highlight-current-row>
      <el-table-column
        prop="articleTitle"
        label="标题"
        show-overflow-tooltip
        min-width="120"/>
      <el-table-column
        prop="articleType"
        label="类型"
        width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.articleType == 0">图文</span>
          <span v-if="scope.row.articleType == 1">图集</span>
          <span v-if="scope.row.articleType == 2">拼条</span>
          <span v-if="scope.row.articleType == 3">引用</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="channelName"
        min-width="120"
        label="所属栏目"/>
      <el-table-column
        prop="name"
        min-width="100"
        label="标记"/>
      <el-table-column
        prop="createUser"
        width="120"
        label="发稿人"/>
      <el-table-column
        prop="publishTime"
        width="160"
        label="发布时间"/>
      <el-table-column
        prop="clickNum"
        width="80"
        label="点击"/>
      <el-table-column
        prop=""
        label="操作"
        width="80">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" size="small" @click="chooseDoc">添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <document-dialog :dialog-visible.sync = "dialogVisible" @getChoosed = "getChoosed" :list="tableData"/>
  </div>
</template>
<script>
  import documentDialog from './documentDialog.vue'
  export default {
    components: {
      documentDialog
    },
    props: {
      detailsList: {
        default: ()=> {
          []
        },
        type: Array
      }
    },
    data() {
      return {
        tableData: [],
        dialogVisible: false
      }
    },
    watch: {
      detailsList(val) {
        if(val && val.length) {
          this.tableData = val.map((ele) => {
            return ele.articleDTO
          })
        }
      }
    },
    methods: {
      getChoosed(list) {
        console.log(list, 'list')
        console.log(this.tableData, 'this.tableData')
        this.tableData = this.tableData.concat(list)
      },
      chooseDoc() {
        this.dialogVisible = true
      },
      deleteRow(index, rows) {
        rows.splice(index, 1)
      }
    }
  }
</script>