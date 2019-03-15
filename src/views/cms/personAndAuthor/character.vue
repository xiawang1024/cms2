<template>
  <div class="character-container">
    <div class="tool-bar">
      <el-button size="mini" type="primary" @click="handleAdd">新角色</el-button>
    </div>
    <el-table :data="characterList" style="width: 100%">
      <el-table-column prop="name" label="分组名称"/>
      <el-table-column prop="status" label="启动状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" active-color="#13ce66" @change="change(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="handleAlter(scope.$index, scope.row)">编辑</el-button>
          <el-dropdown trigger="click" style="margin-left:20px;cursor:pointer;">
            <span class="el-dropdown-link">更多
              <i class="el-icon-arrow-down el-icon--right"/>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleCopy(scope.row)">拷贝</el-dropdown-item>
              <el-dropdown-item @click.native="handleClear(scope.row)">清空</el-dropdown-item>
              <el-dropdown-item @click.native="handleDelete(scope.row)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Character',
  data() {
    return {
      characterList: [
        {
          id: 1,
          name: '发布首页',
          status: false,
          createTime: '2018-01-02'
        },
        {
          id: 2,
          name: '主播',
          status: true,
          createTime: '2018-01-02'
        },
        {
          id: 3,
          name: '实习编辑',
          status: true,
          createTime: '2018-01-02'
        },
        {
          id: 4,
          name: '编辑',
          status: false,
          createTime: '2018-01-02'
        },
        {
          id: 5,
          name: '栏目负责人',
          status: true,
          createTime: '2018-01-02'
        }
      ]
    }
  },
  methods: {
    handleAdd() {
      this.$router.push({
        path: '/personAndAuthor/characterEdit',
        query: {
          isAdd: true
        }
      })
    },
    change() {},
    handleAlter(index, row) {
      this.$router.push({
        path: '/personAndAuthor/characterEdit',
        query: {
          isAdd: false,
          permissionGroupId: row.id
        }
      })
    },
    handleCopy(row) {
      console.log('拷贝' + row.id)
    },
    handleClear(row) {
      console.log('清除' + row.id)
    },
    handleDelete(row) {
      console.log('删除' + row.id)
    }
  }
}
</script>

<style scoped>
.character-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}
</style>
