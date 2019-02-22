<template>
  <div class="extendField-container">
    <div class="tool-bar">
      <el-button
        type="primary"
        @click="addExtendFieldVisible = true"
      >新增</el-button>
    </div>
    <el-table
      :data="extendFieldList"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="编号"
      />
      <el-table-column
        prop="program"
        label="所属栏目"
      />
      <el-table-column
        prop="viewName"
        label="显示名称"
      />
      <el-table-column
        prop="fieldName"
        label="字段名称"
      />
      <el-table-column
        prop="required"
        label="是否必填"
      />
      <el-table-column
        prop="type"
        label="类别"
      />
      <el-table-column
        prop="fieldType"
        label="字段类型"
      />
      <el-table-column
        prop="desc"
        label="描述"
      />
      <el-table-column
        prop="default"
        label="预设内容"
      />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="prime"
            @click="beforeAlter(scope.$index, scope.row)"
          >修改</el-button>
          <el-button
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="addExtendFieldVisible"
      title="添加发布平台"
      top="6vh"
    >
      <el-form :model="extendFieldForm">
        <el-form-item label="编号">
          <el-input v-model="extendFieldForm.id" />
        </el-form-item>
        <el-form-item label="所属栏目">
          <el-input v-model="extendFieldForm.program" />
        </el-form-item>
        <el-form-item label="显示名称">
          <el-input v-model="extendFieldForm.viewName" />
        </el-form-item>
        <el-form-item label="字段名称">
          <el-input v-model="extendFieldForm.fieldName" />
        </el-form-item>
        <el-form-item label="访问地址">
          <el-input v-model="extendFieldForm.required" />
        </el-form-item>
        <el-form-item label="类别">
          <el-input v-model="extendFieldForm.type" />
        </el-form-item>
        <el-form-item label="字段类型">
          <el-input v-model="extendFieldForm.fieldType" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="extendFieldForm.desc" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addExtendFieldVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleAdd()"
        >确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="alterExtendFieldVisible"
      title="修改发布平台"
      top="6vh"
    >
      <el-form :model="extendFieldForm">
        <el-form-item label="编号">
          <el-input v-model="extendFieldForm.id" />
        </el-form-item>
        <el-form-item label="所属栏目">
          <el-input v-model="extendFieldForm.program" />
        </el-form-item>
        <el-form-item label="显示名称">
          <el-input v-model="extendFieldForm.viewName" />
        </el-form-item>
        <el-form-item label="字段名称">
          <el-input v-model="extendFieldForm.fieldName" />
        </el-form-item>
        <el-form-item label="访问地址">
          <el-input v-model="extendFieldForm.required" />
        </el-form-item>
        <el-form-item label="类别">
          <el-input v-model="extendFieldForm.type" />
        </el-form-item>
        <el-form-item label="字段类型">
          <el-input v-model="extendFieldForm.fieldType" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="extendFieldForm.desc" />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="alterExtendFieldVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleAlter()"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  viewName: 'ExtendFieldSet',
  data() {
    return {
      extendFieldList: [
        {
          id: 1,
          program: 'extend_cdn',
          viewName: 'CDN刷新',
          fieldName: 'CDN刷新',
          required: '/cdn_refresh.xhtml',
          type: 'ManagerController',
          fieldType: 'p_url_extend_pond',
          desc: '/sms_sender.xhtml',
          default: '默认值'
        }
      ],
      extendFieldForm: {
        id: '',
        program: '',
        viewName: '',
        fieldName: '',
        required: '',
        type: '',
        fieldType: '',
        desc: '',
        default: ''
      },
      addExtendFieldVisible: false,
      alterExtendFieldVisible: false
    }
  },
  methods: {
    beforeAlter(index, row) {
      this.extendFieldForm.id = row.id
      this.extendFieldForm.program = row.program
      this.extendFieldForm.viewName = row.viewName
      this.extendFieldForm.fieldName = row.fieldName
      this.extendFieldForm.required = row.required
      this.extendFieldForm.type = row.type
      this.extendFieldForm.fieldType = row.fieldType
      this.extendFieldForm.desc = row.desc
      this.extendFieldForm.default = row.default
      this.alterExtendFieldVisible = true
    },
    handleDelete() {},
    handleAdd() {}
  }
}
</script>

<style scoped>
.el-button + .el-button {
  margin-top: 5px;
  margin-left: 0px;
}

.extendField-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}
</style>
