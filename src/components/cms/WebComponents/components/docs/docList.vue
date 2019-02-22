<template>
  <div class="doc-list">
    <el-table
      ref="multipleTable"
      :data="tableData"
      :default-sort="{prop: 'publishTime', order: 'descending'}"
      :highlight-current-row="true"
      tooltip-effect="dark"
      style="width: 100%"
      size="small"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column fixed prop="id" label="ID/序号" width="100"/>
      <el-table-column fixed prop="title" label="标题" min-width="160" show-overflow-tooltip/>
      <el-table-column label="查看" width="60">
        <template slot-scope="scope">
          <i class="el-icon-view" style="cursor:pointer" @click="openWindow(scope.row.outLink)"/>
        </template>
      </el-table-column>

      <el-table-column label="预览" width="60">
        <template slot-scope="scope">
          <i class="el-icon-view" style="cursor:pointer" @click="openWindow(scope.row.preview)"/>
        </template>
      </el-table-column>
      <el-table-column prop="docType" label="类型" width="100"/>
      <el-table-column prop="status" label="状态" width="100"/>
      <el-table-column prop="mark" label="标记" width="100"/>
      <el-table-column
        prop="createTime"
        label="创建时间"
        min-width="120"
        sortable
        show-overflow-tooltip
      />
      <el-table-column
        prop="publishTime"
        label="发布时间"
        min-width="120"
        sortable
        show-overflow-tooltip
      />
      <el-table-column prop="editor" label="撰稿人" width="100"/>
      <el-table-column prop="click" label="点击" sortable width="80"/>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" @click="handleClickDel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { DocList } from './mockData.js'
export default {
  data() {
    return {
      tableData: DocList,
      multipleSelection: []
    }
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    /**
     * 多选钩子
     */
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    /**
     * 获取多选的id列表
     */
    getMultipleSelectionId() {
      const multipleSelection = this.multipleSelection
      const len = multipleSelection.length
      let multipleId = []
      if (len) {
        multipleId = multipleSelection.map(item => item.id)
      }
      return multipleId
    },
    /**
     * 删除单个
     */
    handleClickDel(id) {
      console.log('------------------------------------')
      console.log(id)
      console.log('------------------------------------')
    },
    /**
     * 查看预览
     */
    openWindow(link) {
      window.location.href = link
    }
  }
}
</script>
<style lang="scss" scoped>
.doc-list {
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>

