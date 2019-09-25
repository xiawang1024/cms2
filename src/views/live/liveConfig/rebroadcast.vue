<template>
  <div class="helpdoc-container">
    <div class="tool-bar">
      <el-button size="mini" type="primary" @click="handleAddDialog()">添加</el-button>
    </div>
    <el-table
      :data="tableValue"
      :load="load"
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      row-key="id"
    >
      <el-table-column type="index" width="50" />
      <el-table-column prop="relayTitle" width="150" label="标题" >
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="scope.row.relayDetails" placement="top">
            <span>{{ scope.row.relayTitle }}</span>
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column prop="userName" width="150" label="用户名" />
      <el-table-column prop="imgPath" width="200" label="直播快照">
        <template slot-scope="scope">
          <img :src="scope.row.imgPath==null?defaultPath:scope.row.imgPath" alt class="imgStyle" >
        </template>
      </el-table-column>
      <el-table-column prop="logoPath" width="200" label="水印">
        <template slot-scope="scope">
          <img :src="scope.row.logoPath==null?defaultPath:scope.row.logoPath" alt class="logoStyle" >
        </template>
      </el-table-column>
      <el-table-column prop="logoDistance" width="200" label="水印位置">
        <template slot-scope="scope">
          <span v-if="scope.row.logoDistance=='noLogo'">无</span>
          <span v-if="scope.row.logoDistance=='10:10'">左上</span>
          <span v-if="scope.row.logoDistance=='main_w-overlay_w-10:10'">右上</span>
          <span v-if="scope.row.logoDistance=='10:main_h-overlay_h-10'">左下</span>
          <span v-if="scope.row.logoDistance=='main_w-overlay_w-10:main_h-overlay_h-10'">右下</span>
          <!-- 新旧数据兼容处理 -->
         
          <span v-if="scope.row.logoDistance=='80:50'">左上</span>
          <span v-if="scope.row.logoDistance=='main_w-overlay_w-80:50'">右上</span>
          <span v-if="scope.row.logoDistance=='80:main_h-overlay_h-50'">左下</span>
          <span v-if="scope.row.logoDistance=='main_w-overlay_w-80:main_h-overlay_h-50'">右下</span>
          <!--  处理结束 -->
        </template>
      </el-table-column>

      <el-table-column prop="beginTime" width="180" label="开始时间" />
      <el-table-column prop="relayStreamUrl" width="180" label="转播流地址" />
      <el-table-column prop="streamAddress" label="直播流地址" />
      <el-table-column prop="relayType" label="转播状态" >
        <template slot-scope="scope">
          <span v-if="scope.row.relayType==0" class="colorSuccess">转播中</span>
          <span v-else >已结束</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleBreak(scope.$index,scope.row)" v-show="scope.row.relayType==0">中断</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.$index,scope.row)" v-show="scope.row.relayType==1">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
    <addRebroadcast :dialog-visible="dialogFormVisible" @closeDialog="closeDialog" @refrashPage="requestRebroadCast" />
  </div>
</template>
<script>
import {
  childrenStreamAdressfile,
  rebroadcastList,
  interruptRelay,
  deletRelay
} from "@/api/live/steamAdressManage.js";
import addRebroadcast from "@/views/live/liveConfig/addRebroadcast.vue";
export default {
  components: { addRebroadcast },
  data() {
    //  var pictureControl = (rule, value, callback) => {
    //    var _this=this;
    //   let Img=new Image()
    //   Img.src=value[0].url;
    //   let isPNG=(value[0].url.split('.').reverse()[0]).toLowerCase()=='png'
    //   if(isPNG){
    //     //图片加载完整判断尺寸与格式
    //     Img.onload=function(){
    //     if(Img.width!=120&&Img.height!=70){
    //       callback(_this.$message.error('请上传120*70像素的logo!'));
    //     }else{
    //     callback();
    //     }
    //   }
    //   }else{
    //      callback("请上传PNG格式图片！");
    //   }
    // };
    return {
      tableValue: [],
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      sortBy: "",
      order: "",
      activeName: "0",
      sharHTMLContent: "",
      sharIframeContent: "",
      isCopy: "",
      defaultPath: require("@/assets/bgPicture/liveBg.png"),
      dialogFormVisible: false,
    };
  },
  created() {
    this.requestRebroadCast();
  },
  mounted() {},
  methods: {
    requestRebroadCast() {
      var _this = this;
      let data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sortBy: this.sortBy,
        order: this.order
      };
      return new Promise((resolve, reject) => {
        rebroadcastList(data)
          .then(response => {
            if (response.data.code == 0) {
              _this.tableValue = response.data.result.content;
              _this.totalCount = response.data.result.total;
              // console.log(_this.tableValue,'value');
              
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
    
    handleDelete(index,row) {
       var _this=this;
       this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
         new Promise((resolve,reject)=>{
        deletRelay(row.id)
        .then(res=>{
          if(res.data.code==0){
            _this.$message.success(res.data.msg)
            _this.requestRebroadCast();
          }else{
            _this.$message.error(res.data.msg)
          }
        })
        .catch(err=>{
          reject(err)
        })
      })
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
    //页面数据初始化
    InitPage() {
      this.pageNo = 1;
      this.pageSize = 10;
      this.totalCount = 0;
      this.order = "";
      this.sortBy = "";
      this.tableValue = [];
    },

    //分页处理
    handleSizeChange(val) {
      this.pageSize = val;
        this.requestRebroadCast();
      
    },
    handleCurrentChange(val) {
      this.pageNo = val;
        this.requestRebroadCast();
    },
    load(tree, treeNode, resolve) {
      //传入当前节点id,查询子节点列表
      //发送请求，将请求结果resolve出去，
      var _resolve = resolve;
      var _this = this;
      return new Promise((resolve, reject) => {
        childrenStreamAdressfile(tree.id)
          .then(response => {
            console.log(response);
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
    //新增对话框
    handleAddDialog() {
      this.dialogFormVisible = true;
      console.log(this.dialogFormVisible,'dialogFormVisible')
    },
    closeDialog(){
        
      this.dialogFormVisible = false;
      console.log(this.dialogFormVisible,'dialogFormVisible')

    },
    handleBreak(index,row){
      console.log(row.id);
      var _this=this;
       this.$confirm("此操作将中断拉转直播, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
         new Promise((resolve,reject)=>{
        interruptRelay(row.id)
        .then(res=>{
          if(res.data.code==0){
            _this.$message.success(res.data.msg)
            _this.requestRebroadCast();
          }else{
            _this.$message.error(res.data.msg)
          }
        })
        .catch(err=>{
          reject(err)
        })
      })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      
     
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
}
.pagenation {
  margin: 30px 0;
}
.imgStyle {
  display: block;
  width: 160px;
  margin: 5px 0;
  border-radius: 5px;
}
.logoStyle{
 display: block;
  width: 60px;
  margin: 5px 0;
  border-radius: 5px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.tips {
  line-height: 28px;
}
</style>