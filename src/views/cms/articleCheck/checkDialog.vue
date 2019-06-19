<template>
  <el-dialog
    title="审核"
    :visible.sync="dialogVisible"
    width="450px"
    :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="80px" class="article-check-dialog">
      <el-form-item label="审核意见">
        <el-input type="textarea" v-model="form.auditOpinion" placeholder="请输入审核意见"/>
      </el-form-item>
      <el-form-item>
        <el-button type="success" size="mini" @click="handelCheck('1')">通过</el-button>
        <el-button type="danger" size="mini" @click="handelCheck('2')">拒绝</el-button>
        <el-button type="primary" size="mini" @click="handelCheck('3')">返回上一级</el-button>
      </el-form-item>
    </el-form>
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span> -->
  </el-dialog>
</template>
<script>
import { checkHandel } from '@/api/cms/articleCheck'
export default {
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    },
    rowData: {
      default: ()=> {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      form: {
        auditOpinion: ''
      }
    }
  },
  watch: {
    dialogVisible(val) {
      if(val) {
        this.form.auditOpinion = ''
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    handelCheck(state) {
      if(state == '2') {
        if(!this.form.auditOpinion) {
          this.$message.warning('请输入审核意见！')
          return
        }
      }
      let data = {
        id: this.rowData.id,
        auditOpinion: this.form.auditOpinion,
        state: state
      }
      return new Promise((resolve, reject) => {
        checkHandel(data)
          .then((response) => {
            this.$emit('update:dialogVisible', false)
            this.$message.success('操作成功')
            this.$emit('handelSuccess')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}
</script>
<style lang="scss">
  .article-check-dialog{
   label{
     font-weight: normal;
   }
  }
</style>