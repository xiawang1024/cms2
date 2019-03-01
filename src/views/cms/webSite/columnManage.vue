<template>
  <div class="column-manage">
    <div class="tool-bar">
      <el-button type="primary" @click="columnAddEdit(true, 'father')">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="channelName" label="栏目名称"/>
      <el-table-column prop="hiddenFlag" label="状态"/>
      <el-table-column prop="seqNo" label="排序"/>
      <el-table-column prop="parentChannelId" label="是否根节点"/>
      <el-table-column label="设置" width="300">
        <template slot-scope="scope">
          <el-button type="text" @click="columnTemplate">栏目模板</el-button>
          <el-button type="text" @click="extendsWord">扩展字段</el-button>
          <el-button type="text" @click="tagSetting">标签设置</el-button>
          <el-button type="text" @click="waterSetting">水印设置</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="columnAddEdit(false, '', scope.row.channelId)">编辑</el-button>
          <el-button type="text" @click="columnDel(scope.row)">删除</el-button>
          <el-button type="text" @click="columnAddEdit(true, 'child')">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageNum"
      :page-sizes="[10,30,60,100]"
      :page-size="pageSize"
      :total="totalCount"
      background
      class="pagination"
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
// import { fetchDictByDictName } from '@/api/cms/dict'
import { columnList, deleteColumn } from '@/api/cms/columnManage'
export default {
  name: 'ColumnManage',
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      totalCount: 0
    }
  },
  mounted() {
    this.columnList()
  },
  methods: {
    columnList() {
      var _this = this
      return new Promise((resolve, reject) => {
        columnList({}, _this.pageNum, _this.pageSize)
          .then((response) => {
            _this.tableData = response.data.result.content
            _this.totalCount = response.data.result.total
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    columnDelFeatch(row) {
      var _this = this
      return new Promise((resolve, reject) => {
        deleteColumn({ channelId: row.channelId })
          .then((response) => {
            _this.columnList()
            console.log(321)
            if (response.data.code === 0) {
              _this.$message.success('操作成功！')
            } else {
              _this.$message.success(response.data.msg)
            }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.columnList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.columnList()
    },
    columnAddEdit(handelType, type, channelId) {
      this.$router.push({
        path: '/cms/website/columnHandel',
        query: {
          isAdd: handelType,
          isFather: type === 'father',
          channelId: channelId
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
    },
    columnDel(row) {
      this.$confirm('此操作将永久删除该栏目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.columnDelFeatch(row)
      }).catch(() => {
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
  .pagination {
    margin-top:20px;
  }
}
</style>
