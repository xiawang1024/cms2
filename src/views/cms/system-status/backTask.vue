<template>
  <div class="logs-container">
    <el-row type="flex" class="tool-bar" justify="end">
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <el-radio-group v-model="taskType">
          <el-radio-button size="mini" label="1">即时任务</el-radio-button>
          <el-radio-button size="mini" label="2">定时任务</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <el-button size="mini" type="primary" @click="reflush">刷新</el-button>
      </el-col>
    </el-row>
    <el-table :data="backTaskList" style="width: 100%">
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="submitter" label="提交人"/>
      <el-table-column prop="planTime" label="规划时间"/>
      <el-table-column prop="startTime" label="开始执行时间"/>
      <el-table-column prop="endTime" label="完成时间"/>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "BackTask",
  data() {
    return {
      taskType: 1, // 1代表即时任务，2代表定时任务。
      backTaskList: [
        {
          id: 1,
          title: "标题1",
          submitter: "提交人1",
          planTime: "2018-01-20",
          startTime: "2018-01-20",
          endTime: "2018-01-20"
        },
        {
          id: 2,
          title: "标题2",
          submitter: "提交人2",
          planTime: "2018-01-20",
          startTime: "2018-01-20",
          endTime: "2018-01-20"
        },
        {
          id: 3,
          title: "标题3",
          submitter: "提交人3",
          planTime: "2018-01-20",
          startTime: "2018-01-20",
          endTime: "2018-01-20"
        },
        {
          id: 4,
          title: "标题4",
          submitter: "提交人4",
          planTime: "2018-01-20",
          startTime: "2018-01-20",
          endTime: "2018-01-20"
        }
      ]
    };
  },
  methods: {
    reflush() {}
  }
};
</script>

<style scoped>
.logs-container {
  margin: 30px;
}

.tool-bar {
  text-align: center;
}
</style>
