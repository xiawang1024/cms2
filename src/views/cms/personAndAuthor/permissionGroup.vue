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
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleAlter(scope.$index, scope.row)">权限设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total"/>
    <access-dialog :dialog-visible.sync="showAccess" :tree-data="treeData" :user-infor="userInfor" @handelSuccess="handelSuccess"/>
  </div>
</template>
<script>
import accessDialog from './accessDiolog'
import { UserList } from '@/api/user/user'
import { columnList } from '@/api/cms/columnManage'
import Pagination from '@/common/Pagination'
import mixins from '@/components/cms/mixins'
export default
 {
  name: 'PermissionGroup',
  components: {
    accessDialog,
    Pagination
  },
  mixins: [mixins],
  data() {
    return {
      tableData: [
      ],
      showAccess: false,
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
      userInfor: {}
    }
  },
  mounted() {
    this.getUserList()
    this.columnSearchList()
  },
  methods: {
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
