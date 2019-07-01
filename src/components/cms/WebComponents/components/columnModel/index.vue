<template>
  <div class="column-template-manage">
    <div class="v-search-header">
      <v-search :search-settings="searchSettings" @search="searchItem" ref="vSearch"/>
    </div>
    <div class="tool-bar">
      <el-button type="primary" v-if="checkAuth('cms:channel:add')" @click="modelAddEdit('add')" size="mini">添加</el-button>
    </div>
    <el-table :data="tableData" style="width:100%" highlight-current-row>
      <el-table-column prop="templateName" label="模板名称"/>
      <el-table-column prop="templateType" label="类别" width="120px">
        <template slot-scope="scope">
          <div>
            <span v-if="scope.row.templateType == 'list'">列表组件</span>
            <span v-if="scope.row.templateType == 'index'">首页组件</span>
            <span v-if="scope.row.templateType == 'content'">正文组件</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="channelName" label="所属栏目" show-overflow-tooltip/>
      <el-table-column prop="templateFormat" label="适用平台" width="120px">
        <template slot-scope="scope">
          <div>
            <span v-if="scope.row.templateFormat == 'pc'">电脑页面</span>
            <span v-if="scope.row.templateFormat == 'mobile'">手机页面</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="templateDescription" label="描述" show-overflow-tooltip/>
      <el-table-column prop="createTime" width="180" label="创建时间"/>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="modelAddEdit('edit', scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageNum"
      :page-sizes="[10,30,60,100]"
      :page-size="pageSize"
      :total="totalCount"
      background
      class="pagination"
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <v-page :visible.sync="showPage" @goBack="goBack">
      <h3 slot="title">{{ title }}</h3>
      <template slot="content">
        <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" label-width="80px">
          <template slot="templateContent">
            <div class="model-content">
              <el-row>
                <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                  <div class="model-left">
                    <el-input
                      id="templateContnt"
                      type="textarea"
                      placeholder="请输入内容"
                      ref="inputContent"
                      v-model="modelContent"/>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                  <div class="model-right">
                    <el-card class="box-card">
                      <div v-for="(ele, index) in modelList" :key="index" class="text item">
                        <div class="model-list">
                          <div class="model-name">{{ ele.componentName }}</div>
                          <div class="list-btn">
                            <el-button type="text" @click="useModel(ele)">使用</el-button>
                          </div>
                        </div>
                        <div>{{ ele.componentDescription }}</div>
                      </div>
                    </el-card>
                  </div>
                </el-col>
              </el-row>
            </div>
            <!-- <div class="choosed-list">
              <choosed-list ref="choosedList" :details-list = "detailsList"/>
            </div> -->
          </template>
        </v-form>
      </template>
    </v-page>
  </div>
</template>

<script>
// import { fetchDictByDictName } from '@/api/cms/dict'
import { fetchTemplate, createTemplate, updateTemplate, fetchList, deleteTemplate } from '@/api/cms/template'
import { fetchComponentList } from '@/api/cms/component'
import mixins from '@/components/cms/mixins'
import {searchSettings, formSettings} from './data.js'
import store from 'store'
import { mapGetters } from 'vuex'
export default {
  name: 'ColumnManage',
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      searchSettings: searchSettings,
      searchData: {},
      showPage: false,
      title: '添加模板',
      formData: {},
      formSettings: formSettings,
      modelContent: '',
      modelList: [],
      handelType: 'add'
    }
  },
  computed: {
    ...mapGetters(['columnAll', 'treeTags', 'contextMenu', 'columnAllOrigin'])
  },
  watch:{
    columnAll(val) {
      this.searchSettings[0].options = val
    },
    showPage(val) {
      console.log(val, 'watch')
      if(val) {
        this.formSettings[0].items[0].options = this.columnAll.length ? this.columnAll : store.get('columnsAll')
        let setDefaultChannel = []
        this.treeTags.forEach((ele) => {
          setDefaultChannel.push(ele.id)
        })
        // this.$refs.vSearch.setItemData('channelId', setDefaultChannel)
        this.$nextTick(() => {
          this.formData.channelId = setDefaultChannel
        })
        this.getModelList()
      }
    }
  },
  mounted() {
    this.searchSettings[0].options= this.columnAll.length ? this.columnAll : store.get('columnsAll')
    let setDefaultChannel = []
    this.treeTags.forEach((ele) => {
      setDefaultChannel.push(ele.id)
    })
    this.$nextTick(() => {
      this.$refs.vSearch.setItemData('channelId', setDefaultChannel)
    })
    this.searchData = {
      channelId: setDefaultChannel,
      templateName: ''
    }
    this.columnList()
  },
  methods: {
    // 使用模板
    useModel(ele) {
      this.$refs.inputContent.focus()
      this.insertAtCursorForTemplateContentRef('<@' + ele.componentName + '/>')
    },
    // 光标插入
    async insertAtCursorForTemplateContentRef(myValue) {
      const myField = document.querySelector('#templateContnt')
      if (myField.selectionStart || myField.selectionStart === 0) {
        var startPos = myField.selectionStart
        var endPos = myField.selectionEnd
        this.modelContent = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length)
        await this.$nextTick() // 这句是重点, 圈起来
        myField.focus()
        myField.setSelectionRange(endPos + myValue.length, endPos + myValue.length)
      } else {
        this.modelContent += myValue
      }
    },
    // 获取模板列表
    getModelList() {
      return new Promise((resolve, reject) => {
        fetchComponentList({}, 1, 100)
          .then((response) => {
            this.modelList = response.data.result.content
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    goBack() {
    },
    submitSave(data) {
      delete data.templateContent
      data.channelId = data.channelId.length ? data.channelId[data.channelId.length - 1] : ''
      data.templateContent = this.modelContent
      if(this.handelType === 'add') {
        this.addModel(data)
      } else {
        data.templateId = this.formData.templateId
        this.editModel(data)
      }
    },
    editModel(data) {
      return new Promise((resolve, reject) => {
        updateTemplate(data)
          .then((response) => {
            this.$message.success('编辑成功')
            this.columnList()
            this.showPage = false
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    addModel(data) {
      return new Promise((resolve, reject) => {
        createTemplate(data)
          .then((response) => {
            this.$message.success('添加成功')
            this.pageNum = 1
            this.columnList()
            this.showPage = false
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    handleDelete(row) {
      this.$confirm('是否删除改模板?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          templateId: row.templateId
        }
        return new Promise((resolve, reject) => {
          deleteTemplate(data)
            .then((response) => {
              this.$message.success('删除成功')
              this.columnList()
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      }).catch(() => {      
      })
    },
    checkAuth (authKey) {
      if (this.$store.getters.authorities.indexOf(authKey) === -1) {
        return false
      } else {
        return true
      }
    },
    searchItem(data) {
      this.searchData = data
      this.pageNum = 1 
      this.columnList()
    },
    columnList() {
      var _this = this
      let searchResult = {
        channelId: this.searchData.channelId ? this.searchData.channelId[this.searchData.channelId.length - 1] : '',
        templateName: this.searchData.templateName
      }
      return new Promise((resolve, reject) => {
        fetchList(searchResult, this.pageNum, this.pageSize)
          .then((response) => {
            _this.tableData = response.data.result.content
            _this.totalCount = response.data.result.total
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.columnList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.columnList()
    },
    modelAddEdit(handelType, row) {
      this.handelType = handelType
      this.title = handelType === 'add' ? '添加' : '编辑'
      this.showPage = true
      this.formData = {}
      this.modelContent = ''
      if(row) {
        this.modelInfor(row.templateId)
      }
    },
    modelInfor(id) {
      return new Promise((resolve, reject) => {
        fetchTemplate(id)
          .then((response) => {
            this.formData = response.data.result
            this.modelContent = response.data.result.templateContent
            let id = response.data.result.channelId
            let channelAll = this.columnAllOrigin || store.get('columnsAllOrigin')
            let channelIds = channelAll.find((ele) => {
              return ele.channelId == id
            })
            if(channelIds.parentChannelIds) {
              this.formData.channelId = channelIds.parentChannelIds.split(',').concat([channelIds.channelId])
            } else {
              this.formData.channelId = [channelIds.channelId]
            }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}
</script>

<style lang='scss'>
.column-template-manage {
  .tool-bar {
    margin-top:10px;
    text-align: left;
    padding-left:8px;
  }
  .pagination {
    margin-top:20px;
    margin-bottom:20px;
  }
  .v-form {
    max-width: 1000px;
    // .el-form-item {
    //   max-width: 800px;
    // }
    // .el-form-item:nth-child(8) {
    //   max-width:100%;
    // }
    // .el-form-item:nth-child(7) {
    //   max-width:100%;
    // }
  }
  .model-content {
    .model-left{
      padding-right:20px;
      margin-bottom:5px;
      textarea{
        height: 350px;
      }
    }
    .model-right{
      .el-card__body{
        height: 350px;
        overflow-y: scroll;
        .item{
          border-bottom:1px solid #dcdfe6;
          margin-bottom:10px;
        }
      }
      .model-list{
         display: flex;
        .model-name{
          flex:1
        }
        .list-btn{
          width:32px;
        }
      }
    }
  }
}
</style>
