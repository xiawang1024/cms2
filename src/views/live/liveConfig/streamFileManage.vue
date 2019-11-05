<template>
  <div class="helpdoc-container">
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="视频剪辑" name="0" />
      </el-tabs>
    </template>
    <div v-if="activeName=='0'">
      <div class="v-search-header">
        <v-search :search-settings="searchSettings" @search="searchItem"/>
      </div>
      <el-row>
        <el-col :span="24">
          <el-button type="primary" size="mini" @click="handleClect" :disabled="multipleSelection.length<1">合并</el-button>
        </el-col> 
      </el-row>
      <el-table
        :data="tableValue"
        :load="load"
        lazy
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        row-key="id"
        @selection-change="handleSelectionChange"
        ref="selecteVideo"
      >
        <el-table-column type="index" width="50" />
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column prop="appName" width="150" label="APP名称" />
        <el-table-column prop="userName" width="120" label="用户名" />
        <el-table-column prop="recordBeginTime" width="180" :formatter="formatStart" label="录制开始时间" />
        <el-table-column prop="recordEngTime" width="180" :formatter="formatEnd" label="录制结束时间" />
        <el-table-column prop="resolution" width="100" label="分辨率" />
        <el-table-column prop="fileSize" width="120" label="文件大小" :formatter="formatSize" />
        <el-table-column prop="fileType" width="120" label="编辑状态" >
          <template slot-scope="scope">
            <span v-if="scope.row.fileType==0" class="colorSuccess">成功</span>
            <span v-if="scope.row.fileType==1" class="colorWarning" >编辑中...</span>
            <span v-if="scope.row.fileType==2" class="colorDanger" >失败</span>

          </template>
        </el-table-column>
        <el-table-column prop="recordLength" width="80" label="录制时长" />
        <el-table-column prop="filePath" label="文件路径" show-overflow-tooltip />
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="primary" :disabled="scope.row.filePath==null||scope.row.filePath==''" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button size="mini" type="primary" :disabled="scope.row.filePath==null||scope.row.filePath==''" @click="handleDeal(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
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
      <el-dialog
        title="视频剪辑"
        :visible.sync="dialogVisible"
        width="860px"
        :before-close="moveCutContent"
      >
        <videoEdite
          @cutResult="cutResult"
          :video_url="video_url"
          :audio_url="audio_url"
          v-loading="loading"
          element-loading-text="上传中..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(255, 255, 255, 0.8)"
          ref="videoCut"
        />
      </el-dialog>

      <el-dialog
        title="视频合并"
        :visible.sync="mergeVisible"
        width="860px"
        :before-close="handleClose"
      >
        <video-merge
          ref="mergedialog"
          @handleMerge="handleMerge"
          :multiple-selection="multipleSelection"
        />
      </el-dialog>
      
    </div>
    
  </div>
</template>
<script>
import {
  streamfile,
  editeStreamfile,
  childrenStreamfile,
  deleteStreamFile,
  merge
} from "@/api/live/streamFileManage.js";
import videoEdite from "@/components/videoCut/videoEdite.vue";
import videoMerge from "@/components/videoMerge/merge.vue";

  import simplifySecond from '@/utils/videoCut/simplifySecond';
export default {
  components: { videoEdite,videoMerge },
  data() {
    return {
      tableValue: [],
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      sortBy: "",
      order: "",
      dialogVisible: false,
      audio_url: "", //音频播放地址
      video_url: "", //视频播放地址
      rowId: "", //当前文件id
      url: "", //文件路径
      loading: false,
      activeName: "0",
      childrenNode: [],
      currentUser:'',
       searchSettings: [{
        label: '用户名',
        name: 'username',
        visible: true,
        type: 'text'
      }],
      multipleSelection:[],
      mergeVisible:false,
      username:'',
    };
  },
  created() {
    this.requestTableValue();
    this.currentUser=JSON.parse(localStorage.getItem('BaseInfor')).userName;
  },
  mounted() {
    
  },
  methods: {
     searchItem(val){
       if(val.username){
      this.username=val.username;
      }else{
      this.username='';
      }
       this.pageNo=1,
      this.pageSize=10,
      this.totalCount=0,
      this.requestTableValue();
    },
    requestTableValue() {
      var _this = this;
      let data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sortBy: this.sortBy,
        order: this.order,
        username:this.username  
      };
      return new Promise((resolve, reject) => {
        streamfile(data)
          .then(response => {
            if (response.data.code == 0) {
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
    handleEdit(index, row) {
      this.dialogVisible = true;
      // this.video_url = row.videoUrl;
      this.video_url = row.editUrl;
      this.audio_url = row.audioUrl;
      this.rowId = row.id;
      this.url = row.filePath;
    },
    handleDelete(index,row) {
       var _this = this;
      this.$confirm("此操作将永久删除该资源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          new Promise((resolve, reject) => {
            deleteStreamFile(row.id)
              .then(response => {
                if (response.data.result == "删除成功") {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  _this.requestTableValue();
                } else {
                  this.$message({
                    type: "error",
                    message: "删除失败，请稍后再试!"
                  });
                }

                resolve();
              })
              .catch(reject => {
                console.log(reject);
              });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

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
    formatSize(row){
       let fileSizeMsg = "";
      if (row.fileSize) {
         let fileSizeByte = row.fileSize;
    if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
    else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
    else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
    else if (fileSizeByte > 1048576 && fileSizeByte == 1073741824) fileSizeMsg = "1GB";
    else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    else fileSizeMsg = "文件超过1TB";
    return fileSizeMsg;
      }
      return fileSizeMsg;
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
    cutResult(value) {
      var _this = this;
      this.loading = true;
      //添加上 url , order, id 等字段
      let data = [];
      data = JSON.parse(JSON.stringify(value));
      data.map((item, index) => {
        //时间格式化00:00:00.0
         let time=(item.endTime-item.startTime)
         const times = simplifySecond(time < 0 ? 0 : time)
        item.duration = times.hours+':'+ times.minutes+':'+times.seconds
        item.order = index;
        item.filepath = this.url;
        item.fileId = this.rowId;
        item.operator=this.currentUser;
      
      });
      //保存数据格式
      /**
       * [
            {
              "duration": "00:01:50.0",
              "fileId": "401",
              "logoDistance": "10:10",
              "logoPath": "http://172.20.5.4:8080/dl/2019/7/31/1156403148202442752HoneyBee.png",
              "orders": "0",
              "startTime": "00:00:10.0",
              "filepath": "/home/nieyabing/nginx/nginx-rtmp-module/tmp/vod/2019/7/30/1591531502020190730100454.mp4"
            }
            ]
       */
       
      //执行保存请求
      return new Promise((resolve, reject) => {
        editeStreamfile(data)
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
            _this.loading = false;
            resolve();
          })
          .catch(error => {
            reject(error);
            _this.loading = false;
          });
      });
    },
    //tab切换
    handleClick(tab, event) {
      if (this.activeName == "0") {
        this.requestTableValue();
      }
      if (this.activeName == "1") {
        this.tableValue = [];
      }
    },

    load(tree, treeNode, resolve) {
      //传入当前节点id,查询子节点列表
      //发送请求，将请求结果resolve出去，
      var _resolve = resolve;
      var _this = this;
      return new Promise((resolve, reject) => {
        childrenStreamfile(tree.id)
          .then(response => {
            if (response.data.code == 0) {
              _this.childrenNode = response.data.result;
              _resolve(_this.childrenNode);
            } else {
              //没有子节点返回空值
              _resolve([]);
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    moveCutContent(done) {
        this.$refs.videoCut.playReset();
        done();
        //关闭对话框
    },
    handleMerge(arr){
      let childIds=[];
      let parentId='';
        arr.forEach((item,index)=>{
          childIds.push(item.id)
        })
         if(arr){
        parentId=arr[0].parentId||arr[0].id
        }
        
      let data={
        parentId:parentId,
        username:this.currentUser,
        childIds:childIds
      }
      return new Promise((resolve,reject)=>{
        merge(data)
        .then(res=>{
          if(res.data.code==0){
            this.$message.success(res.data.msg)
            this.mergeVisible=false;
            this.requestTableValue();

          }else{
            this.$message.error(res.data.msg)
          }
          resolve();
        })
        .catch(err=>{
          reject(err)
        })
      })
    },
     handleSelectionChange(val) {
        this.multipleSelection = val;
       
      },
      handleClect(){
        this.mergeVisible=true;
      },
      handleClose(done){
       
        this.$confirm('确认关闭？')
          .then(_ => {
            this.$refs.selecteVideo.clearSelection();
            done();
          })
          .catch(_ => {});
        
      }
    ,
    handleDeal(index,row){
      this.$router.push({
        path:'videoEdit',
        query:{
          data:JSON.stringify(row.editUrl),
          fileId:row.id,
          filePath:row.filePath,
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.helpdoc-container {
  margin: 30px;
  .colorSuccess {
    color: #67c23a;
  }
  .colorDanger {
    color: #f56c6c;
  }
 .colorWarning{
   color:#E6A23C;
 }
}
.pagenation {
  margin: 30px 0;
}
</style>