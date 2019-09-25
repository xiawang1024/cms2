<template>
  <div class="tem-manager-container">
    <el-row type="flex" class="tool-bar" justify="end">
      <el-col :span="6">
        <ChannelSelect @channelCascaderChange="channelCascaderChange"/>
      </el-col>
      <el-col :span="5">
        <el-input
          size="mini"
          v-model="searchTemplate"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          clearable
          @change="search"
        />
      </el-col>
      <el-col class="temmBtndiv" :span="4">
        <el-button size="mini" type="primary" @click="fetchList">搜索</el-button>
        <el-button size="mini" type="primary" @click="handleAdd">新增模板</el-button>
      </el-col>
    </el-row>
    <el-table :data="temlateList" style="width: 100%">
      <el-table-column prop="templateName" label="模板名称"/>
      <el-table-column prop="templateType" label="类别">
        <template slot-scope="scope">
          <span>{{ typeList[scope.row.templateType] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="channelName" label="所属栏目"/>
      <el-table-column prop="templateFormat" label="适用平台"/>
      <el-table-column prop="templateDescription" label="描述"/>
      <el-table-column prop="createTime" label="创建时间"/>
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
import { fetchList } from "@/api/cms/template";
import ChannelSelect from "@/components/cms/ChannelSelect";
import { deleteTemplate } from '@/api/cms/template'
export default {
  name: "TemFormSet",
  components: { ChannelSelect },
  data() {
    return {
      temlateList: [],
      selectChannel: "",
      searchTemplate: "",
      pageNum: 1, // 分页当前页
      pageSize: 10,
      totalCount: 0,
      typeList: {
        content: '正文组件',
        index: '首页组件',
        list: '列表组件',
      }
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
        templateName: _this.searchTemplate
      };
      return new Promise((resolve, reject) => {
        fetchList(searchObjTmp, _this.pageNum, _this.pageSize)
          .then(response => {
            _this.temlateList = response.data.result.content;
            _this.totalCount = response.data.result.total;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    search() {
      console.log("搜索" + this.selectChannel + "---" + this.searchTemplate);
    },
    handleAdd() {
      this.$router.push({
        path: "/cms/systemSet/temEdit",
        query: {
          isAdd: true
        }
      });
    },
    handleAlter(index, row) {
      this.$router.push({
        path: "/cms/systemSet/temEdit",
        query: {
          isAdd: false,
          templateId: row.templateId
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm('确定删除该模板吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return new Promise((resolve, reject) => {
          deleteTemplate({templateId: row.templateId})
            .then(response => {
               this.$message.success('删除成功')
               this.fetchList()
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        });
      }).catch(() => {         
      })
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

.tem-manager-container {
 
}

.tool-bar {
  text-align: right;
}

.tool-bar .el-col {
  margin-left: 10px;
  margin-bottom: 10px;
}
.temmBtndiv {
  margin-top: -6px;
}
.fenyeDiv {
  margin-top: 30px;
}
</style>
