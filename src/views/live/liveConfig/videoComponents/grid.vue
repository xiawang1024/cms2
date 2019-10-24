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
      timer1: null
    };
  },
  watch: {
    duration() {
      this.drawGrid();
    },

    currentTime() {
     
        this.drawGrid();
      
    }
  },
  mounted() {
    this.drawGrid();
  },
  methods: {
    drawGrid() {
      var _this = this;
      let c = this.$refs.box1;
      const ctx = c.getContext("2d");
      const option = {
        gridColor: "rgba(255, 255, 255, 0.05)",
        backgroundColor: "rgb(28,32,34)",
        pixelRatio: 1,
        width: c.width,
        height: c.height,
        gridGap: 0,
        gridNum: 0,
        padding: 10,
        //标尺
        rulerColor: "rgba(255,255,255,0.5)",
        rulerAtTop: true, //是否显示在最上方
        beginTime: 0,
        //指针
        // currentTime:parseFloat(this.currentTime).toFixed(2),//调节指针位置
        cursorColor: "#ff0000",
        duration: this.duration
      };
      function update() {
        c.width = option.width = 80 * option.duration;
        option.gridNum = option.duration * 10 + option.padding * 2;
        option.gridGap = c.width / option.gridNum;
        // option.beginTime = Math.floor(option.currentTime / option.duration) * option.duration
      }
      update();

      //定时刷新指针
      setInterval(() => {
        //   setTimeout(()=>{
        //  option.currentTime+=1

        //   },1000)
        // console.log(this.currentTime,'yidongzhi')
        c.parentNode.scrollLeft = 80 * this.currentTime;
        // drawCurse();
        //根据播放时间滚动图片
      }, 16.7);

      //画背景
      ctx.clearRect(0, 0, option.width, option.height);
      ctx.fillStyle = option.backgroundColor;
      ctx.fillRect(0, 0, option.width, option.height);
      ctx.fillStyle = option.paddingColor;
      ctx.fillRect(0, 0, option.padding * option.gridGap, option.height);
      ctx.fillRect(
        option.width - option.padding * option.gridGap,
        0,
        option.padding * option.gridGap,
        option.height
      );

      // 画网格
      ctx.fillStyle = option.gridColor;

      //画竖线
      for (let index = 0; index < option.gridNum; index += 1) {
        ctx.fillRect(
          option.gridGap * index,
          0,
          option.pixelRatio,
          option.height
        );
      }
      //画横线
      for (let index = 0; index < option.height / option.gridGap; index += 1) {
        ctx.fillRect(
          0,
          option.gridGap * index,
          option.width,
          option.pixelRatio
        );
      }

      //画标尺

      const fontSize = 11;
      const fontHeight = 15;
      const fontTop = 30;
      ctx.font = `${fontSize * option.pixelRatio}px Arial`;
      ctx.fillStyle = option.rulerColor;
      let second = -1;
      for (let index = 0; index < option.gridNum; index += 1) {
        if (
          index &&
          index >= option.padding &&
          index <= option.gridNum - option.padding &&
          (index - option.padding) % 10 === 0
        ) {
          second += 1;
          ctx.fillRect(
            option.gridGap * index,
            option.rulerAtTop
              ? 0
              : option.height - fontHeight * option.pixelRatio,
            option.pixelRatio,
            fontHeight * option.pixelRatio
          );
          ctx.fillText(
            durationToTime(option.beginTime + second).split(".")[0],
            option.gridGap * index -
              fontSize * option.pixelRatio * 2 +
              option.pixelRatio,
            option.rulerAtTop
              ? fontTop * option.pixelRatio
              : option.height - fontTop * option.pixelRatio + fontSize
          );
        } else if (index && (index - option.padding) % 5 === 0) {
          ctx.fillRect(
            option.gridGap * index,
            option.rulerAtTop
              ? 0
              : option.height - (fontHeight / 2) * option.pixelRatio,
            option.pixelRatio,
            (fontHeight / 2) * option.pixelRatio
          );
        }
      }
      // 时间点函数
      function durationToTime(duration = 0) {
        return DT.d2t(duration.toFixed(3));
      }

      function drawCurse() {
        // 画指针
        ctx.fillStyle = option.cursorColor;
        ctx.fillRect(
          option.padding * option.gridGap +
            (_this.currentTime - option.beginTime) * option.gridGap * 10,
          0,
          option.pixelRatio,
          option.height
        );
      }
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