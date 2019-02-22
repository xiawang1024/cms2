<template>
  <div class="extend-field-container">
    <el-form label-position="top">
      <el-form-item label="拓展字段">
        <div class="tool-bar">
          <el-button type="primary" @click="addExtendFieldVisible = true">新增</el-button>
        </div>
        <el-table :data="fieldList" style="width: 100%">
          <el-table-column prop="name" label="名称"/>
          <el-table-column prop="type" label="类型"/>
          <el-table-column prop="required" label="必填">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.required" type="success">是</el-tag>
              <el-tag v-else type="info">否</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="belong" label="归属"/>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="beforeAlter(scope.$index, scope.row)">修改</el-button>
              <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-button type="warning">保存</el-button>
    </el-form>

    <el-dialog :visible.sync="addExtendFieldVisible" title="添加文稿来源">
      <el-form :model="extendFieldForm" label-position="top">
        <el-form-item label="名称">
          <el-input v-model="extendFieldForm.name"/>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="extendFieldForm.type" placeholder="请选择前一栏目">
            <el-option v-for="type in typeList" :key="type.id" :label="type.name" :value="type.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="必填">
          <el-switch v-model="extendFieldForm.required" active-color="#13ce66"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addExtendFieldVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="alterExtendFieldVisible" title="修改文稿来源">
      <el-form :model="extendFieldForm" label-position="top">
        <el-form-item label="名称">
          <el-input v-model="extendFieldForm.name"/>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="extendFieldForm.type" placeholder="请选择前一栏目">
            <el-option v-for="type in typeList" :key="type.id" :label="type.name" :value="type.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="必填">
          <el-switch v-model="extendFieldForm.required" active-color="#13ce66"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="alterExtendFieldVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAlter()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ColumnTemplet',
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      fieldList: [
        {
          id: 1,
          name: '名称',
          type: '数字',
          required: true,
          belong: '自有'
        },
        {
          id: 2,
          name: '名称',
          type: '数字',
          required: false,
          belong: '自有'
        }
      ],
      typeList: [
        {
          id: 1,
          name: '字符串'
        },
        {
          id: 2,
          name: '时间'
        },
        {
          id: 3,
          name: '数字'
        }
      ],
      extendFieldForm: {
        id: '',
        name: '',
        type: '',
        required: '',
        belong: ''
      },
      addExtendFieldVisible: false,
      alterExtendFieldVisible: false
    }
  },
  methods: {
    handleAdd() {
      console.log('新增')
    },
    beforeAlter(index, row) {
      this.extendFieldForm.id = row.id
      this.extendFieldForm.name = row.name
      this.extendFieldForm.type = row.type
      this.extendFieldForm.required = row.required
      this.extendFieldForm.belong = row.belong
      this.alterExtendFieldVisible = true
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
.extend-field-container {
  margin: 10px;
}
.tool-bar {
  text-align: right;
}
</style>
