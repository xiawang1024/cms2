<template>
  <div class="column-template-manage">
    <div class="el-card__header">
      <v-search :search-settings="searchSettings" @search="searchItem" ref="vSearch"/>
    </div>
    <div class="tool-bar">
      <el-button type="primary" v-if="checkAuth('cms:channel:add')" @click="modelAddEdit(true, 'father')" size="small">添加</el-button>
    </div>
    <el-table :data="tableData" style="width:100%" size="small" highlight-current-row>
      <el-table-column prop="templateName" label="模板名称"/>
      <el-table-column prop="templateType" label="类别"/>
      <el-table-column prop="channelName" label="所属栏目"/>
      <el-table-column prop="templateFormat" label="适用平台"/>
      <el-table-column prop="templateDescription" label="描述"/>
      <el-table-column prop="createTime" width="180" label="创建时间"/>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleAlter(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave">
          <template slot="templateContent">
            <div class="model-content">
              <el-row>
                <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                  <div class="model-left">
                    <el-input
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
import { fetchList } from "@/api/cms/template";
import { fetchComponentList } from '@/api/cms/component'
import mixins from '@/components/cms/mixins'
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
      searchSettings: [{
        label: '栏目名称',
        name: 'channelId',
        placeholder: '请输入栏目名称',
        visible: true,
        options: [],
        type: 'cascader'
      }, {
        label: '模板名称',
        name: 'templateName',
        placeholder: '请输入',
        visible: true,
        type: 'text'
      }],
      searchData: {},
      showPage: false,
      title: '添加模板',
      formData: {},
      formSettings: [
        {
          items: [
            {
              label: '所属栏目',
              name: 'channelId',
              type: 'text',
              placeholder: '请选择'
            },
            {
              label: '模板类别',
              name: 'templateType',
              type: 'select',
              placeholder: '请选择',
              options: [
                {
                  value: 'list',
                  label: '列表组件'
                },
                {
                  value: 'index',
                  label: '首页组件'
                },
                {
                  value: 'content',
                  label: '正文组件'
                }
              ]
            },
            {
              label: '适用平台',
              name: 'templateFormat',
              type: 'select',
              placeholder: '请选择',
              options: [
                {
                  value: 'pc',
                  label: '电脑页面'
                },
                {
                  value: 'mobile',
                  label: '手机页面'
                }
              ]
            },
            {
              label: '是否有效',
              name: 'enableFlag',
              activeValue: 1,
              inactiveValue: 0,
              value: 1,
              type: 'switch'
            },{
              label: '模板名称',
              name: 'templateName',
              type: 'text',
              placeholder: '请输入模板名称'
            },{
              label:'文件名',
              name: 'templateFilename',
              type:'text',
              placeholder: '请输入文件名'
            },
            {
              label:'描述',
              name: 'templateDescription',
              type:'textarea',
              placeholder: '请输入'
            },
            {
              label:'模板内容',
              name: 'templateContent',
              type:'slot',
              placeholder: '请输入'
            }
          ]
        }
      ],
      modelContent: '',
      modelList: []
    }
  },
  computed: {
    ...mapGetters(['columnAll', 'treeTags', 'contextMenu'])
  },
  watch:{
    columnAll(val) {
      this.searchSettings[0].options = val
    },
    showPage(val) {
      if(val) {
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
    this.$refs.vSearch.setItemData('channelId', setDefaultChannel)
    let searchData = {
      channelId: setDefaultChannel,
      templateName: ''
    }
    this.columnList(searchData)
  },
  created() {
    // this.columnSearchList()
  },
  methods: {
    // 使用模板
    useModel(ele) {
      console.log(this.$refs.inputContent)
      console.log(this.$refs.inputContent.$el.selectionStart)
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
    submitSave() {

    },
    checkAuth (authKey) {
      if (this.$store.getters.authorities.indexOf(authKey) === -1) {
        return false
      } else {
        return true
      }
    },
    searchItem(searchData) {
      this.searchData = searchData
      this.pageNum = 1
      this.columnList(searchData)
    },
    columnList(searchData) {
      console.log(searchData, 'searchData')
      var _this = this
      let searchResult = {
        channelId: searchData.channelId ? searchData.channelId[searchData.channelId.length - 1] : '',
        templateName: searchData.templateName
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
    columnDelFeatch(row) {
      // var _this = this
      // return new Promise((resolve, reject) => {
      //   deleteColumn({ channelId: row.channelId })
      //     .then((response) => {
      //       _this.columnList()
      //       console.log(321)
      //       if (response.data.code === 0) {
      //         _this.$message.success('操作成功！')
      //       } else {
      //         _this.$message.success(response.data.msg)
      //       }
      //       resolve()
      //     })
      //     .catch((error) => {
      //       reject(error)
      //     })
      // })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.columnList(this.searchData)
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.columnList(this.searchData)
    },
    modelAddEdit(handelType, type, channelId) {
      this.showPage = true
      // this.$router.push({
      //   path: '/cms/website/columnHandel',
      //   query: {
      //     isAdd: handelType,
      //     isFather: type === 'father',
      //     channelId: channelId
      //   }
      // })
    },
    columnDel(row) {
      this.$confirm('此操作将永久删除该栏目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.columnDelFeatch(row)
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang='scss'>
.column-template-manage {
  .tool-bar {
    margin-top:22px;
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
