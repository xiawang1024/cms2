<template>
  <transition-group
    tag="ul"
    :class="[
      'el-upload-list',
      'el-upload-list--' + listType,
      { 'is-disabled': disabled }
    ]"
    name="el-list"
  >
    <li
      v-for="file in files"
      :class="['el-upload-list__item', 'is-' + file.status, focusing ? 'focusing' : '', file.uid == imageUid ? 'isActive' : '']"
      :key="file.uid"
      tabindex="0"
      @keydown.delete="!disabled && $emit('remove', file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
      class="define-img-upload"
    >
      <img
        class="el-upload-list__item-thumbnail"
        v-if="file.status !== 'uploading' && ['picture-card', 'picture'].indexOf(listType) > -1"
        :src="file.url" alt=""
      >
      <a class="el-upload-list__item-name" @click="handleClick(file)">
        <i class="el-icon-document"/>{{ file.name }}
      </a>
      <span class="isCover"> {{ coverBoolean(file.coverBool) }}</span>
      <label class="el-upload-list__item-status-label">
        <i :class="{
          'el-icon-upload-success': true,
          'el-icon-circle-check': listType === 'text',
          'el-icon-check': ['picture-card', 'picture'].indexOf(listType) > -1
        }"/>
      </label>
      <i class="el-icon-close" v-if="!disabled" @click="$emit('remove', file)"/>
      <i class="el-icon-close-tip" v-if="!disabled">{{ t('el.upload.deleteTip') }}</i> <!--因为close按钮只在li:focus的时候 display, li blur后就不存在了，所以键盘导航时永远无法 focus到 close按钮上-->
      <el-progress
        v-if="file.status === 'uploading'"
        :type="listType === 'picture-card' ? 'circle' : 'line'"
        :stroke-width="listType === 'picture-card' ? 6 : 2"
        :percentage="parsePercentage(file.percentage)"/>
      <span class="el-upload-list__item-actions" v-if="listType === 'picture-card'">
        <span
          class="el-upload-list__item-preview"
          v-if="handlePreview && listType === 'picture-card'"
          @click="handlePreview(file)"
        >
          <i class="el-icon-zoom-in"/>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="$emit('remove', file)"
        >
          <i class="el-icon-delete"/>
        </span>
      </span>
    </li>
  </transition-group>
</template>
<script>
  import Locale from 'element-ui/src/mixins/locale';
  import ElProgress from 'element-ui/packages/progress';
  import { mapGetters } from 'vuex'
  function noop() {}
  export default {

    name: 'ElUploadList',
    components: { ElProgress },

    mixins: [Locale],

    props: {
      files: {
        type: Array,
        default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      handlePreview: {
      type: Function,
      default: noop
    },
      listType: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        focusing: false
      };
    },
    // computed: {
    //    imageUid() {
    //      return window.sessionStorage.getItem('imageUid')
    //    },
    computed: {
       ...mapGetters(['imageUid'])
    },
    methods: {
      parsePercentage(val) {
        return parseInt(val, 10);
      },
      handleClick(file) {
        this.handlePreview && this.handlePreview(file);
      },
      coverBoolean(flag) {
        if(flag === true) {
          return '已设为封面'
        } else {
          return ''
        }
      }
    }
  };
</script>
<style lang="scss">
  .define-img-upload{
    position: relative;
    .el-upload-list__item-name{
      height:70px;
    }
    .isCover{
      position: absolute;
      bottom:0;
      right:10px;
      color: #67C23A;
    }
    &.isActive{
      border:2px solid #67C23A;
    }
  }
</style>