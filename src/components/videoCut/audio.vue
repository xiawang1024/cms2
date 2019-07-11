<template>
  <div class="mainbox">
    <div class="clipBoard">
      <div v-for="(item,index) in clickClip" :key="index" >
        <span>开始时间：{{ item.start }}</span>~
        <span>结束时间：{{ item.end }}</span>
        <span @click.stop="handlePlay(index)">播放</span>
        <span @click.stop="handleDelete(index)">删除</span>
      </div>
          
    </div>
    <div ref="waveform" @click.stop="getPosition" class="box" @mousemove="printPosion"/>
    <el-button @click="myplay">播放</el-button>
    <el-button @click="mypause">暂停</el-button>
    <el-button @click="mystop">停止</el-button>
    <el-button @click="myclear">清空</el-button>
    <el-button @click="mysave">裁剪</el-button>
  </div>
</template>
<script>
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import cursor from "wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js";

export default {
  props: {},
  data() {
    return {
      audio_url: "https://wavesurfer-js.org/example/split-channels/stereo.mp3",
      Duration: 0,
      wavesurfer: null,
      clickClip:[],
      flag:true,
      currentIndex:0,
    };
  },
  created() {},
  mounted() {
    const audioElement = this.$refs.waveform;

    this.wavesurfer = WaveSurfer.create({
      container: audioElement,
      waveColor: "#6d9e8b",
      progressColor: "#368666",
      cursorColor: "#0ff",
      color: "rgba(254, 255, 255, 0.4)",
      hideScrollbar: true,
      height: 60,
    //   plugins: [
    //     WaveSurfer.regions.create({})
    // ]
        plugins: [RegionsPlugin.create(),cursor.create()]
    });

    this.wavesurfer.load(this.audio_url);
    //加载完获取音频长度
    this.wavesurfer.on("ready", () => {
      this.audioDuration = this.wavesurfer.getDuration();
      this.wavesurfer.addRegion({
            id: '1',
            start: '0.5',
            end: '15',
            loop: false,
            drag: false,
            resize: true,
            color: "rgba(50, 50, 50, 0.8)"
        });
        

    });
    //播放完成自动停止
    this.wavesurfer.on("finish", () => {
      this.wavesurfer.pause();
    });
    this.wavesurfer.on("seek", (val) => {
        this.wavesurfer.enableDragSelection({
              id: Math.random(),
            start: '0.5',
            end: '15',
            loop: false,
            drag: false,
            resize: true,
            color: "rgba(50, 50, 50, 0.8)"
        })
        if(this.flag){
            this.clickClip.push({start:(this.audioDuration*val).toFixed(2),end:''})
            
             this.flag=!this.flag;
        }else{
             this.clickClip[ this.currentIndex].end=(this.audioDuration*val).toFixed(2);
             this.currentIndex++;
              this.flag=!this.flag;
        }
        
      console.log(val,'持续时间',this.clickClip);
    });
    
    // wavesurfer.stop();
  },
  beforeDestroy() {
    //销毁实例
    console.log('des');
    
    this.wavesurfer.destroy();
    this.wavesurfer=null;
  },
  methods: {

    getPosition(e) {
      e.stopPropagation();

      console.log(e);
    },
    printPosion(e) {
    //   let x = 0;
    //   x = e.offsetX;
    //   let time=((x/802)*this.audioDuration).toString();
    //   this.wavesurfer.skip(time)
    //   console.log(x,time);
    },
    myplay() {
      if (this.wavesurfer) {
        this.wavesurfer.play();
      }
    },
    mypause() {
      if (this.wavesurfer) {
        this.wavesurfer.pause();
      }
    },
    mystop() {
      if (this.wavesurfer) {
        this.wavesurfer.stop();
      }
    },
    myclear(){
        this.clickClip=[];
        this.flag=true;
        this.currentIndex=0;
    },
    handleDelete(index){
        this.clickClip.splice(index,1);
        console.log(this.clickClip);
        
    },
    handlePlay(index){
        // let timeZone=(this.clickClip[index].start.toString()+','+this.clickClip[index].end.toString()).toString();
        this.wavesurfer.play(['0.5','2.5'])
    },
    mysave(){
       if(this.clickClip.reverse()[0].end) {
           this.$message({
               type:'error',
               message:'最后一个音频片段结束时间不能为空！'
           });
           return false
       }

    }
  },
};
</script>
<style lang="scss" scoped>
.mainbox {
  position: relative;
  .clipBoard{
      position: absolute;
      bottom: 10px;
      left: -150px;
      background-color: #333;
      color: white;
      z-index: 3;
  }
  .box {
    // border: 1px solid #000;
  }
}
</style>
