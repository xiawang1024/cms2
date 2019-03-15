<template>
  <div class="systemFunc-container">
    <div class="tool-bar">
      <el-button size="mini" type="primary" @click="addSystemFuncVisible = true">新增</el-button>
    </div>
    <el-table :data="siteList" style="width: 100%">
      <el-table-column prop="mark" label="标示"/>
      <el-table-column prop="desc" label="描述"/>
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="location" label="访问地址"/>
      <el-table-column prop="controller" label="控制器"/>
      <el-table-column prop="viewer" label="视图"/>
      <el-table-column prop="expression" label="表达式"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="prime" @click="beforeAlter(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="addSystemFuncVisible" title="添加发布平台" top="6vh">
      <el-form :model="systemFuncForm">
        <el-form-item label="标示">
          <el-input v-model="systemFuncForm.mark"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="systemFuncForm.desc"/>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="systemFuncForm.name"/>
        </el-form-item>
        <el-form-item label="访问地址">
          <el-input v-model="systemFuncForm.location"/>
        </el-form-item>
        <el-form-item label="控制器">
          <el-input v-model="systemFuncForm.controller"/>
        </el-form-item>
        <el-form-item label="视图">
          <el-input v-model="systemFuncForm.viewer"/>
        </el-form-item>
        <el-form-item label="表达式">
          <el-input v-model="systemFuncForm.expression"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addSystemFuncVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="alterSystemFuncVisible" title="修改发布平台" top="6vh">
      <el-form :model="systemFuncForm">
        <el-form-item label="标示">
          <el-input v-model="systemFuncForm.mark"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="systemFuncForm.desc"/>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="systemFuncForm.name"/>
        </el-form-item>
        <el-form-item label="访问地址">
          <el-input v-model="systemFuncForm.location"/>
        </el-form-item>
        <el-form-item label="控制器">
          <el-input v-model="systemFuncForm.controller"/>
        </el-form-item>
        <el-form-item label="视图">
          <el-input v-model="systemFuncForm.viewer"/>
        </el-form-item>
        <el-form-item label="表达式">
          <el-input v-model="systemFuncForm.expression"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="alterSystemFuncVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleAlter()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SystemFuncSet',
  data() {
    return {
      siteList: [
        {
          id: 1,
          mark: 'extend_cdn',
          desc: 'CDN刷新',
          name: 'CDN刷新',
          location: '/cdn_refresh.xhtml',
          controller: 'ManagerController',
          viewer: 'p_url_extend_pond',
          expression: '/sms_sender.xhtml'
        },
        {
          id: 2,
          mark: 'extend_cdn',
          desc: 'CDN刷新',
          name: 'CDN刷新',
          location: '/cdn_refresh.xhtml',
          controller: 'ManagerController',
          viewer: 'p_url_extend_pond',
          expression: '/sms_sender.xhtml'
        },
        {
          id: 3,
          mark: 'extend_cdn',
          desc: 'CDN刷新',
          name: 'CDN刷新',
          location: '/cdn_refresh.xhtml',
          controller: 'ManagerController',
          viewer: 'p_url_extend_pond',
          expression: '/sms_sender.xhtml'
        },
        {
          id: 4,
          mark: 'extend_cdn',
          desc: 'CDN刷新',
          name: 'CDN刷新',
          location: '/cdn_refresh.xhtml',
          controller: 'ManagerController',
          viewer: 'p_url_extend_pond',
          expression: '/sms_sender.xhtml'
        }
      ],
      addSystemFuncVisible: false,
      alterSystemFuncVisible: false,
      systemFuncForm: {
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
      this.systemFuncForm.mark = row.mark
      this.systemFuncForm.desc = row.desc
      this.systemFuncForm.name = row.name
      this.systemFuncForm.location = row.location
      this.systemFuncForm.controller = row.controller
      this.systemFuncForm.viewer = row.viewer
      this.systemFuncForm.expression = row.expression
      this.alterSystemFuncVisible = true
    },
    handleAlter() {
      console.log('修改')
    },
    handleDelete(index, row) {
      console.log('删除' + row.id)
    }
  }
}
</script>

<style scoped>
.el-button + .el-button {
  margin-top: 5px;
  margin-left: 0px;
}

.systemFunc-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}
.dialog-footer{
  margin-top: -45px;
}
</style>
