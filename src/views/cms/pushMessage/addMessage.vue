<template>
  <div class="push-form">
    <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" label-width="110px" :btn-loading = "isLoading" @typeChange="typeChange">
      <template slot="news">
        <el-button type="primary" size="mini" @click="chooseArticle">请选择</el-button>
        <span v-if="choosedArticle.articleId" class="choosed-article">(已选文章：{{ choosedArticle.articleTitle }})</span>
      </template>
    </v-form>
    <choose-article :dialog-visible.sync = "dialogVisible" @getChoosed = "getChoosed"/>
  </div>
</template>
<script>
import chooseArticle from './chooseArticle'
export default {
  components: {
    chooseArticle
  },
  data() {
    return {
      formSettings: [
        {
          items: [
            {
              label: '发布范围',
              name: 'publishType',
              type: 'select',
              placeholder: '请选择',
              required: true,
              value: 'whole',
              options: [
                {
                  label: '全部用户',
                  value: 'whole'
                },
                 {
                  label: '部分用户',
                  value: 'some'
                }
              ]
            },
            {
              label: '',
              name: 'people',
              type: 'slot',
              placeholder: '请输入url',
              hidden: true,
              required: true,
              rule: [
                {
                  validator: this.peopleArticle,
                  trigger: 'blur',
                  required: true
                }
              ]
            },
            {
              label: '客户端',
              name: 'app',
              type: 'select',
              placeholder: '请选择',
              options: [
              ]
            },
            {
              label: '类型',
              name: 'newsType',
              type: 'select',
              placeholder: '请选择',
              required: true,
              events: {
                change: 'typeChange'
              },
              options: [
                {
                  label: '新闻',
                  value: 'news'
                },
                 {
                  label: '其他',
                  value: 'url'
                }
              ]
            },
            {
              label: 'url',
              name: 'url',
              type: 'text',
              valueType: 'string',
              placeholder: '请输入url',
              hidden: true,
              required: true,
            },
            {
              label: '',
              name: 'news',
              type: 'slot',
              valueType: 'string',
              placeholder: '请输入url',
              hidden: true,
              required: true,
              rule: [
                {
                  validator: this.checkArticle,
                  trigger: 'blur',
                  required: true
                }
              ]
            },
            {
              label: 'APP推送标题',
              name: 'word',
              type: 'text',
              valueType: 'string',
              required: true,
              placeholder: '请输入APP推送标题'
            },
            {
              label: '内容模板',
              name: 'template',
              type: 'textarea',
              required: true,
              placeholder: '请输入内容模板'
            },
          ]
        }
      ],
      formData: {},
      isLoading: false,
      dialogVisible: false,
      choosedArticle: {}
    }
  },
  methods: {
    submitSave() {

    },
    getChoosed(val) {
      console.log(val, 'val')
      this.choosedArticle = val
    },
    chooseArticle() {
      this.dialogVisible = true
    },
    checkArticle(rule, value, callback) {
      if(!this.choosedArticle.articleId) {
        return callback(new Error('请选择文章'))
      }
      callback()
    },
    // 新闻类型改变时
    typeChange(val) {
      if(val === 'url') {
        this.formSettings[0].items[3].hidden = false
        this.formSettings[0].items[4].hidden = true
      } else if(val === 'news') {
        this.formSettings[0].items[3].hidden = true
        this.formSettings[0].items[4].hidden = false
      } else {
        this.formSettings[0].items[3].hidden = true
        this.formSettings[0].items[4].hidden = true
      }
      this.$refs.vform.updateRule()
    }
  }
}
</script>
<style lang="scss">
  .push-form{
    .choosed-article{
      color: #42b983;
    }
  }
</style>