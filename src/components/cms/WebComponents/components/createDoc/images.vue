<template>
  <div class="images">
    <v-form ref="form" :form-settings="imagesSetting" :form-data="formData" label-width="80px" :show-button="false">
      <template slot="set">
        <div class="set">
          <el-checkbox true-label="1" false-label="0" v-model="adddocSet.topFlag">置顶</el-checkbox>
          <el-checkbox true-label="1" false-label="0" v-model="adddocSet.hiddenFlag">隐身</el-checkbox>
          <span class = "extractCode">提取码</span>
          <el-input v-model="adddocSet.extractCode"/>
        </div>
      </template>
    </v-form>
    <div class="images-btn">
      <!-- <el-button type = "primary" size="small" @click = "goBack">预览</el-button> -->
      <el-button type = "primary" size="mini" @click = "save('docContentForm', '0', 'saveOnly')">保存</el-button>
      <el-button type = "primary" size="mini" @click = "save('docContentForm', '0')">存草稿</el-button>
      <el-button type = "primary" size="mini" @click = "save('docContentForm', '11')">保存并发布</el-button>
    </div>
  </div>
</template>
<script>
import { createDocument, editDocument } from '@/api/cms/article'
import { mapGetters } from 'vuex'
export default {
  name: 'Images',
  props: {
    extendsList: {
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
    tagList: {
      default: ()=> {
        return []
      },
      type: Array
    },
    imagesSetting: {
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
      adddocSet: {
        extractCode: '',
        hiddenFlag: '0',
        topFlag: '1'
      },
      formSettings: [
        {
          items: [
            {
              label: '正文标题',
              name: 'articleTitle',
              type: 'text',
              placeholder: '请输入正文标题',
              required: true,
              maxlength: 10
            },
            {
              label: '首页标题',
              name: 'contentTitle',
              type: 'text',
              placeholder: '请输入首页标题',
              maxlength: 10,
              required: true
            },
            {
              label: '文档来源',
              name: 'articleOrigin',
              type: 'select',
              placeholder: '请选择',
              options: [
                {
                  label: '1',
                  value: '123'
                }
              ]
            },{
              label:'文档作者',
              name: 'articleAuthor',
              type:'text',
              placeholder: '请输入文档作者'
            },{
              label: '关键字',
              name: 'seoKeywords',
              type: 'text',
              placeholder: '请输入关键字',
            },{
              label: '摘要',
              name: 'seoDescription',
              type: 'textarea',
              placeholder: '请输入摘要'
            },{
              label: '标签',
              name: 'tag',
              type: 'checkbox',
              options: []
            },{
              label:'点击量',
              name: 'clickNum',
              type:'number',
              placeholder: '请输入点击量'
            },{
              label:'创建时间',
              name:'createTime',
              type:'date',
              placeholder: '请选择'
            },
            {
              label: '设置',
              name: 'set',
              type: 'slot',
            },
            {
              label: '排序号',
              name: 'seqNo',
              type: 'number'
            },
            {
              label: '',
              name: 'btn',
              type: 'slot'
            },
          ]
        }
      ],
      formData: {},
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['contextMenu', 'getDocInformation'])
  },
  watch: {
    docInfor(val) {
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
    }
  },
  mounted() {
    this.formData =  this.docInfor
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
  methods: {
    goBack() {
      this.$store.dispatch('setContextMenu', {
        id: '0',
        label: ''
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
      var _this = this
      return new Promise((resolve, reject) => {
        editDocument(formData)
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
    getSubmitData() {
      let resoultObj = Object.assign(this.$refs.form.formModel, this.adddocSet)
      // resoultObj.channelId = this.channelId
      // 标签字段处理
      let chooseTags = []
      if( resoultObj.tagIds) {
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
      resoultObj.articleType = 1
      delete resoultObj.set
      delete resoultObj.tagIds
      delete resoultObj.btn
      if (!resoultObj.contentBody) {
        resoultObj.contentBody = ''
      }
      return resoultObj
    },
    save(formName, publishType, saveType) {
      this.$refs.form.getDataAsync().then(data => {
        if (!data) {
          return
        }
        let resoultObj = Object.assign(this.$refs.form.formModel, this.adddocSet)
        resoultObj.channelId = this.channelId
        resoultObj.articleStatus = publishType
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
        resoultObj.articleType = 1
        delete resoultObj.set
        delete resoultObj.tagIds
        delete resoultObj.btn
        if (!resoultObj.contentBody) {
          resoultObj.contentBody = ''
        }
        if(this.contextMenu.docId) {
          if(this.getDocInformation.attachmentsList) {
            resoultObj.articleAttachmentsList = this.getDocInformation.attachmentsList
          } else {
            resoultObj.articleAttachmentsList = this.docInfor.articleAttachmentsList
          }
          resoultObj.articleId = this.contextMenu.docId
          this.editDoc(resoultObj, saveType)
        } else {
          if(this.getDocInformation.attachmentsList) {
            resoultObj.articleAttachmentsList = this.getDocInformation.attachmentsList
            resoultObj.coverImagesList =this.getDocInformation.coverImagesList
          } else {
            resoultObj.articleAttachmentsList = []
          }
          this.createDoc(resoultObj, saveType)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.images {
  margin: 10px 0;
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
  .images-btn{
    padding-left:80px;
  }
}
</style>

