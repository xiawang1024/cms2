<template>
  <div>
    <el-row>
      <el-col :span="5" class="smallmargin">
        <vcard
          :imgurl="bigImgUrl"
          :imgurl2="smallImgUrl"
          :description="bigDescription"
          :description2="smallDescription"
          :version="version"
          @handleEdite="handleEdite"
          :pic-type="0"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5" class="smallmargin">
        <vcard
          :imgurl="themeImageUrl"
          :version="version"
          :description="themeDescription"
          @handleEdite="handleEdite"
          :pic-type="1"
        />
      </el-col>
      <el-col :span="5" class="smallmargin">
        <vcard
          :imgurl="myImageUrl"
          :version="version"
          :description="myDescription"
          @handleEdite="handleEdite"
          :pic-type="2"
        />
      </el-col>
      <el-col :span="5" class="smallmargin">
        <el-card :body-style="{ padding: '0px' }">
          <div v-for="(item,index) in tabBarList" :key="index">
            <div class="flexbox">
              <img :src="item.icon0" class="image">
              <img :src="item.icon1" class="image">
            </div>
           
            <div style="padding: 14px;">
              <span>{{ item.name }}</span>
            </div>
          </div>
          <div class="bottom clearfix" >
            <time class="time">底部导航图</time>
            <el-button type="text" class="button" align="right" @click="handleUp(item.id)">编辑</el-button>
          </div>
           

        </el-card>
      </el-col>
    </el-row>

    <!-- 上传组件 -->
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
      <upload-app @handleupload="handleupload" />
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleTheme" :title="dialogTitle">
      <single-picture @handleupload="themeupload"/>
    </el-dialog>

    <el-dialog :visible.sync="dialogVisibleMyImage" :title="dialogTitle">
      <single-picture @handleupload="MyImageupload"/>
    </el-dialog>
  </div>
</template>
<script>
import uploadApp from "@/views/cms/system-set/appConfig/index.vue";
import singlePicture from "@/views/cms/system-set/appConfig/singlePicture.vue";

import vcard from "@/views/cms/system-set/appConfig/card.vue";

import {
  addOpenimage,
  getOpenimage,
  updateOpenimage,
  getThemeimage,
  addthemeimage,
  getMyimage,
  addMyimage,
  geticon,

} from "@/api/cms/appConfig.js";
export default {
  components: { uploadApp, vcard, singlePicture },

  data() {
    return {
      fullTabList: "",
      dialogVisible: false,
      dialogVisibleTheme: false,
      dialogVisibleMyImage: false,
      dialogTitle: "",
      bigDescription: "开机启动图（大）",
      smallDescription: "开机启动图（小）",
      themeDescription: "导航图",
      myDescription: "我的主题图片",
      bigImgUrl: "",
      smallImgUrl: "",
      themeImageUrl: "",
      myImageUrl: "",
      appId: this.$route.query.appId,
      BaseInfor: "",
      version: "",
      openImageId: "",
      themeImageId: "",
      myImageId: "",
      tabBarList:[],
    };
  },
  created() {
    this.BaseInfor = JSON.parse(localStorage.getItem("BaseInfor"));
  },
  mounted() {
    this.getFullTab();
    this.getThemePicture();
    this.Myimage();
    this.getTabBar();
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
              this.bigImgUrl = res.data.result.bigImageUrl;
              this.smallImgUrl = res.data.result.smallImageUrl;
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
    //获取导航图
    getThemePicture() {
      var _this = this;
      let data = {
        appId: this.appId,
        tenantId: this.BaseInfor.clientLicenseId
      };
      return new Promise((resolve, reject) => {
        getThemeimage(data)
          .then(res => {
            console.log(res, "res");
            if (res.data.code == 0) {
              this.themeImageUrl = res.data.result.themeImageUrl;
              this.version = res.data.result.version;
              this.themeImageId = res.data.result.id || null;
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
    //获取我的主题图片
    Myimage() {
      var _this = this;
      let data = {
        appId: this.appId,
        tenantId: this.BaseInfor.clientLicenseId
      };
      return new Promise((resolve, reject) => {
        getMyimage(data)
          .then(res => {
            if (res.data.code == 0) {
              this.myImageUrl = res.data.result.myImageUrl;
              this.version = res.data.result.version;
              this.myImageId = res.data.result.id || null;
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
    //获取icon
    getTabBar() {
      var _this = this;
      let data = {
        appId: this.appId,
        tenantId: this.BaseInfor.clientLicenseId
      };
      return new Promise((resolve, reject) => {
        geticon(data)
          .then(res => {
            if (res.data.code == 0) {
              this.tabBarList = res.data.result
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
      if (type === 0) {
        //启动图编辑
        this.dialogTitle = "启动图编辑";
        //调用上传组件
        this.dialogVisible = true;
      }
      if (type === 1) {
        //导航图编辑
        this.dialogTitle = "导航图编辑";
        //调用上传组件
        this.dialogVisibleTheme = true;
      }
      if (type === 2) {
        //我的主题图编辑
        this.dialogTitle = "我的主题图编辑";
        //调用上传组件
        this.dialogVisibleMyImage = true;
      }
    },
    handleupload(val, type) {
      var _this = this;
      console.log(val, type, "asdf");
      if (type == "start") {
        //新增开机图
        let data = {
          appId: this.appId,
          bigImageUrl: val.startPictureBig[0].url,
          createUser: this.BaseInfor.userName,
          id: this.openImageId,
          smallImageUrl: val.startPictureSmall[0].url,
          tenantId: this.BaseInfor.clientLicenseId,
          updateUser: this.BaseInfor.userName,
          version: val.version,
          operationUser: "",
          clientLicenseId: this.BaseInfor.clientLicenseId
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
                  this.$message.success("成功");
                } else {
                  this.$message.error("失败");
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
    themeupload(val) {
      var _this = this;
      let data = {
        appId: this.appId,
        themeImageUrl: val.themeImage[0].url,
        createUser: this.BaseInfor.userName,
        id: this.themeImageId,
        tenantId: this.BaseInfor.clientLicenseId,
        updateUser: this.BaseInfor.userName,
        version: val.version,
        operationUser: this.BaseInfor.userName,
        clientLicenseId: this.BaseInfor.clientLicenseId
      };
      return new Promise((resolve, reject) => {
        addthemeimage(data)
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
            _this.dialogVisibleTheme = false;
            _this.getThemePicture();
            resolve();
          })
          .then(err => {
            reject(err);
          });
      });
    },
    MyImageupload(val) {
      var _this = this;
      let data = {
        appId: this.appId,
        myImageUrl: val.themeImage[0].url,
        createUser: this.BaseInfor.userName,
        id: this.myImageId,
        tenantId: this.BaseInfor.clientLicenseId,
        updateUser: this.BaseInfor.userName,
        version: val.version,
        operationUser: this.BaseInfor.userName,
        clientLicenseId: this.BaseInfor.clientLicenseId
      };
      return new Promise((resolve, reject) => {
        addMyimage(data)
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
            _this.dialogVisibleMyImage = false;
            _this.Myimage();
            resolve();
            //刷新起动图
            _this.getFullTab();
          })
          .then(err => {
            reject(err);
          });
      });
    },
    handleUp(){

    }
  }
};
</script>
<style lang="scss" scoped>
.smallmargin{
    margin:5px;
}
.flexbox{
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.image{
    display: block;
    width: 60px;
}
.button {
  padding: 0;
  float: right;
}
</style>