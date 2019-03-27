<template>
  <div class="document-dialog">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="标题"
        width="120"/>
      <el-table-column
        prop="name"
        label="类型"
        width="120"/>
      <el-table-column
        prop="name"
        label="所属栏目"/>
      <el-table-column
        prop="name"
        label="标记"/>
      <el-table-column
        prop="name"
        label="发稿人"/>
      <el-table-column
        prop="name"
        label="发布时间"/>
      <el-table-column
        prop="name"
        label="点击"/>
      <el-table-column
        prop=""
        label="操作">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" size="small" @click="chooseDoc">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <document-dialog :dialog-visible.sync = "dialogVisible"/>
  </div>
</template>
<script>
  import documentDialog from './documentDialog.vue'
  export default {
    components: {
      documentDialog
    },
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
        dialogVisible: false
      }
    },
    methods: {
      chooseDoc() {
        this.dialogVisible = true
      }
    }
  }
</script>