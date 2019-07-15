<template>
  <div class="helpdoc-container">
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="直播流" name="0"/>
        <el-tab-pane label="历史流" name="1"/>
        <el-tab-pane label="禁用流" name="2"/>
      </el-tabs>
    </template>
    <el-table :data="tableValue">
      <el-table-column type="index" width="50" />
      <el-table-column prop="appName" label="APP名称"/>
      <el-table-column prop="userName" label="用户名"/>
      <el-table-column prop="endTime" :formatter="formatEndTime" label="结束时间"/>
      <el-table-column prop="pushTime" :formatter="formatPushTime" label="推送时间"/>
      <el-table-column prop="streamType" label="视频流类型" :formatter="formatStreamType"/>
      
      <el-table-column prop="isTranscoding" label="点播流" >
        <template slot-scope="scope">
          <div >
            <span v-if="scope.row.isTranscoding=='false'">已禁用</span>
            <span v-else>已启用</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.streamType=='0'&&scope.row.isTranscoding!='false'"
            size="mini"
            type="success"
            @click="handleStreamForbid(scope.$index, scope.row)"
          >禁用</el-button>
          <el-button
            v-show="scope.row.streamType=='0'&&scope.row.isTranscoding=='false'"
            size="mini"
            type="success"
            @click="handleStreamStart(scope.$index, scope.row)"
          >启用</el-button>

          <el-button
            v-show="scope.row.streamType=='1'"
            size="mini"
            type="success"
            @click="handleForbid(scope.$index, scope.row)"
          >禁用</el-button>
          <el-button
            v-show="scope.row.streamType=='2'"
            size="mini"
            type="success"
            @click="handleUnForbid(scope.$index, scope.row)"
          >解禁</el-button>
          <!-- <el-button size="mini" type="prime" disabled="true"  @click="handlePush(scope.$index, scope.row)">开始推流</el-button>
          <el-button size="mini" type="success" disabled="true"  @click="handleStop(scope.$index, scope.row)">结束推流</el-button> -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除流</el-button> 
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
import {
  getStreamInfo,
  disableStream,
    deleteStream,
    undisableStream,
    stopTranscoding,
    startTranscoding
  //   startPushStream,
  //   endPushStream
} from "@/api/live/flowManagement.js";
export default {
  data() {
    return {
      tableValue: [],
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      sortBy: "",
      order: "",
      activeName: '0',
    };
  },
  created() {
    this.requestTableValue();
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      this.initTableList();

      },
    // handlePush(index, row) {
    //     console.log(row,'row')
    //     var _this=this;
    //     let data={
    //     tcurl:'',
    //     name:row.userName,
    //     live:row.streamName,
    //     type:row.streamType

    //     }
    //  return new Promise((resolve, reject) => {
    //     (data)
    //       .then(response => {
    //         if (response.data.code == 0) {
    //           this.$message({
    //             type: "success",
    //             message: response.data.msg
    //           });
    //         } else {
    //           this.$message({
    //             type: "error",
    //             message: response.data.msg
    //           });
    //         }
    //         _this.initTableList();
    //         resolve();
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });

    // },
    // handleStop(index, row) {
    //     var _this=this;
    //     let data={
    //     name:row.userName,
    //     live:row.streamName,
    //     type:row.streamType

    //     }
    //  return new Promise((resolve, reject) => {
    //     endPushStream(data)
    //       .then(response => {
    //         if (response.data.code == 0) {
    //           this.$message({
    //             type: "success",
    //             message: response.data.msg
    //           });
    //         } else {
    //           this.$message({
    //             type: "error",
    //             message: response.data.msg
    //           });
    //         }
    //         _this.initTableList();
    //         resolve();
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // },
    handleDelete(index, row) {
        var _this=this;
      return new Promise((resolve, reject) => {
        deleteStream(row.id)
          .then(response => {
            if (response.data.code == 0) {
              this.$message({
                type: "success",
                message: response.data.msg
              });
            } else {
              this.$message({
                type: "error",
                message: response.data.msg
              });
            }

            _this.initTableList();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //禁用
    handleForbid(index, row) {
        var _this=this;
      return new Promise((resolve, reject) => {
        disableStream(row.id)
          .then(response => {
            if (response.data.code == 0) {
              this.$message({
                type: "success",
                message: response.data.msg
              });
            } else {
              this.$message({
                type: "error",
                message: response.data.msg
              });
            }

            _this.initTableList();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
     //禁用
    handleUnForbid(index, row) {
        var _this=this;
      return new Promise((resolve, reject) => {
        undisableStream(row.id)
          .then(response => {
            if (response.data.code == 0) {
              this.$message({
                type: "success",
                message: response.data.msg
              });
              
            } else {
              this.$message({
                type: "error",
                message: response.data.msg
              });
            }

            _this.initTableList();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //  初始化列表
    initTableList() {
      this.pageNo = 1;
      this.pageSize = 10;
      this.sortBy = "";
      this.order = " ";
      this.requestTableValue();
    },
    requestTableValue() {
      var _this = this;
      let data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sortBy: this.sortBy,
        order: this.order,
        streamType:this.activeName
      };
      return new Promise((resolve, reject) => {
        getStreamInfo(data)
          .then(response => {
            console.log(response);
            if (response.data.code === 0) {
              _this.tableValue = response.data.result.content;
              _this.totalCount = response.data.result.total;
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

    //时间格式化
    formatPushTime(row) {
      let data = "";
      if (row.pushTime) {
        data = row.pushTime.replace("T", " ");
        data = data.replace(".000+0000", "");
      }
      return data;
    },
    formatEndTime(row) {
      let data = "";
      if (row.endTime) {
        data = row.endTime.replace("T", " ");
        data = data.replace(".000+0000", "");
      }
      return data;
    },
    formatStopTime(row) {
      let data = "";
      if (row.stopTime) {
        data = row.stopTime.replace("T", " ");
        data = data.replace(".000+0000", "");
      }
      return data;
    },

    //数据类型格式化
    formatStreamType(row) {
      let data = "";
      if (row.streamType === "0") {
        data = "直播流";
      } else if (row.streamType === "1") {
        data = "历史流";
      } else if (row.streamType === "2") {
        data = "禁用流";
      }
      return data;
    },

    //分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      this.requestTableValue();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.requestTableValue();
      //   if (this.pageFlag) {
      //     this.getList();
      //   } else {
      //     this.SearchAttribute();
      //   }
    },
    //禁止转码
    handleStreamForbid(index,row){
    var _this=this;

      return new Promise((resolve,reject)=>{
        stopTranscoding(row.id)
        .then(response=>{
         if(response.data.code==0){
            this.$message({
          type:'success',
          message:response.data.msg
        })
        _this.requestTableValue();
          }else{
            this.$message({
          type:'error',
          message:response.data.msg
        })
          }
        resolve();
        })
        .catch(error=>{

          reject(error);
        })
      })
    },
    //启用解码
  handleStreamStart(index,row){
    var _this=this;
      return new Promise((resolve,reject)=>{
        startTranscoding(row.id)
        .then(response=>{
          if(response.data.code==0){
            this.$message({
          type:'success',
          message:response.data.msg
        })
        _this.requestTableValue();

          }else{
            this.$message({
          type:'error',
          message:response.data.msg
        })
          }
        
        resolve();
        })
        .catch(error=>{

          reject(error);
        })
      })
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