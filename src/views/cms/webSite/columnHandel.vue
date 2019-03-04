<template>
  <div class="colunm-add-edit">
    <!-- <el-form :model="basicInformation">
      <el-row :gutter="30" >
        <el-col
          v-if="!routeQuery.isFather"
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="父级栏目:">
            <el-input
              v-model="basicInformation.parentColumn"
              style="width:auto"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="位置排序:">
            <el-input
              v-model="basicInformation.seqNo"
              style="width:auto"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="访问域名:">
            <el-input
              v-model="basicInformation.domainName"
              style="width:auto"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="存放位置:">
            <el-input
              v-model="basicInformation.domainPath"
              class="location"
              style="width:auto"
            >
              <span
                slot="prefix"
                style="font-size:10px;user-select:none"
              >目录:</span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="创建人员:">
            <el-input
              v-model="basicInformation.createUser"
              style="width:auto"
              disabled
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="正常显示:">
            <el-switch
              v-model="basicInformation.hiddenFlag"
              active-color="#13ce66"
              active-text="正常"
              inactive-text="隐藏"
              active-value="0"
              inactive-value="1"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="其他数据:">
            <el-input
              :rows="3"
              v-model="basicInformation.extra"
              style="max-width:400px;"
              type="textarea"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="管理人员:">
            <el-input
              v-model="basicInformation.manager"
              style="width:auto"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="栏目名称:">
            <el-input
              v-model="basicInformation.channelName"
              style="width:auto"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="栏目类型:">
            <el-select
              v-model="basicInformation.type"
              placeholder="请选择栏目类型"
            >
              <el-option
                v-for="type in typeList"
                :key="type.id"
                :label="type.name"
                :value="type.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="栏目图标:">
            <upload />
            <el-checkbox v-model="basicInformation.icon.isScale">是否缩放</el-checkbox>
            <el-input
              v-if="basicInformation.icon.isScale"
              v-model="basicInformation.icon.scaleWidth"
              style="width:auto"
              placeholder="宽"
            />
            <el-input
              v-if="basicInformation.icon.isScale"
              v-model="basicInformation.icon.scaleHeight"
              style="width:auto"
              placeholder="高"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="关键字:">
            <el-input
              :rows="3"
              v-model="basicInformation.keywordName"
              style="max-width:400px;"
              type="textarea"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="10"
        >
          <el-form-item label="栏目描述:">
            <el-input
              :rows="3"
              v-model="basicInformation.desc"
              style="max-width:400px;"
              type="textarea"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-button
        size="small"
        type="warning"
        @click="save"
      >保存</el-button>
    </el-form> -->
    <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave"/>
  </div>
</template>

<script>
const Upload = _ => import('@/components/cms/Upload/upload')
import { addColumn, columnInfor, editColumn } from '@/api/cms/columnManage'
import { fetchComponentList } from '@/api/cms/component'
export default {
  name: 'ColumnHandel',
  components: { Upload },
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
              name: 'parentChannelId',
              type: 'text',
              valueType: 'string'
            },
            {
              label: '位置排序',
              name: 'seqNo',
              type: 'text'
            },
            {
              label: '访问域名',
              name: 'domainName',
              type: 'text'
            },{
              label:'存放位置',
              name: 'domainPath',
              type:'text'
            },{
              label: '创建人员',
              name: 'createUser',
              type: 'text',
              valueType: 'string'
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
              type: 'textarea'
            },{
              label:'管理人员',
              name: 'managerUser',
              type:'text'
            },{
              label:'栏目名称',
              name:'channelName',
              type:'text'
            },
            {
              label: '栏目类型',
              name: 'type',
              type: 'select',
              options: [
                {
                  value: 1,
                  label: '新闻'
                },
                {
                  value: 2,
                  label: '音乐'
                },
                {
                  value: 3,
                  label: '文学'
                },
                {
                  value: 4,
                  label: '综艺'
                },
                {
                  value: 5,
                  label: '曲艺'
                },
                {
                  value: 6,
                  label: '品牌栏目'
                },
                {
                  value: 7,
                  label: '其他'
                }
              ]
            },
          //   {
          //     label: '栏目图标',
          //     name: 'iconUrl',
          //     type: 'img',
          //     limit: 1,
          //     tip: '建议图片大小：1080*1642，图片大小不超过100K'
          //  },
           {
              label:'关键字',
              name:'keywordName',
              type:'text'
           },{
              label:'栏目描述',
              name:'descriptionRemark',
              type:'textarea'
            }
          ]
        }
      ],
      formData: {},
      basicInformation: {
        seqNo: '',
        preColumn: '',
        domainName: '',
        domainPath: '',
        createUser: '',
        hiddenFlag: '',
        extra: '',
        manager: '',
        channelName: '',
        type: '',
        icon: {
          url: '',
          isScale: false,
          scaleWidth: '',
          scaleHeight: ''
        },
        keywordName: '',
        desc: ''
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
        },
        {
          id: 5,
          name: '曲艺'
        },
        {
          id: 6,
          name: '品牌栏目'
        },
        {
          id: 7,
          name: '其他'
        }
      ],
      routeQuery: {}
    }
  },
  mounted() {
    this.routeQuery = this.$route.query
    if ((!this.routeQuery.isAdd || this.routeQuery.isAdd === 'false') && this.routeQuery.channelId) {
      this.getColumnInfor()
    }
    this.fetchComponentList()
  },
  methods: {
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
            // _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
            // _this.gotoListPage(_this)
            // _this.basicInformation = Object.assign({}, response.data.result)
            // _this.basicInformation.icon = {
            //   url: '',
            //   isScale: false,
            //   scaleWidth: '',
            //   scaleHeight: ''
            // }
            _this.formData = response.data.result
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    submitSave(formData) {
      console.log(formData)
      var _this = this
      if (_this.routeQuery.isAdd) {
        return new Promise((resolve, reject) => {
          addColumn(formData)
            .then((response) => {
              _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
              _this.gotoListPage(_this)
              resolve()
            })
            .catch((error) => {
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
              resolve()
            })
            .catch((error) => {
              reject(error)
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

<style lang="scss" scoped>
.colunm-add-edit {
  margin: 30px;
  .el-form {
    .el-select {
      .el-input {
        width: 185px !important;
      }
    }
  }
}
</style>
