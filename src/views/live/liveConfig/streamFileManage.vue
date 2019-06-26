<template>
  <div class="helpdoc-container">
    <el-table :data="tableValue">
      <el-table-column type="index" width="50" />
      <el-table-column prop="appName" width="80" label="APP名称"/>
      <el-table-column prop="userName" width="120" label="用户名"/>
      <el-table-column prop="recordBeginTime" width="180" :formatter="formatStart" label="录制开始时间"/>
      <el-table-column prop="recordEngTime" width="180" :formatter="formatEnd" label="录制结束时间"/>
      <el-table-column prop="recordFormat" width="80" label="录制格式"/>
      <el-table-column prop="recordLength" width="80" label="录制时长"/>
      <el-table-column prop="filePath" label="文件路径" show-overflow-tooltip />
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="prime" @click="handleEdit(scope.$index, scope.row)" :disabled="true">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" :disabled="true" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagenation"
      :current-page="pageNo"
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
import { streamfile } from "@/api/live/flowManagement.js";
export default {
  data() {
    return {
      tableValue: [],
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      sortBy: "",
      order: ""
    };
  },
  created() {
    this.requestTableValue();
  },
  mounted() {},
  methods: {
    requestTableValue() {
      var _this = this;
      let data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sortBy: this.sortBy,
        order: this.order
      };
      return new Promise((resolve, reject) => {
        streamfile(data)
          .then(response => {
            if (response.data.code == 0) {
              _this.tableValue = response.data.result.content;
              _this.totalCount=response.data.result.total
            } else {
              this.$message({
                type: "error",
                message: response.data.msg
              });
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    handleEdit() {},
    handleDelete() {},

    //时间格式化
    formatStart(row) {
      let date = "";
      if (row.recordBeginTime) {
        date = row.recordBeginTime.replace("T", " ");
        date = date.replace(".000+0000", "");
      
      } 
      return date;
    },
    formatEnd(row) {
      let date = "";
      if (row.recordEngTime) {
        date = row.recordEngTime.replace("T", " ");
        date = date.replace(".000+0000", "");
      
      } 
      return date;
    },

    //分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      this.requestTableValue();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.requestTableValue();
    }
  }
};
</script>
<style lang="scss" scoped>
.helpdoc-container {
  margin: 30px;
}
.pagenation{
  margin: 30px 0;
}
</style>