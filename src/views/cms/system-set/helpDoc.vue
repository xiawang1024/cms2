<template>
  <div class="helpdoc-container">
    <div class="tool-bar">
      <el-input
        v-model="searchDoc"
        class="search-input"
        placeholder="请输入标签/标题/内容"
        prefix-icon="el-icon-search"
        clearable
        @change="search"
      />
      <el-button type="primary" @click="handleAdd">新建文档</el-button>
    </div>
    <el-table :data="docList">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="文档内容">
              <span>{{ props.row.content }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="模板名称"/>
      <el-table-column prop="title" label="模板名称"/>
      <el-table-column prop="tag" label="标签"/>
      <el-table-column prop="size" label="文档大小"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="prime" @click="handleAlter(scope.$index, scope.row)">编辑</el-button>
          <el-button type="warning" @click="handleBroadcast(scope.$index, scope.row)">广播</el-button>
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
    <el-dialog :title="broadcast.title" :visible.sync="broadcastVisible" width="70%">
      <span>{{ broadcast.content }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="broadcastVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  name: 'HelpDoc',
  components: { Tinymce },
  data() {
    return {
      searchDoc: '',
      docList: [
        {
          id: 1,
          title: '【重要】系统更新通知',
          tag: '系统',
          size: '143bytes',
          content:
            '【重要】系统更新通知【重要】系统更新通知【重要】系统更新通知【重要】系统更新通知【重要】系统更新通知【重要】系统更新通知【重要】系统更新通知【重要】系统更新通知  '
        }
      ],
      broadcastVisible: false,
      broadcast: {},
      pageNum: 1, // 分页当前页
      pageSize: 10,
      totalCount: 0
    }
  },
  methods: {
    search() {},
    handleAdd() {
      this.$router.push({
        path: '/systemSet/helpDocEdit',
        query: {
          isAdd: true
        }
      })
    },
    handleBroadcast(index, row) {
      this.broadcast = row
      this.broadcastVisible = true
    },
    handleAlter(index, row) {
      this.$router.push({
        path: '/systemSet/helpDocEdit',
        query: {
          isAdd: false,
          componentId: row.id
        }
      })
    },
    handleDelete(row) {},
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

.helpdoc-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}

.search-input {
  width: auto;
}
</style>
