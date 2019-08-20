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
      <div class="article">
        <!-- {{ documentInfor.createTime }}
        <span v-if="documentInfor.createUser">{{ documentInfor.createUser }}</span> -->
        <el-row :gutter="20">
          <el-col :span="19">
            <div class="article-content-left">
              <video :src="videolist[0].url" controls="controls" width="100%" height="400px" v-if="videolist.length"/>
              <img :src="coverImage.url" alt="" v-else class="cover-img">
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
              <div class="seoDescription">
                <div class="seoDescription-title">摘要</div>
                <div class="seoDescription-content">
                  <span v-if="documentInfor.seoDescription">{{ documentInfor.seoDescription }}</span>
                  <span v-else>暂无</span>
                </div>
              </div>
            </div>
            <div class="article-content-right">
              <div class="other">
                <div>关键字：{{ documentInfor.seoKeywords }}</div>
                <div>来源：{{ documentInfor.articleOrigin }}</div>
                <div>作者：{{ documentInfor.articleAuthor }}</div>
                <div>点击量：{{ documentInfor.clickNum }}</div>
                <div>发布时间：{{ documentInfor.createTime }}</div>
                <div v-if="documentInfor.extFieldsList && documentInfor.extFieldsList.length">
                  <div v-for="(ele, index) in documentInfor.extFieldsList" :key="index">
                    {{ ele.label }}:{{ ele.fieldValue }}
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
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
      audioList: [],
      coverImage: {}
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
    getCover(imgList) {
      if(imgList && imgList.length) {
        for(let i=0; i<imgList.length; i++) {
          if(imgList[i].coverBool) {
            return imgList[i]
          }
        }
      } else {
        return {}
      }
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
            this.coverImage = this.getCover(response.data.result.coverImagesList)
            console.log(this.coverImage, '123')
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
    .article{
      .el-col-19 {
        min-height: 200px;
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
    .article-content-right{
        width: 100%;
        height: auto;
        background: #f2f4f7;
        margin-bottom: 25px;
        padding: 0 20px;
      .seoDescription{
        .seoDescription-title{
          font-size: 18px;
          color: #999;
          display: block;
          border-bottom: 1px solid #dbdbdb;
          padding: 18px 0;
        }
        .seoDescription-content{
          font-size: 15px;
          color: #666;
          padding: 10px 0 20px 0;
          line-height: 30px;
        }
      }
      .other{
        margin-top:30px;
        font-size: 15px;
        color: #666;
        padding: 10px 0 20px 0;
        line-height: 30px;
      }
    }
    .article-content-left{
      .cover-img{
         width:100%;
         height:auto;
      }
    }
  }
</style>