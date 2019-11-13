<template>
  <div class="data-permission">
    <div class="v-search-header">
      <v-search :search-settings="searchSettings" @search="search" />
    </div>
    <!-- <div class="top-bar">
      <el-button
        type="primary"
        size="mini"
        :disabled="!multipleSelection.length"
        @click="togetherHandel('column')"
      >批量权限设置</el-button>
    </div>-->
    <el-table
      :data="tableData"
      style="width: 100%"
      highlight-current-row
      ref="multipleTable"
      @selection-change="handleSelectionChange"
    >
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column prop="userCode" label="用户编码" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="enableFlag" label="用户状态">
        <template slot-scope="scope">
          <span v-if="scope.row.enableFlag == 1">启用</span>
          <span v-else>禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleAlter(scope.row)">用户标签设置</el-button>
          <!-- <el-button size="mini" type="success" @click="handleSource(scope.row)">来源权限</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="total" @sizeChange="sizeChange" @pageChange="pageChange" />
    <access-dialog
      :dialog-visible.sync="showAccess"
      :tree-data="treeData"
      :user-infor="userInfor"
      :multiple-selection="multipleSelection"
      @handelSuccess="handelSuccess"
    />
  </div>
</template>
<script>
import accessDialog from "./accessDiolog";
import { UserList } from "@/api/user/user";
import { getDataPermission } from "@/api/cms/dataPermission";
import Pagination from "@/common/Pagination";
import mixins from "@/components/cms/mixins";
export default {
  name: "PermissionGroup",
  components: {
    accessDialog,
    Pagination
  },
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      showAccess: false,
      page: 1,
      pageSize: 10,
      searchSettings: [
        {
          label: "姓名",
          name: "userName",
          placeholder: "请输入姓名",
          visible: true,
          type: "text"
        }
      ],
      searchData: {
        userName: ""
      },
      total: 0,
      treeData: [],
      userInfor: {},
      //多选
      multipleSelection: []
    };
  },
  mounted() {
    this.getUserList();
    this.getPermissionList();
  },
  methods: {
    // 批量处理
    togetherHandel(type) {
      if (type == "column") {
        this.handleAlter({});
      } else {
        // this.handleSource({});
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    sizeChange(val) {
      this.pageSize = val;
      this.getUserList();
    },
    pageChange(val) {
      this.page = val;
      this.getUserList();
    },
    handelSuccess() {
      this.getUserList();
    },
    search(data) {
      this.searchData = data;
      this.page = 1;
      this.getUserList();
    },
    change(row) {
      console.log(row.id);
    },
    handleAlter(row) {
      this.showAccess = true;
      this.userInfor = row;
    },
    getUserList() {
      return new Promise((resolve, reject) => {
        UserList(this.searchData, this.page, this.pageSize)
          .then(async res => {
            this.total = res.data.result.total;
            this.tableData = res.data.result.content;
            // 结束
            resolve();
          })
          .catch(err => {
            console.log("err: ", err);
            reject(err);
          });
      });
    },
    getPermissionList() {
      return new Promise((resolve, reject) => {
        getDataPermission()
          .then(response => {
            // this.$nextTick(() => {
            //   // _this.searchSettings[0].options = _this.toTree(response.data.result.content)
            // })
            // this.treeData = this.toTree(response.data.result.content);
            response.data.result.forEach(ele => {
              ele.label = ele.display;
              ele.id = ele.value;
            });
            this.treeData = response.data.result;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
</script>

<style lang="scss">
.data-permission {
  .top-bar {
    margin-top: 10px;
  }
}
</style>
