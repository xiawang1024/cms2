<template>
  <div class="doc-review-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      title="预览"
      width="60%"
      :before-close="colseMe"
    > 
      <div>
        <h3>{{ documentInfor.articleTitle }}</h3>
        <div>
          {{ documentInfor.createTime }}
          <span v-if="documentInfor.articleOrigin">{{ documentInfor.articleOrigin }}</span>
        </div>
        <div v-html="contentBody"/>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:dialogVisible', false)" size="small">取消</el-button>
        <el-button type="primary" @click="$emit('update:dialogVisible', false)" size="small">确定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
import { documentInfor } from '@/api/cms/article'
export default {
  name: 'DocReview',
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    },
    documentInfor: {
      default: ()=> {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      contentBody: ''
    }
  },
  watch: {
    dialogVisible(val) {
      if(val) {
        this.getDocumentInfor(this.documentInfor.articleId)
      }
    }
  },
  methods: {
    getDocumentInfor(id) {
      var _this = this
      return new Promise((resolve, reject) => {
        documentInfor(id)
          .then((response) => {
            _this.contentBody = response.data.result.contentBody
            // _this.docInfor = response.data.result
            // _this.$emit('docInfor', _this.docInfor)
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
    colseMe() {
      this.$emit('update:dialogVisible', false)
      // if(this.tableData.length) {
      //   this.$emit('handelSuccess')
      // }
    }
  }
}
</script>
<style lang="scss">
.doc-review-dialog{
  .el-dialog {
    .el-dialog__header{
      border-bottom: 1px solid #ebeef5;
    }
  }
}
</style>

