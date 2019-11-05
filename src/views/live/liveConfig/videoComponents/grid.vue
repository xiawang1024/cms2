<template>
  <div class="hello">
    <canvas ref="box1" width="200" height="150" />
  </div>
</template>
<script>
import DT from "duration-time-conversion";
export default {
  props: {
    duration: {
      type: Number,
      default: 1
    },
    currentTime: {
      type: String,
      default: 1
    }
  },
  data() {
    return {
        timer1: null,
        gridColor: "rgba(255, 255, 255, 0.05)",
        backgroundColor: "rgb(28,32,34)",
        pixelRatio: 1,
        width: 2000,
        height: 150,
        gridGap: 10,
        gridNum: 0, 
        padding: -40,
        //标尺
        rulerColor: "rgba(255,255,255,0.5)",
        rulerAtTop: true, //是否显示在最上方
        // beginTime: 0,
        //指针
        cursorColor: "#ff0000",
       


    };
  },
  computed:{
      beginTime:function(){
          return (Math.floor(this.currentTime / this.duration) * this.duration)
      }

    // beginTime :()=>( Math.floor(this.currentTime / this.duration) * this.duration)
  },
  watch: {
    duration() {
      this.update();
    },

    currentTime() {
     
        // this.movePic();
        if(this.beginTime<this.duration){
      this.update();

        }

      
    }
  },
  mounted() {
  },
  
  methods: {
    //  init(){
    //     var _this=this;
    //    let c = this.$refs.box1;
    //    let p= this.$refs.mainbox;
    //     getStyle(p,'width').then(res=>{
    //       c.width= _this.width=Number(res);
    //      });
    //     c.height=_this.height;
    //     _this.offset=_this.gridGap*10,
    //    function getStyle(node, styleType){
    //      return new Promise((resolve,reject)=>{
    //        let attr= node.currentStyle? node.currentStyle[styleType]: getComputedStyle(node)[styleType];//浏览器中有node.currentStyle方法就用，没有就用另一个
    //        resolve(attr)
    //      })
    // }
    // },
    update() {
      var _this=this;
       let c = this.$refs.box1;
        c.width = _this.width ;
        c.height=_this.height;
        _this.offset=_this.gridGap*10,
        _this.gridNum = _this.width/_this.gridGap+(_this.currentTime*_this.offset)/_this.gridGap
      _this.drawBackground();
      },
    movePic(){
       let c = this.$refs.box1;
        c.parentNode.scrollLeft = 80 * this.currentTime;
    },

    drawGrid() {

      var _this = this;
      let c = this.$refs.box1;
      const ctx = c.getContext("2d");
      // 画网格
      ctx.fillStyle = _this.gridColor;
      //画竖线
      for (let index = 0; index < _this.gridNum; index += 1) {
        if( _this.gridGap * index-_this.currentTime*_this.offset>-10){
           ctx.fillRect(
          _this.gridGap * index-_this.currentTime*_this.offset,
          0,
          _this.pixelRatio,
          _this.height
        );
        }
       

      }
      //画横线
      for (let index = 0; index < _this.height / _this.gridGap; index += 1) {
        ctx.fillRect(
          0,
          _this.gridGap * index,
          _this.width,
          _this.pixelRatio
        );
      }

      _this.drawRuler();
    },
    drawBackground(){
      
      //画背景
      var _this = this;
      let c = this.$refs.box1;
      const ctx = c.getContext("2d");
      ctx.clearRect(0, 0, _this.width, _this.height);
      ctx.fillStyle = _this.backgroundColor;
      ctx.fillRect(0, 0, _this.width, _this.height);
      ctx.fillStyle = _this.paddingColor;
      ctx.fillRect(0, 0, _this.padding * _this.gridGap, _this.height);
      ctx.fillRect(
        _this.width - _this.padding * _this.gridGap,
        0,
        _this.padding * _this.gridGap,
        _this.height
      );
      _this.drawCurse();
       _this.drawGrid();

      
    },
    drawRuler(){
      var _this = this;
      let c = this.$refs.box1;
      const ctx = c.getContext("2d");
      //画标尺

      const fontSize = 11;
      const fontHeight = 15;
      const fontTop = 30;
      ctx.font = `${fontSize * _this.pixelRatio}px Arial`;
      ctx.fillStyle = _this.rulerColor;
      let second = -1;
      for (let index = 0; index < _this.gridNum; index += 1) {
        if (
          index &&
          index >= _this.padding &&
          index <= _this.gridNum - _this.padding &&
          (index - _this.padding) % 10 === 0
        ) {
          second += 1;
            if( _this.gridGap * index-_this.currentTime*_this.offset>-10){
              ctx.fillRect(
            _this.gridGap * index-_this.currentTime*_this.offset,
            _this.rulerAtTop
              ? 0
              : _this.height - fontHeight * _this.pixelRatio,
            _this.pixelRatio,
            fontHeight * _this.pixelRatio
          );
            }
            if(_this.gridGap * index -
              fontSize * _this.pixelRatio * 2 +
              _this.pixelRatio-_this.currentTime*_this.offset>-40){
               ctx.fillText(
            durationToTime(_this.beginTime + second).split(".")[0],
            _this.gridGap * index -
              fontSize * _this.pixelRatio * 2 +
              _this.pixelRatio-_this.currentTime*_this.offset,
            _this.rulerAtTop
              ? fontTop * _this.pixelRatio
              : _this.height - fontTop * _this.pixelRatio + fontSize
          );
            }
         
        } else if (index && (index - _this.padding) % 5 === 0) {
          if( _this.gridGap * index-_this.currentTime*_this.offset>-10){
             ctx.fillRect(
            _this.gridGap * index-_this.currentTime*_this.offset,
            _this.rulerAtTop
              ? 0
              : _this.height - (fontHeight / 2) * _this.pixelRatio,
            _this.pixelRatio,
            (fontHeight / 2) * _this.pixelRatio
          );
          }
         
        }
      }
      // 时间点函数
      function durationToTime(duration = 0) {
        return DT.d2t(duration.toFixed(3));
      }
    //  _this.drawCurse();
    },
    drawCurse() {
        // 画指针
        var _this = this;
      let c = this.$refs.box1;
      const ctx = c.getContext("2d");
        ctx.fillStyle = _this.cursorColor;
        // ctx.clearRect(0, 0, _this.width, _this.height);
        ctx.fillRect(
          100,
          0,
          _this.pixelRatio,
          _this.height
        );
      },
      //定时刷新指针
      updateCurse(){
        var _this=this;
          //定时刷新指针
          setInterval(() => {
              setTimeout(()=>{
            _this.currentTime+=1

              },1000)
            c.parentNode.scrollLeft = 80 * this.currentTime;
            _this.drawCurse();
            // 根据播放时间滚动图片
          }, 16.7);

      }
  }
};
</script>
<style lang="scss" scoped>
.hello {
  position: relative;
  width: 100%;
  overflow: hidden;
}
</style>