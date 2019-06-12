<template>
  <el-dialog
    title="文章详情"
    :visible.sync="dialogVisible"
    width="50%"
    class="check-preview-dialog"
    :before-close="handleClose">
    <!-- <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span> -->
  </el-dialog>
</template>
<script>
import { documentInfor } from '@/api/cms/article'
export default {
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    },
    articleId: {
      default: '',
      type: String
    }
  },
  data() {
    return {
    }
  },
  watch: {
    dialogVisible(val) {
      if(val) {
        this.getDocumentInfor(this.articleId)
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    // handelCheck(state) {
    //   console.log(1111)
    //   let data = {
    //     id: this.rowData.id,
    //     auditOpinion: this.form.auditOpinion,
    //     state: state
    //   }
    //   return new Promise((resolve, reject) => {
    //     checkHandel(data)
    //       .then((response) => {
    //         this.$emit('update:dialogVisible', false)
    //         this.$message.success('操作成功')
    //         this.$emit('handelSuccess')
    //         resolve()
    //       })
    //       .catch((error) => {
    //         reject(error)
    //       })
    //   })
    // },
    getDocumentInfor(id) {
      return new Promise((resolve, reject) => {
        documentInfor(id)
          .then((response) => {
            // _this.docInfor = response.data.result
            // _this.typeForm.articleType = response.data.result.articleType ? response.data.result.articleType : 0
            // if(_this.docInfor.extFieldsList && _this.docInfor.extFieldsList.length) {
            //   _this.docInfor.extFieldsList.forEach((ele) => {
            //     _this.docInfor[ele.label] = ele.fieldValue
            //   })
            // }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
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