<template>
  <div id="videoEdite">
    <div class="input-container">
      <!-- <span>视频链接：</span> -->
      <!-- <input type="text" v-model="videoUrl"/> -->
    </div>
    <video ref="video" :src="videoUrl" controls width="600px"/>
    <CropTool :duration="duration"
              :playing="playing"
              :current-playing-time="currentTime"
              @play="playVideo"
              @pause="pauseVideo"
              @stop="stopVideo"
              @cutResult="cutResult"/>
  </div>
</template>

<script>
    import CropTool from '@/components/videoCut/CropTool.vue'
   
    
    export default {
        name: 'VideoEdite',
        components: {
            CropTool,
        },
        props:{
            videoUrl:{
                type:String,
                default:'',
            }
        },
        data () {
            return {
                // videoUrl: 'http://172.20.5.4:8080/dl/2019/6/28/1500371069020190628104431.mp4',
                duration: 0,
                playing: false,
                currentTime: 0
            }
        },
        mounted () {
            const videoElement = this.$refs.video
            videoElement.ondurationchange = () => {
                this.duration = videoElement.duration
            }
            videoElement.onplaying = () => {
                this.playing = true
            }
            videoElement.onpause = () => {
                this.playing = false
            }
            videoElement.ontimeupdate = () => {
                this.currentTime = videoElement.currentTime
            }
        },
        methods: {
            seekVideo (seekTime) {
                this.$refs.video.currentTime = seekTime
            },
            playVideo (time) {
                this.seekVideo(time)
                this.$refs.video.play()
            },
            pauseVideo () {
                this.$refs.video.pause()
            },
            stopVideo () {
                this.$refs.video.pause()
                this.$refs.video.currentTime = 0
            },
            cutResult(val){
                //组件数据传递出去
                this.$emit('cutResult',val)
            }
        },
    }
</script>
<style lang="scss" scoped>

#videoEdite {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
}

</style>

