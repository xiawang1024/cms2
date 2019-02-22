<template>
  <div class="tem-manager-container">
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
          v-model="searchTem"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          clearable
          @change="search"
        />
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="handleAdd">新增模板</el-button>
      </el-col>
    </el-row>
    <el-table :data="temList" style="width: 100%">
      <el-table-column prop="name" label="模板名称"/>
      <el-table-column prop="type" label="类别"/>
      <el-table-column prop="belongProgram" label="所属栏目"/>
      <el-table-column prop="fitPlat" label="适用平台"/>
      <el-table-column prop="desc" label="描述"/>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="prime" @click="handleAlter(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TemFormSet',
  data() {
    return {
      temList: [
        {
          id: '1',
          name: '网站名称',
          type: '类别',
          belongProgram: '所属栏目',
          fitPlat: '适用平台',
          desc: '描述',
          createTime: '2018-01-02'
        },
        {
          id: '2',
          name: '网站名称',
          type: '类别',
          belongProgram: '所属栏目',
          fitPlat: '适用平台',
          desc: '描述',
          createTime: '2018-01-02'
        },
        {
          id: '3',
          name: '网站名称',
          type: '类别',
          belongProgram: '所属栏目',
          fitPlat: '适用平台',
          desc: '描述',
          createTime: '2018-01-02'
        },
        {
          id: '4',
          name: '网站名称',
          type: '类别',
          belongProgram: '所属栏目',
          fitPlat: '适用平台',
          desc: '描述',
          createTime: '2018-01-02'
        },
        {
          id: '5',
          name: '网站名称',
          type: '类别',
          belongProgram: '所属栏目',
          fitPlat: '适用平台',
          desc: '描述',
          createTime: '2018-01-02'
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
          name: '列表模板'
        },
        {
          id: 2,
          name: '公共模板'
        },
        {
          id: 3,
          name: '正文模板'
        }
      ],
      selectProgram: 1,
      searchTem: '',
      dialogVisible: false,
      dialogTitle: '添加模板',
      temForm: {
        id: '',
        name: '',
        type: '',
        belongProgram: '',
        fitPlat: '',
        isEffective: true,
        desc: '',
        fileName: '',
        temContent: ''
      }
    }
  },
  methods: {
    search() {
      console.log('搜索' + this.selectProgram + '---' + this.searchTem)
    },
    handleAdd() {
      this.$router.push({
        path: '/systemSet/temEdit',
        query: {
          isAdd: true
        }
      })
    },
    handleAlter(index, row) {
      this.$router.push({
        path: '/systemSet/temEdit',
        query: {
          isAdd: false,
          tem: row
        }
      })
    },
    handleDelete(index, row) {
      console.log('删除' + row.plat)
    }
  }
}
</script>

<style scoped>
.el-button + .el-button {
  margin-top: 5px;
  margin-left: 0px;
}

.tem-manager-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}

.tool-bar .el-col {
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>
