<template>
  <div class="releaseColumn-wrap">
    <el-alert
      :closable="false"
      title="已提交到发布队列:"
      type="success"
    />

    <el-table
      :data="tableData"
      size="mini"
      style="width: 100%"
    >
      <el-table-column
        prop="title"
        label="标题"
      />
      <el-table-column
        prop="type"
        label="类型"
      />
      <el-table-column
        prop="author"
        label="发稿人"
      />
      <el-table-column
        prop="commitTime"
        label="提交时间"
      />
      <el-table-column
        prop="startTime"
        label="开始执行时间"
      />
      <el-table-column
        prop="finishTime"
        label="完成时间"
      >
        <template slot-scope="scope">
          <div>
            <i
              v-if="!scope.row.finishTime"
              class="el-icon-loading"
            />
            <span v-else>{{ scope.row.finishTime }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="tool-bar">
      <el-button
        size="small"
        type="primary"
        @click="handleRefresh"
      >刷新</el-button>
    </div>
  </div>
</template>
<script>
import { TableData } from './mockData.js'
export default {
  name: 'ReleaseColumn',
  data() {
    return {
      tableData: TableData
    }
  },
  methods: {
    handleRefresh() {}
  }
}
</script>
<style lang="scss" scoped>
.releaseColumn-wrap {
  margin: 0 5px;
}
.tool-bar {
  margin-top: 20px;
}
</style>

