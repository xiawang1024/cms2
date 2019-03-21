<template>
  <div class="colunm-add-edit">
    <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" :show-return="showReturn" :btn-loading = "isLoading" @onReturn = "onReturn">
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
const Upload = _ => import('@/components/cms/Upload/upload')
import { columnInfor, editColumn, isColumnRepet } from '@/api/cms/columnManage'
import { fetchDictByDictName } from '@/api/cms/dict'
export default {
  name: 'BasicInformation',
  components: { Upload },
  props: {
    activeName: {
      type: String,
      default: ''
    },
    channelId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      basicInformation: {
        parentColumn: '河南广播网',
        preColumn: '',
        domain: '',
        location: '',
        creator: '',
        display: '',
        otherData: '',
        manager: '',
        name: '',
        type: '',
        icon: {
          url: '',
          isScale: false,
          scaleWidth: '',
          scaleHeight: ''
        },
        keyWords: '',
        desc: '',
        modules: ''
      },
      preColumnList: [
        {
          id: 1,
          name: '最前面'
        },
        {
          id: 2,
          name: '焦点图'
        },
        {
          id: 3,
          name: '电台动态'
        },
        {
          id: 4,
          name: '新闻资讯'
        }
      ],
      typeList: [
        {
          id: 1,
          name: '新闻'
        },
        {
          id: 2,
          name: '音乐'
        },
        {
          id: 3,
          name: '文学'
        },
        {
          id: 4,
          name: '综艺'
        }
      ],
      formSettings: [
        {
          items: [
            {
              label: '父级栏目',
              name: 'parentChannelNames',
              type: 'text',
              valueType: 'string',
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
              placeholder: '请输入排序'
            },
            {
              label: '访问域名',
              name: 'domainName',
              type: 'text',
              placeholder: '请输入访问域名'
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
              placeholder: '请输入栏目名称',
              required: true,
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
          //  {
          //     label: '',
          //     name: 'isScale',
          //     type: 'slot'
          //  },
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
      isLoading: false,
      imageSetting: {
        isScaleChecked: false,
        height: '',
        width: ''
      },
      showReturn: true
    }
  },
  watch: {
    activeName(val) {
      if(val === 'information') {
        this.getColumns()
        this.getColumnInfor()
      }
    }
  },
  mounted() {
  },
  created() {
    this.getColumns()
    this.getColumnInfor()
  },
  methods: {
    // 栏目编码是否重复
    checkColumnRepet(rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入栏目编码'))
      }
      let columnCode = this.$refs.vform.getData('channelCode')
      if(columnCode == this.formData.channelCode) {
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
        fetchDictByDictName('栏目类型')
          .then((response) => {
            if (response.data.result.details && response.data.result.details.length) {
              _this.formSettings[0].items[9].options = response.data.result.details.map((ele) => {
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
    getColumnInfor() {
      var _this = this
      return new Promise((resolve, reject) => {
        columnInfor(_this.channelId)
          .then((response) => {
            _this.formData = response.data.result
            if(_this.formData.iconUrl) {
              _this.formData.iconUrl = [{
                url: _this.formData.iconUrl
              }]
            } else {
              _this.formData.iconUrl = []
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
      return new Promise((resolve, reject) => {
        formData.channelId = _this.channelId
        formData.stampSetting = _this.formData.stampSetting
        formData.tagRule = _this.formData.tagRule
        formData.templateIds = _this.formData.templateIds
        formData.extFieldsList = _this.formData.extFieldsList
        editColumn(formData)
          .then((response) => {
            _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
            _this.isLoading = false
            resolve()
          })
          .catch((error) => {
            reject(error)
            _this.isLoading = false
          })
      })
    },
    onReturn() {
      this.$store.dispatch('setContextMenu', {
        id: '0',
        label: ''
      })
    }
  }
}
</script>

<style scoped>
.basic-information-container {
  margin: 10px;
}
</style>
