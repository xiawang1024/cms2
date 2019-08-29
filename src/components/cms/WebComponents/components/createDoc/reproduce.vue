<template>
  <div class="reproduce-wrap">
    <v-form ref="form" :form-settings="reproduceSetting" :form-data="formData" label-width="80px" :show-button="false">
      <template slot="set">
        <div class="set">
          <el-checkbox true-label="1" false-label="0" v-model="adddocSet.topFlag">置顶</el-checkbox>
          <el-checkbox true-label="1" false-label="0" v-model="adddocSet.hiddenFlag">隐身</el-checkbox>
          <span class = "extractCode">提取码</span>
          <el-input v-model="adddocSet.extractCode"/>
        </div>
      </template>
    </v-form>
    <div class="reproduce-btn">
      <!-- <el-button type = "primary" size="small" @click = "goBack">预览</el-button> -->
      <!-- <el-button type = "primary" size="mini" @click = "save('docContentForm', '0', 'saveOnly')">保存</el-button> -->
      <el-button :disabled="Boolean(contextMenu.docId) && (docInfor.articleStatus ==1) && (baseInfor.userName !== docInfor.createUser)" type = "primary" size="mini" @click = "save('docContentForm', '0')">存草稿</el-button>
      <el-button :disabled="Boolean(contextMenu.docId) && (docInfor.articleStatus ==1) && (baseInfor.userName !== docInfor.createUser)" type = "primary" size="mini" @click = "save('docContentForm', '11')">保存并发布</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { createDocument, editDocument } from '@/api/cms/article'
import store from 'store'
export default {
  name: 'Reproduce',
  props: {
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
    reproduceSetting: {
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
      formData: {},
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['contextMenu', 'getDocInformation']),
     baseInfor() {
      return store.get('BaseInfor') 
    }
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
      resoultObj.articleType = 4
      resoultObj.seoKeywords = ''
      resoultObj.articleOrigin = ''
      resoultObj.articleAuthor = ''
      resoultObj.seoDescription = ''
      resoultObj.createTime = ''
      resoultObj.createTime = ''
      resoultObj.contentBody = ''
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
      delete resoultObj.set
      delete resoultObj.tagIds
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
        resoultObj.articleType = 4
        resoultObj.seoKeywords = ''
        resoultObj.articleAuthor = ''
        resoultObj.seoDescription = ''
        resoultObj.createTime = ''
        resoultObj.createTime = ''
        resoultObj.contentBody = ''
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
        delete resoultObj.set
        delete resoultObj.tagIds
        if(this.contextMenu.docId) {
          resoultObj.articleId = this.contextMenu.docId
          // this.editDoc(resoultObj, saveType)
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
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.reproduce-wrap {
  // margin: 10px 0;
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
  .reproduce-btn{
    padding-left:80px;
  }
}
</style>

