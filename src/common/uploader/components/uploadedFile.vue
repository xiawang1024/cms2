<template>
  <div class="uploaded-list">
    <ul class="">
      <li v-for="(successFile, index) in uploadedList" :key="index" @click="lookView(successFile, index)" class="el-upload-list__item is-success">
        <!-- <uploader-file :file="file" :list="true" ref="uploaderFile"/> -->
        <a class="el-upload-list__item-name">
          <i class="el-icon-document"/>{{ successFile.name }}
        </a>
        <label class="el-upload-list__item-status-label">
          <i :class="{
            'el-icon-upload-success': true,
            'el-icon-circle-check': true,
          }"/>
        </label>
        <i class="el-icon-close" @click="$emit('remove', successFile)"/>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'UPLOADEDFILE',
  components: {
  },
  props: {
    uploadedList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
  },
  methods: {
    lookView(file, index) {
      console.log(file, index)
    }
  }
}
</script>

<style lang="scss">
.uploaded-list {
  li {
      border: 1px solid #c0ccda;
      margin-top:10px;
    }
  }
</style>
