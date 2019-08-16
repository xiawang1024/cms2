<template>
  <div class="helpdoc-container">
    <div class="v-search-header">
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div>
    <div class="tool-bar">
      <div class="leftAside">
        <el-button size="mini" type="primary" :disabled="!selectList.length>0" @click="handlePass('index','row','many')">批量通过</el-button>
        <el-button size="mini" type="primary" :disabled="!selectList.length>0" @click="handleRefuse('index','row','many')">批量不通过</el-button>
        <el-button size="mini" type="primary" :disabled="!selectList.length>0" @click="handleManyDelete">批量删除</el-button>
      </div>
      <div class="rightAside">
        <el-dropdown size="mini" @command="handleCommand">
          <el-button type="primary" size="mini">
            {{ dropValue }}
            <i class="el-icon-arrow-down el-icon--right"/>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="showAll">显示全部</el-dropdown-item>
            <el-dropdown-item command="showTopColumn">显示置顶</el-dropdown-item>
            <el-dropdown-item command="showDeTopColumn">显示非置顶</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="block">
          <el-cascader
            change-on-select
            v-model="columnSelection"
            :options="options"
            @change="handleChange"
            clearable
            size="mini"
          />
        </div>
        <el-button size="mini" type="primary" v-show="true" @click="resetChoice">重置</el-button>
      </div>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="handleclick"
      row-key="id"
    >
      <el-table-column type="selection"/>

      <el-table-column type="index"/>

      <el-table-column prop="nickName" min-width="100" label="昵称" :formatter="nicName"/>

      <el-table-column prop="articleTitle" min-width="100" label="文章标题" show-overflow-tooltip/>
      <el-table-column prop="comment" min-width="500" label="评论内容" class-name="mytextstyle"/>
      <el-table-column prop="top" min-width="100" label="置顶状态">
        <template slot-scope="scope">
          <span v-show="scope.row.top" class="colorSuccess">已置顶</span>
          <span v-show="!scope.row.top" class="colorWarning">未置顶</span>
        </template>
      </el-table-column>
      <el-table-column prop="pass" min-width="100" label="审核状态">
        <template slot-scope="scope">
          <span v-show="scope.row.pass" class="colorSuccess">通过</span>
          <span v-show="!scope.row.pass" class="colorDanger">未通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="source" min-width="100" label="来源" :formatter="sourceStatus"/>
      <el-table-column prop="createTime" min-width="135" label="评论时间"/>
      <el-table-column width="280" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.pass==false"
            size="mini"
            type="primary"
            @click.stop="handlePass(scope.$index, scope.row)"
          >通过</el-button>
          <el-button
            v-else
            size="mini"
            type="primary"
            @click.stop="handleRefuse(scope.$index, scope.row)"
          >拒绝</el-button>
          <el-button
            v-if="scope.row.top==false"
            size="mini"
            type="primary"
            @click.stop="handleTop(scope.$index, scope.row)"
          >置顶</el-button>
          <el-button
            v-else
            size="mini"
            type="primary"
            @click.stop="handleTop(scope.$index, scope.row)"
          >取消</el-button>
          <el-button
            size="mini"
            type="danger"
            @click.stop="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="fenyeDiv"
      :current-page="pageNo"
      :page-sizes="[10,30,60,100]"
      :page-size="pageSize"
      :total="totalCount"
      background
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      @size-change="sizeChange"
      @current-change="pageChange"
    />
  </div>
</template>
<script>
import {
  getComment,
  checkBatch,
  deleteComment,
  toTop,
  getColumnList
} from "@/api/cms/reviewComment";
import { setInterval, clearInterval } from 'timers';
export default {
  name: "CheckComment",
  data() {
    return {
      tableData3: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: "",
      pageNo: 1,
      searchAttributeById: "",
      selectList: [],
      options: [],
      columnSelection: [],
      currentChannelId: "",
      reviewType: "default",
      topStatus: "default",
      dropValue: "显示全部",
      timerassign:null,
      // 搜索修改
      searchSettings: [{
        label: '显示方式',
        name: 'top',
        type: 'select',
        placeholder: '请选择',
        options: [
          {
            label: '置顶',
            value: true
          }, {
            label: '非置顶',
            value: false
          }
        ],
        visible: true
      }, {
        label: '栏目',
        name: 'channelId',
        type: 'cascader',
        placeholder: '请选择',
        options: [
        ],
        visible: true
      }],
      searchData: {
      },
    };
  },
  created() {
    //获取初始化数据
  },
  mounted() {
    this.$nextTick(() => {
      this.criticismList();
      this.clumnTree();
      //轮询数据
      this.timer();
    });
  },
  beforeDestroy(){
    clearInterval(this.timerassign);
    this.timerassign=null;
  },
  methods: {
    timer(){
      this.timerassign= setInterval(()=>{
          this.pageMethods();
      },10*1000)
    },
    handleTop(index, row) {
      if (row.top == true) {
        this.putTop({
          commentId: row.commentId,
          flag: false
        });
      } else {
        this.putTop({
          commentId: row.commentId,
          flag: true
        });
      }
    },
    putTop(data) {
      var _this = this;
      return new Promise((resolve, reject) => {
        toTop(data)
          .then(res => {
            if (res.data.code === 0) {
              _this.$message({
                type: "success",
                message: res.data.msg
              });
              _this.criticismList();
            } else {
              _this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    //批量删除
    handleManyDelete() {
      this.deleteRequest(this.selectList.toString());
    },
    handleDelete(index, row) {
      this.deleteRequest(row.commentId);
    },
    //删除请求
    deleteRequest(data) {
      var _this = this;
      return new Promise((resolve, reject) => {
        deleteComment(data)
          .then(res => {
            if (res.data.code === 0) {
              _this.$message({
                type: "success",
                message: res.data.msg
              });
              _this.criticismList();
            } else {
              _this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    handleSelectionChange(val) {
      this.clectIds(val);
    },
    //收集选中的评论id
    clectIds(val) {
      this.selectList = [];
      val.forEach((item, index) => {
        this.selectList.push(item.commentId);
      });
    },
    handleclick(val) {
    },
    handlePass(index, row, many) {
      let data = {};
      if (many == "many") {
        data = {
          flag: true,
          ids: this.selectList.toString()
        };
      } else {
        data = {
          flag: true,
          ids: row.commentId
        };
      }
      this.saveCheck(data);
    },
    handleRefuse(index, row, many) {
      let data = {};
      if (many == "many") {
        data = {
          flag: false,
          ids: this.selectList.toString()
        };
      } else {
        data = {
          flag: false,
          ids: row.commentId
        };
      }
      this.saveCheck(data);
    },

    saveCheck(data) {
      var _this = this;
      return new Promise((resolve, reject) => {
        checkBatch(data)
          .then(response => {
            if (response.data.code === 0) {
              this.$message({
                type: "success",
                message: response.data.msg
              });
              _this.criticismList();
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
    //初始化获取列表
    criticismList() {
      //获取评论列表

      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        userId: JSON.parse(localStorage.getItem("BaseInfor")).userId
      };
      this.requestCriticsmList(params);
    },
    requestCriticsmList(params) {
      var _this = this;
      return new Promise((resolve, reject) => {
        getComment(params)
          .then(res => {
            if (res.data.code == 0) {
              // console.log(res,'ressss');
              _this.tableData3 = res.data.result.records;
              _this.totalCount = res.data.result.total;

              // _this.options = _this.myTree(res.data.result.content);
            } else {
              _this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    //检索树生成
    clumnTree() {
      var _this = this;
      let userId = JSON.parse(localStorage.getItem("BaseInfor")).userId;
      return new Promise((resolve, reject) => {
        getColumnList(userId)
          .then(res => {
            if (res.data.code == "0") {
              _this.$nextTick(()=>{
                 _this.options = _this.myTree(res.data.result);
                 this.searchSettings[1].options = _this.myTree(res.data.result)
              })

            } else {
              _this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    resetChoice() {
      this.reviewType = "default";
      this.topStatus = "default";
      this.dropValue = "显示全部";
      this.pageNo = 1;
      this.pageSize = 10;
      this.totalCount = 0;
      this.columnSelection = [];
      this.criticismList();
    },
    handleSearch() {},
    //分页
    sizeChange(val) {
      this.pageSize = val;
      this.pageMethods();
    },
    pageChange(val) {
      this.pageNo = val;
      this.pageMethods();
    },
    handleSizeChange(val) {
      this.pageNo = 1;
      this.pageSize = val;
      this.pageMethods();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.pageMethods();
    },
    pageMethods() {
      if (this.reviewType === "default") {
        this.criticismList();
      } else if (this.reviewType === "top") {
        this.showTopColumn();
      } else if (this.reviewType === "untop") {
        this.showDeTopColumn();
      } else if (this.reviewType === "ColumnCheck") {
        this.requestTreeColumn();
      }
    },
    searchItem(data) {
      this.searchData = data
      // this.getSensitiveList()
      this.pageNo = 1;
      this.pageSize = 10;
      this.totalCount = 0;
      this.reviewType = "ColumnCheck";
      this.currentChannelId = data.reverse()[0];
      this.requestTreeColumn();
    },
    //查询树
    handleChange(value) {
      this.pageNo = 1;
      this.pageSize = 10;
      this.totalCount = 0;
      this.reviewType = "ColumnCheck";
      this.currentChannelId = value.reverse()[0];
      this.requestTreeColumn();
    },
    requestTreeColumn() {
      let params = {
        channelId: this.currentChannelId,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        userId: JSON.parse(localStorage.getItem("BaseInfor")).userId,
        top: ""
      };
      if (this.topStatus === "default") {
        params.top = "";
      } else if (this.topStatus === "top") {
        params.top = true;
      } else if (this.topStatus === "untop") {
        params.top = false;
      }

      this.requestCriticsmList(params);
    },
    //optiions 数据处理
    myTree(data) {
      // 删除 所有 children,以防止多次调用
      data.forEach(function(item) {
        delete item.children;
      });
      // 将数据存储为 以 id 为 KEY 的 map 索引数据列
      var map = {};
      data.forEach(function(item) {
        map[item.channelId] = item;
      });
      var val = [];
      data.forEach(function(item) {
        item.label = item.channelName;
        item.id = item.channelId;
        item.value = item.channelId;
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.parentChannelId];
        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
          // item.label = item[channelName]
          (parent.children || (parent.children = [])).push(item);
        } else {
          // item.label = item[channelName]
          val.push(item);
        }
      });
      return val;
    },
    handleCommand(command) {
      this.pageNo = 1;
      this.pageSize = 10;
      this.totalCount = 0;
      if (command === "showAll") {
        this.dropValue = "显示全部";
        this.reviewType = "default";
        this.topStatus = "default";
        this.showAll();
      }
      if (command === "showTopColumn") {
        this.dropValue = "显示置顶";
        this.reviewType = "top";
        this.topStatus = "top";
        this.showTopColumn();
      }
      if (command === "showDeTopColumn") {
        this.dropValue = "显示未置顶";
        this.reviewType = "untop";
        this.topStatus = "untop";
        this.showDeTopColumn();
      }
    },
    //显示全部
    showAll() {
      this.criticismList();
    },
    showTopColumn() {
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        top: true,
        userId: JSON.parse(localStorage.getItem("BaseInfor")).userId
      };
      this.requestCriticsmList(params);
    },
    showDeTopColumn() {
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        top: false,
        userId: JSON.parse(localStorage.getItem("BaseInfor")).userId
      };
      this.requestCriticsmList(params);
    },

    //数据格式化

    nicName(row) {
      let data = "";
      if (row.nickName) {
        data = row.nickName;
      } else {
        data = "匿名";
      }
      return data;
    },
    sourceStatus(row) {
      let data = "";
      if (row.source == "1") {
        data = "网页";
      } else if (row.source == "2") {
        data = "H5";
      } else if (row.source == "3") {
        data = "APP";
      } else if (row.source == "4") {
        data = "微信";
      }
      return data;
    }
  },
};
</script>
<style scoped>
.helpdoc-container {

}
.rightAside {
  float: right;
}
.leftAside{
  float: left;
}
.tool-bar {
  overflow: hidden;
  margin-top:10px;
}
.block {
  display: inline-block;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;

}
.el-icon-arrow-down {
  font-size: 12px;
}
.colorWarning {
  color: #e6a23c;
}
.colorSuccess {
  color: #67c23a;
}
.colorDanger {
  color: #f56c6c;
}
.mytextstyle{
  font-size: 16px;
  letter-spacing: 1px;
  padding: 5px 0;
}
.el-pagination{
  margin-top:30px;
  margin-bottom:30px;
}
</style>
