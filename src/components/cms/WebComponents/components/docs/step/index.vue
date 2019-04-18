<template>
  <div class="step-review-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      title="文章状态"
      width="40%"
      :before-close="colseMe"
    > 
      <div class="step-content">
        <div>文章标题：{{ documentInfor.articleTitle }}</div>
        <div style="height: 200px;">
          <el-steps direction="vertical" :active="2">
            <el-step title="步骤 1"/>
            <el-step title="步骤 2"/>
            <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"/>
          </el-steps>
        </div>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:dialogVisible', false)" size="small">取消</el-button>
        <el-button type="primary" @click="$emit('update:dialogVisible', false)" size="small">确定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
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
      contentBody: '',
      imageList: []
    }
  },
  watch: {
    // dialogVisible(val) {
    //   if(val) {
    //   }
    // }
  },
  methods: {
    // differenceFile(articleAttachmentsList, type) {
    //   let arrResoult = []
    //   if(articleAttachmentsList && articleAttachmentsList.length) {
    //     arrResoult = articleAttachmentsList.filter((ele) => {
    //       return ele.category === type
    //     })
    //   }
    //   return arrResoult
    // },
    // getDocumentInfor(id) {
    //   var _this = this
    //   return new Promise((resolve, reject) => {
    //     documentInfor(id)
    //       .then((response) => {
    //         _this.contentBody = response.data.result.contentBody
    //         _this.imageList = _this.differenceFile(response.data.result.articleAttachmentsList, 'IMG')
    //         resolve()
    //       })
    //       .catch((error) => {
    //         reject(error)
    //       })
    //   })
    // },
    colseMe() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>
<style lang="scss">
.step-review-dialog{
  .el-dialog {
    .el-dialog__header{
      border-bottom: 1px solid #ebeef5;
    }
  }
}
</style>

