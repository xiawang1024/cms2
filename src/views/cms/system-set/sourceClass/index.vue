<template>
  <div class="source-class">
    <!-- <div class="el-card__header">
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div> -->
    <div class="tool-bar">
      <el-button type="primary" @click="handelSource" size="mini">添加</el-button>
    </div>
    <div class="tree-column title-bottom">
      <div class="column-name pl-24">栏目名称</div>
      <div class="column-code pl-24">栏目编码</div>
      <!-- <el-button type="text">栏目模板</el-button>
        <el-button type="text">扩展字段</el-button> -->
      <div class="column-show pl-24">状态 </div>
      <div class="column-seqNo pl-24">排序</div>
      <div class="column-isRoot pl-24">是否根节点</div>
      <div class="column-set pl-24">设置</div>
      <div class="column-handel pl-24">操作</div>
    </div>
    <!-- <el-tree
      ref="websitTree"
      :data="treeData"
      :props="defaultProps"
      :highlight-current="true"
      :check-on-click-node="true"
      node-key="id"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <div class="tree-column">
          <div class="column-name">{{ node.label }}</div>
          <div class="column-code" :style="{ marginLeft: marginWidth(data.parentChannelIds) + 'px'}">{{ data.channelCode }} </div>
          <div class="column-show">{{ data.hiddenFlag }} </div>
          <div class="column-seqNo">{{ data.seqNo }}</div>
          <div class="column-isRoot">{{ data.parentChannelId ? '否' : '是' }}</div>
          <div class="column-set">
            <el-button type="text" size="small" @click="columnTemplate(data)">栏目模板</el-button>
            <el-button type="text" size="small">扩展字段</el-button>
            <el-button type="text" size="small">标签设置</el-button>
            <el-button type="text" size="small">水印设置</el-button>
          </div>
          <div class="column-handel">
            <el-button type="text" size="small" @click="columnAddEdit(false, data)">编辑</el-button>
            <el-button type="text" size="small" @click="columnDel(data)">删除</el-button>
            <el-button type="text" size="small" @click="columnAddEdit(true, data)">添加</el-button>
          </div>
        </div>
      </span>
    </el-tree> -->
    <!-- <el-table :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column prop="channelName" label="栏目名称" min-width="250" show-overflow-tooltip>
        <template slot-scope="scope">
          <div>
            <span v-for= "(group) in channelNameChange(scope.row.parentChannelNames)" :key="group" class="space-length"/>
            <span v-for= "(ele, index) in channelNameChange(scope.row.parentChannelNames)" :key="index" class="space-holder"/>
            <span>{{ scope.row.parentChannelNames }}</span>
            <span>{{ scope.row.channelName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="channelCode" label="栏目编码" min-width="100"/>
      <el-table-column prop="hiddenFlag" label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.hiddenFlag == 1">隐藏</span>
          <span v-else>显示</span>
        </template>
      </el-table-column>
      <el-table-column prop="seqNo" label="排序"/>
      <el-table-column prop="parentChannelId" label="是否根节点" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.parentChannelId == '-1'">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column label="设置" width="250">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="columnTemplate(scope.row)" v-if="checkAuth('cms:channel:template')">栏目模板</el-button>
          <el-button type="text" size="small" @click="extendsWord(scope.row)" v-if="checkAuth('cms:channel:extendsWord')">扩展字段</el-button>
          <el-button type="text" size="small" @click="tagSetting(scope.row)" v-if="checkAuth('cms:channel:tagSetting')">标签设置</el-button>
          <el-button type="text" size="small" @click="waterSetting(scope.row)" v-if="checkAuth('cms:channel:waterSetting')">水印设置</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" v-if="checkAuth('cms:channel:edit')" @click="columnAddEdit(false, scope.row)">编辑</el-button>
          <el-button type="text" size="small" v-if="checkAuth('cms:channel:delete')" @click="columnDel(scope.row)" >删除</el-button>
          <el-button type="text" size="small" @click="columnAddEdit(true, scope.row)" v-if="checkAuth('cms:channel:add')">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageNum"
      :page-sizes="[100]"
      :page-size="pageSize"
      :total="totalCount"
      background
      class="pagination"
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    /> -->
    <!-- <v-page :visible.sync="showTemplate" >
      <h3 slot="title">{{ title }}</h3>
      <template slot="content">
        <column-template :column-row="columnRow"/>
      </template>
    </v-page>
    <v-page :visible.sync="showExtends">
      <h3 slot="title">{{ title }}</h3>
      <template slot="content">
        <extends-word :column-row="columnRow"/>
      </template>
    </v-page>
    <v-page :visible.sync="showTag">
      <h3 slot="title">{{ title }}</h3>
      <template slot="content">
        <tag-setting :column-row="columnRow"/>
      </template>
    </v-page>
    <v-page :visible.sync="showWater">
      <h3 slot="title">{{ title }}</h3>
      <template slot="content">
        <water-setting :column-row="columnRow"/>
      </template>
    </v-page>
    <v-page :visible.sync="showHandel" @goBack="goBack">
      <h3 slot="title">{{ title }}</h3>
      <template slot="content">
        <column-handel :column-row="columnRow" @closePage="closePage"/>
      </template>
    </v-page> -->
    <handel-dialog :dialog-visible.sync="dialogVisible" :title="title"/>
  </div>
</template>

<script>
// import { fetchDictByDictName } from '@/api/cms/dict'
// import { columnList, deleteColumn } from '@/api/cms/columnManage'
import mixins from '@/components/cms/mixins'
// import store from 'store'
import { mapGetters } from 'vuex'
// import columnTemplate from './columnTemplate'
// import extendsWord from './extendsWord'
// import tagSetting from './tagSetting'
// import waterSetting from './waterSetting'
// import columnHandel from './columnHandel'
import handelDialog from './handelDialog'
export default {
  name: 'ColumnManage',
  components: {
    // columnTemplate,
    // extendsWord,
    // tagSetting,
    // waterSetting,
    // columnHandel
    handelDialog
  },
  mixins: [mixins],
  data() {
    return {
      dialogVisible: false,
      title: '添加'
      // tableData: [],
      // pageNum: 1,
      // pageSize: 100,
      // totalCount: 0,
      // searchSettings: [{
      //   label: '栏目名称',
      //   name: 'channelId',
      //   placeholder: '请输入栏目名称',
      //   visible: true,
      //   options: [],
      //   type: 'cascader',
      //   changeOnSelect: true
      // }, {
      //   label: '状态',
      //   name: 'hiddenFlag',
      //   placeholder: '请选择',
      //   visible: true,
      //   type: 'select',
      //   options: [
      //     {
      //       label: '显示',
      //       value: 0          
      //     },
      //     {
      //       label: '隐藏',
      //       value: 1          
      //     }
      //   ]
      // }],
      // searchData: {},
      // // 栏目模板页面是否显示
      // showTemplate: false,
      // showExtends: false,
      // showTag: false,
      // showWater: false,
      // showHandel: false,
      // title: '栏目模板',
      // columnRow: {},
      // treeData: [],
      // defaultProps: {
      //   children: 'children',
      //   label: 'label'
      // }
    }
  },
  computed: {
    ...mapGetters(['columnAll'])
  },
  watch:{
    // columnAll(val) {
    //   this.searchSettings[0].options = val
    // }
  },
  mounted() {
    // this.columnList()
    // this.searchSettings[0].options= this.columnAll.length ? this.columnAll : store.get('columnsAll')
  },
  created() {
    // this.columnSearchList()
  },
  methods: {
    // 节点操作
    handelSource() {
      this.dialogVisible = true
      this.title = '添加'
    },
    // marginWidth(parentId) {
    //   if(parentId) {
    //     return parentId.split(',').length * 18*(-1)
    //   } else {
    //     return 0
    //   }
    // },
    // append(data) {
    //   console.log(data)
    // },
    // remove(data) {
    //   console.log(data)
    // },
    // toTree (data) {
    //   // 删除 所有 children,以防止多次调用
    //   data.forEach(function(item) {
    //     delete item.children
    //   })
    //   // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    //   var map = {}
    //   data.forEach(function(item) {
    //     map[item.channelId] = item
    //   })
    //   var val = []
    //   data.forEach(function(item) {
    //     item.label = item.channelName
    //     item.id = item.channelId
    //     item.value = item.channelId
    //     // 以当前遍历项，的pid,去map对象中找到索引的id
    //     var parent = map[item.parentChannelId]
    //     // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    //     if (parent) {
    //       // item.label = item[channelName]
    //       (parent.children || (parent.children = [])).push(item)
    //     } else {
    //       // item.label = item[channelName]
    //       val.push(item)
    //     }
    //   })
    //   return val
    // },
    // // columnSearchList() {
    // //   var _this = this
    // //   return new Promise((resolve, reject) => {
    // //     columnList({}, 1, 1000)
    // //       .then((response) => {
    // //         this.$nextTick(() => {
    // //           _this.searchSettings[0].options = _this.toTree(response.data.result.content)
    // //         })
    // //         resolve()
    // //       })
    // //       .catch((error) => {
    // //         reject(error)
    // //       })
    // //   })
    // // },
    // channelNameChange(val) {
    //   let arr = []
    //   if(val) {
    //     arr = val.split(',').concat([''])
    //   } else {
    //     arr = []
    //   }
    //   return arr
    // },
    // checkAuth (authKey) {
    //   if (this.$store.getters.authorities.indexOf(authKey) === -1) {
    //     return false
    //   } else {
    //     return true
    //   }
    // },
    searchItem(searchData) {
      // this.searchData = searchData
      // if(this.searchData.channelId && this.searchData.channelId.length) {
      //   this.searchData.channelId = this.searchData.channelId[this.searchData.channelId.length - 1]
      // } else {
      //   this.searchData.channelId = ''
      // }
      // this.pageNum = 1
      // this.columnList()
    },
    // columnList() {
    //   var _this = this
    //   return new Promise((resolve, reject) => {
    //     columnList(_this.searchData, 1, 1000)
    //       .then((response) => {
    //         _this.tableData = response.data.result.content
    //         _this.totalCount = response.data.result.total

    //         this.treeData = this.toTree(response.data.result.content)
    //         console.log(this.treeData, 'this.treeData')
    //         resolve()
    //       })
    //       .catch((error) => {
    //         reject(error)
    //       })
    //   })
    // },
    // columnDelFeatch(row) {
    //   var _this = this
    //   return new Promise((resolve, reject) => {
    //     deleteColumn({ channelId: row.channelId })
    //       .then((response) => {
    //         _this.columnList()
    //         this.$store.dispatch('GetColumnAll')
    //         if (response.data.code === 0) {
    //           _this.$message.success('操作成功！')
    //         } else {
    //           _this.$message.success(response.data.msg)
    //         }
    //         resolve()
    //       })
    //       .catch((error) => {
    //         reject(error)
    //       })
    //   })
    // },
    // handleSizeChange(val) {
    //   this.pageSize = val
    //   this.columnList()
    // },
    // handleCurrentChange(val) {
    //   this.pageNum = val
    //   this.columnList()
    // },
    // columnAddEdit(handelType, row) {
    //   this.showHandel = true
    //   this.columnRow = row
    //   this.title = '栏目管理'
    //   // this.$router.push({
    //   //   path: '/cms/website/columnHandel',
    //   //   query: {
    //   //     isAdd: handelType,
    //   //     isFather: type === 'father',
    //   //     channelId: channelId
    //   //   }
    //   // })
    //   this.columnRow.isAdd = handelType
    //   // this.columnRow.isFather = type === 'father'
    // },
    // columnTemplate(row) {
    //   this.showTemplate = true
    //   this.columnRow = row
    //   this.title = '栏目模板'
    //   // this.$router.push({
    //   //   path: '/cms/website/columnTemplate',
    //   //   query: {
    //   //     channelId: row.channelId,
    //   //     parentChannelId: row.parentChannelId
    //   //   }
    //   // })
    // },
    // extendsWord(row) {
    //   this.showExtends = true
    //   this.columnRow = row
    //   this.title = '扩展字段'
    //   // this.$router.push({
    //   //   path: '/cms/website/extendsWord',
    //   //   query: {
    //   //     channelId: row.channelId
    //   //   }
    //   // })
    // },
    // tagSetting(row) {
    //   this.showTag = true
    //   this.columnRow = row
    //   this.title = '标签设置'
    //   // this.$router.push({
    //   //   path: '/cms/website/tagSetting',
    //   //   query: {
    //   //     channelId: row.channelId
    //   //   }
    //   // })
    // },
    // waterSetting(row) {
    //   this.showWater = true
    //   this.columnRow = row
    //   this.title = '水印设置'
    //   // this.$router.push({
    //   //   path: '/cms/website/waterSetting',
    //   //   query: {
    //   //     channelId: row.channelId
    //   //   }
    //   // })
    // },
    // columnDel(row) {
    //   this.$confirm('此操作将永久删除该栏目, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.columnDelFeatch(row)
    //   }).catch(() => {
    //   })
    // },
    // // 页面返回
    // goBack() {
    //   this.columnList()
    //   console.log(1233)
    // },
    // closePage() {
    //   this.showHandel = false
    //   this.columnList()
    // }
  }
}
</script>

<style lang='scss'>
.source-class {
  padding-left:20px;
  .el-tree-node__content {
    height: 32px;
    border-bottom: 1px solid #ebeef5;
  }
  .tool-bar {
    margin-top:22px;
    margin-bottom:22px;
    text-align: left;
    padding-left:5px;
  }
  .pagination {
    margin-top:20px;
    margin-bottom:20px;
  }
  .el-table {
    // td, th{
    //   padding:0;
    // }
    .space-holder {
      width: 2px;
      height: 20px;
      background-color: #67C23A;
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
    .space-length{
      width: 10px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
    }
    // tr {
    //   td {
    //     padding:0px;
    //   }
    // }
  }
  .tree-column{
    display: flex;
    align-items: center;
    font-size: 14px;
    .column-name {
      min-width:300px;
    }
    .column-code{
      min-width:150px;
    }
    .column-show{
      min-width:50px;
    }
    .column-seqNo{
      min-width: 100px;
    }
    .column-isRoot{
      min-width: 100px;
    }
    .column-set{
      min-width: 250px;
    }
    .column-handel{
      min-width: 120px;
    }
    .pl-24 {
      padding-left: 23px;
      color: #909399;
      font-weight: 700;
    }
    // .el-tree{
    //   .el-tree-node__content{
    //     height: 32px !important;
    //   }
    // }
  }
  .title-bottom{
    border-bottom: 1px solid #ebeef5;
    height: 32px;
  }
}
</style>
