<template>
  <div class="platform-container">
    <div class="tool-bar">
      <el-button type="primary" @click="addPlatFormVisible = true">新增</el-button>
    </div>
    <el-table :data="siteList" style="width: 100%">
      <el-table-column prop="plat" label="平台"/>
      <el-table-column prop="desc" label="描述"/>
      <el-table-column prop="fileName" label="文件名"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="prime" @click="beforeAlter(scope.$index, scope.row)">修改</el-button>
          <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="addPlatFormVisible" title="添加发布平台">
      <el-form :model="platForm">
        <el-form-item label="平台">
          <el-input v-model="platForm.plat"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="platForm.desc"/>
        </el-form-item>
        <el-form-item label="文件名">
          <el-input v-model="platForm.fileName"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addPlatFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="alterPlatFormVisible" title="修改发布平台">
      <el-form :model="platForm">
        <el-form-item label="平台">
          <el-input v-model="platForm.plat"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="platForm.desc"/>
        </el-form-item>
        <el-form-item label="文件名">
          <el-input v-model="platForm.fileName"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="alterPlatFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAlter()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PlatformSet',
  data() {
    return {
      siteList: [
        {
          id: '1',
          plat: '网站名称',
          desc: 'site.name',
          fileName: 'index.html'
        },
        {
          id: '2',
          plat: '生产服务器',
          desc: 'factory.domain',
          fileName: 'index.js'
        },
        {
          id: '3',
          plat: '发布根目录',
          desc: 'publish.root',
          fileName: 'index.css'
        },
        {
          id: '4',
          plat: '发布域名',
          desc: 'site.domain',
          fileName: 'index.html'
        }
      ],
      addPlatFormVisible: false,
      alterPlatFormVisible: false,
      platForm: {
        id: '',
        plat: '',
        desc: '',
        fileName: ''
      }
    }
  },
  methods: {
    handleAdd() {
      console.log('新增')
    },
    beforeAlter(index, row) {
      this.platForm.id = row.id
      this.platForm.plat = row.plat
      this.platForm.desc = row.desc
      this.platForm.fileName = row.fileName
      this.alterPlatFormVisible = true
    },
    handleAlter() {
      console.log('修改')
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

.platform-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}
</style>
