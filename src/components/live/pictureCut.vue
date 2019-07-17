<template>
  <div>
    <div >
      <el-button size="mini" type="primary" @click="toggleShow">上传</el-button>
      <my-upload
        field="file"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
        :width="120"
        :height="70"
        url="http://gw.test.dianzhenkeji.com/live-stream/relaystream/addfile"
        :params="params"
        :headers="headers"
        img-format="png"
      />
      <img :src="imgDataUrl" >
    </div>
  </div>
</template>
<script>
import "babel-polyfill"; // es6 shim
import myUpload from "vue-image-crop-upload";
export default {
  components: {
    "my-upload": myUpload
  },
  data() {
    return {
      show: false,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      imgDataUrl: "" // the datebase64 url of created image
    };
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData); //get file url
      this.$emit('getUrl',jsonData)
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
