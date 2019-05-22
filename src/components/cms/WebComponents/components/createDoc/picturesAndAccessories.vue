<template>
  <div class="upload-file">
    <div class="type-choose">
      <el-radio-group v-model="fileType" size="mini" @change="typeChange">
        <el-radio-button label="0">上传图片</el-radio-button>
        <el-radio-button label="1">上传音频</el-radio-button>
        <el-radio-button label="2">上传视频</el-radio-button>
        <el-radio-button label="3">其他</el-radio-button>
      </el-radio-group>
    </div>
    <div class="upload-content">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <v-form ref="imageForm" :form-settings="imageSettings" :form-data="formData" label-width="80px" :show-preview="showPreview" :show-button = "showButton" @fileDetail="fileDetail" @removeFile="removeFile"/>
          <!-- <v-form ref="videoForm" :form-settings="videoSettings" :form-data="formData" label-width="80px" :show-preview="showPreview" :show-button = "showButton" @fileDetail="fileDetail"/> -->
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="10">
          <div v-if="rightCardShow">
            <v-form ref="vForm" :form-settings="fileSettings" :form-data="singleData" label-width="80px" :show-button = "showButton">
              <template slot="information">
                <div class="file-infor">
                  <div class="file-img" v-if="fileType == '0'">
                    <img :src="filedetail.url" alt="">
                  </div>
                  <div class="file-video" v-if="fileType == '2'">
                    <video :src="filedetail.url" controls="controls" height="150px"/>
                  </div>
                  <div class="file-video" v-if="fileType == '1'">
                    <video :src="filedetail.url" controls="controls" height="50px"/>
                  </div>
                  <div class="desc">
                    <div>图片名称：{{ filedetail.name }}</div>
                    <div class="word-break">文件路径:{{ filedetail.url }}</div>
                    <div v-if="filedetail.createTime">日期：{{ parseInt(filedetail.createTime)|timeFilter }}</div>
                    <div v-if="filedetail.size">大小:{{ Math.floor(filedetail.size / 1024) }} kb</div>
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
      <!-- <el-button type = "primary" size="small" @click = "save">存草稿</el-button>
      <el-button type = "primary" size="small" @click = "save">保存并发布</el-button> -->
      <el-button type = "primary" size="mini" @click = "save('0')">存草稿</el-button>
      <el-button type = "primary" size="mini" @click = "save('11')">保存并发布</el-button>
    </div>
  </div>
</template>

<script>
// import { DOWN_URL } from '@/config/base-url'
import { mapGetters } from 'vuex'
import { createDocument, editDocument, documentInfor } from '@/api/cms/article'
export default {
  props: {
    activeName: {
      default: '',
      type: String
    },
    propInformation: {
      default: ()=> {
        return {}
      },
      type: Object
    }
  },
  data () {
    return {
      showPreview: false,
      fileType: '0',
      form: {
        name: ''
      },
      showButton: false,
      formData: {},
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
          },
          {
            label: '音频',
            name: 'contentAudioList',
            type: 'audio',
            required: false,
            // hasTextInput: true,
            maxSize: 1024*800,
            limit: 1,
            hidden: true
          },
          {
            label: '视频',
            name: 'contentVideosList',
            type: 'video',
            required: false,
            maxSize: 1024*800,
            limit: 1,
            // hasTextInput: true,
            hidden: true
          },
          {
            label: '其他',
            name: 'articleAttachmentsList',
            type: 'file',
            required: false,
            maxSize: 1024*200,
            // hasTextInput: true,
            hidden: true
          },
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
      index: '',
      // 文件参数设置列表
      contentImagesList: [],
      docInformation: {},
      // 文件详情
      filedetail: {
      },
      // 图片参数列表
      imageparamsList: [],
      // 文件标题信息
      singleData: {},
      rightCardShow: false
    }
  },
  computed: {
    ...mapGetters(['contextMenu', 'treeTags', 'getDocInformation'])
  },
  watch: {
    activeName(val, oldval) {
      // if(val === 'picturesAndAccessories') {
      //   if(this.contextMenu.docId) {
      //     this.getDocumentInfor(this.contextMenu.docId)
      //   }
      // }
      if(oldval == 'picturesAndAccessories') {
        console.log(this.getSubmitData(), 'picturesAndAccessoriesData')
        this.$store.dispatch('setAttachmentsList', this.getSubmitData())
      }
    }
  },
  mounted () {
    if(this.contextMenu.docId) {
      this.getDocumentInfor(this.contextMenu.docId)
    }
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
      console.log(val)
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
            _this.docInformation = response.data.result
            _this.formData =  response.data.result
            _this.formData.contentVideosList = _this.differenceFile(response.data.result.articleAttachmentsList, 'VIDEO')
            _this.formData.contentImagesList = _this.differenceFile(response.data.result.articleAttachmentsList, 'IMG')
            _this.formData.contentAudioList = _this.differenceFile(response.data.result.articleAttachmentsList, 'AUDIO')
            _this.formData.articleAttachmentsList = _this.differenceFile(response.data.result.articleAttachmentsList, 'OTHER')
            console.log( _this.formData, '图片附件')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 保存图片参数
    setFile() {
      this.filedetail.desc = this.$refs.vForm.formModel.desc
      this.filedetail.title = this.$refs.vForm.formModel.title
      this.filedetail.coverBool = this.$refs.vForm.formModel.coverBool
      this.$message.success('保存成功')
      
      console.log(this.$refs.imageForm.formModel.contentImagesList, 'imageForm')
      console.log(this.filedetail, 'filedetail')
    },
    typeChange(val) {
      this.rightCardShow = false
      switch(val) {
        case '0':
          this.imageSettings[0].items[0].hidden = false
          this.imageSettings[0].items[1].hidden = true
          this.imageSettings[0].items[2].hidden = true
          this.imageSettings[0].items[3].hidden = true
          this.fileSettings[0].items[3].hidden = false
          break
        case '1':
          this.imageSettings[0].items[1].hidden = false
          this.imageSettings[0].items[0].hidden = true
          this.imageSettings[0].items[2].hidden = true
          this.imageSettings[0].items[3].hidden = true
          this.fileSettings[0].items[3].hidden = true
          break
        case '2':
          this.imageSettings[0].items[1].hidden = true
          this.imageSettings[0].items[0].hidden = true
          this.imageSettings[0].items[2].hidden = false
          this.imageSettings[0].items[3].hidden = true
          this.fileSettings[0].items[3].hidden = true
          break
        case '3':
          this.imageSettings[0].items[1].hidden = true
          this.imageSettings[0].items[0].hidden = true
          this.imageSettings[0].items[2].hidden = true
          this.imageSettings[0].items[3].hidden = false
          this.fileSettings[0].items[3].hidden = true
          break
      }
    },
    goBack() {
      this.$store.dispatch('setContextMenu', {
        id: '0',
        label: ''
      })
    },
    createDoc(formData) {
      var _this = this
      return new Promise((resolve, reject) => {
        createDocument(formData)
          .then((response) => {
            _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
            _this.isLoading = false
            this.goBack()
            resolve()
          })
          .catch((error) => {
            _this.isLoading = false
            reject(error)
          })
      })
    },
    editDoc(formData) {
      var _this = this
      return new Promise((resolve, reject) => {
        editDocument(formData)
          .then((response) => {
            _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
            this.goBack()
            resolve()
            _this.isLoading = false
          })
          .catch((error) => {
            _this.isLoading = false
            reject(error)
          })
      })
    },
    addCategory(fileList, type) {
      let arr = fileList.map((ele) => {
        return ele
      })
      if(arr.length) {
        arr.forEach((ele) => {
          ele.category = type
        })
      }
      return arr
    },
    getSubmitData() {
      let articleAttachmentsList = []
      let imageFile = this.addCategory(this.$refs.imageForm.formModel.contentImagesList, 'IMG')
      let videoFile = this.addCategory(this.$refs.imageForm.formModel.contentVideosList, 'VIDEO')
      let audioFile = this.addCategory(this.$refs.imageForm.formModel.contentAudioList, 'AUDIO') 
      let otherFile = this.addCategory(this.$refs.imageForm.formModel.articleAttachmentsList, 'OTHER')
      let articleAttachmentsListCombine = articleAttachmentsList.concat(imageFile, videoFile, audioFile, otherFile)
      return articleAttachmentsListCombine
    },
    save(publishType) {
      let articleAttachmentsList = []
      let resoultObj = this.docInformation
      resoultObj.channelId = this.treeTags[this.treeTags.length - 1].id
      let imageFile = this.addCategory(this.$refs.imageForm.formModel.contentImagesList, 'IMG')
      let videoFile = this.addCategory(this.$refs.imageForm.formModel.contentVideosList, 'VIDEO')
      let audioFile = this.addCategory(this.$refs.imageForm.formModel.contentAudioList, 'AUDIO') 
      let otherFile = this.addCategory(this.$refs.imageForm.formModel.articleAttachmentsList, 'OTHER')
      resoultObj.articleStatus = publishType
      let articleAttachmentsListCombine = articleAttachmentsList.concat(imageFile, videoFile, audioFile, otherFile)
      resoultObj.articleAttachmentsList = articleAttachmentsListCombine
      if(this.contextMenu.docId) {
        resoultObj.articleId = this.contextMenu.docId
        this.editDoc(resoultObj)
      } else {
        resoultObj = Object.assign(resoultObj, this.getDocInformation.baseInfor)
        resoultObj.coverImagesList =this.getDocInformation.coverImagesList
        if(!resoultObj.articleTitle && resoultObj.articleType !==2) {
          this.$message.warning('正文标题不能为空')
          return
        }
        if(!resoultObj.contentTitle) {
          this.$message.warning('首页标题不能为空')
          return
        }
        this.createDoc(resoultObj)
      }
    }
  }
}
</script>

<style lang="scss">
  .upload-file {
    .upload-btn {
      padding-left: 80px;
    }
    .type-choose{
      margin-top:10px;
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
        .define-title {
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
              .word-break{
                word-break: break-all;
              }
            }
         }
       }
      }
    }
  }
  .uploader-example {
    padding: 15px;
    // margin: 40px auto 0;
    font-size: 12px;
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
