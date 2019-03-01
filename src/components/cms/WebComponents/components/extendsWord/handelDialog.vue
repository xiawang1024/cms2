<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    :title="params.type === 'add' ? '添加字段' : '编辑字段'"
    width="50%">
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
      <el-button type="primary" @click="$emit('update:dialogVisible', false)">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    },
    params: {
      default: () => {
        return {}
      },
      type: Object
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
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>
