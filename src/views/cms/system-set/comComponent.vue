<template>
  <div class="com-component-container">
    <el-row type="flex" class="tool-bar" justify="end">
      <el-col :span="6">
        <ChannelSelect @channelCascaderChange="channelCascaderChange" />
      </el-col>
      <el-col :span="5">
        <el-input
          size="mini"
          v-model="searchComponent"
          placeholder="名称/关键词"
          prefix-icon="el-icon-search"
          clearable
          @change="search"
        />
      </el-col>
      <el-col class="seleAddBtn" :span="4">
        <el-button size="mini" type="primary" @click="fetchList">搜索</el-button>
        <el-button size="mini" type="primary" @click="handleAdd">新增组件</el-button>
      </el-col>
    </el-row>
    <el-table :data="componentList" style="width: 100%" highlight-current-row>
      <el-table-column prop="componentName" label="组件名称" />
      <el-table-column prop="componentVariables" label="变量数量">
        <template slot-scope="scope">{{ JSON.stringify(scope.row.componentVariablesList) }}</template>
      </el-table-column>
      <el-table-column prop="componentDescription" label="描述" />
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleAlter(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="fenyeDiv"
      :current-page="pageNum"
      :page-sizes="[10,30,60,100]"
      :page-size="pageSize"
      :total="totalCount"
      background
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { fetchComponentList, deleteComponent } from "@/api/cms/component";
import ChannelSelect from "@/components/cms/ChannelSelect";
export default {
  name: "ComComponentSet",
  components: { ChannelSelect },
  data() {
    return {
      componentList: [],
      selectChannel: "",
      searchComponent: "",
      pageNum: 1, // 分页当前页
      pageSize: 10,
      totalCount: 0
    };
  },
  created: function() {
    this.fetchList();
  },
  methods: {
    channelCascaderChange(val) {
      console.log(val);
      this.selectChannel = val;
    },
    // 查询列表
    fetchList() {
      var _this = this;
      var searchObjTmp = {
        channelId: _this.selectChannel,
        componentName: _this.searchComponent
      };
      return new Promise((resolve, reject) => {
        fetchComponentList(searchObjTmp, _this.pageNum, _this.pageSize)
          .then(response => {
            _this.componentList = response.data.result.content;
            _this.totalCount = response.data.result.total;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    search() {
      console.log("搜索" + this.selectChannel + "---" + this.searchComponent);
    },
    handleAdd() {
      this.$router.push({
        path: "/cms/systemSet/componentEdit",
        query: {
          isAdd: true
        }
      });
    },
    handleAlter(index, row) {
      this.$router.push({
        path: "/cms/systemSet/componentEdit",
        query: {
          isAdd: false,
          componentId: row.componentId
        }
      });
    },
    handleDelete(index, row) {
      console.log("删除" + row.componentId);
      this.$confirm("确定删除该模板吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteComponents(row.componentId);
        })
        .catch(() => {});
    },
    deleteComponents(id) {
      return new Promise((resolve, reject) => {
        deleteComponent({ componentId: id })
          .then(response => {
            // _this.componentList = response.data.result.content;
            // _this.totalCount = response.data.result.total;
            this.fetchList();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 表格分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.fetchList();
    }
  }
};
</script>

<style scoped>
.el-button + .el-button {
  margin-top: 5px;
  margin-left: 0px;
}

.com-component-container {
}

.tool-bar {
  text-align: right;
}

.tool-bar .el-col {
  margin-left: 20px;
  margin-bottom: 10px;
}
.fenyeDiv {
  margin-top: 30px;
}
.seleAddBtn {
  margin-top: -6px;
}
</style>
