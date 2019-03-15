<template>
  <div class="permissionGroup-container">
    <div class="tool-bar">
      <el-button size="mini" type="primary" @click="handleAdd">新分组</el-button>
    </div>
    <el-table :data="groupList" style="width: 100%">
      <el-table-column prop="name" label="分组名称"/>
      <el-table-column prop="status" label="启动状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#13ce66" @change="change(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleAlter(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'PermissionGroup',
  data() {
    return {
      groupList: [
        {
          id: 1,
          name: '809编辑',
          status: false,
          createTime: '2018-01-02'
        },
        {
          id: 2,
          name: '交通广播',
          status: true,
          createTime: '2018-01-02'
        },
        {
          id: 3,
          name: '娱乐广播',
          status: true,
          createTime: '2018-01-02'
        },
        {
          id: 4,
          name: '管理员分组',
          status: false,
          createTime: '2018-01-02'
        },
        {
          id: 5,
          name: '党生日歌分组',
          status: true,
          createTime: '2018-01-02'
        }
      ]
    }
  },
  methods: {
    handleAdd() {
      this.$router.push({
        path: '/personAndAuthor/permissionGroupEdit',
        query: {
          isAdd: true
        }
      })
    },
    change(row) {
      console.log(row.id)
    },
    handleAlter(index, row) {
      this.$router.push({
        path: '/personAndAuthor/permissionGroupEdit',
        query: {
          isAdd: false,
          permissionGroupId: row.id
        }
      })
    },
    handleDelete(index, row) {}
  }
}
</script>

<style scoped>
.permissionGroup-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}
</style>
