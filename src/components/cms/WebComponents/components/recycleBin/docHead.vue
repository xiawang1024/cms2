<template>
  <div class="doc-head">
    <div class="left">
      <el-button type="primary" size="mini">还原选中的文档</el-button>
      <el-button type="danger" size="mini">彻底删除选中</el-button>
    </div>
    <div class="right">
      <span class="name">筛选：</span>
      <el-select
        v-model="typeSelected"
        class="select"
        filterable
        clearable
        placeholder="类型"
        size="mini"
      >
        <el-option v-for="item in typeOptions" :key="item.id" :label="item.label" :value="item.id"/>
      </el-select>
      <el-input v-model="inputSelected" class="input-text" placeholder="请输入内容" size="mini">
        <el-button slot="append" icon="el-icon-search"/>
      </el-input>
    </div>
  </div>
</template>
<script>
import {
  currentDoc,
  currentColumn,
  fromOptions,
  typeOptions,
  statusOptions
} from './mockData.js'
export default {
  name: 'DocHead',
  data() {
    return {
      currentDoc,
      currentColumn,
      fromOptions,
      typeOptions,
      statusOptions,
      fromSelected: '',
      typeSelected: '',
      statusSelected: '',
      inputSelected: ''
    }
  },
  methods: {
    handleClick() {
      alert('button click')
    }
  }
}
</script>
<style lang="scss" scoped>
.doc-head {
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  padding: 0 30px;
  justify-content: space-between;
  box-sizing: border-box;
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      font-size: 14px;
    }
    .select {
      width: 100px;
      margin-left: 10px;
    }
    .input-text {
      width: 180px;
      margin-left: 10px;
    }
  }
}
</style>

