<template>
  <div class="uploaded-list">
    <transition-group 
      tag="ul"
      class="el-upload-list" name="el-list">
      <li v-for="(successFile, index) in uploadedList" :key="index" @click.stop ="lookView(successFile, index)" class="el-upload-list__item is-success">
        <!-- <uploader-file :file="file" :list="true" ref="uploaderFile"/> -->
        <a class="el-upload-list__item-name">
          <i class="el-icon-document"/>{{ successFile.name || successFile.fileName }}
        </a>
        <label class="el-upload-list__item-status-label">
          <i :class="{
            'el-icon-upload-success': true,
            'el-icon-circle-check': true,
          }"/>
        </label>
        <i class="el-icon-close" @click.stop="$emit('remove', successFile)"/>
      </li>
    
    </transition-group>
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
    lookView(file) {
      this.$emit('lookView', file)
    }
  }
}
</script>

<style lang="scss">
.uploaded-list {
  li {
      border: 1px solid #c0ccda;
      margin-top:10px;
      // transition: all .5s cubic-bezier(.55,0,.1,1);
    }
  }
</style>
