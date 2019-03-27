<template>
  <div class="document-dialog">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="articleTitle"
        label="标题"
        width="120"/>
      <el-table-column
        prop="articleType"
        label="类型"
        width="120"/>
      <el-table-column
        prop="channelName"
        label="所属栏目"/>
      <el-table-column
        prop="name"
        label="标记"/>
      <el-table-column
        prop="createUser"
        label="发稿人"/>
      <el-table-column
        prop="publishTime"
        label="发布时间"/>
      <el-table-column
        prop="clickNum"
        label="点击"/>
      <el-table-column
        prop=""
        label="操作">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" size="small" @click="chooseDoc">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <document-dialog :dialog-visible.sync = "dialogVisible" @getChoosed = "getChoosed"/>
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
        tableData: [],
        dialogVisible: false
      }
    },
    methods: {
      getChoosed(list) {
        console.log(list, 'list')
        this.tableData = list
      },
      chooseDoc() {
        this.dialogVisible = true
      }
    }
  }
</script>