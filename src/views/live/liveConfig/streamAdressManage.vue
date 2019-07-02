<template>
  <div class="helpdoc-container">
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="鉴权直播" name="0"/>
        <el-tab-pane label="拉转直播" name="1"/>
      </el-tabs>
    </template>
    <el-table :data="tableValue">
      <el-table-column type="index" width="50" />
      <el-table-column prop="userName" width="180" label="直播快照" >
        <template slot-scope="scope">
          <img :src="scope.row.picPath" alt="" class="imgStyle">
          <!-- <img src="http://172.20.5.4:8080/dl/2019/7/2/a_1.jpg" class="imgStyle" alt=""> -->
        </template>
      </el-table-column>
      <el-table-column prop="userName" width="120" label="用户名"/>
      <el-table-column prop="recordBeginTime" width="180" :formatter="formatStart" label="录制开始时间"/>
      <el-table-column prop="pullStream" label="直播流地址"/>
      <el-table-column prop="pushiStream" label="推流地址"/>
      <el-table-column prop="vodPullStream" label="点播流地址" />
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
import { managaStreamAddress } from "@/api/live/flowManagement.js";
export default {
  data() {
    return {
      tableValue: [],
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      sortBy: "",
      order: "",
      activeName:'0',
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
        managaStreamAddress(data)
          .then(response => {
            if (response.data.code == 0) {
              _this.tableValue = response.data.result.content;
              _this.totalCount=response.data.result.total;
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

    //分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      this.requestTableValue();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.requestTableValue();
    },
    //tab切换
    handleClick(tab, event) {
      if(this.activeName=='0'){
          this.requestTableValue();
      }
      if(this.activeName=='1'){
        this.tableValue=[]
      }

      },
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
.imgStyle{
  display: block;
  width: 160px;
  margin: 5px 0;
  border-radius: 5px;
}
</style>