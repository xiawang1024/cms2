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
        <div v-if="documentInfor.articleType =='1'">
          <el-row :gutter="20" >
            <el-col :span="6" v-for="(ele, index) in imageList" :key="index">
              <div class="image-list">
                <img :src="ele.url" alt="">
              </div>
            </el-col>
          </el-row>
        </div>
        <div v-if="documentInfor.articleType =='3'">
          <!-- <span>转载地址 </span>
          <a :href="documentInfor.linkTo">{{ documentInfor.linkTo }}</a> -->
          转载地址
          <div class="link-to">
            <span size="small" class="link-url" @click="openLink(documentInfor.linkTo)">{{ documentInfor.linkTo }}</span>
          </div>
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
      contentBody: '',
      imageList: []
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
    openLink(val) {
      window.open(val)
    },
    differenceFile(articleAttachmentsList, type) {
      let arrResoult = []
      if(articleAttachmentsList && articleAttachmentsList.length) {
        arrResoult = articleAttachmentsList.filter((ele) => {
          return ele.category === type
        })
      }
      return arrResoult
    },
    getDocumentInfor(id) {
      var _this = this
      return new Promise((resolve, reject) => {
        documentInfor(id)
          .then((response) => {
            _this.contentBody = response.data.result.contentBody
            _this.imageList = _this.differenceFile(response.data.result.articleAttachmentsList, 'IMG')
            console.log(_this.imageList, '_this.imageList')
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
    .link-to{
      overflow: hidden;
      .link-url{
        cursor: pointer;
        color: rgb(64, 158, 255)
      }
    }
    .image-list {
      height: 150px;
      width:auto;
      img{
        height:100%;
      }
    }
  }
}
</style>

