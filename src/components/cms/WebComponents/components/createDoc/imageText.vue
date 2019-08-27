<template>
  <div class="imageText-wrap">
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="18" :lg="18" :xl="18">
        <el-form ref="docContentForm" :model="docContentForm" :rules="rules" label-width="80px" class="docContentForm">
          <el-form-item label="正文标题" prop="articleTitle">
            <el-input v-model="docContentForm.articleTitle" maxlength="80" placeholder="请输入正文标题" />
          </el-form-item>
          <el-form-item label="首页标题" prop="contentTitle">
            <el-input v-model="docContentForm.contentTitle" maxlength="80" placeholder="请输入首页标题" />
          </el-form-item>
          <el-form-item label="">
            <div class="grid-content bg-purple">
              <Tinymce ref="editor" :height="450" :read-only="contextMenu.articleType == 3" v-model="docContentForm.contentBody"/>
            </div>
          </el-form-item>
        </el-form>
        <div class="btn-list">
          <!-- <el-button type = "primary" size="small" @click = "goBack">预览</el-button> -->
          <!-- <el-button type = "primary" size="mini" @click = "save('docContentForm', '0', 'saveOnly')">保存</el-button> -->
          <el-button type = "primary" size="mini" @click = "save('docContentForm', '0')">存草稿</el-button>
          <el-button type = "primary" size="mini" @click = "save('docContentForm', '11')">保存并发布</el-button>
          <!-- <el-button type = "primary" size="small" @click = "save('docContentForm')">保存并发布</el-button> -->
          <!-- <el-button type = "primary" size="small" @click = "save">保存并关闭</el-button>
          <el-button type = "primary" size="small" @click = "save">保存并发布</el-button> -->
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="document-right">
        <div class="base-attribute">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>基本属性</span>
            </div>
            <div>
              <v-form ref="baseForm" :form-settings="baseSettings" :form-data="formData" label-width="80px" :show-button = "showButton"/>
            </div>
          </el-card>
        </div>
        <div class="other-attribute">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>其他属性</span>
            </div>
            <div>
              <v-form ref="otherForm" :form-settings="otherSettings" :form-data="formData" label-width="80px" :show-button = "showButton">
                <template slot="set">
                  <div class="set">
                    <el-checkbox true-label="1" false-label="0" v-model="adddocSet.topFlag" :disabled="contextMenu.articleType == 3">置顶</el-checkbox>
                    <el-checkbox true-label="1" false-label="0" v-model="adddocSet.hiddenFlag" :disabled="contextMenu.articleType == 3">隐身</el-checkbox>
                    <span class = "extractCode">提取码</span>
                    <el-input v-model="adddocSet.extractCode" :disabled="contextMenu.articleType == 3"/>
                  </div>
                </template>
              </v-form>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
import { createDocument, editDocument, editQuoteDocument } from '@/api/cms/article'
import { mapGetters } from 'vuex'
import { handleDate } from '@/utils/date-filter'
export default {
  name: 'ImageText',
  components: { Tinymce },
  props: {
    extendsList: {
      default: ()=> {
        return []
      },
      type: Array
    },
    tagList: {
      default: ()=> {
        return []
      },
      type: Array
    },
    channelId: {
      default: '',
      type: String
    },
    docInfor: {
      default: ()=> {
        return {}
      },
      type: Object
    },
    otherSettings: {
      default: ()=> {
        return []
      },
      type: Array
    },
    sourceList: {
      default: ()=> {
        return []
      },
      type: Array
    },
    // propInformation: {
    //   default: ()=> {
    //     return {}
    //   },
    //   type: Object
    // }
  },
  data() {
    return {
      docContentForm: {
        articleTitle: '',
        contentTitle: '',
        contentBody: ''
      },
      adddocSet: {
        extractCode: '',
        hiddenFlag: '0',
        topFlag: '1'
      },
      rules: {
        articleTitle: [
          { required: true, message: '请输入文档标题', trigger: 'blur'},
          { min: 0, max: 80, message: '长度在 0 到 17 个字符', trigger: 'blur'}
        ],
        contentTitle: [
          { required: true, message: '请输入首页标题', trigger: 'blur', placeholder: '请输入首页标题' },
          { min: 0, max: 80, message: '长度在 0 到 17 个字符', trigger: 'blur' }
        ],
      },
      formData: {},
      set: {
        topFlag: 0,
        hiddenFlag: 0,
        extractCode: ''
      },
      isLoading: false,
      baseSettings: [
        {
          items: [
            {
              label: '关键词',
              name: 'seoKeywords',
              type: 'text',
              valueType: 'string',
              placeholder: '请输入关键词'
            },
            {
              label: '来源',
              name: 'articleOrigin',
              type: 'select',
              placeholder: '请选择',
              required: true,
              filterable: true,
              options: []
            },
            {
              label: '作者',
              name: 'articleAuthor',
              type: 'text',
              valueType: 'string',
              placeholder: '请输入作者'
            },
            {
              label: '摘要',
              name: 'seoDescription',
              type: 'textarea',
              maxlength: 240,
              placeholder: '请输入摘要'
            }
          ]
        }
      ],
      showButton: false
    }
  },
  computed: {
    ...mapGetters(['contextMenu', 'getDocInformation'])
  },
  watch: {
    docInfor(val) {
      this.docContentForm = {
        articleTitle: val.articleTitle,
        contentTitle: val.contentTitle,
        contentBody: val.contentBody
      }
      this.adddocSet = {
        extractCode: val.extractCode,
        hiddenFlag: val.hiddenFlag + '',
        topFlag: val.topFlag + ''
      }
      this.formData = val
      let showTags = []
      if(val.tagIdsList) {
        val.tagIdsList.forEach((ele) => {
          showTags.push(ele.tagId)
        })
      }
      this.formData.tagIds = showTags
    },
    sourceList(val) {
      if(val.length) {
        this.baseSettings[0].items[1].options = val
      }
    },
    otherSettings(val) {
      console.log(val, 'val')
    }
  },
  mounted() {
    if(this.sourceList.length) {
      this.baseSettings[0].items[1].options = this.sourceList
    }
    // 转载禁用
    if(this.contextMenu.articleType == 3) {
      this.baseSettings[0].items.forEach((ele) => {
        ele.disabled = true
      })
    }
    this.docContentForm = {
      articleTitle: this.docInfor.articleTitle,
      contentTitle: this.docInfor.contentTitle,
      contentBody: this.docInfor.contentBody
    }
    this.formData = this.docInfor
    let showTags = []
    if(this.docInfor.tagIdsList) {
      this.docInfor.tagIdsList.forEach((ele) => {
        showTags.push(ele.tagId)
      })
    }
    this.formData.tagIds = showTags
    this.adddocSet = {
      extractCode: this.docInfor.extractCode ? this.docInfor.extractCode : 0,
      hiddenFlag: this.docInfor.hiddenFlag ? this.docInfor.hiddenFlag + '' : '0',
      topFlag: this.docInfor.topFlag ? this.docInfor.topFlag + '' : '0'
    }
  },
  created() {
  },
  methods: {
    goBack() {
      this.$store.dispatch('setContextMenu', {
        id: '0',
        label: '',
        pageNum: this.contextMenu.pageNum,
        pageSize: this.contextMenu.pageSize,
      })
    },
    goEdit(docId) {
      const select = { id: '1', label: '新建文档', docId: docId}
      this.$store.dispatch('setContextMenu', select)
    },
    createDoc(formData, saveType) {
      var _this = this
      return new Promise((resolve, reject) => {
        createDocument(formData)
          .then((response) => {
            _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
            if(saveType === 'saveOnly') {
              this.goEdit(response.data.result.articleId)
            } else {
              this.goBack()
            } 
            resolve()
            _this.isLoading = false
          })
          .catch((error) => {
            _this.isLoading = false
            reject(error)
          })
      })
    },
    editDoc(formData, saveType) {
      console.log(saveType, 'edit')
      var _this = this
      if(this.contextMenu.articleType == 3) {
        return new Promise((resolve, reject) => {
          editQuoteDocument(formData)
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
      } else {
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
      }
    },
    getSubmitData() {
      let resoultObj = Object.assign(this.$refs.baseForm.formModel, this.$refs.otherForm.formModel, this.docContentForm, this.adddocSet)
      // 获取扩展字段的值
      let extendsFields = []
      // 扩展字段时间处理
      if(this.extendsList.length) {
        extendsFields = this.extendsList.map((ele) => {
          if(ele.type == 'datetime') {
            if(resoultObj[ele.label]) {
              return {
                label: ele.label,
                fieldValue: handleDate(resoultObj[ele.label])
              }
            } else {
              return {
                label: ele.label,
                fieldValue: resoultObj[ele.label]
              }
            }
          } else {
            return {
              label: ele.label,
              fieldValue: resoultObj[ele.label]
            }
          }
        })
      }
      // 发布时间转化
      if(resoultObj.publishTime) {
        resoultObj.publishTime =  handleDate(resoultObj.publishTime)
      }
      resoultObj.extFieldsList = extendsFields
      resoultObj.channelId = this.channelId
      // 标签字段处理
      let chooseTags = []
      if(resoultObj.tagIds) {
        resoultObj.tagIds.forEach((ele) => {
          this.tagList.forEach((son) => {
            if(ele == son.value) {
              chooseTags.push({
                tagId: son.value,
                tagName: son.label
              })
            }
          })
        })
      }
      resoultObj.tagIdsList = chooseTags
      resoultObj.articleType = 0
      delete resoultObj.set
      delete resoultObj.tagIds
      if(!resoultObj.contentBody) {
        resoultObj.contentBody = ''
      }
      return resoultObj
    },
    save(formName, publishType, saveType) {
      console.log(this.extendsList, 'this.extendsList.')
      console.log(this.getDocInformation, 'this.getDocInformation')
      // this.$refs.otherForm.updateRule()
      let resoultObj = Object.assign(this.$refs.baseForm.formModel, this.$refs.otherForm.formModel, this.docContentForm, this.adddocSet)
      // 获取扩展字段的值
      let extendsFields = []
      // 扩展字段时间处理
      if(this.extendsList.length) {
        extendsFields = this.extendsList.map((ele) => {
          if(ele.type == 'datetime') {
            if(resoultObj[ele.label]) {
              return {
                label: ele.label,
                fieldValue: handleDate(resoultObj[ele.label])
              }
            } else {
              return {
                label: ele.label,
                fieldValue: resoultObj[ele.label]
              }
            }
          } else {
            return {
              label: ele.label,
              fieldValue: resoultObj[ele.label]
            }
          }
        })
      }
      resoultObj.extFieldsList = extendsFields
      resoultObj.channelId = this.channelId
      resoultObj.articleStatus = publishType
      // 标签字段处理
      if(typeof resoultObj.articleShowStyle == 'object') {
        resoultObj.articleShowStyle = ''
      }
      let chooseTags = []
      resoultObj.tagIds.forEach((ele) => {
        this.tagList.forEach((son) => {
          if(ele == son.value) {
            chooseTags.push({
              tagId: son.value,
              tagName: son.label
            })
          }
        })
      })
      resoultObj.tagIdsList = chooseTags
      // resoultObj.articleType = 0
      resoultObj.articleType = this.contextMenu.articleType ? this.contextMenu.articleType : 0
      delete resoultObj.set
      delete resoultObj.tagIds
      if (!resoultObj.contentBody) {
        resoultObj.contentBody = ''
      }
     
      if(resoultObj.publishTime) {
        resoultObj.publishTime =  handleDate(resoultObj.publishTime)
      }
      // console.log(Date.parse(resoultObj.publishTime), 2222)
      // console.log(handleDate(resoultObj.publishTime), 2222)
      
      // 展现形式null处理

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.otherForm.getDataAsync().then(data => {
            if (!data) {
              return
            }
            this.$refs.baseForm.getDataAsync().then(data => {
              if (!data) {
                return
              }
              if(this.contextMenu.docId) {
                if(this.getDocInformation.attachmentsList && this.getDocInformation.attachmentsList.length) {
                  resoultObj.articleAttachmentsList = this.getDocInformation.attachmentsList
                } else {
                  resoultObj.articleAttachmentsList = this.docInfor.articleAttachmentsList
                }
                resoultObj.articleId = this.contextMenu.docId
                this.editDoc(resoultObj, saveType)
              } else {
                if(this.getDocInformation.attachmentsList && this.getDocInformation.attachmentsList.length) {
                  resoultObj.articleAttachmentsList = this.getDocInformation.attachmentsList
                } else {
                  resoultObj.articleAttachmentsList = []
                }
                resoultObj.coverImagesList =this.getDocInformation.coverImagesList
                this.createDoc(resoultObj, saveType)
              }
            }).catch(err => {
              console.log('====err====', err)
            })
          }).catch(err => {
            console.log('====err====', err)
          })
        } else {
          this.$refs.otherForm.getDataAsync().then(data => {
            if (!data) {
              return
            }
          }).catch(err => {
            console.log('====err====', err)
          })
          this.$refs.baseForm.getDataAsync().then(data => {
            if (!data) {
              return
            }
          }).catch(err => {
            console.log('====err====', err)
          })
          return false;
        }
      })
    }
  }
}
</script>
<style lang="scss" >
.imageText-wrap {
  .btn-list {
    margin-left:80px;
    text-align: center;
  }
  margin: 10px 0;
  .docContentForm {
     label{
       font-weight: normal;
     }
     input {
       height: 32px;
       line-height: 32px;
     }
  }
  .document-right {
    .v-form {
      .form-section {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom:none;
      }
    }
    font-size: 14px;
    .el-card__header {
      padding:5px 20px;
    }
    .el-card__body {
      padding: 0;
    }
    .base-attribute {
      margin-bottom: 10px;
    }
    .other-attribute {
      margin-bottom: 10px;
      .set {
        .extractCode {
          margin-left: 10px;
          margin-right: 10px;
        }
        .el-input {
          width:100px
        }
        .el-checkbox {
          margin-right: 10px;
        }
      }
    }
    .file-attribute {
      .btn {
        text-align: center;
        padding-top:20px;
        padding-bottom:20px;
      }
    }
  }
}
</style>

