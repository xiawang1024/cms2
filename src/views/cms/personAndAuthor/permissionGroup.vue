<template>
  <div class="permissionGroup-container">
    <v-search :search-settings="searchSettings" @search="search"/>
    <el-table :data="tableData" style="width: 100%" size="small" highlight-current-row>
      <el-table-column prop="userCode" label="用户编码"/>
      <el-table-column prop="userName" label="用户名"/>
      <el-table-column prop="enableFlag" label="用户状态">
        <template slot-scope="scope">
          <span v-if="scope.row.enableFlag == 1">启用</span>
          <span v-else>禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleAlter(scope.$index, scope.row)">栏目权限</el-button>
          <el-button size="mini" type="success" @click="handleSource(scope.$index, scope.row)">来源权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" @sizeChange="sizeChange" @pageChange="pageChange"/>
    <access-dialog :dialog-visible.sync="showAccess" :tree-data="treeData" :user-infor="userInfor" @handelSuccess="handelSuccess"/>
    <source-dialog :dialog-visible.sync="showSource" :tree-data="sourceData" :user-infor="userInfor" @handelSuccess="handelSuccess"/>
  </div>
</template>
<script>
import accessDialog from './accessDiolog'
import sourceDialog from './sourceDialog'
import { UserList } from '@/api/user/user'
import { columnListAny } from '@/api/cms/columnManage'
import Pagination from '@/common/Pagination'
import mixins from '@/components/cms/mixins'
import { fetchDictAllByDictName } from "@/api/cms/dict";
export default
 {
  name: 'PermissionGroup',
  components: {
    accessDialog,
    Pagination,
    sourceDialog
  },
  mixins: [mixins],
  data() {
    return {
      tableData: [
      ],
      showAccess: false,
      showSource: false,
      page: 1,
      pageSize: 10,
      searchSettings: [
        {
          label: '姓名',
          name: 'userName',
          placeholder: '请输入姓名',
          visible: true,
          type: 'text'
        }
      ],
      searchData: {
        userName: ''
      },
      total: 0,
      treeData: [],
      userInfor: {},
      sourceData:[]
    }
  },
  mounted() {
    this.getUserList()
    this.columnSearchList()
    this.fetchDict()
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val
      this.getUserList()
    },
    pageChange(val) {
      this.page = val
      this.getUserList()
    },
    handelSuccess() {
      this.getUserList()
    },
    search(data) {
      this.searchData = data
      this.page = 1
      this.getUserList()
    },
    handleAdd() {
      this.$router.push({
        path: '/personAndAuthor/permissionGroupEdit',
        query: {
          isAdd: true
        }
      })
    },
    change(row) {
      console.log(row.id)
    },
    handleSource(index, row) {
      this.showSource = true
      this.userInfor = row
    },
    handleAlter(index, row) {
      this.showAccess = true
      this.userInfor = row
      // this.$router.push({
      //   path: '/personAndAuthor/permissionGroupEdit',
      //   query: {
      //     isAdd: false,
      //     permissionGroupId: row.id
      //   }
      // })
    },
    handleDelete(index, row) {},
    // 获取文稿来源
    fetchDict() {
      return new Promise((resolve, reject) => {
        fetchDictAllByDictName('文稿来源')
          .then(response => {
            // dictObj = response.data.result;
            // if (!_this.dictObj.details) {
            //   _this.dictObj.details = []
            // }
            // this.treeData  = [
            //   {
            //     id: 1,
            //     label: '一级 1',
            //   }
            // ]
            if(response.data.result.details && response.data.result.details.length) {
              this.sourceData = response.data.result.details.map((ele) => {
                return {
                  id: ele.dictDetailId,
                  label: ele.dictDetailName
                }
              })
            }
            resolve();
          })
          .catch(error => {
            reject(error)
          });
      });
    },
    getUserList () {
      return new Promise((resolve, reject) => {
        UserList(this.searchData, this.page, this.pageSize).then(async res => {
          this.total = res.data.result.total
          this.tableData = res.data.result.content
          // 结束
          resolve()
        })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },
    columnSearchList() {
      return new Promise((resolve, reject) => {
        columnListAny({}, 1, 1000)
          .then((response) => {
            // this.$nextTick(() => {
            //   // _this.searchSettings[0].options = _this.toTree(response.data.result.content)
            // })
            this.treeData = this.toTree(response.data.result.content)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  }
}
</script>

<style scoped>
.permissionGroup-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}
</style>
