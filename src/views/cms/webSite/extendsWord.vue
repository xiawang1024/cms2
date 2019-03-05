<template>
  <div class="extends-word">
    <div class="extends-word-add">
      <el-button type="primary" @click="handelWord('add')" size="small">创建扩展字段</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="字段名称"/>
      <el-table-column prop="name" label="字段类型"/>
      <el-table-column prop="name" label="是否必填"/>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="handelWord('edit', scope.row.id)">编辑</el-button>
          <el-button type="text" @click="wordDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <handel-dialog :dialog-visible.sync="dialogVisible" :params="params"/>
  </div>
</template>
<script>
import handelDialog from '@/components/cms/WebComponents/components/extendsWord/handelDialog'
export default {
  name: 'ExtendsWord',
  components: {
    handelDialog
  },
  data() {
    return {
      tableData: [{
        id: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        id: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      dialogVisible: false,
      params: {}
    }
  },
  methods: {
    wordHande(row) {
      console.log(row)
    },
    wordDelete(row) {
      this.$confirm('是否删除该字段?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      }).catch(() => {
      })
    },
    handelWord(type, id) {
      this.params.type = type
      this.params.id = id
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
  .extends-word {
    margin: 30px;
    .extends-word-add {
      text-align: right;
    }
  }
</style>

