<template>
  <div class="mainBox">
    <el-row>
      <el-col :span="2" >
        <label>微信号</label>
      </el-col>
      <el-col :span="5">
        <el-input size="small" v-model="weChatId" type="text" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" :offset="5">
        <el-button size="mini" type="primary" @click="wxtest">测试</el-button>
        <el-button size="mini" type="primary" @click="wxsave">保存</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="2">
        <label>微信认证</label>
      </el-col>
      <el-col :span="5">
        <el-input size="small" v-model="wxData.wechatCertification" type="text" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <label>功能介绍</label>
      </el-col>
      <el-col :span="5">
        <el-input size="small" v-model="wxData.wechatFeatures" type="text" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <label>公众号名称</label>
      </el-col>
      <el-col :span="5">
        <el-input size="small" v-model="wxData.wechatName" type="text" />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2">
        <label>页面URL</label>
      </el-col>
      <el-col :span="5">
        <el-input size="small" v-model="wxData.wechatUrl" type="text" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { wxTestRequest, wxSaveRequest } from "@/api/cms/beeClect.js";
export default {
  data() {
    return {
      weChatId: "",
      wxData: {}
    };
  },
  created() {},
  methods: {
    wxcheck() {
      if (
        this.wxData.wechatCertification == "" ||
        this.wxData.wechatCertification == null
      ) {
        this.$message.error("微信认证不能为空！");
        return false;
      }
      if (
        this.wxData.wechatFeatures == "" ||
        this.wxData.wechatFeatures == null
      ) {
        this.$message.error("功能介绍不能为空！");
        return false;
      }
      if (this.wxData.wechatName == "" || this.wxData.wechatName == null) {
        this.$message.error("公众号名称不能为空！");

        return false;
      }
      if (this.wxData.wechatUrl == "" || this.wxData.wechatUrl == null) {
        this.$message.error("页面URL不能为空！");

        return false;
      }
      return true;
    },
    wxtest() {
      if (this.weChatId == "" || this.weChatId == null) {
        this.$message.error("微信号不能为空！");

        return false;
      }
      var _this = this;
      return new Promise((resolve, reject) => {
        wxTestRequest(_this.weChatId)
          .then(response => {
            if (response.data.status == "success") {
              _this.wxData = response.data.data;
            } else {
              _this.$message.error(response.data.data);
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    wxsave() {
      let flag = this.wxcheck();
      if (flag) {
        var _this = this;

        return new Promise((resolve, reject) => {
          wxSaveRequest(_this.wxData.wechatNumber, _this.wxData.wechatName)
            .then(response => {
              if (response.data.status == "success") {
                _this.$message.success("保存成功");
              } else {
                _this.$message.error(response.data.data);
              }
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.mainBox {
  padding: 15px;
  .el-row {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  label {
    color: #909399;
    font-weight: 700;
    font-size: 14px;
  }
}
</style>