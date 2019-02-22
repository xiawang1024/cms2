<template>
  <div class="relatedDocuments-wrap">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="type" label="类型"/>
      <el-table-column prop="belongColumn" label="所属栏目"/>
      <el-table-column prop="status" label="状态"/>
      <el-table-column prop="sign" label="标记"/>
      <el-table-column prop="alterTime" label="修改时间"/>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-button type="text" @click="handleAdd">添加</el-button>/
          <el-button type="text" style="color:#f95757" @click="handleAutoGet">自动获取</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" title="选择相关文章">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <el-tree
            ref="websitTree"
            :data="treeData"
            :highlight-current="true"
            :check-on-click-node="true"
            @node-click="handleNodeClick"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection" width="55"/>
            <el-table-column prop="title" label="标题"/>
            <el-table-column prop="belongColumn" label="所属栏目"/>
            <el-table-column prop="releaseTime" label="发布时间"/>
            <el-table-column prop="author" label="发布时间"/>
          </el-table>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { TreeData } from './mockData.js'
export default {
  name: 'RelatedDocuments',
  data() {
    return {
      search: '',
      tableData: [],
      treeData: TreeData,
      dialogVisible: false
    }
  },
  methods: {
    handleAdd() {
      this.dialogVisible = true
    },
    handleNodeClick() {
      this.changeOptionalData()
    },
    changeOptionalData() {
      console.log('假装改变一下数据')
    },
    handleAutoGet() {},
    handleEdit() {},
    handleDelete() {}
  }
}
</script>
<style lang="scss" scoped>
.el-button + .el-button {
  margin-left: 0px;
}

.relatedDocuments-wrap {
}
</style>

