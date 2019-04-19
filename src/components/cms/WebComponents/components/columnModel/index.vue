<template>
  <div class="column-template-manage">
    {{ choosedColumn }}
    <div class="el-card__header">
      <v-search :search-settings="searchSettings" @search="searchItem" ref="vSearch"/>
    </div>
    <div class="tool-bar">
      <el-button type="primary" v-if="checkAuth('cms:channel:add')" @click="columnAddEdit(true, 'father')" size="small">添加</el-button>
    </div>
    <el-table :data="tableData" style="width:100%" size="small">
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
  </div>
</template>

<script>
// import { fetchDictByDictName } from '@/api/cms/dict'
import { fetchList } from "@/api/cms/template";
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
      searchData: {}
    }
  },
  computed: {
    ...mapGetters(['columnAll', 'treeTags', 'contextMenu', 'choosedColumn'])
  },
  watch:{
    columnAll(val) {
      this.searchSettings[0].options = val
    }
  },
  mounted() {
    this.columnList()
    this.searchSettings[0].options= this.columnAll.length ? this.columnAll : store.get('columnsAll')
    // this.$refs.vSearch.setItemData('channelId', ['1083184060169326592'])
  },
  created() {
    // this.columnSearchList()
  },
  methods: {
    // columnSearchList() {
    //   var _this = this
    //   return new Promise((resolve, reject) => {
    //     columnList({}, 1, 1000)
    //       .then((response) => {
    //         this.$nextTick(() => {
    //           _this.searchSettings[0].options = _this.toTree(response.data.result.content)
    //         })
    //         resolve()
    //       })
    //       .catch((error) => {
    //         reject(error)
    //       })
    //   })
    // },
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
        fetchList(_this.searchData, _this.pageNum, _this.pageSize)
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
  // .el-table {
  //   // td, th{
  //   //   padding:0;
  //   // }
  //   .space-holder {
  //     width: 2px;
  //     height: 20px;
  //     background-color: #67C23A;
  //     display: inline-block;
  //     vertical-align: middle;
  //     margin-right: 5px;
  //   }
  //   .space-length{
  //     width: 10px;
  //     height: 20px;
  //     display: inline-block;
  //     vertical-align: middle;
  //   }
  //   tr {
  //     td {
  //       padding:0px;
  //     }
  //   }
  // }
}
</style>
