<template>
  <div class="logs-container">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="日志" name="log">日志</el-tab-pane>
      <el-tab-pane label="探针1" name="probe1">探针1</el-tab-pane>
      <el-tab-pane label="探针2" name="probe2">探针2</el-tab-pane>
      <el-tab-pane label="硬件" name="hardware">硬件</el-tab-pane>
      <el-tab-pane label="数据库" name="database">数据库</el-tab-pane>
      <el-tab-pane label="终端命令" name="terminalCommand">终端命令</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Logs',
  data() {
    return {
      activeName2: 'log'
    }
  },
  methods: {
    handleClick() {}
  }
}
</script>

<style scoped>
.logs-container {
  margin: 30px;
}
</style>
