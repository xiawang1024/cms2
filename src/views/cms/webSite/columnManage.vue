<template>
  <div class="column-manage">
    <div class="el-card__header">
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div>
    <div class="tool-bar">
      <el-button type="primary" v-if="checkAuth('cms:channel:add')" @click="columnAddEdit(true, {})" size="mini">添加</el-button>
    </div>
    <el-table :data="tableData" highlight-current-row style="width: 100%">
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
    />
    <v-page :visible.sync="showTemplate" >
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
    </v-page>
  </div>
</template>

<script>
// import { fetchDictByDictName } from '@/api/cms/dict'
import { columnList, deleteColumn } from '@/api/cms/columnManage'
import mixins from '@/components/cms/mixins'
import store from 'store'
import { mapGetters } from 'vuex'
import columnTemplate from './columnTemplate'
import extendsWord from './extendsWord'
import tagSetting from './tagSetting'
import waterSetting from './waterSetting'
import columnHandel from './columnHandel'
export default {
  name: 'ColumnManage',
  components: {
    columnTemplate,
    extendsWord,
    tagSetting,
    waterSetting,
    columnHandel
  },
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 100,
      totalCount: 0,
      searchSettings: [{
        label: '栏目名称',
        name: 'channelId',
        placeholder: '请输入栏目名称',
        visible: true,
        options: [],
        type: 'cascader',
        changeOnSelect: true
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
      // 栏目模板页面是否显示
      showTemplate: false,
      showExtends: false,
      showTag: false,
      showWater: false,
      showHandel: false,
      title: '栏目模板',
      columnRow: {}
    }
  },
  computed: {
    ...mapGetters(['columnAll'])
  },
  watch:{
    columnAll(val) {
      this.searchSettings[0].options = val
    }
  },
  mounted() {
    this.columnList()
    this.searchSettings[0].options= this.columnAll.length ? this.columnAll : store.get('columnsAll')
  },
  created() {
    // this.columnSearchList()
  },
  methods: {
    columnSearchList() {
      var _this = this
      return new Promise((resolve, reject) => {
        columnList({}, 1, 1000)
          .then((response) => {
            this.$nextTick(() => {
              _this.searchSettings[0].options = _this.toTree(response.data.result.content)
            })
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
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
      if(this.searchData.channelId && this.searchData.channelId.length) {
        this.searchData.channelId = this.searchData.channelId[this.searchData.channelId.length - 1]
      } else {
        this.searchData.channelId = ''
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
            console.log(" _this.tableData _this.tableData")
            console.log(_this.tableData )
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
            this.$store.dispatch('GetColumnAll')
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
    columnAddEdit(handelType, row) {
      this.showHandel = true
      this.columnRow = row
      this.title = '栏目管理'
      // this.$router.push({
      //   path: '/cms/website/columnHandel',
      //   query: {
      //     isAdd: handelType,
      //     isFather: type === 'father',
      //     channelId: channelId
      //   }
      // })
      this.columnRow.isAdd = handelType
      // this.columnRow.isFather = type === 'father'
    },
    columnTemplate(row) {
      this.showTemplate = true
      this.columnRow = row
      this.title = '栏目模板'
      // this.$router.push({
      //   path: '/cms/website/columnTemplate',
      //   query: {
      //     channelId: row.channelId,
      //     parentChannelId: row.parentChannelId
      //   }
      // })
    },
    extendsWord(row) {
      this.showExtends = true
      this.columnRow = row
      this.title = '扩展字段'
      // this.$router.push({
      //   path: '/cms/website/extendsWord',
      //   query: {
      //     channelId: row.channelId
      //   }
      // })
    },
    tagSetting(row) {
      this.showTag = true
      this.columnRow = row
      this.title = '标签设置'
      // this.$router.push({
      //   path: '/cms/website/tagSetting',
      //   query: {
      //     channelId: row.channelId
      //   }
      // })
    },
    waterSetting(row) {
      this.showWater = true
      this.columnRow = row
      this.title = '水印设置'
      // this.$router.push({
      //   path: '/cms/website/waterSetting',
      //   query: {
      //     channelId: row.channelId
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
    },
    // 页面返回
    goBack() {
      this.columnList()
      console.log(1233)
    },
    closePage() {
      this.showHandel = false
      this.columnList()
    }
  }
}
</script>

<style lang='scss'>
.column-manage {
  padding-left:20px;
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
}
</style>
