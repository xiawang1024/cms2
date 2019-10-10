<template>
  <div id="videoEdite">
    <div class="input-container">
      <!-- <span>视频链接：</span> -->
      <!-- <input type="text" v-model="video_url"/> -->
    </div>
    <video ref="video" :src="video_url" controls width="600px" />
    <CropTool
      ref="CropTool"
      :duration="duration"
      :playing="playing"
      :current-playing-time="currentTime"
      @play="playVideo"
      @pause="pauseVideo"
      @stop="stopVideo"
      @cutResult="cutResult"
      @cutList="propCutList"
      @CloseDialog="playReset"
      @audioPlay="audioPlay"
    />
    <!-- <audioWave :audio_url="audio_url" :cut-list="cutList" ref="audioWave"/> -->
    <div style="margin:10px;"/>
    <logoEdite :cut-list="cutList" :duration="duration" @putLogo="putLogo"/>
  </div>
</template>
<script>
import CropTool from "@/components/videoCut/CropTool.vue";
// import audioWave from "@/components/videoCut/audio.vue";
import logoEdite from "@/components/videoCut/logoEdite.vue";
export default {
  name: "VideoEdite",
  components: {
    CropTool,
    // audioWave,
    logoEdite
  },
  props: {
    audio_url: {
      type: String,
      default: ""
    },
    video_url: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      duration: 0,
      playing: false,
      currentTime: 0,
      cutList: []
    };
  },
 
  mounted() {
    const videoElement = this.$refs.video;
    videoElement.ondurationchange = () => {
      this.duration = videoElement.duration;
    };
    videoElement.onplaying = () => {
      this.playing = true;
    };
    videoElement.onpause = () => {
      this.playing = false;
    };
    videoElement.ontimeupdate = () => {
      this.currentTime = videoElement.currentTime;
    };
  },
  methods: {
    seekVideo(seekTime) {
      this.$refs.video.currentTime = seekTime;
    },
    playVideo(time) {
      this.seekVideo(time);
      this.$refs.video.play();
    },
    pauseVideo() {
      this.$refs.video.pause();
    },
    stopVideo() {
      this.$refs.video.pause();
      this.$refs.video.currentTime = 0;
    },
    putLogo(index,val){
         Object.assign( this.cutList[index], val);


    },
    cutResult(val) {
      // this.cutList = val;
      //组件数据传递出去
      this.$emit("cutResult", this.cutList);
      
    },
    // 裁剪值
    propCutList(val) {
      this.cutList = val;
    },
    //停止播放
    playReset() {
        this.$refs.video.pause();
        this.$refs.CropTool.reset();
    },
    //播放选中片段（音频weavsufer）
    audioPlay(index){
      //取反
      let audioList=JSON.parse(JSON.stringify(this.cutList)).reverse();
      let start=audioList[index].startTime;
      let end=audioList[index].endTime;
      this.$refs.audioWave.myplay(start,end)
    }
  }
};
</script>
<style lang="scss" scoped>
#videoEdite {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .input-container {
    margin-bottom: 10px;
    input {
      width: 300px;
      height: 24px;
    }
  }
  video {
    margin-bottom: 10px;
  }
  .logo {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>

