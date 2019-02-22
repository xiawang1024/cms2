<template>
  <div class="logs-container">
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="栏目基本信息" name="information">
        <BasicInformation/>
      </el-tab-pane>
      <el-tab-pane label="设置栏目模板" name="templet">
        <ColumnTemplet/>
      </el-tab-pane>
      <el-tab-pane label="拓展字段" name="field">
        <ExtendField/>
      </el-tab-pane>
      <el-tab-pane label="标签设置" name="label">
        <LabelSetting/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BasicInformation from './components/BasicInformation'
import ColumnTemplet from './components/ColumnTemplet'
import ExtendField from './components/ExtendField'
import LabelSetting from './components/LabelSetting'
export default {
  name: 'Logs',
  components: { BasicInformation, ColumnTemplet, ExtendField, LabelSetting },
  data() {
    return {
      activeName2: 'information'
    }
  },
  methods: {
    handleClick() {}
  }
}
</script>

<style scoped>
.logs-container {
  margin: 10px;
}
</style>
