<template>
  <uploader
    :options="options"
    :file-status-text="statusText"
    class="uploader-example"
    ref="uploader"
    @file-complete="fileComplete"
    @complete="complete"
    @file-added="onFileAdded"
  />
</template>

<script>
import { needMerge } from "@/api/live/fileUpload.js";
import SparkMD5 from "spark-md5";
export default {
  data() {
    return {
      options: {
        target: "http://fupload.test.dianzhenkeji.com/chunk/chunk",
        testChunks: true,
        simultaneousUploads: 1,
        //后端约定值20M （勿改）
        chunkSize: 20* 1024 * 1024,
        // 服务器分片校验函数，秒传及断点续传基础
        checkChunkUploadedByResponse: function(chunk, message) {
          let objMessage = JSON.parse(message);
          if (objMessage.result.skipUpload) {
            return true;
          }
          return (objMessage.result.uploadedChunkList || []).indexOf(chunk.offset + 1) >= 0;
        }
      },
      attrs: {
        accept: "image/*"
      },
      statusText: {
        success: "成功了",
        error: "出错了",
        uploading: "上传中",
        paused: "暂停中",
        waiting: "等待中"
      }
    };
  },
   computed: {
    //Uploader实例
    uploader() {
      return this.$refs.uploader.uploader;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.uploader = this.$refs.uploader.uploader;
    });
  },
  methods: {
    onFileAdded(file) {
      this.computeMD5(file);

    },
    // 上传完成
    complete() {
      console.log("complete", arguments);
    },
    // 一个根文件（文件夹）成功上传完成。
    fileComplete() {
      const file = arguments[0].file;
      return new Promise((resolve, reject) => {
        needMerge({
          filename: file.name,
          identifier: arguments[0].uniqueIdentifier,
          totalSize: file.size,
          type: file.type
        })
          .then(response => {
            //文件合并成功;
            //返回资源路径
           console.log('http://cmsres.test.dianzhenkeji.com'+response.data.result.filePath);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    /**
     * 计算md5，实现断点续传及秒传
     * @param file
     */
    computeMD5(file) {
      let fileReader = new FileReader();
      //   let time = new Date().getTime();
      let blobSlice =
        File.prototype.slice ||
        File.prototype.mozSlice ||
        File.prototype.webkitSlice;
      let currentChunk = 0;
      const chunkSize = 10 * 1024 * 1000;
      let chunks = Math.ceil(file.size / chunkSize);
      let spark = new SparkMD5.ArrayBuffer();
      file.pause();

      loadNext();

      fileReader.onload = e => {
        spark.append(e.target.result);

        if (currentChunk < chunks) {
          currentChunk++;
          loadNext();
        } else {
          let md5 = spark.end();
          this.computeMD5Success(md5, file);
        }
      };

      fileReader.onerror = function() {
        this.error(`文件${file.name}读取出错，请检查该文件`);
        file.cancel();
      };

      function loadNext() {
        let start = currentChunk * chunkSize;
        let end =
          start + chunkSize >= file.size ? file.size : start + chunkSize;

        fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
      }
    },

    computeMD5Success(md5, file) {
      // 将自定义参数直接加载uploader实例的opts上
      Object.assign(this.uploader.opts, {
        query: {
          ...this.params
        }
      });
      file.uniqueIdentifier = md5;
      file.resume();
    }
  }
};
</script>