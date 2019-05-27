<template>
  <div class="article-cover-pic">
    <div class="upload-content">
      <el-row :gutter="20">
        <el-col :sm="12" :md="12" :lg="12" :xl="12">
          <v-form ref="imageForm" :form-settings="imageSettings" :form-data="formData" label-width="80px" :show-preview="showPreview" :show-button = "showButton" @fileDetail="fileDetail" @removeFile="removeFile"/>
          <!-- <v-form ref="videoForm" :form-settings="videoSettings" :form-data="formData" label-width="80px" :show-preview="showPreview" :show-button = "showButton" @fileDetail="fileDetail"/> -->
        </el-col>
        <el-col :sm="10" :md="10" :lg="10" :xl="10" >
          <div v-if="rightCardShow">
            <v-form ref="vForm" :form-settings="fileSettings" :form-data="singleData" label-width="80px" :show-button = "showButton">
              <template slot="information">
                <div class="file-infor">
                  <div class="file-img">
                    <img :src="filedetail.url" alt="">
                  </div>
                  <div class="desc">
                    <div>{{ filedetail.name }}</div>
                    <div v-if="filedetail.createTime">{{ parseInt(filedetail.createTime)|timeFilter }}</div>
                    <div v-if="filedetail.size">{{ Math.floor(filedetail.size / 1024) }} kb</div>
                  </div>
                </div>
              </template>
              <template slot="btn">
                <el-button type="primary" size="mini" @click ="setFile">保存</el-button>
                <el-button size="mini" @click="colseSet">关闭</el-button>
              </template>
            </v-form>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="upload-btn">
      <!-- <el-button type = "primary" size="small" @click = "goBack">预览</el-button> -->
      <el-button type = "primary" size="small" @click = "savePic('0')" v-if="!contextMenu.docId">存草稿</el-button>
      <el-button type = "primary" size="small" @click = "savePic('11')" v-if="!contextMenu.docId">保存并发布</el-button>
      <el-button type = "primary" size="mini" @click="savePic" v-if="contextMenu.docId">保存封面</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { documentInfor, picCoverHandel, createDocument } from '@/api/cms/article'
export default {
  props: {
    activeName: {
      default: '',
      type:String
    }
  },
  data () {
    return {
      picList: [],
      rightCardShow: false,
      singleData: {},
      showButton: false,
      filedetail: {},
      showPreview: false,
      imageSettings: [{
        items: [
          {  
            label: '图片',
            name: 'contentImagesList',
            type: 'img',
            required: false,
            // hasTextInput: true,
            hidden: false,
            maxSize: 1024*5
          }
        ]
      }],
      fileSettings: [{
        items: [
          {
            label: '附件详情',
            name: 'information',
            type: 'slot'
          },
          {
            label: '标题',
            name: 'title',
            type: 'text'
          },
          {
            label: '描述',
            name: 'desc',
            type: 'textarea',
          },
          {
            label: '设为封面',
            name: 'coverBool',
            type: 'switch',
            hidden: false
          },
          // {
          //   label: '自定义',
          //   name: 'define',
          //   type: 'slot'
          // },
          {
            label: '',
            name: 'btn',
            type: 'slot'
          },
        ]
      }],
      formData: {}
    }
  },
  computed: {
    ...mapGetters(['contextMenu', 'getDocInformation'])
  },
  watch: {
    activeName(val, oldVal) {
      if(val == 'coverPic' && this.contextMenu.docId) {
        this.getDocumentInfor(this.contextMenu.docId)
        this.rightCardShow = false
      } else if(val == 'coverPic' && !this.contextMenu.docId) {
        // 从编辑器获取图片
        let imgReg = /<img.*?(?:>|\/>)/gi;
        let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let imgArr = this.getDocInformation.baseInfor.contentBody.match(imgReg);
        let imgSrc = []
        if(imgArr && imgArr.length) {
        imgArr.forEach((ele) => {
          let src = ele.match(srcReg)
          imgSrc.push({
            url: src[1],
            name: '图片'
          })
        })
        }
        this.formData = {}
        // 封面图片赋值
        if(imgSrc.length && this.getDocInformation.coverImagesList.length) {
          this.formData.contentImagesList = imgSrc
          imgSrc.forEach((src) => {
            this.getDocInformation.coverImagesList.forEach((storeImage) => {
              if(src.url === storeImage.url) {
                // this.formData.contentImagesList.push(storeImage)
                src = Object.assign(src, storeImage)
              }else {
                this.formData.contentImagesList.push(storeImage)
              }
            })
          })
        } else {
          this.formData.contentImagesList = imgSrc.concat(this.getDocInformation.coverImagesList)
        }
      }
      // 存储封面图片
      if(oldVal == 'coverPic') {
        this.$store.dispatch('setCoverList', this.$refs.imageForm.formModel.contentImagesList)
      }
    }
  },
  mounted () {
    // if(this.contextMenu.docId) {
    //   console.log('tupian')
    //   this.getDocumentInfor(this.contextMenu.docId)
    // }
  },
  methods: {
     // 关闭
    colseSet() {
      this.rightCardShow = false
    },
    // 删除图片
    removeFile() {
      this.rightCardShow = false
    },
    // 点击图片获取详情
    fileDetail(val) {
      this.rightCardShow = true
      this.singleData = {}
      this.filedetail = val
      this.singleData = val
    },
    // 保存图片参数
    setFile() {
      this.filedetail.desc = this.$refs.vForm.formModel.desc
      this.filedetail.title = this.$refs.vForm.formModel.title
      this.filedetail.coverBool = this.$refs.vForm.formModel.coverBool
      this.$message.success('保存成功')
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
      return new Promise((resolve, reject) => {
        documentInfor(id)
          .then((response) => {
            this.formData = response.data.result
            this.formData.contentImagesList = response.data.result.coverImagesList ?  response.data.result.coverImagesList : []
            if (this.formData.contentImagesList.length) {
              this.formData.contentImagesList.forEach((ele) => {
                if(!ele.name) {
                  ele.name = '图片'
                }
              })
            }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    savePic(type) {
      if(this.contextMenu.docId) {
        // 编辑封面图
        this.editCover()
      } else {
        // 新增文章是添加封面
        // this.addCover()
        let params =this.getDocInformation.baseInfor 
        params.articleAttachmentsList = this.getDocInformation.attachmentsList
        params.coverImagesList = this.$refs.imageForm.formModel.contentImagesList
        params.articleStatus = type
        if(!params.articleTitle && params.articleType !==2) {
          this.$message.warning('文档标题不能为空')
          return
        }
        if(!params.contentTitle) {
          this.$message.warning('首页标题不能为空')
          return
        }
        if(!params.articleOrigin && params.articleType !==2 && params.articleType !==3) {
          this.$message.warning('文章来源不能为空')
          return
        }
        if(params.extFieldsList && params.extFieldsList.length && params.articleType == 0) {
          for(let i=0; i<params.extFieldsList.length; i++) {
            if(params.extFieldsList[i].required && !params.extFieldsList[i].fieldValue) {
              this.$message.warning(`${params.extFieldsList[i].label}不能为空`)
              return
            }
          }
        }
        this.addCover(params)
      }
    },
    editCover() {
      return new Promise((resolve, reject) => {
        picCoverHandel(this.contextMenu.docId, this.$refs.imageForm.formModel.contentImagesList)
          .then((response) => {
            this.$message.success('封面保存成功')
            // this.$store.dispatch('setContextMenu', {
            //   id: '0',
            //   label: ''
            // })
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    addCover(params) {
      return new Promise((resolve, reject) => {
        createDocument(params)
          .then((response) => {
            this.$message.success('保存成功')
            this.$store.dispatch('setContextMenu', {
              id: '0',
              label: ''
            })
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
  .article-cover-pic{
    .upload-btn {
      padding-left: 80px;
    }
    .upload-content {
      max-width:1000px;
      margin-top:30px;
      label{
        font-weight: normal;
      }
      .define {
        .el-row{
          margin-bottom:10px;
        }
      }
      .v-form {
       .form-section {
         overflow: visible;
         border-bottom: none;
         .upload-img, .upload-file{
            .el-upload-list {
              li {
                margin-bottom: 26px;
              }
            }
            .el-upload {
              width: 100%;
              height: 200px;
              /* border: 1px dashed; */
              border: 1px dashed #ccc;
              margin-bottom: 20px;
              border-radius: 5px;
              .el-button {
                margin-top:100px;
              }
           }
         }
         .upload-file {
           .el-upload-list {
             li {
               border: 1px solid #c0ccda;;
             }
           }
         }
         .file-img {
           height: 100px;
           img{
             width: auto;
             height:100%;
           }
         }
         .file-infor {
            .desc {
              div {
                color: #C0C4CC;
              }
            }
         }
       }
      }
    }
  }
</style>