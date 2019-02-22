<template>
  <div class="doc-head">
    <div class="left">
      <el-dropdown size="mini">
        <el-button
          type="success"
          size="mini"
        >
          选中的文档<i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item of currentDoc"
            :key="item.id"
          >{{ item.label }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown size="mini">
        <el-button
          type="primary"
          size="mini"
        >
          当前栏目<i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item of currentColumn"
            :key="item.id"
          >{{ item.label }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-plus"
      >新建文档</el-button>
    </div>
    <div class="right">
      <span class="name">筛选：</span>
      <el-select
        v-model="fromSelected"
        filterable
        clearable
        placeholder="来源"
        size="mini"
      >
        <el-option
          v-for="item in fromOptions"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-model="typeSelected"
        class="select"
        filterable
        clearable
        placeholder="类型"
        size="mini"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-model="statusSelected"
        class="select"
        filterable
        clearable
        placeholder="状态"
        size="mini"
      >
        <el-option
          v-for="item in statusOptions"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select>
      <el-input
        v-model="inputSelected"
        class="input-text"
        placeholder="请输入内容"
        size="mini"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
        />
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

