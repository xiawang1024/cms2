<template>
  <div>
    <div class="v-search-header">
      <v-search :search-settings="searchSettings" @search="searchItem" />
    </div>
    <el-row>
      <el-col :span="2">
        <el-button size="mini" type="primary" @click="handleUpload">上传</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableValue" row-key="imageId">
      <el-table-column type="index" width="50" />
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="创建时间：">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>
            <el-form-item label="更新时间：">
              <span>{{ props.row.updateTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="title" width="250" label="标题" show-overflow-tooltip />
      <el-table-column prop="createUser" width="100" label="创建人" />
      <el-table-column prop="state" width="120" label="处理状态">
        <template slot-scope="scope">
          <span v-if="scope.row.state==3" class="colorSuccess">成功</span>
          <span v-if="scope.row.state==2" class="colorDanger">失败</span>
          <span v-if="scope.row.state==1" class="colorWarning">处理中...</span>
          <span v-if="scope.row.state==0" class="colorInfo">待处理</span>
          <span v-if="scope.row.state==-1" class="colorInfo">源文件不存在</span>
        </template>
      </el-table-column>
      <el-table-column prop="vodStream" label="图片地址" show-overflow-tooltip min-width="650">
        <template slot-scope="scope">
          <el-row>
            <img v-if="scope.row.state==3" :src="scope.row.pic1" title="预览" class="viewimage" @click="handleView(scope.row.pic1)">
            <img v-if="scope.row.state==3" :src="scope.row.pic2" title="预览" class="viewimage" @click="handleView(scope.row.pic2)">
            <img v-if="scope.row.state==3" :src="scope.row.pic3" title="预览" class="viewimage" @click="handleView(scope.row.pic3)">
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="230" fixed="right">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.state==2"
            size="mini"
            type="primary"
            @click="handleRecover(scope.$index, scope.row)"
          >重新处理</el-button>
          <!-- <el-button
            v-show="scope.row.state==3"
            size="mini"
            type="primary"
            @click="handleReview(scope.$index, scope.row)"
          >预览</el-button> -->
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

    <el-dialog :visible.sync="dialogVisible" title="添加">
      <v-form
        ref="vform"
        :form-settings="formSettings"
        :form-data="formData"
        @save="submitSave"
        label-width="80px"
      />
    </el-dialog>
    <el-dialog :visible.sync="dialogVideo" width="0" custom-class="visibleStyle" modal="true">
      <el-row >
        <el-col :span="24" >
          <img :src="videoSource" alt="" >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {
  creatimage,
  deleteimage,
  imageList,
  retrayImage
} from "@/api/live/imageTranscode.js";
import baseUrl from "@/config/base-url";
export default {
  // name: "VideoTranscode",
  
  data() {
    return {
      searchSettings: [
        {
          label: "处理状态",
          name: "state",
          visible: true,
          type: "select",
          options: [
            {
              label: "成功",
              value: 3
            },
            {
              label: "失败",
              value: 2
            },
            {
              label: "处理中",
              value: 1
            },
            {
              label: "未处理",
              value: 0
            }
          ]
        },
        {
          label: "标题",
          name: "title",
          visible: true,
          type: "text"
        },
        {
          label: "创建者",
          name: "createUser",
          visible: true,
          type: "text"
        }
      ],
      tableValue: [],
      videoSource: '',
      dialogVideo: false,
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      dialogVisible: false,
      formSettings: [
        {
          items: [
            //image配置
            {
              label: "模板",
              name: "template",
              type: "checkbox",
              required: true,
              value: ["120", "750", "1500"],
              options: [
                {
                  label: "宽 120px",
                  value: "120",
                  disabled: true
                },
                {
                  label: "宽 750px",
                  value: "750",
                  disabled: true
                },
                {
                  label: "宽 1500px",
                  value: "1500",
                  disabled: true
                }
              ],
              hidden: false
            },
            {
              label: "上传资源",
              name: "imageFilePath",
              type: "img",
              required: true,
              limit: 1,
              hidden: false
            },
            {
              label: "标题",
              name: "resourceTitle",
              type: "text",
              required: true
            }
          ]
        }
      ],
      formData: {},
      clientLicenseId: "",
      viewtype: "",
      createUser: "",
      title: "",
      state: "",
      BaseInfor:'',

    };
  },
  created() {
    this.BaseInfor = JSON.parse(
      localStorage.getItem("BaseInfor")
    )
   
  },
  mounted(){
     this.initTable();
  },
  methods: {
    initTable() {
      return new Promise((resolve, reject) => {
        imageList({
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          createUser: this.createUser,
          title: this.title,
          state: this.state,
          sortBy: "",
          order: ""
        })
          .then(res => {
            console.log(res, "res");
            if (res.data.code == 0) {
              this.tableValue = res.data.result.content;
              this.tableValue.forEach((item,index)=>{
                 this.tableValue[index].pic1=baseUrl.DOWN_URL+item.outputPart+item.size1+'.webp';
                 this.tableValue[index].pic2=baseUrl.DOWN_URL+item.outputPart+item.size2+'.webp';
                 this.tableValue[index].pic3=baseUrl.DOWN_URL+item.outputPart+item.size3+'.webp';

              })
              this.totalCount = res.data.result.total;
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    //分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      this.initTable();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.initTable();
    },
    handleUpload() {
      this.dialogVisible = true;
    },
    submitSave(val) {
      console.log(val,'val')
      
      var _this = this;
      let data = {
            createTime: "",
            "createUser": this.BaseInfor.userName,
            "imageId": "",
            "inputPath": '',
            "outputPart": "",
            "processTimes": 0,
            "size1": 120,
            "size2": 750,
            "size3": 1500,
            "size4": 0,
            "state": 0,
            "title": val.resourceTitle,
            "updateTime": "",

      };
      if (val.imageFilePath[0].url) {
        //截掉url域名
        let url = val.imageFilePath[0].url;
        data.inputPath = url.split(baseUrl.DOWN_URL)[1];
      }

      return new Promise((resolve, reject) => {
        creatimage(data)
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              _this.initTable();
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
            _this.dialogVisible = false;
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    
    handleDelete(index, row) {
      var _this = this;
      this.$confirm("此操作将永久删除该资源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          new Promise((resolve, reject) => {
            deleteimage(row.imageId)
              .then(res => {
                if (res.data.code == 0) {
                  this.$message({
                    type: "success",
                    message: res.data.msg
                  });
                  _this.initTable();
                } else {
                  this.$message({
                    type: "error",
                    message: res.data.msg
                  });
                }
              })
              .catch(err => {
                reject(err);
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
    handleRecover(index, row) {
      var _this = this;
      return new Promise((resolve, reject) => {
        retrayImage(row.imageId)
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              _this.initTable();
            } else {
              this.$message({
                type: "erorr",
                message: res.data.msg
              });
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //预览
    // handleReview(index, row) {
    //   this.videoSource =[]
    //   this.dialogVideo = true;
    //   this.videoSource =[row.pic1,row.pic2,row.pic3]
    //   console.log(this.videoSource,'source')
    //     //http://cmsres.test.dianzhenkeji.com/imageService/2019/10/16/1184280800368001024-120.webp
    // },
    searchItem(val) {
      this.createUser = val.createUser;
      (this.pageNo = 1),
        (this.pageSize = 10),
        (this.totalCount = 0),
        (this.createUser = val.createUser || ""),
        (this.title = val.title || ""),
        (this.state = val.state == undefined ? "" : val.state);
      this.initTable();
    },
    handleView(url){
      this.dialogVideo=true;
         this.videoSource=url
    }
    
  }
};
</script>
<style lang="scss" scoped>
.pagenation {
  margin: 30px 0;
}
.colorSuccess {
  color: #67c23a;
}
.colorDanger {
  color: #f56c6c;
}
.colorWarning {
  color: #e6a23c;
}
.colorInfo {
  color: #409eff;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.viewimage{
  width: 120px;
  padding: 5px;
  cursor: pointer;

}
/deep/ .visibleStyle{
  // background-color: rgba(0,0,0,0.4) ;
  display: flex;
    justify-content: center;
    align-items: center;
} 

</style>