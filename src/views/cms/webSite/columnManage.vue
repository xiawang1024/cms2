<template>
  <div class="column-manage">
    <div class="tool-bar">
      <el-button type="primary" @click="columnAdd('father')">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="栏目名称"/>
      <el-table-column prop="name" label="状态"/>
      <el-table-column prop="name" label="排序"/>
      <el-table-column prop="name" label="是否根节点"/>
      <el-table-column prop="name" label="设置" width="300">
        <template slot-scope="scope">
          <el-button type="text" @click="columnTemplate">栏目模板</el-button>
          <el-button type="text" @click="extendsWord">扩展字段</el-button>
          <el-button type="text" @click="tagSetting">标签设置</el-button>
          <el-button type="text" @click="waterSetting">水印设置</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="columnAdd">编辑</el-button>
          <el-button type="text">删除</el-button>
          <el-button type="text" @click="columnAdd('child')">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchDictByDictName } from '@/api/cms/dict'
export default {
  name: 'ColumnManage',
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  created: function() {
    // this.fetchDict()
  },
  methods: {
    // 查询对象
    fetchDict() {
      var _this = this
      return new Promise((resolve, reject) => {
        fetchDictByDictName(_this.dictObj.dictName)
          .then((response) => {
            _this.dictObj = response.data.result
            if (_this.dictObj.details === null) {
              _this.dictObj.details = []
            }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    columnAdd(type) {
      this.$router.push({
        path: '/cms/website/columnHandel',
        query: {
          isAdd: true,
          isFather: type === 'father'
        }
      })
    },
    columnTemplate() {
      this.$router.push({
        path: '/cms/website/columnTemplate'
      })
    },
    extendsWord() {
      this.$router.push({
        path: '/cms/website/extendsWord'
      })
    },
    tagSetting() {
      this.$router.push({
        path: '/cms/website/tagSetting'
      })
    },
    waterSetting() {
      this.$router.push({
        path: '/cms/website/waterSetting'
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.column-manage {
  margin:30px;
  .tool-bar {
    text-align: right;
  }
}
</style>
