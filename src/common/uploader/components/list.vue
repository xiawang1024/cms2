<template>
  <div class="uploader-list">
    <slot :file-list="fileList">
      <ul>
        <li v-for="(file, index) in fileList" :key="file.id" @click="lookView(file, index)" class="file-list">
          <uploader-file :file="file" :list="true" ref="uploaderFile"/>
        </li>
      </ul>
    </slot>
  </div>
</template>

<script>
import { uploaderMixin } from '../common/mixins'
import UploaderFile from './file.vue'

const COMPONENT_NAME = 'uploader-list'

export default {
  name: COMPONENT_NAME,
  components: {
    UploaderFile
  },
  mixins: [uploaderMixin],
  computed: {
    fileList () {
      return this.uploader.fileList
    }
  },
  methods: {
    lookView(file, index) {
      this.$emit('review', {file, index})
    }
  }
}
</script>

<style lang="scss">
  .uploader-list {
    position: relative;
  }
  .uploader-list > .upload-status {
    position: absolute;
    left:0;
    top:0;
  }
  .uploader-list
  .uploader-list ul {
    list-style: none;
    margin: 0;
    padding: 0
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0
  }
  .file-list {
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid #c0ccda;
    margin-top:10px;
    .uploader-file{
      overflow: hidden;
    }
  }
</style>
