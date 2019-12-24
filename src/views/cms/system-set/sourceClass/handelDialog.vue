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
import { addClass, editClass } from "@/api/cms/sourceClass";
export default {
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    },
    handelTpye: {
      default: ()=> {
        return {}
      },
      type: Object
    },
    sourceList: {
      default: ()=> {
        return {}
      },
      type: Object
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
                  value: 'sp'
                },
                {
                  label: '矩阵',
                  value: 'jz'
                },
                {
                  label: '部门',
                  value: 'bm'
                }
              ]
            },
            {
              label: '来源',
              name: 'sourceIdsList',
              type: 'select',
              placeholder: '请选择',
              options: [],
              multiple: true
            },
           {
              label: '排序',
              name: 'seqNo',
              type: 'number'
            },
            {
              label: '备注',
              name: 'sourceMatrixRemark',
              type: 'textarea',
              placeholder: '请输入备注'
            }
          ]
        }
      ]
    }
  },
  computed: {
    title() {
      if(this.handelTpye.type === 'add') {
        return '添加'
      } else {
        return '编辑'
      }
    }
  },
  watch: {
    dialogVisible(val) {
      if(val) {
        this.formSettings[0].items[2].options = this.sourceList.allList
        if(this.sourceList.allList && this.sourceList.allList.length) {
          this.formSettings[0].items[2].options = this.sourceList.allList.map((ele) => {
            return {
              label:ele.originName,
              value:ele.originId
            }
          })
        }
      }
      if(this.handelTpye.type === 'edit') {
        this.formData = this.handelTpye.row
        if(this.sourceList.exist && this.sourceList.exist.length) {
          this.formData.sourceIdsList = this.sourceList.exist.map((ele) => {
            return ele.originId
          })
        }
      } else {
        this.formData = {}
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    submitSave(data) {
      if(!data.sourceIdsList) {
        data.sourceIdsList = []
      }
      // 添加
      if(this.handelTpye.type === 'add') {
        if(this.handelTpye.row) {
          data.parentSourceMatrixId = this.handelTpye.row.sourceMatrixId
        }
        this.addClass(data)
      }
      // 编辑
      if(this.handelTpye.type === 'edit') {
        data.sourceMatrixId = this.handelTpye.row.sourceMatrixId
        data.parentSourceMatrixId = this.handelTpye.row.parentSourceMatrixId
        this.editClass(data)
      }
      // return new Promise((resolve, reject) => {
      //   addClass(data)
      //     .then(response => {
      //       this.$message.success('添加成功')
      //       this.$emit('update:dialogVisible', false)
      //       resolve()
      //     })
      //     .catch(error => {
      //       reject(error)
      //     });
      // });
    },
    addClass(data) {
      return new Promise((resolve, reject) => {
        addClass(data)
          .then(response => {
            this.$message.success('添加成功')
            this.$emit('update:dialogVisible', false)
            this.$emit('handelSuccess')
            resolve()
          })
          .catch(error => {
            reject(error)
          });
      });
    },
    editClass(data) {
      return new Promise((resolve, reject) => {
        editClass(data)
          .then(response => {
            this.$message.success('编辑成功')
            this.$emit('update:dialogVisible', false)
              this.$emit('handelSuccess')
            resolve()
          })
          .catch(error => {
            reject(error)
          });
      });
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