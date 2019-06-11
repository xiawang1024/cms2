<template>
  <div class="helpdoc-container">
    <div class="tool-bar">
      <div class="leftAside">
        <el-button size="mini" type="primary" @click.stop="seeUser">查看用户</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="addUser"
          :disabled="result.length=='0'?true:false"
        >添加用户</el-button>
      </div>

      <el-input
        class="searchinput"
        size="mini"
        style="width:180px;"
        v-model="searchAttributeById"
        placeholder="请输入查询姓名"
        prefix-icon="el-icon-search"
        clearable
        @keyup.enter.native="search"
        @change="search"
      />
      <div class="rightAside">
        <el-button size="mini" type="primary" @click="handleSearch" icon="el-icon-search">查询</el-button>
        <el-button size="mini" type="primary" @click="handleReset">重置</el-button>
      </div>
    </div>

    <div class="components-container">
      <split-pane
        :min-percent="10"
        :max-percent="30"
        :default-percent="12"
        class="pane-wrap"
        split="vertical"
        @resize="resize"
      >
        <template slot="paneL">
          <div class="left-container">
            <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%;">
              <el-tree
                ref="tree"
                :data="treeData"
                show-checkbox
                node-key="id"
                :default-checked-keys="defaultCheck"
                :check-on-click-node="true"
                :props="defaultProps"
                @check="addColumn"
                check-strictly
              />
            </el-scrollbar>
          </div>
        </template>
        <template slot="paneR">
          <div class="right-container">
            <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%;">
              <el-table :data="userList" style="width: 100%" size="small" highlight-current-row>
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
                    <el-button size="mini" type="primary" @click.stop="deletUserRight(scope.$index, scope.row)">删除权限</el-button>
                    <el-button
                      size="mini"
                      type="success"
                      @click="handleSource(scope.$index, scope.row)"
                    >来源权限</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                class="fenyeDiv"
                :current-page="pageNo"
                :page-sizes="[10,30,60,100]"
                :page-size="pageSize"
                :total="userTotal"
                background
                layout="total, sizes, prev, pager, next, jumper"
                style="float: right"
                @size-change="sizeChange"
                @current-change="pageChange"
              />
            </el-scrollbar>
          </div>
        </template>
      </split-pane>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="批量添加">
      <el-form>
        <el-form-item label="选择用户（支持输入用户名查询）">
          <el-select v-model="selectUser" multiple filterable placeholder="请选用户" size="mini">
            <el-option
              v-for="item in fullUserList"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId"
            />
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="submitSave">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="查看当前栏目用户" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" max-height="400"
      >
        <el-table-column prop="userName" label="姓名" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              class="rightAside"
              size="mini"
              type="danger"
              @click.stop="cleanLimite(scope.$index, scope.row)"
            >删除权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from "@/common/Pagination";
import splitPane from "vue-splitpane";
import { columnListAny } from "@/api/cms/columnManage";
import mixins from "@/components/cms/mixins";
import { UserList } from "@/api/user/user";
import { saveAudit, deleteLimite, seeUser } from "@/api/cms/reviewComment";

export default {
  name: "AssignAuditAuthority",
  components: { splitPane, Pagination },
  mixins: [mixins],
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      defaultCheck: [],
      userTotal: 0,
      pageNo: 1,
      pageSize: 15,
      searchData: { userName: "" },
      userList: [],
      searchFlag: false,
      searchAttributeById: "",
      dialogVisible: false,
      dialogTableVisible:false,
      fullUserList: [],
      selectUser: [],
      columnList: [],
      result: [],
      gridData: []
    };
  },
  mounted() {
    this.columnSearchList();
    this.getUserList();
    this.getFullUserList();
  },
  methods: {
    //获取栏目树
    columnSearchList() {
      var _this = this;
      return new Promise((resolve, reject) => {
        columnListAny({}, 1, 1000)
          .then(response => {
            _this.columnList = response.data.result.content;
            _this.treeData = _this.toTree(response.data.result.content);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //选择栏目树
    addUser(val) {
      this.dialogVisible = true;
      let result = this.$refs.tree.getCheckedNodes().map(ele => {
        return ele.channelId;
      });

      console.log(result, "xuanzhongde Tree");
    },
    addColumn(val) {
      console.log(val, "val");
      this.result = this.$refs.tree.getCheckedNodes().map(ele => {
        return ele.channelId;
      });
    },
    resize() {},
    //获取用户
    getUserList() {
      return new Promise((resolve, reject) => {
        UserList(this.searchData, this.pageNo, this.pageSize)
          .then(async res => {
            this.userTotal = res.data.result.total;
            this.userList = res.data.result.content;
            // 结束
            resolve();
          })
          .catch(err => {
            console.log("err: ", err);
            reject(err);
          });
      });
    },
    getFullUserList() {
      return new Promise((resolve, reject) => {
        UserList(this.searchData, 1, 100000)
          .then(async res => {
            this.fullUserList = res.data.result.content;

            // 结束
            resolve();
          })
          .catch(err => {
            console.log("err: ", err);
            reject(err);
          });
      });
    },
    //分页
    sizeChange(val) {
      this.pageSize = val;
      this.getUserList();
    },
    pageChange(val) {
      this.pageNo = val;
      this.getUserList();
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageNo = 1;
      this.pageSize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pageNo = val;
      this.getUserList();
    },
    //条件查询
    handleSearch() {
      // var _this = this;
      //条件查询接口
      // if (1) {
      //   _this.searchFlag = true;
      // }
    },
    //重置
    handleReset() {
      //接口
      this.searchFlag = false;
      this.$refs.tree.setCheckedKeys([]);
      this.result = [];
      this.selectUser = [];
      this.defaultCheck = [];
    },
    //账号搜索
    search() {
      //接口
    },
    seeUser() {
      if (this.result.length==0) {
        this.$message({
          type: "error",
          message: "请选择查看的栏目"
        });
        return false;
      } else if (this.result.length > 1) {
        this.$message({
          type: "error",
          message: "请选择一个栏目进行查看"
        });
        return false;
      } else {
         this.userDetaiRequest(this.result[0]);
        this.dialogTableVisible=true;
       
      }
    },

    userDetaiRequest(userId) {
      // var _this = this;
      return new Promise((resolve, reject) => {
        seeUser(userId)
          .then(response => {
            if (response.data.code == 0) {
              this.gridData = response.data.result;
              console.log(this.gridData, "tankaun");
            } else {
              this.$message({
                type: "error",
                message: response.data.msg
              });
            }

            resolve();
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    submitSave() {
      let content = [];
      this.result = this.$refs.tree.getCheckedNodes().map(ele => {
        return ele.channelId;
      });

      this.result.forEach(element => {
        this.columnList.forEach(item => {
          if (element === item.channelId) {
            content.push(item);
          }
        });
      });
      let userInfo = [];
      this.selectUser.forEach(element => {
        this.fullUserList.forEach(item => {
          if (element === item.userId) {
            userInfo.push({
              userId: element,
              createUser: item.createUser,
              userName: item.userName
            });
          }
        });
      });
      let data = {
        userName: JSON.parse(localStorage.getItem("BaseInfor")).userName,
        userInfo,
        content
      };
      console.log(data);
      var _this = this;
      return new Promise((resolve, reject) => {
        saveAudit(data)
          .then(response => {
            if (response.data.code == "0") {
              this.$message({
                type: "success",
                message: response.data.msg
              });

              _this.getUserList();
              _this.handleReset();
            } else {
              this.$message({
                type: "error",
                message: response.data.msg
              });
            }
            _this.dialogVisible = false;
            resolve();
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    deletUserRight(index,row){
      this.getUserUCID(row.userId)
    },
    //根据用户id查询ucid
    getUserUCID(userId) {

    },

    cleanLimite(index, row) {
      var _this = this;
      return new Promise((resolve, reject) => {
        deleteLimite(row.ucId)
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              _this.seeUser();
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
            resolve();
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    }
  }
};
</script>
<style scoped>
.helpdoc-container {
  margin: 30px;
}
.rightAside {
  float: right;
}
.leftAside {
  float: left;
}
.tool-bar {
  text-align: right;
  overflow: hidden;
}
.components-container {
  position: relative;
  height: calc(100vh - 124px);
  margin: 12px 10px;
}
.pane-wrap {
  margin-top: 12px;
}
.splitter-pane-resizer {
  background: #ccc !important;
}
.left-container {
  /* background-color: #f38181; */
  height: 100%;
  /* overflow: hidden; */
}

.right-container {
  height: 100%;
  padding-left: 10px;
}
.el-select {
  display: inline-block;
  position: relative;
  width: 100%;
}
</style>
