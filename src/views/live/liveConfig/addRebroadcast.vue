<template>
  <div>
    <el-dialog
      title="添加直播流"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleVisible"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
        v-loading="formLoading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.7)"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName" />
        </el-form-item>
        <el-form-item label="密码" prop="streamPwd">
          <el-input v-model="ruleForm.streamPwd" />
        </el-form-item>
        <el-form-item label="直播流地址" prop="relayStreamUrl">
          <el-input v-model="ruleForm.relayStreamUrl" />
        </el-form-item>
        <el-form-item label="转播标题" prop="relayTitle">
          <el-input v-model="ruleForm.relayTitle" />
        </el-form-item>
        <el-form-item label="转播描述" prop="relayDetails">
          <el-input v-model="ruleForm.relayDetails" />
        </el-form-item>

        <el-form-item label="角标位置" prop="logoDistance">
          <template>
            <el-radio v-model="ruleForm.logoDistance" label="noLogo">无</el-radio>
            <el-radio v-model="ruleForm.logoDistance" label="80:50">左上</el-radio>
            <el-radio v-model="ruleForm.logoDistance" label="main_w-overlay_w-80:50">右上</el-radio>
            <el-radio v-model="ruleForm.logoDistance" label="80:main_h-overlay_h-50">左下</el-radio>
            <el-radio
              v-model="ruleForm.logoDistance"
              label="main_w-overlay_w-80:main_h-overlay_h-50"
            >右下</el-radio>
          </template>
        </el-form-item>
        <el-form-item
          label="logo"
          prop="logoPath"
          v-show="ruleForm.logoDistance!='noLogo'"
          :rules="ruleForm.logoDistance!='noLogo'?uprules:noUprules"
        >
          <el-upload
            ref="logoupload"
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :on-success="handleSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.logoPath" :src="ruleForm.logoPath" class="avatar" >
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- <pictureCut @getUrl="getUrl"/> -->
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="submiteSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import pictureCut from '@/components/live/pictureCut'
import baseUrl from "@/config/base-url";

import { addrebroadcast } from "@/api/live/steamAdressManage.js";
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  // components:{pictureCut},
  data() {
    //图片尺寸验证
    var sizeCheck = (rule, value, callback) => {
      // console.log(value, "value");
      if (value) {
        let Img = new Image();
        Img.src = value;
        Img.onload = function() {
          if (Img.width != 357 && Img.height != 90) {
            callback(new Error("请上传357*90像素的logo!"));
          } else {
            callback();
          }
        };
      } else {
        callback();
      }
    };

    return {
      // ruleForm: {
      //   userName: "15915315022",
      //   streamPwd: "1234567",
      //   relayStreamUrl: "https://30539.hlsplay.aodianyun.com/lms_30539/tv_channel_296.m3u8",
      //   logoDistance: "10:10",
      //   relayTitle: "测试数据",
      //   relayDetails: "测试数据",
      //   logoPath: ""
      // },

      ruleForm: {
        userName: "",
        streamPwd: "",
        relayStreamUrl: "",
        logoDistance: "80:50",
        relayTitle: "",
        relayDetails: "",
        logoPath: ""
      },
      action: baseUrl.BASE_URL + "/live-stream/relaystream/addfile",
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        streamPwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        relayStreamUrl: [
          { required: true, message: "请输入直播流地址", trigger: "blur" }
        ],
        relayTitle: [
          { required: true, message: "请输入转播标题", trigger: "blur" }
        ],
        relayDetails: [
          { required: true, message: "请输入转播描述", trigger: "blur" }
        ]
      },
      uprules: [
        {
          required: true,
          message: "请上传一张357*90 像素的png格式图片",
          trigger: "blur"
        },
        { validator: sizeCheck, trigger: "blur" }
      ],
      noUprules: [],

      formLoading: false
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.ruleForm = {
          userName: "",
          streamPwd: "",
          relayStreamUrl: "",
          logoDistance: "noLogo",
          relayTitle: "",
          relayDetails: "",
          logoPath: ""
        };
      }
    }
  },
  methods: {
    // getUrl(val){
    //   this.ruleForm.logoPath=val;
    // },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleSuccess(res) {
      var _this = this;
      _this.ruleForm.logoPath = res.logoPath;
    },
    handleError() {
      this.$message({
        type: "error",
        message: "上传失败"
      });
    },
    handleVisible() {
      this.$emit("closeDialog");
    },
    // ----------

    beforeAvatarUpload(file) {
      console.log((file, "file"));
      if (file) {
        const isPNG = file.type === "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isPNG) {
          this.$message.error("上传头像图片只能是 PNG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isPNG && isLt2M;
      } else {
        return true;
      }
    },
    submiteSave() {
      var _this = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.formLoading = true;
          if (this.ruleForm.logoDistance == "noLogo") {
            this.ruleForm.logoPath = "";
          }
          return new Promise((resolve, reject) => {
            addrebroadcast(this.ruleForm)
              .then(response => {
                if (response.data.code == 0) {
                  this.$message({
                    type: "success",
                    message: response.data.msg
                  });

                  _this.$refs.logoupload.clearFiles();
                  // _this.handleVisible();
                  _this.$emit("closeDialog");
                  _this.$emit("refrashPage");
                } else {
                  this.$message({
                    type: "error",
                    message: response.data.msg
                  });
                }
                _this.formLoading = false;
                resolve();
              })
              .catch(error => {
                // console.log(error);
                _this.formLoading = false;
                reject(error);
              });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  // border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 357px;
  height: 90px;
  display: block;
}
</style>