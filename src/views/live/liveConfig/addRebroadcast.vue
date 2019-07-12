<template>
  <div>
    <el-dialog title="添加直播流" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="ruleForm.userName"/>
        </el-form-item>
        <el-form-item label="密码" prop="streamPwd">
          <el-input v-model="ruleForm.streamPwd"/>
        </el-form-item>
        <el-form-item label="直播流地址" prop="relayStreamUrl">
          <el-input v-model="ruleForm.relayStreamUrl"/>
        </el-form-item>
        <el-form-item label="转播标题" prop="relayTitle">
          <el-input v-model="ruleForm.relayTitle"/>
        </el-form-item>
        <el-form-item label="转播描述" prop="relayDetails">
          <el-input v-model="ruleForm.relayDetails"/>
        </el-form-item>

        <el-form-item label="角标位置" prop="logoDistanceL">
          <el-select v-model="ruleForm.logoDistanceL" placeholder="请选择角标位置">
            <el-option label="左上" value="10:10"/>
            <el-option label="左下" value="main_w-overlay_w-10:10"/>
            <el-option label="右上" value="10:main_h-overlay_h-10"/>
            <el-option label="右下" value="main_w-overlay_w-10:main_h-overlay_h-10"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div/>
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="action"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList"
        :auto-upload="false"
      >
        <div slot="tip" class="el-upload__tip">只能上传12*70 像素的png文件</div>
        <el-button slot="trigger" size="small" style="margin-left: 30px ;" type="primary">选取文件</el-button>
        
      </el-upload>
      <el-button
        style="margin: 20px 0 0 30px ;"
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
      default: true
    }
  },
  data() {
    return {
      ruleForm: {
        userName: "15915315022",
        streamPwd: "1234567",
        relayStreamUrl:
          "http://172.20.5.4:8080/vod/2019/7/11/1513691017320190711170518.mp4/index.m3u8",
        logoDistanceL: "10:10",
        relayTitle: "新加的",
        relayDetails: "新加的"
      },

      action: ""
    };
  },
  methods: {
    // ------------------测试
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
    handleSuccess() {
      this.$message({
        type: "success",
        message: "上传成功"
      });
      this.$emit('closeDio')
    },
    handleError() {
      this.$message({
        type: "error",
        message: "上传失败"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
