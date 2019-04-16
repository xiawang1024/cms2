<template>
  <div class="check-setting">
    <!-- <div class="el-card__header">
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div> -->
    <div class="tool-bar">
      <el-button type="primary" size="small" @click="addCheck">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" highlight-current-row size="small">
      <el-table-column prop="configName" label="配置名称" min-width="250" show-overflow-tooltip/>
      <!-- <el-table-column prop="channelCode" label="排序" min-width="80"/> -->
      <el-table-column prop="multiAudit" label="是否启用">
        <template slot-scope="scope">
          <span v-if="scope.row.multiAudit ==0">启用</span>
          <span v-else>显示</span>
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
            <div class="choosed-list">
              <div class="el-cascalder-define-choose" @click.stop="toggleMenu">
                <div class="tag-container" ref="tags">
                  <el-tag class="tag-list" size="small" closable v-for="(ele, index) in tagList" :key="index" @close="closeTag(index, ele)">{{ ele.channelName }}</el-tag>
                </div>
                <div class="input-define">
                  <input class="input-define-inner" type="text" ref="reference" readonly="readonly" autocomplete="off" @blur="inputBlur" @focus="inputFocus" :class="{ 'is-focus': visible}">
                  <span class="right-suffix" @click.stop="toggleMenu">
                    <span class="right-suffix-inner">
                      <i class="el-icon-arrow-down" :class="{ 'el-up': visible}"/>
                    </span>
                  </span>
                </div>
                <transition name="el-zoom-in-top">
                  <div class="tree-data" v-show="visible">
                    <column-tree ref="columnTree" :tree-data="treeData" @getChoosed="getChoosed" :tag-list="tagList"/>
                  </div>
                </transition>
              </div>
            </div>
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
        </v-form>
      </template>
    </v-page>
    <add-people ref="peopleFirstDialog" :dialog-visible.sync="firstDialogVisible" @peopleList="firstPeopleList"/>
    <add-second ref="peopleSecondDialog" :dialog-visible.sync="secondDialogVisible" @peopleList="secondPeopleList"/>
  </div>
</template>

<script>
// import { fetchDictByDictName } from '@/api/cms/dict'
import { columnList } from '@/api/cms/columnManage'
import { addCheck, getCheckList, deleteCheck, getCheckInfor} from '@/api/cms/check'
import Pagination from '@/common/Pagination'
import mixins from '@/components/cms/mixins'
import columnTree from './columnTree'
import addPeople from './addPeople'
import addSecond from './addSecond'

export default {
  name: 'ColumnManage',
  components: {
    Pagination,
    columnTree,
    addPeople,
    addSecond
  },
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
              label: '配置名称：',
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
              activeValue: '0',
              inactiveValue: '1',
              placeholder: '',
            },
            {
              label: '审核方式',
              name: 'auditType',
              type: 'switch',
              valueType: 'string',
              activeValue: '0',
              inactiveValue: '1',
            },
            {
              label: '审批人设置',
              name: 'checkPeopleSet',
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
      treeDataOrigin: []
    }
  },
  watch:{
    tagList(val) {
      this.resetInputHeight()
    },
    visible(val) {
    }
  },
  mounted() {
    this.getCheckList()
  },
  created() {
    this.columnSearchList()
  },
  methods: {
    tagChangeToName(tag) {
      console.log(this.$refs.peopleFirstDialog.options)
      let tagName = (this.$refs.peopleFirstDialog.options || this.$refs.peopleSecondDialog.options).find((ele) => {
        return ele.value === tag
      })
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
    toggleMenu() {
      this.visible = !this.visible
      if(this.visible) {
        (this.$refs.input || this.$refs.reference).focus();
      }
    },
    resetInputHeight() {
      this.$nextTick(() => {
        if (!this.$refs.reference) return;
        let inputChildNodes = this.$refs.reference
        let input = inputChildNodes
        const tags = this.$refs.tags;
        const sizeInMap = 32;
        input.style.height = this.tagList.length === 0
          ? sizeInMap + 'px'
          : Math.max(
            tags ? (tags.clientHeight + (tags.clientHeight > sizeInMap ? 6 : 0)) : 0,
            sizeInMap
          ) + 'px';
      });
    },
    inputFocus() {
      if(this.arrowExtend) {
        this.arrowExtend = false
      } else {
        this.arrowExtend = true
      }
    },
    inputBlur() {
      console.log('111')
      // this.visible = false
      // (this.$refs.input || this.$refs.reference).focus();
    },
    closeTag(index, ele) {
      this.tagList.splice(index, 1)
      this.$refs.columnTree.$refs.tree.setCheckedNodes(this.tagList)
    },
    getChoosed(val) {
      this.tagList = val
    },
    // 返回
    goBack() {
    },
    addCheck() {
      this.title = "添加配置"
      this.handelCheck = true
      this.tagList = []
      this.columnSearchList()
    },
    editCheck(row) {
     this.title = "编辑配置"
     this.handelCheck = true
     this.columnSearchList()
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
      return new Promise((resolve, reject) => {
        getCheckInfor(row.id)
          .then((response) => {
            this.formData = response.data.result
            let channelList = response.data.result.columns ? response.data.result.columns.split(',') : []
            let getTag = []
            if(channelList.length) {
              channelList.forEach((channel) => {
                console.log(channel)
                this.treeDataOrigin.forEach((tree) => {
                  console.log(tree)
                  if(channel == tree.channelId) {
                    getTag.push(tree)
                  }
                })
              })
            }
            this.tagList = getTag
            console.log(this.tagList, 'tagList')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 添加审核
    submitSave(data) {
      console.log(this.tagList)
      data.twoAuditors = this.firstChoosedPeople.join(',')
      data.threeAuditors = this.secondChoosedPeople.join(',')
      let columns = this.tagList.map((ele) => {
        return ele.channelId
      })
      data.columns = columns.join(',')
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
        // this.columnDelFeatch(row)
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
.el-cascalder-define-choose{
  .tree-data{
    width:100%;
    position: absolute;
    top:100%;
    left:0;
    border: 1px solid #dcdfe6;
    width:100%;
    z-index: 100;
    height: 300px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 5px 0;
    transition: transform .3s,-webkit-transform .3s;
  }
  width:100%;
  display: inline-block;
  position: relative;
  .tag-container{
    width:100%;
    position: absolute;
    line-height: normal;
    white-space: normal;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .tag-list{
      margin-left: 3px;
      margin-right: 3px;
    }
  }
  .input-define{
    position: relative;
    font-size: 14px;
    display: block;
    width: 100%;
    .input-define-inner{
      // height: 40px;
      padding-right: 30px;
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      line-height: 32px;
      outline: none;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      width: 100%;
      // border-color: #409eff;
      cursor: pointer;
      &:focus{
        border-color: #409eff;
      }
    }
    .is-focus {
      border-color: #409eff;
    }
    .right-suffix{
      position: absolute;
      height: 100%;
      right: 5px;
      top: 0;
      text-align: center;
      color: #c0c4cc;
      transition: all .3s;
      pointer-events: none;
      z-index: 99;
      .right-suffix-inner{
        pointer-events: all;
        i {
          width: 25px;
          line-height: 32px;
          cursor: pointer;
          transform: rotateZ(0);
          transition: transform .3s,-webkit-transform .3s;
        }
        .el-up {
          font-size: 14px;
          transform: rotateZ(180deg);
          transition: transform .3s,-webkit-transform .3s;
        }
      }
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.check-setting {
  .form-section {
    overflow: visible;
  }
   margin: 30px;
  .tool-bar {
    margin-top:22px;
  }
  // .define-select {
  //   min-height: 32px;
  //   -webkit-appearance: none;
  //   background-color: #fff;
  //   background-image: none;
  //   border-radius: 4px;
  //   border: 1px solid #dcdfe6;
  //   -webkit-box-sizing: border-box;
  //   box-sizing: border-box;
  //   color: #606266;
  //   display: inline-block;
  //   font-size: inherit;
  //   line-height: 32px;
  //   outline: 0;
  //   padding: 0 15px;
  //   -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  //   transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  //   width: 100%;
  //   // cursor: pointer;
  //   position: relative;
  //   .define-right {
  //     position: absolute;
  //     cursor: pointer;
  //     right:5px;
  //     width: 25px;
  //     height: 100%;
  //     color: #c0c4cc;
  //     font-weight: 400;
  //     text-align: center;
  //     transition: transform .3s,-webkit-transform .3s;
  //     .el-icon-arrow-down {
  //       font-size: 14px;
  //       // transform: rotateZ(180deg);
  //       transform: rotateZ(0);
  //       transition: transform .3s,-webkit-transform .3s;
  //       // transform: rotateZ(0);
  //     }
  //     .el-up {
  //       font-size: 14px;
  //       transform: rotateZ(180deg);
      
  //       transition: transform .3s,-webkit-transform .3s;
  //     }
  //   }
  //   .tag-list{
  //     margin-right: 5px;
  //   }
  //   .tree-data{
  //     width:100%;
  //     position: absolute;
  //     top:100%;
  //     left:0;
  //     border: 1px solid #dcdfe6;
  //     width:100%;
  //     z-index: 100;
  //     height: 300px;
  //     border: 1px solid #e4e7ed;
  //     border-radius: 4px;
  //     background-color: #fff;
  //     -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  //     box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  //     -webkit-box-sizing: border-box;
  //     box-sizing: border-box;
  //     margin: 5px 0;
  //     transition: transform .3s,-webkit-transform .3s;
  //   }
  // }
}
</style>
