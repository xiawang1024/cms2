<template>
  <div class="mainbox">
    <!-- 一键换肤 -->
    <el-row class="secondMargin">
      <el-col class="dealTitle">
        <el-button type="primary" size="mini" @click="handleUp" v-show="!skinId">新增</el-button>
        <el-button type="primary" size="mini" @click="handleUp" v-show="skinId">编辑</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="handleEnable"
          v-show="skinConfig.status"
          :disabled="skinConfig.length==0"
        >禁用皮肤</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="handleEnable"
          v-show="!skinConfig.status"
          :disabled="skinConfig.length==0"
        >启用皮肤</el-button>
        <span>(主题管理 版本：{{ skinConfig.version }})</span>
      </el-col>
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }" :class="skinConfig.status?'':'drawCover'">
          <el-col class="flexbox">
            <div class="cell">
              <img :src="skinConfig.themeImageUrl" >
              <div style="padding: 14px;">
                <span>导航图</span>
              </div>
            </div>
            <div class="cell">
              <img :src="skinConfig.myImageUrl" >
              <div style="padding: 14px;">
                <span>我的背景图</span>
              </div>
            </div>
            <div class="cell" v-for="(item,index) in skinConfig.navigations" :key="index">
              <img :src="item.icon0" class="image" >
              <img :src="item.icon1" class="image" >
              <div style="padding: 14px 0;">
                <span>{{ item.name }}</span>
              </div>
            </div>
            <div class="cell">
              <div class="block">
                <el-color-picker v-model="skinConfig.color" />
              </div>
              <div style="padding: 14px;">
                <span>我的主题色</span>
              </div>
            </div>
          </el-col>
        </el-card>
      </el-col>
    </el-row>

    <!-- 上传组件 -->
    <el-dialog :visible.sync="dialogVisibleIcon" :title="dialogTitle">
      <tabbar @iconUpload="iconUpload" :form-data="formValue" />
    </el-dialog>
  </div>
</template>
<script>
import tabbar from "@/views/cms/system-set/appConfig/tabbarConfig.vue";
import {
  getSkin,
  addSkin,
  forbidden,
  startforbidden
} from "@/api/cms/appConfig.js";
export default {
  components: {
    tabbar
  },

  data() {
    return {
      dialogVisibleIcon: false,
      dialogTitle: "",
      appId: this.$route.query.appId,
      skinId: "",
      skinConfig: [],
      formValue: {}
    };
  },
  created() {
    this.BaseInfor = JSON.parse(localStorage.getItem("BaseInfor"));
  },
  mounted() {
    this.skinList();
  },
  methods: {
    //查询皮肤列表
    skinList() {
      let data = {
        appId: this.appId,
        tenantId: this.BaseInfor.clientLicenseId
      };
      return new Promise((resolve, reject) => {
        getSkin(data)
          .then(res => {
            if (res.data.code == 0) {
              (this.skinConfig = res.data.result),
                (this.formValue = {
                  name0: res.data.result.navigations[0].name,
                  name1: res.data.result.navigations[1].name,
                  name2: res.data.result.navigations[2].name,
                  name3: res.data.result.navigations[3].name,
                  name4: res.data.result.navigations[4].name,
                  version: res.data.result.version,
                  status1: res.data.result.status,
                  color: res.data.result.color
                });
              this.skinId = res.data.result.id || null;
            } else {
              this.$message.error(res.data.msg);
            }

            resolve();
          })
          .then(err => {
            reject(err);
          });
      });
    },

    //底部导航编辑
    handleUp() {
      this.dialogVisibleIcon = true;
    },
    iconUpload(val) {
      var _this = this;
      let data = {
        appId: this.appId,
        id: this.skinId,
        myImageUrl: val.myImageUrl[0].url,
        navigations: [],
        status: val.status,
        tenantId: this.BaseInfor.clientLicenseId,
        themeImageUrl: val.themeImageUrl[0].url,
        version: val.version,
        color: val.color
      };
      let iconId = [];
      if (this.skinConfig.navigations) {
        this.skinConfig.navigations.forEach(element => {
          iconId.push(element.id);
        });
      }

      data.navigations.push({
        icon0: val.icon00[0].url,
        icon1: val.icon10[0].url,
        id: iconId[0] || "",
        name: val.name0,
        type: "",
        version: val.version
      });
      data.navigations.push({
        icon0: val.icon01[0].url,
        icon1: val.icon11[0].url,
        id: iconId[1] || "",
        name: val.name1,
        type: "",
        version: val.version
      });
      data.navigations.push({
        icon0: val.icon02[0].url,
        icon1: val.icon12[0].url,
        id: iconId[2] || "",
        name: val.name2,
        type: "",
        version: val.version
      });
      data.navigations.push({
        icon0: val.icon03[0].url,
        icon1: val.icon13[0].url,
        id: iconId[3] || "",
        name: val.name3,
        type: "",
        version: val.version
      });
      data.navigations.push({
        icon0: val.icon04[0].url,
        icon1: val.icon14[0].url,
        id: iconId[4] || "",
        name: val.name0,
        type: "",
        version: val.version
      });

      //调用保存接口
      return new Promise((resolve, reject) => {
        addSkin(data)
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
            } else {
              this.$message.error(res.data.msg);
            }
            _this.dialogVisibleIcon = false;
            _this.skinList();
            resolve();
          })
          .then(err => {
            reject(err);
          });
      });
    },
    handleEnable() {
      var _this = this;
      if (this.skinConfig.status) {
        //启用状态禁用
        let data = {
          appId: this.appId,
          status: "false",
          tenantId: this.BaseInfor.clientLicenseId
        };
        return new Promise((resolve, reject) => {
          forbidden(data)
            .then(res => {
              if (res.data.code == 0) {
                this.$message.success("已禁用");
              } else {
                this.$message.error(res.data.msg);
              }
              _this.skinList();
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
          status: "true",
          tenantId: this.BaseInfor.clientLicenseId
        };
        return new Promise((resolve, reject) => {
          forbidden(data)
            .then(res => {
              if (res.data.code == 0) {
                this.$message.success("已启用");
              } else {
                this.$message.error(res.data.msg);
              }
              _this.skinList();
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