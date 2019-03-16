<template>
  <div class="plus-publish">
    <div class="el-card__header">
      <v-search :search-settings="searchSettings" @search="searchItem" label-width="120px"/>
    </div>
    <el-table :data="tableData" style="width: 100%">
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
      <el-table-column prop="channelCode" label="栏目编码" min-width="80"/>
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
      <el-table-column label="设置" width="300">
        <template slot-scope="scope">
          <el-button type="text" @click="columnTemplate(scope.row)">栏目模板</el-button>
          <el-button type="text" @click="extendsWord(scope.row)">扩展字段</el-button>
          <el-button type="text" @click="tagSetting(scope.row)">标签设置</el-button>
          <el-button type="text" @click="waterSetting(scope.row)">水印设置</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="columnAddEdit(false, '', scope.row.channelId)">编辑</el-button>
          <el-button type="text" v-if="checkAuth('cms:channel:delete')" @click="columnDel(scope.row)">删除</el-button>
          <el-button type="text" @click="columnAddEdit(true, 'child', scope.row.channelId)">添加</el-button>
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
  </div>
</template>

<script>
// import { fetchDictByDictName } from '@/api/cms/dict'
import { columnList, deleteColumn } from '@/api/cms/columnManage'
import { TypeList, StatusList } from './mockData.js'
export default {
  name: 'PlusPublish',
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      searchSettings: [{
        label: '请输入',
        name: 'channelName',
        placeholder: '标题/发稿人/关键字',
        type: 'text',
        visible: true,
        },
        {
        label: '是否包含子栏目',
        name: 'channelName',
        placeholder: '请选择',
        type: 'select',
        visible: true,
        options: [
          {
            label: '是',
            value: true
          },
          {
            label: '否',
            value: false
          }
        ]
      }, {
        label: '类型',
        name: 'type',
        placeholder: '请选择',
        type: 'select',
        options: TypeList,
        visible: true
      }, {
        label: '状态',
        name: 'status',
        placeholder: '请选择',
        type: 'select',
        options: StatusList,
        visible: true
      }, {
        label: '日期范围',
        name: 'tiime',
        placeholder: '请选择',
        type: 'daterange',
        visible: true
      }],
      searchData: {}
    }
  },
  mounted() {
    this.columnList()
  },
  methods: {
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
    }
  }
}
</script>

<style lang='scss' scoped>
.plus-publish {
  margin:30px;
  .tool-bar {
    margin-top:22px;
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
    tr{
      td {
        padding:0px;
      }
    }
  }
}
</style>
