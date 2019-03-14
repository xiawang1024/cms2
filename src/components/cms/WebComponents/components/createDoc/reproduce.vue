<template>
  <div class="reproduce-wrap">
    <v-form ref="form" :form-settings="formSettings" :form-data="formData" label-width="80px" :show-button="false">
      <template slot="set">
        <div class="set">
          <el-checkbox>置顶</el-checkbox>
          <el-checkbox>隐身</el-checkbox>
          <span class = "extractCode">提取码</span>
          <el-input/>
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
  data() {
    return {
      formSettings: [
        {
          items: [
            {
              label: '正文标题',
              name: 'articleTitle',
              type: 'text',
              placeholder: '请输入正文标题',
              required: true
            },
            {
              label: '首页标题',
              name: 'contentTitle',
              type: 'text',
              placeholder: '请输入首页标题',
              required: true
            },
            {
              label:'转载地址',
              name: 'url',
              type:'text',
              placeholder: '请输入转载地址'
            },{
              label: '标签',
              name: 'tag',
              type: 'checkbox',
              options: [{
                label: '预告',
                value: '1'
                }, {
                  label: '直播',
                  value: '2'
                }, {
                  label: '回看',
                  value: '3'
              }]
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
           }
          ]
        }
      ],
      formData: {},
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['contextMenu'])
  },
  mounted() {
    this.formData =  this.docInfor
    // this.formSettings[0].items = this.formSettings[0].items.concat(this.extendsList)
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

