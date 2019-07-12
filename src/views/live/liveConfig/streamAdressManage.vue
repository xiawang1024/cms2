<template>
  <div class="helpdoc-container">
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="鉴权直播" name="0" />
        <el-tab-pane label="拉转直播" name="1" />
      </el-tabs>
    </template>
    <div class="tool-bar">
      <el-button size="mini" type="primary" v-show="activeName=='1'" @click="handleAddDialog()">新增</el-button>
    </div>
    <el-table
      :data="tableValue"
      :load="load"
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      row-key="id"
    >
      <el-table-column type="index" width="50" />
      <el-table-column prop="userName" width="150" label="用户名" />
      <el-table-column prop="picPath" width="200" label="直播快照">
        <template slot-scope="scope">
          <img :src="scope.row.picPath==null?defaultPath:scope.row.picPath" alt class="imgStyle" >
        </template>
      </el-table-column>

      <el-table-column prop="recordBeginTime" width="180" :formatter="formatStart" label="录制开始时间" />
      <el-table-column prop="pullStream" label="直播流地址" />
      <el-table-column prop="pushiStream" label="推流地址" />
      <el-table-column prop="vodPullStream" label="点播流地址" />
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <!-- 分享 -->
          <el-popover placement="top" title="分享" width="400" trigger="click">
            <el-row>
              <el-col :span="5">
                <div class="tips">html代码:</div>
              </el-col>
              <el-col :span="14">
                <div>
                  <el-input size="mini" v-model="sharHTMLContent" />
                </div>
              </el-col>
              <el-col :span="2" :offset="1">
                <div>
                  <el-button
                    size="mini"
                    type="success"
                    v-if="isCopy!=sharHTMLContent"
                    v-clipboard:copy="sharHTMLContent"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >复制</el-button>
                  <el-button size="mini" type="success" v-else>成功</el-button>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <div class="tips">通用代码：</div>
              </el-col>
              <el-col :span="14">
                <div>
                  <el-input size="mini" v-model="sharIframeContent" />
                </div>
              </el-col>
              <el-col :span="2" :offset="1">
                <div>
                  <el-button
                    size="mini"
                    type="success"
                    v-if="isCopy!=sharIframeContent"
                    v-clipboard:copy="sharIframeContent"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >复制</el-button>
                  <el-button size="mini" type="success" v-else>成功</el-button>
                </div>
              </el-col>
            </el-row>

            <el-button
              slot="reference"
              size="mini"
              type="prime"
              @click="handleShare(scope.$index, scope.row)"
            >分享</el-button>
          </el-popover>

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            :disabled="true"
          >删除</el-button>
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

    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <v-form
        ref="vform"
        :form-settings="formSettings"
        :form-data="formData"
        @save="submitSave"
        label-width="80px"
        :btn-loading="isLoading"
      />
    </el-dialog>
    <Rebroadcast :dialog-visible="dialogVisible" :close-dio="closeDio"/>
  </div>
</template>
<script>
import {
  managaStreamAddress,
  childrenStreamAdressfile,
  addrebroadcast,
  rebroadcastList
} from "@/api/live/steamAdressManage.js";
import Rebroadcast from "@/views/live/liveConfig/addRebroadcast.vue"
export default {
    components:{Rebroadcast},
  
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
      dialogVisible:false,
      // formData: {},
      // formSettings: [
      //   {
      //     items: [
      //       {
      //         label: "描述",
      //         name: "relayDetails",
      //         type: "text",
      //         placeholder: "请输入描述"
      //       },
      //       {
      //         label: "标题",
      //         name: "relayTitle",
      //         type: "text",
      //         placeholder: "请输入标题"
      //       },

      //       {
      //         label: "拉转地址",
      //         name: "relayStreamUrl",
      //         type: "text",
      //         required: true,
      //         placeholder: "请输入地址"
      //       },
      //       {
      //         label: "用户名",
      //         name: "userName",
      //         type: "text",
      //         required: true,
      //         placeholder: "请输入地址"
      //       },
      //       {
      //         label: "密码",
      //         name: "streamPwd",
      //         type: "text",
      //         required: true,
      //         placeholder: "请输入地址"
      //       },
      //       {
      //         label: "标志位置",
      //         name: "logoDistance",
      //         type: "radio",
      //         required: true,
              
      //         vlaue:'10:10',
      //         options:[{
      //           label:'左上',
      //           value:'10:10'

      //         },
      //         {
      //           label:'右上',
      //           value:'main_w-overlay_w-10:10'

      //         },
      //         {
      //           label:'左下',
      //           value:'10:main_h-overlay_h-10'

      //         },
      //         {
      //           label:'右下',
      //           value:'main_w-overlay_w-10:main_h-overlay_h-10'

      //         }]
              
      //       },
      //       {
      //         label: "标志",
      //         name: "logoPath",
      //         type: "file",
      //         rule:[{
      //           validator: pictureControl,
      //            trigger: 'blur',
      //            required:true
      //         }],
      //         limit:1
      //       }
      //     ]
      //   }
      // ],
      isLoading: false
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
    requestRebroadCast(){
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
    handleShare(index, row) {
      //分享
      this.sharHTMLContent = "";
      this.sharIframeContent = "";
      let src = row.shareStream;
      this.sharHTMLContent =
        '<embed src="' +
        src +
        '" allowFullScreen="true" quality="high" width="480" height="350" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
      this.sharIframeContent =
        '<iframe src="' +
        src +
        '" frameborder="0" allowfullscreen="true" width="100%" height="100%"></iframe>';
    },
    contentWrite(type) {
      if (type == "html") {
        this.copyContent = this.sharHTMLContent;
      } else if (type == "iframe") {
        this.copyContent = this.sharIframeContent;
      }
    },
    onCopy(e) {
      // 复制成功
      // console.log(e.text);
      this.isCopy = e.text;
      this.$message({
        message: "复制成功！",
        type: "success"
      });
    },
    onError(e) {
      // 复制失败
      this.$message({
        message: "复制失败！",
        type: "error"
      });
    },
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
    //tab切换
    handleClick(tab, event) {
      if (this.activeName == "0") {
        this.InitPage();
        this.requestTableValue();
      }
      if (this.activeName == "1") {
        this.InitPage();
        this.requestRebroadCast();
      }
    },
    //页面数据初始化
    InitPage(){
      this.pageNo=1;
        this.pageSize=10;
        this.totalCount=0;
        this.order='';
        this.sortBy='';
        this.tableValue=[];
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
      // this.dialogFormVisible = true;
      this.dialogVisible=true;

    },
    closeDio(){
      this.dialogVisible=false;

    },
    //保存添加
    submitSave(val) {
      var _this=this;
      let data = {
        beginTime: "",
        id: '',
        imgPath: "",
        logoDistance:val.logoDistance,
        logoPath: val.logoPath[0].url,
        relayDetails:val.relayDetails ,
        relayStreamUrl: val.relayStreamUrl,
        relayTitle: val.relayTitle,
        streamAddress:'',
        streamPwd: val.streamPwd,
        userName: val.userName
      };
      
      return new Promise((resolve,reject)=>{
        addrebroadcast(data)
        .then(response=>{
          if(response.data.code==0){
              this.$message({
              type:'success',
              message:response.data.msg
            })
          _this.dialogFormVisible=false;
          }else{
            this.$message({
              type:'error',
              message:response.data.msg
            })
          }
          


          resolve();
        })
        .catch(error=>{
          console.log(error);
          reject(error)
        })
      })
    },
    
  }
};
</script>
<style lang="scss" scoped>
.helpdoc-container {
  margin: 30px;
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