<template>
  <div class="permissionGroupEdit-container">
    <el-form :model="permissionGroupForm" label-position="top">
      <el-form-item label="分组名称">
        <el-input v-model="permissionGroupForm.name" style="width:auto"/>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="系统权限">
            <el-transfer
              v-model="permissionGroupForm.systemPermissions"
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
              v-model="permissionGroupForm.originalPermissions"
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
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="分配栏目">
            <el-transfer
              v-model="permissionGroupForm.distributionPrograms"
              :titles="['列表', '已选择']"
              :props="{
                key: 'id',
                label: 'name'
              }"
              :data="distributionProgramList"
              filterable
              filter-placeholder="请输入关键词"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="分配人员">
            <el-transfer
              v-model="permissionGroupForm.members"
              :titles="['列表', '已选择']"
              :props="{
                key: 'id',
                label: 'name'
              }"
              :data="memberList"
              filterable
              filter-placeholder="请输入关键词"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" type="primary" @click="handleSave()">保 存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PermissionGroupEdit',
  data() {
    return {
      permissionGroupForm: {
        name: '',
        systemPermissions: [],
        originalPermissions: [],
        distributionPrograms: [],
        members: []
      },
      systemPermissionList: [
        {
          value: 1,
          lable: '权限分组'
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
      ],
      distributionProgramList: [
        {
          id: 1,
          name: '栏目1'
        },
        {
          id: 2,
          name: '栏目2'
        },
        {
          id: 3,
          name: '栏目3'
        },
        {
          id: 4,
          name: '栏目4'
        }
      ],
      memberList: [
        {
          id: 1,
          name: '白文幸'
        },
        {
          id: 2,
          name: '陈艺'
        },
        {
          id: 3,
          name: '付天喜'
        },
        {
          id: 4,
          name: '郭亚娜'
        },
        {
          id: 5,
          name: '白文幸'
        },
        {
          id: 6,
          name: '陈艺'
        },
        {
          id: 7,
          name: '付天喜'
        },
        {
          id: 8,
          name: '郭亚娜'
        },
        {
          id: 9,
          name: '白文幸'
        },
        {
          id: 10,
          name: '陈艺'
        },
        {
          id: 11,
          name: '付天喜'
        },
        {
          id: 12,
          name: '郭亚娜'
        }
      ]
    }
  },
  methods: {
    handleSave() {
      console.log(this.permissionGroupForm)
    }
  }
}
</script>

<style scoped>
.permissionGroupEdit-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}
</style>
