<template>
  <div>
    <el-dialog title="预览" :visible.sync="playVisible" width="860px" :before-close="handleClose">
      <video :src="shareStream" style="width:100%" controls ref="streamVideo" />
    </el-dialog>
  </div>
</template>

<script>
import Hls from "hls.js";
export default {
  props: {
    //传入流地址
    shareStream: {
      type: String,
      default: ""
    },
    playVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    streamPlayer() {
      var node = this.$refs.streamVideo;
      if (Hls.isSupported) {
        let hls = new Hls();
        //地址处理
        hls.loadSource(this.shareStream);
        hls.attachMedia(node);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          node.play();
        });
      }
    },
    handleClose() {
      this.$refs.streamVideo.pause();
      this.$emit('update:playVisible',false)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>