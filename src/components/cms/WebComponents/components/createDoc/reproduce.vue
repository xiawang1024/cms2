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
    <div>
      <el-button type = "primary" size="small" @click = "goBack">预览</el-button>
      <el-button type = "primary" size="small" @click = "save('docContentForm', '0')">存草稿</el-button>
      <el-button type = "primary" size="small" @click = "save('docContentForm', '1')">保存并关闭</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { createDocument, editDocument } from '@/api/cms/article'
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
    }
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
    ...mapGetters(['contextMenu'])
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
    // this.formSettings[0].items = this.formSettings[0].items.concat(this.extendsList)
    this.formData =  this.docInfor
    let showTags = []
    if(this.docInfor.tagIdsList) {
      this.docInfor.tagIdsList.forEach((ele) => {
        showTags.push(ele.tagId)
      })
    }
    this.formData.tagIds = showTags
    this.adddocSet = {
      extractCode: this.docInfor.extractCode,
      hiddenFlag: this.docInfor.hiddenFlag + '',
      topFlag: this.docInfor.topFlag + ''
    }
  },
  methods: {
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
    save(formName, publishType) {
      this.$refs.form.getDataAsync().then(data => {
        if (!data) {
          return
        }
        let resoultObj = this.$refs.form.formModel
        // let resoultObj = Object.assign(this.$refs.baseForm.formModel, this.docContentForm)
        resoultObj.channelId = this.channelId
        resoultObj.articleStatus = publishType
        if(this.contextMenu.docId) {
          resoultObj.articleId = this.contextMenu.docId
          this.editDoc(resoultObj)
        } else {
          this.createDoc(resoultObj)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.reproduce-wrap {
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
}
</style>

