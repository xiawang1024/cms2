<template>
  <div>
    <div class="mainbox">
      <div class="clipBoard">
        <div v-for="(item,index) in clickClip" :key="index" >
          <span>开始时间：{{ item.start }}</span>~
          <span>结束时间：{{ item.end }}</span>
          <span @click.stop="handlePlay(index)">播放</span>
          <span @click.stop="handleDelete(index)">删除</span>
        </div>
      </div>
      <div ref="waveform" @click.stop="getPosition" class="box" @mousemove="printPosion" />
    </div>
    <!-- <el-button @click="myplay">播放</el-button>
    <el-button @click="mypause">暂停</el-button>
    <el-button @click="mystop">停止</el-button>
    <el-button @click="myclear">清空</el-button>
    <el-button @click="mysave">裁剪</el-button> -->
    <!-- <p>{{ audio_url }}</p> -->
  </div>
  
</template>
<script>
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import cursor from "wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js";

export default {
  props: {
    audio_url: {
      type: String,
      default: ""
    },
    cutList:{
      type:Array,
      default:()=>{
        []
      }
    }
  },
  data() {
    return {
      // audio_url: "https://wavesurfer-js.org/example/split-channels/stereo.mp3",
      // audio_url:'http://vod.stream2.hndt.com/dl/live_video_record/2019/7/11/1513691017320190711170833_audio.wav',
      Duration: 0,
      wavesurfer: null,
      clickClip:[],
      flag:true,
      currentIndex:0,
    };
  },
  watch:{
    audio_url(){
        this.wavesurfer.load(this.audio_url);
    },
    cutList(newValue,oldValue){
      // console.log(oldValue,newValue);
      this.wavesurfer.clearRegions();
        newValue.forEach((element,index) => {

          this.myChoiceSquare(index,element.startTime,element.endTime)
        });
        
        
    }
  },
  created() {},
  mounted() {
    const audioElement = this.$refs.waveform;

    this.wavesurfer = WaveSurfer.create({
      container: audioElement,
      waveColor: "#6d9e8b",
      progressColor: "#368666",
      cursorColor: "#fff",

      color: "rgba(254, 255, 0, 0.8)",
      hideScrollbar: true,
      //绘制图像高度
      height: 60,
      //振幅
      barHeight:2,
    //   plugins: [
    //     WaveSurfer.regions.create({})
    // ]
        plugins: [RegionsPlugin.create(),cursor.create()]
    });

    this.wavesurfer.load(this.audio_url);
    //加载完获取音频长度
    this.wavesurfer.on("ready", () => {
      this.audioDuration = this.wavesurfer.getDuration();



    });
    //播放完成自动停止
    this.wavesurfer.on("finish", () => {
      this.wavesurfer.pause();
    });
    //点击鼠标添加选区
    // this.wavesurfer.on("seek", (val) => {
    //     this.wavesurfer.enableDragSelection({
    //           id: Math.random(),
    //         loop: false,
    //         drag: false,
    //         //可调整大小
    //         resize: false,
    //         color: "rgba(50, 50, 200, 0.8)"
    //     })
    //     if(this.flag){
    //         this.clickClip.push({start:(this.audioDuration*val).toFixed(2),end:''})
            
    //          this.flag=!this.flag;
    //     }else{
    //          this.clickClip[ this.currentIndex].end=(this.audioDuration*val).toFixed(2);
    //          this.currentIndex++;
    //           this.flag=!this.flag;
    //     }
        
    //   console.log(val,'持续时间',this.clickClip);
    // });
    
    // wavesurfer.stop();
  },
  beforeDestroy() {
    //销毁实例
    this.wavesurfer.destroy();
    this.wavesurfer=null;
  },
  methods: {

    getPosition(e) {
      e.stopPropagation();

      // console.log(e);
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
        //播放区间（start,end）
        this.wavesurfer.play(5,20);
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
        this.wavesurfer.clearRegions() 
        this.clickClip=[];
        this.flag=true;
        this.currentIndex=0;
    },
    handleDelete(index){
        this.clickClip.splice(index,1);
        // console.log(this.clickClip);
        
    },
    handlePlay(index){
        // let timeZone=(this.clickClip[index].start.toString()+','+this.clickClip[index].end.toString()).toString();
        this.wavesurfer.play()
    },
    //根据视频返回的时间创建选区
      myChoiceSquare(id,start,end){
        //调用选区生成方法
        this.wavesurfer.addRegion({
             id,
             start,
             end,
            loop: false,
            drag: false,
            //可调整大小
            resize: false,
            color: "rgba(50, 50, 200, 0.4)"
        })
      },
    mysave(){
    
      //  let list=this.wavesurfer.regions.list
      //  console.log(list,'result');
       

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
      cursor: pointer;
  }
  .box {
  height: 60px;
  overflow: hidden;
  margin-bottom: 10px;
    // border: 1px solid #000;
  }
}
</style>
