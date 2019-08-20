<template>
  <el-dialog
    title="文章详情"
    :visible.sync="dialogVisible"
    width="80%"
    class="check-preview1-dialog"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <div class="acticel-preview">
      <div class="article-title">{{ documentInfor.articleTitle }}</div>
      <div class="article-content">
        <!-- {{ documentInfor.createTime }}
        <span v-if="documentInfor.createUser">{{ documentInfor.createUser }}</span> -->
        <el-row :gutter="20">
          <el-col :span="19">
            <div class="article-content-left">
              <video :src="videolist[0].url" controls="controls" width="100%" height="400px" v-if="videolist.length"/>
              <!-- <audio :src="videolist[0].url" controls="controls" width="100%" height="400px" v-if="videolist.length"/> -->
              <aplayer 
                autoplay :music="{
                  title: audioList[0].name,
                  artist: audioList[0].title,
                  src: audioList[0].url,
                  pic: 'https://cn-east-17-aplayer-35525609.oss.dogecdn.com/secretbase.jpg'
                }"
                v-if="audioList.length"
              />
              <div class="article-content" v-html="documentInfor.contentBody"/>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="article-content-right">
              right
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <div v-if="documentInfor.articleType =='1'">
        <el-row :gutter="20" >
          <el-col :span="6" v-for="(ele, index) in imageList" :key="index">
            <div class="image-list">
              <img :src="ele.url" alt="">
            </div>
          </el-col>
        </el-row>
      </div> -->
      <!-- <div>
        <div class="link-to">
          <span size="small" class="link-url" @click="openLink(documentInfor.linkTo)">{{ documentInfor.linkTo }}</span>
        </div>
      </div> -->
    </div>
  </el-dialog>
</template>
<script>
import { documentInfor } from '@/api/cms/articleCheck'
import Aplayer from 'vue-aplayer'
export default {
  components: {
    Aplayer
  },
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
      imageList: [],
      videolist: [],
      audioList: []
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
            this.videolist = this.differenceFile(response.data.result.articleAttachmentsList, 'VIDEO')
            this.audioList = this.differenceFile(response.data.result.articleAttachmentsList, 'AUDIO')
            console.log(this.imageList)
            console.log(this.videolist)
            console.log(this.audioList)
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
  .check-preview1-dialog{
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
    .article-title{
      color: #333;
      font-size: 30px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 40px;
      margin-top: 40px;
      width:100%;
    }
    .aplayer{
      margin:0;
    }
    .aplayer-body{
      .aplayer-pic{
        background-color: #0076ee !important;
      }
    }
    .article-content{
      img{
        max-width: 100%;
      }
    }
  }
</style>