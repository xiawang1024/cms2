<template>
  <label class="uploader-btn" ref="btn" v-show="support">
    <slot/>
  </label>
</template>

<script>
import { uploaderMixin, supportMixin } from '../common/mixins'

const COMPONENT_NAME = 'uploader-btn'

export default {
  name: COMPONENT_NAME,
  mixins: [uploaderMixin, supportMixin],
  props: {
    directory: {
      type: Boolean,
      default: false
    },
    single: {
      type: Boolean,
      default: false
    },
    attrs: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    attrs (val) {
      console.log(val, 'attr')
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.uploader.uploader.assignBrowse(this.$refs.btn, this.directory, this.single, this.attrs)
    })
  }
}
</script>

<style lang="scss">
  .uploader-btn {
    display: inline-block;
    position: relative;
    padding: 7px 15px;
    font-size: 12px;
    line-height: 1;
    border: 1px solid #666;
    cursor: pointer;
    border-radius: 3px;
    background: none;
    outline: none;
    background-color: #409eff;
    border-color: #409eff;
    color: #fff;
    &:focus{
      color: #409eff;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
    &:hover{
      color: #fff;
      border-color: #66b1ff;
      background-color: #66b1ff;
    }
  }
  .uploader-btn:hover {
    // background-color: rgba(0, 0, 0, .08);
  }
</style>
