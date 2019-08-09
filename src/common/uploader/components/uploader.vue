<template>
  <div class="uploader">
    <slot :files="files" :file-list="fileList" :started="started">
      <uploader-unsupport/>
      <uploader-drop>
        <!-- <p>Drop files here to upload or</p> -->
        <div class="bgc-img">
          <uploader-btn>点击选择图片</uploader-btn>
          <!-- <div class="img-desc">或将图片拖拽到这里，单次最多可选择300张</div> -->
        </div>
        <!-- <uploader-btn :directory="true">select folder</uploader-btn> -->
      </uploader-drop>
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

const COMPONENT_NAME = 'uploader'
const FILE_ADDED_EVENT = 'fileAdded'
const FILES_ADDED_EVENT = 'filesAdded'
const UPLOAD_START_EVENT = 'uploadStart'

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
    UploaderFile
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
    }
  },
  data () {
    return {
      started: false,
      files: [],
      fileList: []
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
    uploader.on('fileRemoved', this.fileRemoved)
    uploader.on('filesSubmitted', this.filesSubmitted)
    uploader.on('fileSuccess', this.fileSuccess)
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
    review(file) {
      this.$emit('fileInfor', file)
    },
    uploadStart () {
      this.started = true
    },
    fileAdded (file, event) {
      this.$emit(kebabCase(FILE_ADDED_EVENT), file)
      if (file.ignored) {
        // is ignored, filter it
        return false
      }
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
      this.$emit('fileSuccess', message)
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
