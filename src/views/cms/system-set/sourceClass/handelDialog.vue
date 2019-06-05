<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" label-width="80px" :btn-loading = "isLoading"/>
    <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:dialogVisible', false)" size="mini">取 消</el-button>
        <el-button type="primary" @click="$emit('update:dialogVisible', false)"  size="mini">确 定</el-button>
      </span> -->
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    },
    title: {
      default: '添加',
      type: String
    }
  },
  data() {
    return {
      formData: {},
      isLoading: false,
      formSettings: [
        {
          items: [
            {
              label: '名称',
              name: 'sourceMatrixName',
              type: 'text',
              valueType: 'string',
              disabled: false,
              required: true,
              placeholder: '请输入名称'
            },
            {
              label: '类型',
              name: 'sourceMatrixType',
              type: 'select',
              required: true,
              placeholder: '请选择',
              options: [
                {
                  label: '视频',
                  value: '1'
                },
                {
                  label: '矩阵',
                  value: '2'
                }
              ]
            },
            {
              label: '来源',
              name: 'sourceIdsList',
              type: 'select',
              placeholder: '请选择',
              options: []
            },
            {
              label: '备注',
              name: 'sourceMatrixRemark',
              type: 'textarea',
              required: true,
              placeholder: '请输入备注'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    submitSave() {

    }
  }
}
</script>
<style lang="scss">
.source-class{
  .el-dialog__body{
    padding-top:0;
    padding-bottom:0;
  }
}
</style>