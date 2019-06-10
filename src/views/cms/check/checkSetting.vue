<template>
  <div class="check-setting">
    <!-- <div class="el-card__header">
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div> -->
    <div class="tool-bar">
      <el-button type="primary" size="mini" @click="addCheck">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" highlight-current-row >
      <el-table-column prop="configName" label="配置名称" min-width="250" show-overflow-tooltip/>
      <!-- <el-table-column prop="channelCode" label="排序" min-width="80"/> -->
      <el-table-column prop="multiAudit" label="是否启用">
        <template slot-scope="scope">
          <span v-if="scope.row.multiAudit ==1">启用</span>
          <span v-else>禁用</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="添加时间" width="220"/>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editCheck(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="checkDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="totalCount" @sizeChange="sizeChange" @pageChange="pageChange"/>
    <v-page :visible.sync="handelCheck" @goBack="goBack">
      <h3 slot="title">{{ title }}</h3>
      <template slot="content">
        <!-- 详情页组件 -->
        <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave">
          <template slot="chooseColumn">
            <tree-multiple :tree-data="treeData" :prop-tags="tagList" ref="treeMultiple"/>
          </template>
          <template slot="checkPeopleSet">
            <div class="check-people-set">
              <div>
                <el-steps >
                  <el-step title="">
                    <template slot="title">
                      <div class="title fz">
                        本人
                      </div>
                    </template>
                    <template slot="description">
                      <div class="pl-5">
                        一级审核为本人
                      </div>
                    </template>
                    <template slot="icon">
                      <div class="title-icon">
                        <icon name="user-alt" scale="1.2"/>
                      </div>
                    </template>
                  </el-step>
                  <el-step title="">
                    <template slot="title">
                      <div class="title">
                        <el-button type="text" size="medium" @click="addFirst">添加</el-button>
                      </div>
                    </template>
                    <template slot="description">
                      <div class="pl-5">
                        请选择二级审核相关人员
                      </div>
                      <div>
                        <el-tag
                          :key="tag"
                          v-for="tag in firstChoosedPeople"
                          closable
                          @close="firstTagClose(tag)">
                          {{ tagChangeToName(tag) }}
                        </el-tag>
                      </div>
                    </template>
                    <template slot="icon">
                      <div class="title-icon">
                        <icon name="user-alt" scale="1.2"/>
                      </div>
                    </template>
                  </el-step>
                  <el-step title="" description="">
                    <template slot="title">
                      <div class="title">
                        <el-button type="text" size="medium" @click="addSecond">添加</el-button>
                      </div>
                    </template>
                    <template slot="description">
                      <div class="pl-5">
                        请选择三级审核相关人员
                      </div>
                      <div>
                        <el-tag
                          :key="tag"
                          v-for="tag in secondChoosedPeople"
                          closable
                          @close="secondTagClose(tag)">
                          {{ tagChangeToName(tag) }}
                        </el-tag>
                      </div>
                    </template>
                    <template slot="icon">
                      <div class="title-icon">
                        <icon name="user-alt" scale="1.2"/>
                      </div>
                    </template>
                  </el-step>
                </el-steps>
              </div>
            </div>
          </template>
          <template slot="test">
            <div>
              <div style="height: 300px;">
                <el-steps direction="vertical" :active="1">
                  <el-step title="步骤 1" icon="el-icon-user-solid"/>
                  <el-step title="步骤 2" icon="el-icon-user-solid"/>
                  <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字" icon="el-icon-user-solid"/>
                </el-steps>
              </div>
            </div>
          </template>
        </v-form>
      </template>
    </v-page>
    <add-people ref="peopleFirstDialog" :dialog-visible.sync="firstDialogVisible" :people-options="peopleOptions" :prop-checked="firstChoosedPeople" @peopleList="firstPeopleList"/>
    <add-second ref="peopleSecondDialog" :dialog-visible.sync="secondDialogVisible" :people-options="peopleOptions" @peopleList="secondPeopleList" :prop-checked="secondChoosedPeople"/>
  </div>
</template>

<script>
// import { fetchDictByDictName } from '@/api/cms/dict'
import Clickoutside from 'element-ui/src/utils/clickoutside';
import { columnList } from '@/api/cms/columnManage'
import { addCheck, getCheckList, deleteCheck, getCheckInfor, editCheck} from '@/api/cms/check'
import { UserList } from '@/api/user/user'
import Pagination from '@/common/Pagination'
import mixins from '@/components/cms/mixins'
import addPeople from './addPeople'
import addSecond from './addSecond'
import treeMultiple from './treeMultiples'
export default {
  name: 'ColumnManage',
  components: {
    Pagination,
    addPeople,
    addSecond,
    treeMultiple
  },
  directives: { Clickoutside },
  mixins: [mixins],
  data() {
    return {
      arrowExtend: false,
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      searchData: {},
      // 新增
      title: '审核设置',
      handelCheck: false,
      formSettings: [
        {
          items: [
            {
              label: '配置名称',
              name: 'configName',
              type: 'text',
              valueType: 'string',
              placeholder: '请输入配置名称',
            },
            {
              label: '选择栏目',
              name: 'chooseColumn',
              type: 'slot',
              valueType: 'string',
              placeholder: '',
            },
            {
              label: '开启文章多级审核',
              name: 'multiAudit',
              type: 'switch',
              activeValue: 1,
              inactiveValue: 0,
            },
            {
              label: '审核方式',
              name: 'auditType',
              type: 'switch',
              valueType: 'string',
              activeValue: 1,
              inactiveValue: 0,
              activeText: '前置审核',
              inactiveText: '后置审核'
            },
            {
              label: '审批人设置',
              name: 'checkPeopleSet',
              type: 'slot',
              placeholder: '',
            },
            {
              label: '测试',
              name: 'test',
              type: 'slot',
              placeholder: '',
            }
          ]
        }
      ],
      formData: {},
      treeData: [],
      tagList: [],
      visible: false,
      firstDialogVisible: false,
      secondDialogVisible: false,
      firstChoosedPeople: [],
      secondChoosedPeople: [],
      // 栏目原始数据
      treeDataOrigin: [],
      // 人员数据
      peopleOptions: [],
      handelType: 'add',
      checkId: ''
    }
  },
  watch:{
  },
  mounted() {
    this.getCheckList()
  },
  created() {
    this.columnSearchList()
    this.getUserList()
  },
  methods: {
    // 获取人员列表
    getUserList () {
      return new Promise((resolve, reject) => {
        UserList({}, 1, 200).then(async res => {
          this.peopleOptions = res.data.result.content.map((ele) => {
            return {
              label: ele.userName,
              value: ele.userId
            }
          })
          resolve()
        })
          .catch(err => {
            reject(err)
          })
      })
    },
    tagChangeToName(tag) {
        let tagName = {}
        if(this.peopleOptions && this.peopleOptions.length) {
          tagName = this.peopleOptions.find((ele) => {
            return ele.value === tag
          })
        }
        return tagName.label
    },
    firstTagClose(tag) {
      this.firstChoosedPeople.splice(this.firstChoosedPeople.indexOf(tag), 1);
    },
    secondTagClose(tag) {
      this.secondChoosedPeople.splice(this.secondChoosedPeople.indexOf(tag), 1);
    },
    firstPeopleList(val) {
      this.firstChoosedPeople = val
    },
    secondPeopleList(val) {
     this.secondChoosedPeople = val
    },
    addFirst() {
      this.firstDialogVisible = true
    },
    addSecond() {
      this.secondDialogVisible = true
    },
    // 返回
    goBack() {
    },
    addCheck() {
      this.title = "添加配置"
      this.handelCheck = true
      this.tagList = []
      this.handelType = 'add'
      this.formData = {}
      this.firstChoosedPeople = []
      this.secondChoosedPeople = []
    },
    editCheck(row) {
     this.title = "编辑配置"
     this.handelCheck = true
     this.handelType = 'edit'
     this.checkId = row.id
     this.getCheckInfor(row)
    },
    sizeChange(val) {
      this.pageSize = val
      this.getCheckList()
    },
    pageChange(val) {
      this.pageNum = val
      this.getCheckList()
    },
    // 查看详情
    getCheckInfor(row) {
      this.firstChoosedPeople = []
      return new Promise((resolve, reject) => {
        getCheckInfor(row.id)
          .then((response) => {
            this.formData = response.data.result
            let channelList = response.data.result.columns ? response.data.result.columns.split(',') : []
            let getTag = []
            if(channelList.length) {
              channelList.forEach((channel) => {
                this.treeDataOrigin.forEach((tree) => {
                  if(channel == tree.channelId) {
                    getTag.push(tree)
                  }
                })
              })
            }
            this.tagList = getTag
            this.firstChoosedPeople = response.data.result.twoAuditors ? response.data.result.twoAuditors.split(',') : []
            this.secondChoosedPeople = response.data.result.threeAuditors ? response.data.result.threeAuditors.split(',') : []
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 审核提交操作
    submitSave(data) {
      data.twoAuditors = this.firstChoosedPeople.join(',')
      data.threeAuditors = this.secondChoosedPeople.join(',')
      let columns = this.$refs.treeMultiple.tagList.map((ele) => {
        return ele.channelId
      })
      data.columns = columns.join(',')
      if(this.handelType === 'add') {
        this.hanelAddCheck(data)
      } else {
        data.id = this.checkId
        this.handelEditCheck(data)
      }
    },
    hanelAddCheck(data) {
      return new Promise((resolve, reject) => {
        addCheck(data)
          .then((response) => {
            this.$message.success('添加成功')
            this.handelCheck = false
            this.pageNum = 1
            this.getCheckList()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    handelEditCheck(data) {
      console.log(data, 'editData')
      return new Promise((resolve, reject) => {
        editCheck(data)
          .then((response) => {
            this.$message.success('修改成功')
            this.handelCheck = false
            this.pageNum = 1
            this.getCheckList()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getCheckList() {
      var _this = this
      return new Promise((resolve, reject) => {
        getCheckList(this.pageNum, this.pageSize)
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
    checkDel(row) {
      this.$confirm('是否删除该条设置?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          id: row.id
        }
        return new Promise((resolve, reject) => {
          deleteCheck(params)
            .then((response) => {
              this.$message.success('删除成功')
              this.pageNum = 1
              this.getCheckList()
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      }).catch(() => {
      })
    },
    columnSearchList() {
      return new Promise((resolve, reject) => {
        columnList({}, 1, 1000)
          .then((response) => {
            this.treeData = this.toTree(response.data.result.content)
            this.treeDataOrigin = response.data.result.content
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
.check-people-set{
  .el-step{
    .el-step__icon{
      width:40px;
      height: 40px;
    }
    .el-step__line{
      top:20px;
    }
    .title-icon{
      padding-top:4px;
    }
    .title{
      padding-left:5px;
      &.fz{
        font-size: 14px;
      }
    }
    .el-tag{
      margin:3px;
    }
    .pl-5{
      padding-left:5px;
    }
  }
};
.check-setting {
  .form-section {
    overflow: visible;
  }
   margin: 30px;
  .tool-bar {
    margin-top:22px;
  }
}
</style>
