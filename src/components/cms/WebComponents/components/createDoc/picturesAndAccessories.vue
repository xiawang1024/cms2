<template>
  <div class="upload-file">
    <div class="type-choose">
      <el-radio-group v-model="fileType" size="small" @change="typeChange">
        <el-radio-button label="0">上传图片</el-radio-button>
        <el-radio-button label="1">上传音频</el-radio-button>
        <el-radio-button label="2">上传视频</el-radio-button>
        <el-radio-button label="3">其他</el-radio-button>
      </el-radio-group>
    </div>
    <div class="upload-content">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="14" :xl="14">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="上传图片">
              <uploader :options="options" :file-status-text="statusText" class="uploader-example" ref="uploader" @file-complete="fileComplete" @complete="complete" @fileSuccess="fileSuccess" @fileInfor = "fileInfor" @fileRemoved ="fileRemoved"/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="10">
          <div v-if="typeof index === 'number'">
            <v-form ref="vForm" :form-settings="imageSettings" :form-data="formData" label-width="80px" :show-button = "showButton">
              <template slot="information">
                <div class="file-infor">
                  <div class="file-img">
                    <img :src="fileInformation.url" alt="">
                  </div>
                  <div class="desc">
                    <div>{{ fileInformation.name }}</div>
                    <div>{{ fileInformation.cmsPath.result.createTime }}</div>
                    <div>{{ fileInformation.size }}</div>
                  </div>
                </div>
              </template>
              <template slot="define">
                <div class="define">
                  <el-row>
                    <el-col :span="4"><div class="define-title">F1=</div></el-col>
                    <el-col :span="10">
                      <div>
                        <el-input/>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="4"><div class="define-title">F2=</div></el-col>
                    <el-col :span="10">
                      <div>
                        <el-input/>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="4">
                      <div class="define-title">F3=</div>
                    </el-col>
                    <el-col :span="10">
                      <div>
                        <el-input/>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </template>
              <template slot="btn">
                <el-button type="primary" size="small" @click ="fileParams">保存</el-button>
              </template>
            </v-form>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="upload-btn">
      <el-button type = "primary" size="small" @click = "goBack">返回</el-button>
      <el-button type = "primary" size="small" @click = "save">存草稿</el-button>
    </div>
  </div>
</template>

<script>
import { DOWN_URL } from '@/config/base-url'
import { mapGetters } from 'vuex'
import { createDocument, editDocument, documentInfor } from '@/api/cms/article'
export default {
  props: {
    // docInformation:{
    //   default: {},
    //   type: Object
    // },
    activeName: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      options: {
        target: 'http://172.20.5.4:55030/basefile/upload?fileRefId=jkhjkhjkhj', // '//jsonplaceholder.typicode.com/posts/',
        testChunks: false,
        chunkSize: 1024*1024*1024
      },
      attrs: {
        accept: 'image/*'
      },
      statusText: {
        success: '成功了',
        error: '出错了',
        uploading: '上传中',
        paused: '暂停中',
        waiting: '等待中'
      },
      fileType: '0',
      form: {
        name: ''
      },
      showButton: false,
      formData: {},
      imageSettings: [{
        items: [
          {
            label: '附件详情',
            name: 'information',
            type: 'slot'
          },
          {
            label: '标题',
            name: 'name',
            type: 'text'
          },
          {
            label: '描述',
            name: 'des',
            type: 'textarea',
          },
          {
            label: '自定义',
            name: 'define',
            type: 'slot'
          },
          {
            label: '',
            name: 'btn',
            type: 'slot'
          },
        ]
      }],
      fileInformation: {
        url: '',
        name: '',
        size: '',
        cmsPath: {
          result: {
            filePath: ''
          }
        }
      },
      index: '',
      formIndex: '',
      fileList: [],
      // 文件参数设置列表
      contentImagesList: [],
      docInformation: {}
    }
  },
  computed: {
    ...mapGetters(['contextMenu', 'treeTags'])
  },
  watch: {
    activeName(val) {
     if(val === 'picturesAndAccessories') {
       if(this.contextMenu.docId) {
         this.getDocumentInfor(this.contextMenu.docId)
       }
     }
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.uploader = this.$refs.uploader.uploader
    })
  },
  methods: {
    getDocumentInfor(id) {
      var _this = this
      return new Promise((resolve, reject) => {
        documentInfor(id)
          .then((response) => {
            _this.docInformation = response.data.result
            // _this.fileList = response.data.result.contentImagesList
            console.log( _this.fileList)
            this.$refs.uploader.fileList = response.data.result.contentImagesList
            // console.log(_this.$refs.uploader.fileList, 'fileListInfor')
            // console.log(new File([], '1111'))
            // _this.$refs.uploader.fileList.push(new File([response.data.result.contentImagesList], '1111'))
            // console.log(_this.$refs.uploader.initFileFn, 'initFileFn')
            // _this.$emit('docInfor', _this.docInfor)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 保存图片参数
    fileParams() {
      this.contentImagesList[this.index] = {
        category: 0,
        name: this.$refs.vForm.formModel.name,
        url: this.fileInformation.url
      }
      this.$message.success('保存成功')
    },
    fileRemoved(file) {
    },
    fileInfor(fileDate) {
      this.fileInformation = fileDate.file
      this.index = this.index ===  fileDate.index ? '' : fileDate.index
      if(this.contentImagesList.length) {
        let res = this.contentImagesList.filter((ele) => {
          return ele.url ==  this.fileInformation.url
        })
        if(res.length) {
           this.formData = res[0]
        }
      }else {
        this.formData = {}
      }
    },
    typeChange() {
    },
    complete () {
      this.fileList = this.$refs.uploader.fileList
      console.log(this.fileList, 'list')
      // console.log(typeof this.$refs.uploader.file , 'uploaderFile')
      if(this.fileList.length) {
        this.fileList.forEach((ele) => {
          ele.url = DOWN_URL +  ele.cmsPath.result.filePath
        })
      }
    },
    fileComplete () {
      console.log('file complete', arguments)
    },
    fileSuccess(msg) {
      // console.log(123)
      // console.log(JSON.parse(msg))
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
    save() {
      let resoultObj = this.docInformation
      resoultObj.channelId = this.treeTags[this.treeTags.length - 1].id
      // console.log(resoultObj, 'resoultObj')
      console.log(this.contentImagesList)
      console.log(this.fileList)
      let imgageParams = []
      if(this.fileList.length) {
        this.fileList.forEach((ele) => {
          if(this.contentImagesList.length) {
            this.contentImagesList.forEach((content) => {
              if(ele.url == content.url) {
                imgageParams.push(content)
              }
            })
          }else {
            imgageParams.push({
                category: 0,
                url: ele.url
            })
          }
        })
      }
      resoultObj.contentImagesList = imgageParams
      if(this.contextMenu.docId) {
        resoultObj.articleId = this.contextMenu.docId
        this.editDoc(resoultObj)
      } else {
        this.createDoc(resoultObj)
      }
    }
  }
}
</script>

<style lang="scss">
  .upload-file {
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
         border-bottom: none;
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
