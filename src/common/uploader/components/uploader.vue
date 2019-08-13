<template>
  <div class="uploader">
    <slot :files="files" :file-list="fileList" :started="started">
      <uploader-unsupport/>
      <uploader-drop>
        <!-- <p>Drop files here to upload or</p> -->
        <div class="bgc-img">
          <uploader-btn ref="uploadBtn">点击上传</uploader-btn>
          <!-- <div class="img-desc">或将图片拖拽到这里，单次最多可选择300张</div> -->
        </div>
        <!-- <uploader-btn :directory="true">select folder</uploader-btn> -->
      </uploader-drop>
      <uploaded-file :uploaded-list = "successFiles" @remove="remove" @lookView="lookView"/>
      <uploader-list @review="review"/>
    </slot>
  </div>
</template>

<script>
import Uploader from 'simple-uploader.js'
import { kebabCase } from '../common/utils'
import UploaderBtn from './btn.vue'
import UploaderDrop from './drop.vue'
import UploaderUnsupport from './unsupport.vue'
import UploaderList from './list.vue'
import UploaderFiles from './files.vue'
import UploaderFile from './file.vue'
import UploadedFile from './uploadedFile'
const COMPONENT_NAME = 'uploader'
const FILE_ADDED_EVENT = 'fileAdded'
const FILES_ADDED_EVENT = 'filesAdded'
const UPLOAD_START_EVENT = 'uploadStart'
const UPLOAD_CHANGE = 'change'
export default {
  name: COMPONENT_NAME,
  provide () {
    return {
      uploader: this
    }
  },
  components: {
    UploaderBtn,
    UploaderDrop,
    UploaderUnsupport,
    UploaderList,
    UploaderFiles,
    UploaderFile,
    UploadedFile
  },
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    autoStart: {
      type: Boolean,
      default: true
    },
    fileStatusText: {
      type: [Object, Function],
      default () {
        return {
          success: 'success',
          error: 'error',
          uploading: 'uploading',
          paused: 'paused',
          waiting: 'waiting'
        }
      }
    },
    defaultFileList: {
      type: Array,
      default () {
        return []
      }
    },
    uploaderName: {
      type: String,
      default: ''
    },
    onRemove: {
      type: Function,
      default: function() {}
    },
    onPreview: {
      type: Function,
      default: function() {}
    },
    maxSize: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 0
    },
    accept: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      started: false,
      files: [],
      fileList: [],
      successFiles: []
    }
  },
  watch: {
    defaultFileList(val) {
      this.successFiles = val.map((ele) => {
        return ele
      })
      console.log(this.successFiles, 'this.successFiles')
    }
  },
  created () {
    this.options.initialPaused = !this.autoStart
    const uploader = new Uploader(this.options)
    this.uploader = uploader
    this.uploader.fileStatusText = this.fileStatusText
    uploader.on('catchAll', this.allEvent)
    uploader.on(FILE_ADDED_EVENT, this.fileAdded)
    uploader.on(FILES_ADDED_EVENT, this.filesAdded)
    uploader.on(UPLOAD_CHANGE, this.uploadChange)
    uploader.on('fileRemoved', this.fileRemoved)
    uploader.on('filesSubmitted', this.filesSubmitted)
    uploader.on('fileSuccess', this.fileSuccess)
    // this.uploader.addFile(rFile)
    // this.$nextTick(() => {
    //   console.log(this.defaultFileList, '默认列表')
    // })
    // if(this.defaultFileList.length) {
    //   this.defaultFileList.forEach((ele) => {
    //     let rFile = new File(['xx'], 'image1.jpg', {
    //       type: 'video/*',
    //     })
    //     rFile.url = '1111'
    //     console.log(rFile, 'rFile')
    //     this.uploader.addFile(rFile)
    //   })
    // }
  },
  destroyed () {
    const uploader = this.uploader
    uploader.off('catchAll', this.allEvent)
    uploader.off(FILE_ADDED_EVENT, this.fileAdded)
    uploader.off(FILES_ADDED_EVENT, this.filesAdded)
    uploader.off('fileRemoved', this.fileRemoved)
    uploader.off('filesSubmitted', this.filesSubmitted)
    uploader.off('fileSuccess', this.fileSuccess)
    this.uploader = null
  },
  methods: {
    // 点击查看文件
    lookView(file) {
      // console.log(file, 'lookView')
      this.onPreview(file)
    },
    remove(file, index) {
      console.log(file, index)
      this.onRemove(file, this.successFiles)
    },
    review(file, index) {
      this.$emit('fileInfor', {file, index})
    },
    uploadStart () {
      this.started = true
      // console.log('start')
    },
    fileAdded (file, event) {
      console.log(file, 'file')
      console.log(event, 'event')
      this.$emit(kebabCase(FILE_ADDED_EVENT), file)
      if (file.ignored) {
        // is ignored, filter it
        return false
      }
    },
    uploadChange(event) {
      // console.log(event, 'event111')
      // console.log(this.$refs.uploadBtn.$refs.btn, '11')
      this.uploader.uploader.assignBrowse(this.$refs.uploadBtn.$refs.btn, false, true, {
        accept: 'video/mp4'
      })
      // this.$refs.uploadBtn.attrs = {
      //   directory: false,
      //   single: false,
      //   support: true,
      //   accept: 'video/mp4'
      // }
    },
    filesAdded (files, fileList) {
      this.$emit(kebabCase(FILES_ADDED_EVENT), files, fileList)
      if (files.ignored || fileList.ignored) {
        // is ignored, filter it
        return false
      }
    },
    fileRemoved (file) {
      this.files = this.uploader.files
      this.fileList = this.uploader.fileList
    },
    filesSubmitted (files, fileList) {
      this.files = this.uploader.files
      this.fileList = this.uploader.fileList
      if (this.autoStart) {
        this.uploader.upload()
      }
    },
    fileSuccess(rootFile, file, message, chunk) {
      file.cmsPath = JSON.parse(message)
      // console.log(message, 'message')
      // console.log(rootFile, 'rootFile')
      // console.log(file, 'file')
      // console.log(this.uploaderName, 'uploaderName')
      file.uploaderName = this.uploaderName
      this.$emit('fileSuccess', file)
      if (file.ignored || rootFile.ignored) {
        return false
      }
    },
    allEvent (...args) {
      const name = args[0]
      const EVENTSMAP = {
        [FILE_ADDED_EVENT]: true,
        [FILES_ADDED_EVENT]: true,
        [UPLOAD_START_EVENT]: 'uploadStart'
      }
      const handler = EVENTSMAP[name]
      if (handler) {
        if (handler === true) {
          return
        }
        this[handler].apply(this, args.slice(1))
      }
      args[0] = kebabCase(name)
      this.$emit.apply(this, args)
    }
  }
}
</script>

<style lang="scss">
  .uploader {
    position: relative;
  }
  .bgc-img {
    width:300px;
    height:200px;
    .img-desc {
      color:#ccc;
    }
  }
   .bgc-img > .uploader-btn {
     margin-top:100px;
   }
</style>
