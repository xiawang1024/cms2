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
import { columnInfor, addColumn, editColumn } from '@/api/cms/columnManage'
import { fetchDictByDictName } from '@/api/cms/dict'
import { fetchComponentList } from '@/api/cms/component'
export default {
  name: 'ColumnHandel',
  // components: { Upload },
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
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
              placeholder: '请输入排序'
            },
            {
              label: '位置排序',
              name: 'seqNo',
              type: 'text',
              placeholder: '请输入排序'
            },
            {
              label: '访问域名',
              name: 'domainName',
              type: 'text',
              placeholder: '请输入访问域名'
            },{
              label:'存放位置',
              name: 'domainPath',
              type:'text',
              placeholder: '请输入存放位置',
              hidden: true
            },{
              label: '创建人员',
              name: 'createUser',
              type: 'text',
              placeholder: '请输入创建人员',
              disabled: true
            },{
              label: '正常显示',
              name: 'hiddenFlag',
              activeValue: 0,
              inactiveValue: 1,
              activeColor: '#13ce66',
              value: 1,
              type: 'switch'
            },{
              label: '其他数据',
              name: 'extra',
              type: 'textarea',
              placeholder: '请输入其他数据'
            },{
              label:'管理人员',
              name: 'managerUser',
              type:'text',
              placeholder: '请输入管理员'
            },{
              label:'栏目名称',
              name:'channelName',
              type:'text',
              placeholder: '请输入栏目名称'
            },
            {
              label: '栏目类型',
              name: 'categoryId',
              type: 'select',
              options: [],
              placeholder: '请选择'
            },
            {
              label: '栏目图标',
              name: 'iconUrl',
              type: 'img',
              limit: 1,
              tip: '建议图片大小：1080*1642，图片大小不超过100K'
           },
           {
              label: '',
              name: 'isScale',
              type: 'slot'
           },
           {
              label:'关键字',
              name:'keywordName',
              type:'text',
              placeholder: '请输入关键字'
           },{
              label:'栏目描述',
              name:'descriptionRemark',
              type:'textarea',
               placeholder: '请输入栏目描述'
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
  mounted() {
    this.routeQuery = this.$route.query
    this.isEdit = Boolean((!this.routeQuery.isAdd || this.routeQuery.isAdd === 'false') && this.routeQuery.channelId)
    // if (this.isEdit) {
    //   this.getColumnInfor()
    // }
    this.getColumnInfor()
    this.fetchComponentList()
    this.getColumns()
  },
  methods: {
    // 查询栏目类型
    getColumns() {
      var _this = this
      return new Promise((resolve, reject) => {
        fetchDictByDictName('栏目类型')
          .then((response) => {
            if (response.data.result.details && response.data.result.details.length) {
              _this.formSettings[0].items[10].options = response.data.result.details.map((ele) => {
                return {
                  label: ele.dictDetailValue,
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
        columnInfor(_this.routeQuery.channelId)
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
            } else {
              // _this.formData.parentChannelNames = response.data.result.channelName
              // _this.formData.parentChannelNames = response.data.result.channelName
              _this.formData = {
                parentChannelNames: response.data.result.channelName
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
        return new Promise((resolve, reject) => {
          addColumn(formData)
            .then((response) => {
              _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
              _this.gotoListPage(_this)
              resolve()
              _this.isLoading = false
            })
            .catch((error) => {
              _this.isLoading = false
              reject(error)
            })
        })
      } else {
        return new Promise((resolve, reject) => {
          formData.channelId = _this.routeQuery.channelId
          editColumn(formData)
            .then((response) => {
              _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
              _this.gotoListPage(_this)
              _this.isLoading = false
              resolve()
            })
            .catch((error) => {
              reject(error)
              _this.isLoading = false
            })
        })
      }
    },
    gotoListPage(context) {
      context.$store.dispatch('delView', this.$route).then(({ visitedViews }) => {
        if (context.isActive(context.$route)) {
          const latestView = visitedViews.slice(-1)[0]
          if (latestView) {
            context.$router.push(latestView)
          } else {
            context.$router.push('/')
          }
        }
      })
      context.$router.push({
        path: '/cms/website/column'
      })
    }
  }
}
</script>

<style lang="scss">
.colunm-add-edit {
  margin: 30px;
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
