<template>
  <div class="define-doucment">
    <div class="add-btn">
      <el-button type="primary" size="small" @click="handelDoc()">创建文档列表</el-button>
    </div>
    <div>
      <table-list :list="createdList" @handelSuccess = "getDefineArticleList" @editDoc="handelDoc"/>
    </div>
    <v-page :visible.sync="addPage" @goBack="goBack">
      <!-- <h3 slot="title">{{ title }}</h3>
      <template slot="content">
        <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave">
          <template slot="list">
            <div class="choosed-list">
              <choosed-list ref="choosedList" :details-list = "detailsList"/>
            </div>
          </template>
        </v-form>
      </template> -->
    </v-page>
  </div>
</template>
<script>
import tableList from './table'
import choosedList from './choosedList'
import { mapGetters } from 'vuex'
import { createDefineArticle, defineArticleList, defineDocumentInfor, editDefineArticle } from '@/api/cms/article'
import { columnInfor } from '@/api/cms/columnManage'
export default {
  components: {
    tableList,
    choosedList
  },
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      addPage: false,
      title: '创建文档列表',
      formData: {},
      formSettings: [
        {
          items: [
            {
              label: '名称',
              name: 'documentName',
              type: 'text',
              placeholder: '请输入名称'
            },
            {
              label: '描述',
              name: 'documentRemark',
              type: 'text',
              placeholder: '请输入描述'
            },{
              label: '是否禁用',
              name: 'enableFlag',
              activeValue: 0,
              inactiveValue: 1,
              activeColor: '#13ce66',
              value: 1,
              type: 'switch'
            },{
              label: '标签',
              name: 'tagIds',
              type: 'checkbox',
              options: []
            },{
              label:'列表',
              name: 'list',
              type:'slot',
              placeholder: ''
            }
          ]
        }
      ],
      pageNum: 1,
      pageSize: 100,
      createdList: [],
      tagList: [],
      // 文章详情选中列表
      detailsList: []
    }
  },
  computed: {
    ...mapGetters(['treeTags'])
  },
  watch: {
    addPage(val) {
      if(val) {
        this.getColumnInfor()
      }
    }
  },
  mounted() {
    this.getDefineArticleList()
    // this.getColumnInfor()
  },
  methods: {
    getDefineArticleList() {
      var _this = this
      let formData = {
        channelId: this.treeTags[this.treeTags.length - 1].id
      }
      return new Promise((resolve, reject) => {
        defineArticleList(formData, _this.pageNum, _this.pageSize)
          .then((response) => {
            _this.createdList = response.data.result.content
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取栏目详情
    getColumnInfor() {
      var _this = this
      return new Promise((resolve, reject) => {
        columnInfor(this.treeTags[this.treeTags.length - 1].id)
          .then((response) => {
            _this.tagList = []
            if(response.data.result.tagRule) {
              Object.keys(response.data.result.tagRule).forEach((ele) => {
                if(response.data.result.tagRule[ele]) {
                  _this.tagList.push({
                    label: response.data.result.tagRule[ele],
                    value: ele
                  })
                }
              })
            }
            _this.formSettings[0].items[3].options = _this.tagList
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    handelDoc(row) {
      if(row) {
        this.title = '文档详情'
        this.getDocumentInfor(row.documentId)
      } else {
        this.title = '创建文档列表'
        this.formData = {}
      }
      this.addPage = true
    },
    // 获取文章详情
    getDocumentInfor(id) {
      var _this = this
      return new Promise((resolve, reject) => {
        defineDocumentInfor(id)
          .then((response) => {
            _this.formData = response.data.result
            _this.formData.tagIds = response.data.result.tagIds ? response.data.result.tagIds.split(',') : []
            _this.detailsList = response.data.result.details ? response.data.result.details : []
            // this.$message.success('添加成功')
            // this.goBack()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    submitSave(data) {
      let choosed = []
      // if(this.$refs.choosedList.tableData.length) {
      //   this.$refs.choosedList.tableData.forEach((ele) => {
      //     choosed.push({ articleId: ele.articleId })
      //   })
      // }
      if(this.$refs.choosedList.newList.length) {
        this.$refs.choosedList.newList.forEach((ele) => {
          choosed.push({ articleId: ele })
        })
      }
      data.details = choosed
      data.channelId = this.treeTags[this.treeTags.length - 1].id
      delete data.list
      data.tagIds = data.tagIds.join(',')
      if(this.title == '创建文档列表') {
        return new Promise((resolve, reject) => {
          createDefineArticle(data)
            .then((response) => {
              this.$message.success('添加成功')
              this.goBack()
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      } else {
        data.documentId = this.formData.documentId
        return new Promise((resolve, reject) => {
          editDefineArticle(data)
            .then((response) => {
              this.$message.success('修改成功')
              this.goBack()
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      }
    },
    goBack() {
      this.addPage = false
      this.getDefineArticleList()
    }
  }
}
</script>
<style lang="scss">
  .define-doucment{
    .add-btn {
    }
    .v-form{
      max-width: 1100px;
      .form-section {
        border-bottom: none;
      }
      .section-content {
        .el-form-item:nth-child(-n+4) {
          max-width: 800px;
        }
        .choosed-list {
          .el-table{
            th{
              padding:0px;
              padding-bottom:12px;
            }
            td{
              padding:5px;
            }
          }
        }
      }
    }
  }
</style>