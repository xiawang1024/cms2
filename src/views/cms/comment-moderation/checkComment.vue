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
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @row-click="handleclick"
      highlight-current-row
      row-key="id"
    >
      <el-table-column type="selection" width="30"/>
      <el-table-column type="index"/>
      <el-table-column prop="nickName" width="60" label="昵称" :formatter="nicName" show-overflow-tooltip/>
      <el-table-column prop="articleTitle" min-width="100" label="文章标题" show-overflow-tooltip>
        <template slot-scope="scope">
          <span class="new-comment-title" @click="handelDetail(scope.row.articleTitle)">{{ scope.row.articleTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="comment" min-width="400" label="评论内容" class-name="mytextstyle"/>
      <el-table-column prop="top" width="80" label="置顶状态">
        <template slot-scope="scope">
          <span v-show="scope.row.top" class="colorSuccess">已置顶</span>
          <span v-show="!scope.row.top" class="colorWarning">未置顶</span>
        </template>
      </el-table-column>
      <el-table-column prop="pass" width="80" label="审核状态">
        <template slot-scope="scope">
          <span v-show="scope.row.pass" class="colorSuccess">通过</span>
          <span v-show="!scope.row.pass" class="colorDanger">未通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="source" width="70" label="来源" :formatter="sourceStatus"/>
      <el-table-column prop="createTime" width="160" label="评论时间"/>
      <el-table-column width="240" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.pass==false"
            size="mini"
            type="primary"
            @click="handlePass(scope.$index, scope.row)"
          >通过</el-button>
          <el-button
            v-else
            size="mini"
            type="primary"
            @click="handleRefuse(scope.$index, scope.row)"
          >拒绝</el-button>
          <el-button
            v-if="scope.row.top==false"
            size="mini"
            type="primary"
            @click="handleTop(scope.$index, scope.row)"
          >置顶</el-button>
          <el-button
            v-else
            size="mini"
            type="primary"
            @click="handleTop(scope.$index, scope.row)"
          >取消</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <v-page :visible.sync="showDetail" @goBack="goBack">
      <h3 slot="title">{{ articleTitle }}</h3>
      <template slot="content">
        <comment-infor :article-title="articleTitle"/>
        <!-- 详情页组件 -->
      </template>
    </v-page>
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
import commentInfor from './commentInfor'
export default {
  name: "CheckComment",
  components: {
    commentInfor
  },
  data() {
    return {
      tableData3: [],
      totalCount: 0,
      pageSize: 10,
      currentPage: "",
      pageNo: 1,
      selectList: [],
      currentChannelId: "",
      timerassign:null,
      // 搜索修改
      searchSettings: [
        {
          label: '标题',
          name: 'title',
          type: 'text',
          placeholder: '请输入标题',
          visible: true
        }, {
        label: '显示方式',
        name: 'top',
        type: 'select',
        placeholder: '请选择',
        options: [
          {
            label: '置顶',
            value: 'true'
          }, {
            label: '非置顶',
            value: 'false'
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
        visible: false,
        changeOnSelect: true
      }],
      searchData: {
      },
      showDetail: false,
      articleTitle: ''
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
    handelDetail(val) {
      this.showDetail = true
      this.articleTitle = val
      clearInterval(this.timerassign);
      this.timerassign=null;
    },
    goBack() {
      this.criticismList();
      this.timer();
    },
    timer(){
      this.timerassign= setInterval(()=>{
          // this.pageMethods();
          this.criticismList();
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
          });
      });
    },
    //批量删除
    handleManyDelete() {
      this.deleteRequest(this.selectList.toString());
    },
    handleDelete(index, row) {
       this.$confirm('确定删除该评论吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteRequest(row.commentId)
        }).catch(() => {         
        })
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
        userId: JSON.parse(localStorage.getItem("BaseInfor")).userId,
        channelId: this.currentChannelId,
        top: this.searchData.top,
        title: this.searchData.title
      };
      this.requestCriticsmList(params);
    },
    requestCriticsmList(params) {
      for(let key in params) {
        if(!params[key]) {
          delete params[key]
        }
      }
      var _this = this;
      return new Promise((resolve, reject) => {
        getComment(params)
          .then(res => {
            if (res.data.code == 0) {
              // console.log(res,'ressss');
              _this.tableData3 = res.data.result.records;
              _this.totalCount = res.data.result.total;
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
                 this.searchSettings[2].options = _this.myTree(res.data.result)
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
    handleSearch() {},
    //分页
    sizeChange(val) {
      this.pageSize = val;
      this.criticismList();
    },
    pageChange(val) {
      this.pageNo = val;
      this.criticismList();
    },
    handleSizeChange(val) {
      this.pageNo = 1;
      this.pageSize = val;
      this.criticismList();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.criticismList();
    },
    searchItem(data) {
      this.searchData = data
      // this.getSensitiveList()
      this.pageNo = 1;
      this.pageSize = 10;
      this.totalCount = 0;
      // this.currentChannelId = data.reverse()[0];
      this.currentChannelId = data.channelId ? data.channelId[data.channelId.length - 1] : ''
      this.requestTreeColumn();
    },
    requestTreeColumn() {
      let params = {
        channelId: this.currentChannelId,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        userId: JSON.parse(localStorage.getItem("BaseInfor")).userId,
        top: this.searchData.top,
        title: this.searchData.title
      };
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
.new-comment-title{
  cursor: pointer;
  color:#409EFF;
}
</style>
