<template>
  <div class="splicing-wrap">
    <v-form ref="form" :form-settings="formSettings" :form-data="formData" label-width="80px" :show-button="false" @save = "submitSave">
      <template slot="set">
        <div class="set">
          <el-checkbox true-label="1" false-label="0" v-model="adddocSet.topFlag">置顶</el-checkbox>
          <el-checkbox true-label="1" false-label="0" v-model="adddocSet.hiddenFlag">隐身</el-checkbox>
          <span class = "extractCode">提取码</span>
          <el-input v-model="adddocSet.extractCode"/>
        </div>
      </template>
      <template slot="preview">
        <div>
          <el-button type="primary" size="small" @click="lookPreview">预览</el-button>
        </div>
        <div class="preview" v-if="indexTitle">
          <div v-html="indexTitle"/>
        </div>
      </template>
    </v-form>
    <div>
      <!-- <el-button type = "primary" size="small" @click = "goBack">预览</el-button> -->
      <el-button type = "primary" size="small" @click = "save('docContentForm', '0')">存草稿</el-button>
      <el-button type = "primary" size="small" @click = "save('docContentForm', '1')">保存并发布</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { createDocument, editDocument } from '@/api/cms/article'
export default {
  name: 'Splicing',
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
    }
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
              label: '首页标题',
              name: 'contentTitle',
              type: 'textarea',
              placeholder: '请输入html代码',
              required: true
            },
            {
              label: '设置',
              name: 'set',
              type: 'slot'
            },
            {
              label: '排序号',
              name: 'seqNo',
              type: 'number',
              value: 0
            },
            {
              label: '展现形式',
              name: 'articleShowStyle',
              type: 'select',
              options: [
                {
                  label: '正文标题和描述',
                  value: 0
                },
                {
                  label: '左图，右正文标题',
                  value: 1
                },
                {
                  label: '右图，左正文标题',
                  value: 2
                },
                {
                  label: '一个图片通栏，无标题',
                  value: 3
                },
                {
                  label: '上正文标题，下一个图片通栏',
                  value: 4
                },
                {
                  label: '上正文标题，下两张图片',
                  value: 5
                },
                {
                  label: '上正文标题，下三张图片',
                  value: 6
                },
                {
                  label: '上正文标题，下左一张图片，下右描述',
                  value: 7
                }
              ]
            },
           {
            label: '附加数据',
            name: 'extFields',
            type: 'textarea',
            placeholder: '请输入附加数据'
          },{
            label: '预览',
            name: 'preview',
            type: 'slot'
          }]
        }
      ],
      formData: {},
      isLoading: false,
      indexTitle: ''
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
    },
    // $refs.form[formModel][contentTitle]() {

    // }
  },
  mounted() {
    this.formData =  this.docInfor
    this.adddocSet = {
      extractCode: this.docInfor.extractCode ? this.docInfor.extractCode : 0,
      hiddenFlag: this.docInfor.hiddenFlag ? this.docInfor.hiddenFlag + '' : '0',
      topFlag: this.docInfor.topFlag ? this.docInfor.topFlag + '' : '0'
    }
  },
  methods: {
    lookPreview() {
      this.indexTitle = this.$refs.form.formModel.contentTitle
    },
    submitSave(data) {
      console.log(data, 'data')
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
        let resoultObj = Object.assign(this.$refs.form.formModel, this.adddocSet)
        resoultObj.channelId = this.channelId
        resoultObj.articleStatus = publishType
        resoultObj.seoKeywords = ''
        resoultObj.articleOrigin = ''
        resoultObj.articleAuthor = ''
        resoultObj.seoDescription = ''
        resoultObj.createTime = ''
        resoultObj.articleTitle = ''
        resoultObj.createTime = ''
        resoultObj.contentBody = ''
        resoultObj.articleType = 2
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
.splicing-wrap {
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

