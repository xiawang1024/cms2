<template>
  <div class="personRoleDistribute-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form :model="personRoleForm">
          <el-form-item label="人员">
            <el-input v-model="personRoleForm.name" style="width:auto" readonly/>
          </el-form-item>
          <el-form-item label="分配栏目">
            <el-select v-model="personRoleForm.distributeProgram" placeholder="请选择">
              <el-option
                v-for="program in programList"
                :key="program.id"
                :label="program.name"
                :value="program.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否包含子栏目">
            <el-switch v-model="personRoleForm.hasChildren" active-color="#13ce66"/>
          </el-form-item>
          <el-form-item label="分配角色">
            <el-select
              v-model="personRoleForm.distributeRoles"
              multiple
              collapse-tags
              style="margin-left: 20px;"
              placeholder="请选择"
            >
              <el-option
                v-for="role in roleList"
                :key="role.id"
                :label="role.name"
                :value="role.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">这边是展示</el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="handleSave()">保 存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonRoleDistribute',
  data() {
    return {
      personRoleForm: {
        id: '',
        name: '管理员',
        distributeProgram: '',
        hasChildren: false,
        distributeRoles: []
      },
      programList: [
        { id: 1, name: '河南广播网' },
        { id: 2, name: '河南广播网' },
        { id: 3, name: '河南广播网' },
        { id: 4, name: '河南广播网' },
        { id: 5, name: '河南广播网' },
        { id: 6, name: '河南广播网' },
        { id: 7, name: '河南广播网' }
      ],
      roleList: [
        { id: 1, name: '主播' },
        { id: 2, name: '发布首页' },
        { id: 3, name: '实习编辑' },
        { id: 4, name: '总编' },
        { id: 5, name: '栏目负责人' },
        { id: 6, name: '河南广播网' },
        { id: 7, name: '河南广播网' },
        { id: 8, name: '主播' },
        { id: 9, name: '发布首页' },
        { id: 10, name: '实习编辑' },
        { id: 11, name: '主播' },
        { id: 12, name: '发布首页' },
        { id: 13, name: '实习编辑' }
      ]
    }
  },
  methods: {
    handleSave() {
      console.log(this.personRoleForm)
    }
  }
}
</script>

<style scoped>
.personRoleDistribute-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}
</style>
