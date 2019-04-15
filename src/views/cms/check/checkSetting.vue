<template>
  <div class="check-setting">
    <div class="el-card__header">
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div>
    <div class="tool-bar">
      <el-button type="primary" size="small" @click="addCheck">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" highlight-current-row size="mini">
      <el-table-column prop="channelName" label="配置名称" min-width="250" show-overflow-tooltip>
        <template slot-scope="scope">
          <!-- <div>
            <span v-for= "(group) in channelNameChange(scope.row.parentChannelNames)" :key="group" class="space-length"/>
            <span v-for= "(ele, index) in channelNameChange(scope.row.parentChannelNames)" :key="index" class="space-holder"/>
            <span>{{ scope.row.parentChannelNames }}</span>
            <span>{{ scope.row.channelName }}</span>
          </div> -->
        </template>
      </el-table-column>
      <el-table-column prop="channelCode" label="排序" min-width="80"/>
      <el-table-column prop="hiddenFlag" label="是否启用">
        <template slot-scope="scope">
          <span v-if="scope.row.hiddenFlag == 1">隐藏</span>
          <span v-else>显示</span>
        </template>
      </el-table-column>
      <el-table-column prop="parentChannelId" label="添加时间" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.parentChannelId == '-1'">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="editCheck(scope.rwo)">编辑</el-button>
          <el-button type="text" @click="columnDel(scope.row)">删除</el-button>
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
              <el-select v-model="value5" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
              <el-cascader
                :options="options1"
                v-model="selectedOptions"
              />
              <!-- <choosed-list ref="choosedList" :details-list = "detailsList"/> -->
            </div>
          </template>
          <template slot="chooseColumnTest">
            <div class="choosed-list" @click="columnCounter">
              <div class="define-select">
                <el-tag class="tag-list" size="small" closable v-for="(ele, index) in tagList" :key="index" @close="closeTag(index, ele)">{{ ele.channelName }}</el-tag>
                <span class="define-right" @click="isArrowExtend">
                  <span>
                    <i class="el-icon-arrow-down" :class="{ 'el-up': arrowExtend}"/>
                  </span>
                </span> 
                <transition name="fade">
                  <div class="tree-data" v-if="arrowExtend">
                    <column-tree ref="columnTree" :tree-data="treeData" :arrow-extend="arrowExtend" @getChoosed="getChoosed" :tag-list="tagList"/>
                  </div>
                </transition>
              </div>
              <!-- <div class="el-cascalder-define-choose">
                <div class="tag-container">
                  <el-tag class="tag-list" size="small" closable v-for="(ele, index) in tagList" :key="index" @close="closeTag(index, ele)">{{ ele.channelName }}</el-tag>
                </div>
                <div class="input-define" @click="isArrowExtend">
                  <el-input class="input-define-inner" type="text" readonly="readonly" autocomplete="off" @blur="inputBlur()" @focus="inputFocus()" :class="{ 'is-focus': arrowExtend}"/>
                  <span class="right-suffix">
                    <span class="right-suffix-inner">
                      <i class="el-icon-arrow-down" :class="{ 'el-up': arrowExtend}"></i>
                    </span>
                  </span>
                </div>
                <transition name="fade">
                  <div class="tree-data" v-if="arrowExtend">
                    <column-tree ref="columnTree" :tree-data="treeData" :arrow-extend="arrowExtend" @getChoosed="getChoosed" :tag-list="tagList"/>
                  </div>
                </transition>
              </div> -->
              <!-- <el-select v-model="value5" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
               <el-cascader
                :options="options1"
                v-model="selectedOptions"
               >
              </el-cascader> -->
              <!-- <choosed-list ref="choosedList" :details-list = "detailsList"/> -->
            </div>
            <!-- element-ui -->
            <div>
              <div class="el-select">
                <div class="el-select__tags">
                  哦都共瑞特热特热特瑞特热他偶尔特肉太热特日托热i天热呕吐i热透热贴
                </div>
                <!-- <div class="el-select__tags">
                  <el-tag
                    v-for="item in selected"
                    :key="getValueKey(item)"
                    :closable="!selectDisabled"
                    :size="collapseTagSize"
                    :hit="item.hitState"
                    type="info"
                    @close="deleteTag($event, item)"
                    disable-transitions>
                    <span class="el-select__tags-text">{{ item.currentLabel }}</span>
                  </el-tag>
                </div> -->
                <el-input type="text"/>
              </div>
            </div>
            <!-- <el-input
              ref="reference"
              v-model="selectedLabel"
              type="text"
              :placeholder="currentPlaceholder"
              :name="name"
              :id="id"
              :autocomplete="autoComplete || autocomplete"
              :size="selectSize"
              :disabled="selectDisabled"
              :readonly="readonly"
              :validate-event="false"
              :class="{ 'is-focus': visible }"
              @focus="handleFocus"
              @blur="handleBlur"
              @keyup.native="debouncedOnInputChange"
              @keydown.native.down.stop.prevent="navigateOptions('next')"
              @keydown.native.up.stop.prevent="navigateOptions('prev')"
              @keydown.native.enter.prevent="selectOption"
              @keydown.native.esc.stop.prevent="visible = false"
              @keydown.native.tab="visible = false"
              @paste.native="debouncedOnInputChange"
              @mouseenter.native="inputHovering = true"
              @mouseleave.native="inputHovering = false">
              <template slot="prefix" v-if="$slots.prefix">
                <slot name="prefix"></slot>
              </template>
              <template slot="suffix">
                <i v-show="!showClose" :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"></i>
                <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close" @click="handleClearClick"></i>
              </template>
            </el-input> -->
          </template>
        </v-form>
      </template>
    </v-page>
  </div>
</template>

<script>
// import { fetchDictByDictName } from '@/api/cms/dict'
import { columnList, deleteColumn } from '@/api/cms/columnManage'
import Pagination from '@/common/Pagination'
import mixins from '@/components/cms/mixins'
import columnTree from './columnTree'
export default {
  name: 'ColumnManage',
  components: {
    Pagination,
    columnTree
  },
  mixins: [mixins],
  data() {
    return {
      arrowExtend: false,
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      searchSettings: [{
        label: '栏目名称',
        name: 'channelName',
        placeholder: '请输入栏目名称',
        visible: true,
        options: [],
        type: 'cascader'
      }, {
        label: '状态',
        name: 'hiddenFlag',
        placeholder: '请选择',
        visible: true,
        type: 'select',
        options: [
          {
            label: '显示',
            value: 0          
          },
          {
            label: '隐藏',
            value: 1          
          }
        ]
      }],
      searchData: {},
      // 新增
      title: '审核设置',
      handelCheck: false,
      formSettings: [
        {
          items: [
            {
              label: '配置名称：',
              name: 'settingName',
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
              label: '选择栏目',
              name: 'chooseColumnTest',
              type: 'slot',
              valueType: 'string',
              placeholder: '',
            },
            {
              label: '开启文章多级审核',
              name: 'openCheck',
              type: 'switch',
              activeValue: '1',
              placeholder: '',
            },
            {
              label: '审核方式',
              name: 'checkType',
              type: 'text',
              valueType: 'string',
              placeholder: '',
            },
            {
              label: '审批人设置',
              name: 'checkType',
              type: 'text',
              valueType: 'string',
              placeholder: '',
            }
          ]
        }
      ],
      formData: {},
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      options1: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
             label: '设计原则',
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局'
                }
              ]
            }
          ]
        }
      ],
      value5: [],
      selectedOptions: [],
      treeData: [],
      tagList: []
    }
  },
  watch:{
    '$route'(val){
      console.log(val)
      this.columnList()
      this.columnSearchList()
    }
  },
  mounted() {
    this.columnList()
  },
  created() {
    this.columnSearchList()
  },
  methods: {
    inputFocus() {
      this.arrowExtend = true
    },
    inputBlur() {
      this.arrowExtend = false
    },
    closeTag(index, ele) {
      this.tagList.splice(index, 1)
      this.$refs.columnTree.$refs.tree.setCheckedNodes(this.tagList)
    },
    getChoosed(val) {
      console.log(val)
      this.tagList = val
    },
    // 返回
    goBack() {

    },
    addCheck() {
      this.title = "添加配置"
      this.handelCheck = true
      this.columnSearchList()
    },
    editCheck() {
     this.title = "编辑配置"
     this.handelCheck = true
     this.columnSearchList()
    },
    sizeChange(val) {
      this.pageSize = val
      this.columnList()
    },
    pageChange(val) {
      this.pageNum = val
      this.columnList()
    },
    submitSave() {
    },
    columnCounter(e) {
      // if(this.arrowExtend) {
      //   this.arrowExtend = false
      // } else {
      //   this.arrowExtend = true
      // }
    },
    channelNameChange(val) {
      let arr = []
      if(val) {
        arr = val.split(',').concat([''])
      } else {
        arr = []
      }
      return arr
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
      if(this.searchData.channelName && this.searchData.channelName.length) {
        this.searchData.channelName = this.searchData.channelName[this.searchData.channelName.length - 1]
      } else {
        this.searchData.channelName = ''
      }
      this.pageNum = 1
      this.columnList()
    },
    columnList() {
      var _this = this
      return new Promise((resolve, reject) => {
        columnList(_this.searchData, _this.pageNum, _this.pageSize)
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
      var _this = this
      return new Promise((resolve, reject) => {
        deleteColumn({ channelId: row.channelId })
          .then((response) => {
            _this.columnList()
            console.log(321)
            if (response.data.code === 0) {
              _this.$message.success('操作成功！')
            } else {
              _this.$message.success(response.data.msg)
            }
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
    columnAddEdit(handelType, type, channelId) {
      this.$router.push({
        path: '/cms/website/columnHandel',
        query: {
          isAdd: handelType,
          isFather: type === 'father',
          channelId: channelId
        }
      })
    },
    columnTemplate(row) {
      this.$router.push({
        path: '/cms/website/columnTemplate',
        query: {
          channelId: row.channelId,
          parentChannelId: row.parentChannelId
        }
      })
    },
    extendsWord(row) {
      this.$router.push({
        path: '/cms/website/extendsWord',
        query: {
          channelId: row.channelId
        }
      })
    },
    tagSetting(row) {
      this.$router.push({
        path: '/cms/website/tagSetting',
        query: {
          channelId: row.channelId
        }
      })
    },
    waterSetting(row) {
      this.$router.push({
        path: '/cms/website/waterSetting',
        query: {
          channelId: row.channelId
        }
      })
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
    },
    columnSearchList() {
      return new Promise((resolve, reject) => {
        columnList({}, 1, 1000)
          .then((response) => {
            // this.$nextTick(() => {
            //   // _this.searchSettings[0].options = _this.toTree(response.data.result.content)
            // })
            this.treeData = this.toTree(response.data.result.content)
            console.log( this.treeData )
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    isArrowExtend() {
      if(this.arrowExtend) {
        this.arrowExtend = false
      } else {
        this.arrowExtend = true
      }
      console.log(this.arrowExtend)
    }
  }
}
</script>

<style lang='scss'>
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
    // top: 20px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
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
      line-height: 40px;
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
          line-height: 40px;
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
  .define-select {
    min-height: 32px;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    line-height: 32px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    // cursor: pointer;
    position: relative;
    .define-right {
      position: absolute;
      cursor: pointer;
      right:5px;
      width: 25px;
      height: 100%;
      color: #c0c4cc;
      font-weight: 400;
      text-align: center;
      transition: transform .3s,-webkit-transform .3s;
      .el-icon-arrow-down {
        font-size: 14px;
        // transform: rotateZ(180deg);
        transform: rotateZ(0);
        transition: transform .3s,-webkit-transform .3s;
        // transform: rotateZ(0);
      }
      .el-up {
        font-size: 14px;
        transform: rotateZ(180deg);
      
        transition: transform .3s,-webkit-transform .3s;
      }
    }
    .tag-list{
      margin-right: 5px;
    }
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
  }
}
</style>
