<template>
  <div class="docSource-container">
    <div class="tool-bar">
      <el-button type="primary" @click="addDocSourceVisible = true">新增</el-button>
    </div>
    <el-table :data="siteList" style="width: 100%">
      <el-table-column prop="name" label="来源名称"/>
      <el-table-column prop="location" label="来源路径"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="prime" @click="beforeAlter(scope.$index, scope.row)">修改</el-button>
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="addDocSourceVisible" title="添加文稿来源">
      <el-form :model="docSourceForm">
        <el-form-item label="来源名称">
          <el-input v-model="docSourceForm.name"/>
        </el-form-item>
        <el-form-item label="来源路径">
          <el-input v-model="docSourceForm.location"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDocSourceVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="alterDocSourceVisible" title="修改文稿来源">
      <el-form :model="docSourceForm">
        <el-form-item label="来源名称">
          <el-input v-model="docSourceForm.name"/>
        </el-form-item>
        <el-form-item label="来源路径">
          <el-input v-model="docSourceForm.location"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="alterDocSourceVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAlter()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DocSource',
  data() {
    return {
      siteList: [
        {
          id: '1',
          name: '网站名称',
          location: 'site.name'
        },
        {
          id: '2',
          name: '生产服务器',
          location: 'factory.domain'
        },
        {
          id: '3',
          name: '发布根目录',
          location: 'publish.root'
        },
        {
          id: '4',
          name: '发布域名',
          location: 'site.domain'
        }
      ],
      addDocSourceVisible: false,
      alterDocSourceVisible: false,
      docSourceForm: {
        id: '',
        name: '',
        location: ''
      }
    }
  },
  methods: {
    handleAdd() {
      console.log('新增')
    },
    beforeAlter(index, row) {
      this.docSourceForm.id = row.id
      this.docSourceForm.name = row.name
      this.docSourceForm.location = row.location
      this.alterDocSourceVisible = true
    },
    handleAlter() {
      console.log('修改')
    },
    handleDelete(index, row) {
      console.log('删除' + row.name)
    }
  }
}
</script>

<style scoped>
.el-button + .el-button {
  margin-top: 5px;
  margin-left: 0px;
}

.docSource-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}
</style>
