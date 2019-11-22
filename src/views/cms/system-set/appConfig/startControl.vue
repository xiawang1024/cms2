<template>
  <div class="mainbox">
    <!-- 启动图 -->
    <el-row>
      <el-col class="dealTitle">
        <el-button type="primary" size="mini" @click="handleEdite" v-show="!openImageId">新增</el-button>
        <el-button type="primary" size="mini" @click="handleEdite" v-show="openImageId">编辑</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="startEnable"
          v-show="startConfig.status"
          :disabled="startConfig.status==null"
        >禁用皮肤</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="startEnable"
          v-show="!startConfig.status"
          :disabled="startConfig.status==null"
        >启用皮肤</el-button>
        <span>(开机启动图管理 版本：{{ startConfig.version }})</span>
      </el-col>
      <el-col :class="startConfig.status?'flexbox':'flexbox drawCover'">
        <div class="cell">
          <img :src="startConfig.image0" alt >
          <span>1242*2688</span>
        </div>
        <div class="cell">
          <img :src="startConfig.image1" alt >
          <span>1242*2208</span>
        </div>

        <div class="cell">
          <img :src="startConfig.image2" alt >
          <span>1080*2160</span>
        </div>
        <div class="cell">
          <img :src="startConfig.image3" alt >
          <span>1080*2240</span>
        </div>
      </el-col>
    </el-row>
    <!-- 上传组件 -->
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
      <open-image @handleupload="handleupload" />
    </el-dialog>
  </div>
</template>
<script>
import openImage from "@/views/cms/system-set/appConfig/openImage.vue";
import {
  addOpenimage,
  getOpenimage,
  updateOpenimage,
  startforbidden
} from "@/api/cms/appConfig.js";
export default {
  components: {
    openImage
  },

  data() {
    return {
      dialogVisible: false,
      dialogTitle: "",
      appId: this.$route.query.appId,
      openImageId: "",
      startConfig: []
    };
  },
  created() {
    this.BaseInfor = JSON.parse(localStorage.getItem("BaseInfor"));
  },
  mounted() {
    this.getFullTab();
  },
  methods: {
    //获取启动图
    getFullTab() {
      var _this = this;
      let data = {
        appId: this.appId,
        tenantId: this.BaseInfor.clientLicenseId
      };
      return new Promise((resolve, reject) => {
        getOpenimage(data)
          .then(res => {
            console.log(res, "res");
            if (res.data.code == 0) {
              this.startConfig = res.data.result;
              this.version = res.data.result.version;
              this.openImageId = res.data.result.id || null;
            } else {
              //新增图片状态；
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    handleEdite(type) {
      //启动图编辑
      this.dialogTitle = "启动图编辑";
      //调用上传组件
      this.dialogVisible = true;
    },
    handleupload(val, type) {
      var _this = this;
      if (type == "start") {
        //新增开机图
        let data = {
          appId: this.appId,
          image0: val.image0[0].url,
          image1: val.image1[0].url,
          image2: val.image2[0].url,
          image3: val.image3[0].url,
          createUser: this.BaseInfor.userName,
          id: this.openImageId,
          tenantId: this.BaseInfor.clientLicenseId,
          updateUser: this.BaseInfor.userName,
          version: val.version,
          operationUser: "",
          clientLicenseId: this.BaseInfor.clientLicenseId,
          status: val.status
        };
        if (this.openImageId) {
          //编辑
          return new Promise((resolve, reject) => {
            updateOpenimage(data)
              .then(res => {
                if (res.data.code == 0) {
                  this.$message.success(res.data.msg);
                } else {
                  this.$message.error(res.data.msg);
                }
                resolve();
                _this.getFullTab();
                _this.dialogVisible = false;
              })
              .then(err => {
                reject(err);
              });
          });
        } else {
          return new Promise((resolve, reject) => {
            addOpenimage(data)
              .then(res => {
                if (res.data.code == 0) {
                  this.$message.success(res.data.msg);
                } else {
                  this.$message.error(res.data.msg);
                }
                resolve();
                _this.dialogVisible = false;
                //刷新起动图
                _this.getFullTab();
              })
              .then(err => {
                reject(err);
              });
          });
        }
      }
    },

    
    startEnable() {
      var _this = this;
      if (this.startConfig.status) {
        //启用状态禁用
        let data = {
          appId: this.appId,
          status: false,
          tenantId: this.BaseInfor.clientLicenseId
        };
        return new Promise((resolve, reject) => {
          startforbidden(data)
            .then(res => {
              if (res.data.code == 0) {
                this.$message.success("已禁用");
              } else {
                this.$message.error(res.data.msg);
              }
              _this.getFullTab();
              resolve();
            })
            .then(err => {
              reject(err);
            });
        });
      } else {
        //禁用状态启用
        let data = {
          appId: this.appId,
          status: true,
          tenantId: this.BaseInfor.clientLicenseId
        };
        return new Promise((resolve, reject) => {
          startforbidden(data)
            .then(res => {
              if (res.data.code == 0) {
                this.$message.success("已启用");
              } else {
                this.$message.error(res.data.msg);
              }
              _this.getFullTab();
              resolve();
            })
            .then(err => {
              reject(err);
            });
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.mainbox {
  padding: 15px;
  margin: 10px;
}
.secondMargin {
  margin-top: 15px;
}
.smallmargin {
  margin: 5px;
}
.flexbox {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .cell {
    box-shadow: 1px 1px 5px #eee;

    margin: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      text-align: center;
    }
    img {
      width: 300px;
      display: block;
      padding: 10px 0;
    }
    .image {
      width: 40px;
    }
  }
}
.image {
  display: block;
  width: 40px;
}
.button {
  padding: 0;
  float: right;
}
.dealTitle {
  padding: 10px 0;
  border-bottom: 1px solid rgb(235, 238, 245);
}
.clearfix {
  clear: both;
}
.bottom {
  padding: 10px;
}
.flex1 {
  flex: 1;
}
.flex3 {
  flex: 3;
}
.drawCover {
  opacity: 0.2;
  // border: 1px solid #333;
}
</style>