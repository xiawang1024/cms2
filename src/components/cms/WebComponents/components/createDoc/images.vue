<template>
  <div class="images">
    <v-form ref="baseForm" :form-settings="formSettings" :form-data="formData" label-width="80px" :show-button="false" @save = "submitSave">
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
      <el-button type="primary" size="small">保存</el-button>
      <el-button type="primary" size="small">返回</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Images',
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
  methods: {
    submitSave(data) {
      console.log(data, 'data')
    },
    // goBack() {
    //   this.$store.dispatch('setContextMenu', {
    //     id: '0',
    //     label: ''
    //   })
    // },
    // createDoc(formData) {
    //   var _this = this
    //   return new Promise((resolve, reject) => {
    //     createDocument(formData)
    //       .then((response) => {
    //         _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
    //         resolve()
    //         _this.isLoading = false
    //       })
    //       .catch((error) => {
    //         _this.isLoading = false
    //         reject(error)
    //       })
    //   })
    // },
    // editDoc(formData) {
    //   var _this = this
    //   return new Promise((resolve, reject) => {
    //     editDocument(formData)
    //       .then((response) => {
    //         _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
    //         resolve()
    //         _this.isLoading = false
    //       })
    //       .catch((error) => {
    //         _this.isLoading = false
    //         reject(error)
    //       })
    //   })
    // },
    // save(formName) {
    //   let resoultObj = Object.assign(this.$refs.baseForm.formModel, this.docContentForm)
    //   resoultObj.channelId = this.channelId
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       if(this.contextMenu.docId) {
    //         resoultObj.articleId = this.contextMenu.docId
    //         this.editDoc(resoultObj)
    //       } else {
    //         this.createDoc(resoultObj)
    //       }
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   })
    // }
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
}
</style>

