<template>
  <el-dialog
    title="文章详情"
    :visible.sync="dialogVisible"
    width="60%"
    class="check-preview-dialog"
    :before-close="handleClose">
    <div v-if="documentInfor.articleId">
      <h3>{{ documentInfor.articleTitle }}</h3>
      <div>
        {{ documentInfor.createTime }}
        <span v-if="documentInfor.createUser">{{ documentInfor.createUser }}</span>
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
      <div v-html="documentInfor.contentBody"/>
    </div>
  </el-dialog>
</template>
<script>
import { documentInfor } from '@/api/cms/articleCheck'
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
      documentInfor: {},
      imageList: []
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
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    getDocumentInfor(id) {
      return new Promise((resolve, reject) => {
        documentInfor(id)
          .then((response) => {
            this.documentInfor = response.data.result
            this.imageList = this.differenceFile(response.data.result.articleAttachmentsList, 'IMG')
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
  .check-preview-dialog{
    .el-dialog__header{
      border-bottom: 1px solid #ebeef5;
    }
    .el-dialog__body{
      padding-top: 10px;
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
</style>