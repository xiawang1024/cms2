<template>
  <div>
    <el-dialog
      title="添加logo"
      :visible.sync="dialogVisible"
      width="45%"
      :before-close="handleVisible"
      append-to-body
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        v-loading="formLoading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.7)"
        align="center"
      >
        <el-form-item
          label="logo"
          prop="logoPath"
          :rules="uprules"
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
       

        <el-form-item label="角标位置" prop="logoDistance">
          <template>
            <el-radio v-model="ruleForm.logoDistance" label="80:50">左上</el-radio>
            <el-radio v-model="ruleForm.logoDistance" label="main_w-overlay_w-80:50">右上</el-radio>
            <el-radio v-model="ruleForm.logoDistance" label="80:main_h-overlay_h-50">左下</el-radio>
            <el-radio
              v-model="ruleForm.logoDistance"
              label="main_w-overlay_w-80:main_h-overlay_h-50"
            >右下</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" @click="submiteSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import baseUrl from "@/config/base-url";
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
            callback(new Error("请上传357*90 像素的logo!"));
          } else {
            callback();
          }
        };
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        logoDistance: "80:50",
        logoPath: ""
      },
      action: baseUrl.BASE_URL + "/live-stream/relaystream/addfile",
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
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$emit("putLogo", this.ruleForm);
          this.$emit("closeDialog");
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