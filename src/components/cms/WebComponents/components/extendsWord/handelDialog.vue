<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    :title="params.type === 'add' ? '添加字段' : '编辑字段'"
    width="500px">
    <!-- <el-form :model="extendFieldForm" label-position="top">
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
    </el-form> -->
    <v-form ref="vform" :form-settings="formSettings" :form-data="formData" :label-width="labelWidth" @save="submitSave"/>
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
      <el-button type="primary" @click="$emit('update:dialogVisible', false)">确 定</el-button> -->
    </span>
  </el-dialog>
</template>
<script>
import { createExtendsWord, editExtendsWord } from '@/api/cms/columnManage'
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
      formSettings: [
        {
          items: [
            {
              label: '名称',
              name: 'label',
              type: 'text',
              placeholder: '请输入名称'
            },
            {
              label: '类型',
              name: 'type',
              type: 'select',
              placeholder: '请选择',
              options: [
                {
                  label: '字符串',
                  value: '1'
                }, {
                  label: '时间',
                  value: '2'
                }, {
                  label: '数字',
                  value: '3'
                }
              ]
            },
            {
              label: '必填',
              name: 'required',
              type: 'switch'
            }
          ]
        }
      ],
      labelWidth: '80px',
      formData: {}
    }
  },
  watch: {
    dialogVisible(val) {
      if(val) {
        if(this.params.extFieldInfor) {
          this.formData = this.params.extFieldInfor
        } else {
          this.formData = {}
        }
      }
    }
  },
  methods: {
    submitSave(data) {
      var _this = this
      if(this.params.type === 'edit') {
        return new Promise((resolve, reject) => {
          data.extFieldId = this.params.extFieldInfor.extFieldId
          editExtendsWord(_this.params.channelId, data)
            .then((response) => {
              _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
              _this.$emit('update:dialogVisible', false)
              _this.$emit('submitSuccess')
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      } else {
        return new Promise((resolve, reject) => {
          createExtendsWord(_this.params.channelId, data)
            .then((response) => {
              _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
              _this.$emit('update:dialogVisible', false)
              _this.$emit('submitSuccess')
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      }
    },
    handleClose() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>
