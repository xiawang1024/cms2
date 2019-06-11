<template>
  <div class="colunm-add-edit">
    <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" :btn-loading = "isLoading">
      <template slot="isScale">
        <div>
          <el-checkbox v-model="imageSetting.isScaleChecked">是否缩放</el-checkbox>
          <el-input
            v-if="imageSetting.isScaleChecked"
            v-model="imageSetting.width"
            style="width:10em"
            type="number"
            maxlength="3"
            step="10"
            max="100"
            min="0"
          >
            <template slot="prepend">宽</template>
          </el-input>
          <el-input
            v-if="imageSetting.isScaleChecked"
            v-model="imageSetting.height"
            style="width:10em"
            type="number"
            maxlength="3"
            step="10"
            max="100"
            min="0"
          >
            <template slot="prepend">高</template>
          </el-input>
        </div>
      </template>
    </v-form>
  </div>
</template>

<script>
// const Upload = _ => import('@/components/cms/Upload/upload')
import { columnInfor, addColumn, editColumn, isColumnRepet } from '@/api/cms/columnManage'
import { fetchDictAllByDictName } from '@/api/cms/dict'
import { fetchComponentList } from '@/api/cms/component'
import { mapGetters } from 'vuex'
export default {
  name: 'ColumnHandel',
  // components: { Upload },
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    },
    columnRow: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      formSettings: [
        {
          items: [
            {
              label: '父级栏目',
              name: 'parentChannelNames',
              type: 'text',
              valueType: 'string',
              placeholder: '',
              disabled: true
            },
            {
              label: '栏目编码',
              name: 'channelCode',
              type: 'text',
              required: true,
              rule: [{
                validator: this.checkColumnRepet,
              }, {
                required: true,
                trigger: 'blur'
              }],
              placeholder: '请输入栏目编码'
            },
            {
              label: '位置排序',
              name: 'seqNo',
              type: 'text',
              placeholder: '请输入排序',
              hidden: true
            },
            {
              label: '访问域名',
              name: 'domainName',
              type: 'text',
              placeholder: '请输入访问域名',
              hidden: true
            },
            // {
            //   label:'存放位置',
            //   name: 'domainPath',
            //   type:'text',
            //   placeholder: '请输入存放位置',
            //   hidden: true
            // },
            {
              label: '创建人员',
              name: 'createUser',
              type: 'text',
              placeholder: '请输入创建人员',
              disabled: true,
              hidden: true
            },
            {
              label: '正常显示',
              name: 'hiddenFlag',
              activeValue: 0,
              inactiveValue: 1,
              activeColor: '#13ce66',
              value: 0,
              type: 'switch',
              hidden: true
            },
            {
              label: '是否在app显示',
              name: 'appShowFlag',
              activeValue: 1,
              inactiveValue: 0,
              activeColor: '#13ce66',
              value: 0,
              type: 'switch',
              hidden: true
            },
            {
              label: '是否允许发布文章',
              name: 'pubArticleFlag',
              activeValue: 1,
              inactiveValue: 0,
              activeColor: '#13ce66',
              value: 1,
              type: 'switch',
              hidden: true
            },
            {
              label: '其他数据',
              name: 'extra',
              type: 'textarea',
              placeholder: '请输入其他数据',
              hidden: true
            },{
              label:'管理人员',
              name: 'managerUser',
              type:'text',
              placeholder: '请输入管理员',
              hidden: true
            }
            ,{
              label:'栏目名称',
              name:'channelName',
              type:'text',
              required: true,
              placeholder: '请输入栏目名称'
            },
            {
              label: '栏目类型',
              name: 'categoryId',
              type: 'select',
              options: [],
              placeholder: '请选择',
              hidden: true
            },
            {
              label: '栏目图标',
              name: 'iconUrl',
              type: 'img',
              limit: 1,
              tip: '建议图片大小：1080*1642，图片大小不超过100K',
              hidden: true
           },
           {
              label:'关键字',
              name:'keywordName',
              type:'text',
              placeholder: '请输入关键字',
              hidden: true
           },{
              label:'栏目描述',
              name:'descriptionRemark',
              type:'textarea',
              placeholder: '请输入栏目描述',
              hidden: true
            }
          ]
        }
      ],
      formData: {},
      routeQuery: {},
      isEdit: false,
      isLoading: false,
      imageSetting: {
        isScaleChecked: false,
        height: '',
        width: ''
      }
    }
  },
  computed: {
    ...mapGetters(['treeTags'])
  },
  mounted() {
    console.log(this.columnRow)
    this.routeQuery = this.$route.query
    this.isEdit = !this.columnRow.isAdd
    this.getColumnInfor()
    this.fetchComponentList()
    // 获取栏目类型
    this.getColumns()
  },
  methods: {
    // 栏目编码是否重复
    checkColumnRepet(rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入栏目编码'))
      }
      let columnCode = this.$refs.vform.getData('channelCode')
      if(this.isEdit && (columnCode == this.formData.channelCode)) {
        callback()
      } else {
        return new Promise((resolve, reject) => {
          isColumnRepet(columnCode)
            .then((response) => {
              // _this.componentList = response.data.result.content
              if(response.data.result) {
                callback()
              } else {
                callback(new Error('栏目编码不能重复'))
              }
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      }
    },
    // 查询栏目类型
    getColumns() {
      var _this = this
      return new Promise((resolve, reject) => {
        fetchDictAllByDictName('栏目类型')
          .then((response) => {
            if (response.data.result.details && response.data.result.details.length) {
              _this.formSettings[0].items[11].options = response.data.result.details.map((ele) => {
                return {
                  label: ele.dictDetailName,
                  value: ele.dictDetailValue
                }
              })
            }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchComponentList() {
      var _this = this
      var componentObjTmp = {
      }
      return new Promise((resolve, reject) => {
        fetchComponentList(componentObjTmp, 1, 100)
          .then((response) => {
            _this.componentList = response.data.result.content
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getColumnInfor() {
      var _this = this
      return new Promise((resolve, reject) => {
        columnInfor(this.columnRow.channelId)
          .then((response) => {
            if(_this.isEdit) {
              _this.formData = response.data.result
              if(_this.formData.iconUrl) {
                _this.formData.iconUrl = [{
                  url: _this.formData.iconUrl
                }]
              } else {
                _this.formData.iconUrl = []
              }
              _this.formSettings[0].items[2].hidden =false
              _this.formSettings[0].items[3].hidden =false
              _this.formSettings[0].items[5].hidden =false
              _this.formSettings[0].items[6].hidden =false
              _this.formSettings[0].items[7].hidden =false
              _this.formSettings[0].items[8].hidden =false
              _this.formSettings[0].items[9].hidden =false
              _this.formSettings[0].items[10].hidden =false
              _this.formSettings[0].items[11].hidden =false
              _this.formSettings[0].items[12].hidden =false
              _this.formSettings[0].items[13].hidden =false
            } else {
              _this.formData = {
                parentChannelNames: response.data.result.channelName,
                hiddenFlag: 0,
                appShowFlag: 0,
                pubArticleFlag: 1
              }
            }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    submitSave(formData) {
      this.isLoading = true
      var _this = this
      let iconUrlArray = []
      if(formData.iconUrl.length) {
        formData.iconUrl.forEach(ele => {
          iconUrlArray.push(ele.url)
        })
      }
      formData.iconUrl = iconUrlArray.length ? iconUrlArray.join(',') : ''
      if (!this.isEdit) {
        formData.parentChannelId = _this.columnRow.channelId ? _this.columnRow.channelId : ''
        if(!formData.parentChannelId) {
          delete formData.parentChannelId
        }
        return new Promise((resolve, reject) => {
          addColumn(formData)
            .then((response) => {
              _this.$message({ showClose: true, message: '操作成功!', type: 'success' })
              this.formData = {
                parentChannelNames: formData.parentChannelNames
              }
              this.$store.dispatch('GetColumnAll')
              this.$emit('closePage')
              resolve()
              _this.isLoading = false
            })
            .catch((error) => {
              _this.isLoading = false
              reject(error)
            })
        })
      } else {
        formData.parentChannelId = _this.formData.parentChannelId ? _this.formData.parentChannelId : ''
        formData.stampSetting = _this.formData.stampSetting
        formData.tagRule = _this.formData.tagRule
        formData.templateIds = _this.formData.templateIds
        formData.extFieldsList = _this.formData.extFieldsList
        if(!formData.parentChannelId) {
          delete formData.parentChannelId
        }
        return new Promise((resolve, reject) => {
          formData.channelId = _this.columnRow.channelId
          editColumn(formData)
            .then((response) => {
              _this.$message({ showClose: true, message: '操作成功!', type: 'success' })
              _this.isLoading = false
              this.$store.dispatch('GetColumnAll')
              this.$emit('closePage')
              //    webSiteTags[webSiteTags.length - 1].label = response.data.result.channelName
              // webSiteTags[webSiteTags.length - 1].pubArticleFlag = response.data.result.pubArticleFlag
              // this.$store.dispatch('setTreeTags', webSiteTags)
              // let webSiteTags = this.treeTags.slice()
              // webSiteTags[webSiteTags.length - 1].label = response.data.result.channelName
              // webSiteTags[webSiteTags.length - 1].pubArticleFlag = response.data.result.pubArticleFlag
              // this.$store.dispatch('setTreeTags', webSiteTags)
              console.log(this.treeTags, 'this.treeTags')
              if(this.treeTags && this.treeTags.length) {
                let webSiteTags = this.treeTags.slice()
                if(webSiteTags[webSiteTags.length - 1].id == response.data.result.channelId) {
                 webSiteTags[webSiteTags.length - 1].pubArticleFlag = response.data.result.pubArticleFlag
                 console.log(webSiteTags, 'zzzz')
                 this.$store.dispatch('setTreeTags', webSiteTags)
                }
              }
              resolve()
            })
            .catch((error) => {
              reject(error)
              _this.isLoading = false
            })
        })
      }
    },
    // isActive(route) {
    //   return route.path === this.$route.path
    // },
    // gotoListPage(context) {
    //   context.$store.dispatch('delView', this.$route).then(({ visitedViews }) => {
    //     if (context.isActive(context.$route)) {
    //       const latestView = visitedViews.slice(-1)[0]
    //       if (latestView) {
    //         context.$router.push(latestView)
    //       } else {
    //         context.$router.push('/')
    //       }
    //     }
    //   })

    // }
  }
}
</script>

<style lang="scss">
.colunm-add-edit {
  .el-form {
    .el-select {
      .el-input {
        width: 185px !important;
      }
    }
    .el-input-group__prepend {
      padding: 0 10px;
    }
  }
}
</style>
