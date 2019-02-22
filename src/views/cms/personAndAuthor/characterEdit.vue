<template>
  <div class="characterEdit-container">
    <el-form :model="characterForm" label-position="top">
      <el-form-item label="角色名称">
        <el-input v-model="characterForm.name" style="width:auto"/>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="系统权限">
            <el-transfer
              v-model="characterForm.systemPermissions"
              :titles="['列表', '已选择']"
              :props="{
                key: 'value',
                label: 'lable'
              }"
              :data="systemPermissionList"
              filterable
              filter-placeholder="请输入关键词"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="栏目/文档/模版 权限">
            <el-transfer
              v-model="characterForm.originalPermissions"
              :titles="['列表', '已选择']"
              :props="{
                key: 'value',
                label: 'lable'
              }"
              :data="originalPermissionList"
              filterable
              filter-placeholder="请输入关键词"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSave()">保 存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterEdit',
  data() {
    return {
      characterForm: {
        name: '',
        systemPermissions: [],
        originalPermissions: []
      },
      systemPermissionList: [
        {
          value: 1,
          lable: '权限角色'
        },
        {
          value: 2,
          lable: '日志'
        },
        {
          value: 3,
          lable: '站点设置'
        },
        {
          value: 4,
          lable: '后台任务'
        }
      ],
      originalPermissionList: [
        {
          value: 1,
          lable: '发表博客'
        },
        {
          value: 2,
          lable: '综合统计'
        },
        {
          value: 3,
          lable: '视频上传'
        },
        {
          value: 4,
          lable: '管理文档列表'
        }
      ]
    }
  },
  methods: {
    handleSave() {
      console.log(this.characterForm)
    }
  }
}
</script>

<style scoped>
.characterEdit-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}
</style>
