<template>
  <div class="doc-review-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      title="预览"
      width="60%"
      :before-close="colseMe"
    >
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
    }
  },
  watch: {
    dialogVisible(val) {
      if(val) {
        // this.chooseIds = []
        // this.tableData = this.multipleList
        // this.tableData.forEach((ele) => {
        //   ele.sendTime = Date.now()
        //   ele.handelTime =  Date.now()
        //   ele.modifyTime =  ''
        //   this.chooseIds.push(ele.articleId)
        // })
      }
    }
  },
  methods: {
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

