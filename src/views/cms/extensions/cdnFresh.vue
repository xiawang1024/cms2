<template>
  <div class="cdnFresh-container">
    <el-form :model="cdnFreshForm">
      <el-form-item label="刷新地址">
        <el-input v-model="cdnFreshForm.refreshLocation" style="width:70%;"/>
        <el-alert
          style="width:70%;margin:20px 50px 0px 0px;"
          title="多个文章地址，用英文逗号 &quot;,&quot; 隔开"
          type="warning"
        />
      </el-form-item>
      <el-form-item label="刷新栏目">
        <el-select
          v-model="cdnFreshForm.refreshProgram"
          style="width:70%;"
          multiple
          collapse-tags
          placeholder="请选择"
        >
          <el-option
            v-for="program in programList"
            :key="program.id"
            :label="program.name"
            :value="program.id"
          />
        </el-select>
      </el-form-item>
      <el-button type="warning">保存</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CdnFreshSet',
  data() {
    return {
      cdnFreshForm: {
        refreshLocation: '',
        refreshProgram: []
      },
      programList: [
        {
          id: 1,
          name: '河南广播网'
        },
        {
          id: 2,
          name: '河南广播网'
        },
        {
          id: 3,
          name: '河南广播网'
        },
        {
          id: 4,
          name: '河南广播网'
        },
        {
          id: 5,
          name: '河南广播网'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>
.cdnFresh-container {
  margin: 30px;
}
</style>
