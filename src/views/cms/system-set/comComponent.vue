<template>
  <div class="com-component-container">
    <el-row type="flex" class="tool-bar" justify="end">
      <el-col :span="6">
        <el-select v-model="selectProgram" placeholder="请选择">
          <el-option
            v-for="program in programList"
            :key="program.id"
            :label="program.name"
            :value="program.id"
          />
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-input
          v-model="searchComponent"
          placeholder="名称/关键词"
          prefix-icon="el-icon-search"
          clearable
          @change="search"
        />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="handleAdd">新增组件</el-button>
      </el-col>
    </el-row>
    <el-table :data="componentList" style="width: 100%">
      <el-table-column prop="name" label="组件名称"/>
      <el-table-column prop="belongProgram" label="所属栏目"/>
      <el-table-column prop="variable" label="变量数量"/>
      <el-table-column prop="desc" label="描述"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="prime" @click="handleAlter(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="pageNum"
      :page-sizes="[10,30,60,100]"
      :page-size="pageSize"
      :total="totalCount"
      background
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'ComComponentSet',
  data() {
    return {
      componentList: [
        {
          id: '1',
          name: '网站名称',
          belongProgram: '所属栏目',
          variable: 3,
          desc: '描述'
        }
      ],
      programList: [
        {
          id: 1,
          name: '河南广播网'
        },
        {
          id: 2,
          name: '焦点网'
        },
        {
          id: 3,
          name: '电台动态'
        },
        {
          id: 4,
          name: '新闻资讯'
        }
      ],
      typeList: [
        {
          id: 1,
          name: '列表组件'
        },
        {
          id: 2,
          name: '公共组件'
        },
        {
          id: 3,
          name: '正文组件'
        }
      ],
      selectProgram: 1,
      searchComponent: '',
      pageNum: 1, // 分页当前页
      pageSize: 10,
      totalCount: 0
    }
  },
  methods: {
    search() {
      console.log('搜索' + this.selectProgram + '---' + this.searchComponent)
    },
    handleAdd() {
      this.$router.push({
        path: '/systemSet/componentEdit',
        query: {
          isAdd: true
        }
      })
    },
    handleAlter(index, row) {
      this.$router.push({
        path: '/systemSet/componentEdit',
        query: {
          isAdd: false,
          componentId: row.id
        }
      })
    },
    handleDelete(index, row) {
      console.log('删除' + row.id)
    },
    // 表格分页处理
    handleSizeChange(val) {
      this.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getTableData()
    }
  }
}
</script>

<style scoped>
.el-button + .el-button {
  margin-top: 5px;
  margin-left: 0px;
}

.com-component-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}

.tool-bar .el-col {
  margin-left: 20px;
  margin-bottom: 10px;
}
</style>
