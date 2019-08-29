<template>
  <div class="push-form">
    <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" label-width="110px" :btn-loading = "isLoading" @newsChange="newsChange" @rangeChange="rangeChange">
      <template slot="newsChoosed">
        <el-button type="primary" size="mini" @click="chooseArticle">请选择</el-button>
        <span v-if="choosedArticle.articleId" class="choosed-article">(已选文章：{{ choosedArticle.articleTitle }})</span>
      </template>
      <template slot="bindPeople">
        <el-button type="primary" size="mini" @click="choosePeople">请选择/查看人员</el-button>
      </template>
    </v-form>
    <choose-article :dialog-visible.sync = "dialogVisible" @getChoosed = "getChoosed"/>
    <people-dialog :dialog-visible.sync = "showPeople" :bind-list = "bindList" @sendPeople="getPeople"/>
  </div>
</template>
<script>
import chooseArticle from './chooseArticle'
import peopleDialog from './peopleDialog'
import { formSettings } from './setting'
import { appList, bindUserList } from "@/api/cms/pushMessage";
export default {
  components: {
    chooseArticle,
    peopleDialog
  },
  data() {
    formSettings[0].items[1].rule = [
      {
        validator: this.checkPeople,
        trigger: 'blur',
        required: true
      }
    ]
    formSettings[0].items[5].rule = [
      {
        validator: this.checkArticle,
        trigger: 'blur',
        required: true
      }
    ]
    return {
      formSettings: formSettings,
      formData: {},
      isLoading: false,
      dialogVisible: false,
      choosedArticle: {},
      sourceData: [],
      showPeople: false,
      bindList: [],
      choosedPeople: []
    }
  },
  mounted() {
    this.getAppList()
    this.getBindUser()
  },
  methods: {
    getPeople(list) {
      this.choosedPeople = list
    },
    getBindUser() {
      return new Promise((resolve, reject) => {
        bindUserList().then(async res => {
          this.bindList = res.data.result
          resolve()
        })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },
    getAppList() {
      return new Promise((resolve, reject) => {
        appList().then(async res => {
          if(res.data.result) {
            this.formSettings[0].items[2].options = res.data.result.map((ele) => {
              return {
                label: ele.appName,
                value: ele.appId
              }
            })
          } else {
            this.formSettings[0].items[2].options = []
          }
          resolve()
        })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },
    choosePeople() {
      this.showPeople = true
    },
    submitSave(val) {
      console.log(val)
    },
    getChoosed(val) {
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
    checkPeople(rule, value, callback) {
      if(!this.choosedPeople.length) {
        return callback(new Error('请选择人员'))
      }
      callback()
    },
    // 新闻类型改变时
    newsChange(val) {
      if(val === 'url') {
        this.formSettings[0].items[4].hidden = false
        this.formSettings[0].items[5].hidden = true
      } else if(val === 'news') {
        this.formSettings[0].items[4].hidden = true
        this.formSettings[0].items[5].hidden = false
      } else {
        this.formSettings[0].items[4].hidden = true
        this.formSettings[0].items[5].hidden = true
      }
      this.$refs.vform.updateRule()
    },
    rangeChange(val) {
      if(val === true) {
        this.formSettings[0].items[1].hidden = true
      } else if(val === false) {
        this.formSettings[0].items[1].hidden = false
      } else {
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