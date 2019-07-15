<template>
  <div >
    <el-dialog
      title="添加直播流"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleVisible"
    >
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" :rules="rules">
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
            <el-radio v-model="ruleForm.logoDistance" label="10:10">左上</el-radio>
            <el-radio v-model="ruleForm.logoDistance" label="main_w-overlay_w-10:10">左下</el-radio>
            <el-radio v-model="ruleForm.logoDistance" label="10:main_h-overlay_h-10">右上</el-radio>
            <el-radio
              v-model="ruleForm.logoDistance"
              label="main_w-overlay_w-10:main_h-overlay_h-10"
            >右下</el-radio>
          </template>
        </el-form-item>
      </el-form>
      
      
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="action"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :auto-upload="false"
        :limit="1"
        :before-upload="beforeAvatarUpload"
      >
        <div slot="tip" class="el-upload__tip">只能上传一张120*70 像素的png格式图片</div>
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      </el-upload>
      <el-button
        style="margin: 20px 0 0 40px ; "
        size="small"
        type="success"
        @click="submitUpload"
      >保存</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // ruleForm: {
      //   userName: "15915315022",
      //   streamPwd: "1234567",
      //   relayStreamUrl: "http://172.20.5.4:8080/live/15136910173.m3u8",
      //   logoDistance: "10:10",
      //   relayTitle: "测试数据",
      //   relayDetails: "测试数据"
      // },
      ruleForm: {
        userName: "",
        streamPwd: "",
        relayStreamUrl: "",
        logoDistance: "10:10",
        relayTitle: "",
        relayDetails: ""
      },
      rules:{
        
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          streamPwd: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          relayStreamUrl: [
            { required: true, message: '请输入直播流地址', trigger: 'blur' }
          ],
          relayTitle: [
            { required: true, message: '请输入转播标题', trigger: 'blur' }
          ],
          relayDetails: [
            { required: true, message: '请输入转播描述', trigger: 'blur' }
          ]
      }
      ,

      action: ""
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.ruleForm = {
          userName: "",
          streamPwd: "",
          relayStreamUrl: "",
          logoDistance: "10:10",
          relayTitle: "",
          relayDetails: ""
        };
      }
    }
  },
  methods: {
    submitUpload() {
      this.action =
        "http://gw.test.dianzhenkeji.com/live-stream/relaystream/addRelayStream?userName=" +
        this.ruleForm.userName +
        "&streamPwd=" +
        this.ruleForm.streamPwd +
        "&relayStreamUrl=" +
        this.ruleForm.relayStreamUrl +
        "&logoDistance=" +
        this.ruleForm.logoDistance +
        "&relayTitle=" +
        this.ruleForm.relayTitle +
        "&relayDetails=" +
        this.ruleForm.relayDetails;
      setTimeout(() => {
        this.$refs.upload.submit();
      }, 1000);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSuccess(res) {
     console.log(res,'res')

      if(res.code==0){
        this.$message({
        type: "success",
        message: res.msg
      });
      this.$refs.upload.clearFiles();
      this.$emit("closeDialog");
      this.$emit("refrashPage")
      }else{
        this.$message({
        type: "error",
        message: res.msg
      });
      }
      
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

      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPNG) {
        this.$message.error("上传头像图片只能是 PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isPNG && isLt2M;
    },
  }
};
</script>
<style lang="scss" scoped>
.upload-demo{
  padding-left: 40px;
}
</style>
