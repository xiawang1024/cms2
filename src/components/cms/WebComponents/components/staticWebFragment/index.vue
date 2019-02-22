<template>
  <div class="staticWebFragment-wrap">
    <div class="tool-bar">
      <el-button type="primary" @click="handleAddStaticWebFragment">新增</el-button>
    </div>
    <el-table :data="StaticWebFragmentList" style="width: 100%">
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="desc" label="描述"/>
      <el-table-column prop="author" label="创建人"/>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="addStaticWebFragmentVisible"
      :before-close="handleClean"
      top="8vh"
      width="70%"
      title="文档列表详情"
    >
      <el-form
        ref="staticWebFragmentForm"
        :model="staticWebFragmentForm"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="名称">
          <el-input v-model="staticWebFragmentForm.name" style="max-width:300px"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="staticWebFragmentForm.desc" style="max-width:300px"/>
        </el-form-item>
        <el-form-item label="是否禁用">
          <el-switch v-model="staticWebFragmentForm.disable" active-color="#13ce66"/>
        </el-form-item>
        <el-form-item label="标签"/>
        <el-form-item label="内容">
          <el-input
            v-model="staticWebFragmentForm.content"
            :autosize="{ minRows: 5 }"
            type="textarea"
            style="max-width:800px"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addStaticWebFragmentVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStaticWebFragmentVisible = false">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { StaticWebFragmentList, TreeData } from './mockData.js'
export default {
  name: 'StaticWebFragment',
  data() {
    return {
      addStaticWebFragmentVisible: false,
      addCustomDocVisible: false,
      StaticWebFragmentList: StaticWebFragmentList,
      TreeData: TreeData,
      staticWebFragmentForm: {
        id: '',
        name: '',
        desc: '',
        disable: '',
        tag: '',
        content: ''
      }
    }
  },
  methods: {
    handleAddStaticWebFragment() {
      this.staticWebFragmentForm = {
        id: '',
        name: '',
        desc: '',
        disable: '',
        tag: '',
        content: ''
      }
      this.addStaticWebFragmentVisible = true
    },
    handleEdit(row) {
      this.staticWebFragmentForm.content = row.content
      this.addStaticWebFragmentVisible = true
    },
    handleClean() {
      this.addStaticWebFragmentVisible = false
    },
    handleSave() {},
    handleDelete() {}
  }
}
</script>
<style lang="scss" scoped>
.el-button + .el-button {
  margin: 5px 0px;
}
.staticWebFragment-wrap {
  margin: 0 5px;
}
.tool-bar {
  text-align: right;
}
.title {
  color: #454545;
  padding: 10px 0;
  font-weight: 700;
  border-bottom: 1px solid #444;
  margin-bottom: 20px;
}
.location-box {
  width: 300px;
}
.location-btn {
  width: 30%;
  padding: 20px;
}
</style>

