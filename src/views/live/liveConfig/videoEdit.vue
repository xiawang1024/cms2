<template>
  <div>
    <el-row class="topPlat">
      <el-col :span="13">
        <!-- 裁剪列表 -->
        <div class="leftPart">
          <table style="width:100%">
            <thead />
            <tbody class="tablemain">
              <tr class="tableHead">
                <td>&#x3000;#</td>
                <td>开始</td>
                <td>结束</td>
                <td>时长</td>
                <td>字幕</td>
                <td>logo</td>
                <td>操作&#x3000;</td>
              </tr>
              <div class="scrollPart">
                <tr
                  v-for="(item,index) in tableValue"
                  :key="index"
                  :class="index==hanleRow?'active':''"
                >
                  <td>&#x3000;{{ index+1 }}</td>
                  <td>
                    <input
                      v-model="item.beginTime"
                      :disabled="index!=hanleRow"
                      @change="handlebegin(index)"
                    >
                  </td>
                  <td>
                    <input
                      v-model="item.endTime"
                      :disabled="index!=hanleRow"
                      @change="handleend(index)"
                    >
                  </td>
                  <td>
                    <input
                      v-model.number="item.duration"
                      :disabled="index!=hanleRow"
                      @change="handleduration(index)"
                    >
                  </td>
                  <td>
                    <input v-model="item.subtitles" :disabled="index!=hanleRow" >
                  </td>
                  <td>
                    <!-- <input v-model="item.logo" :disabled="index!=hanleRow" > -->
                    <div @click="handleAddLogo(index)">
                      <img :src="item.logo" alt style="width:60px;" >
                    </div>
                  </td>
                  <td class="dealicon">
                    <i class="el-icon-edit" @click="handleEdite(index)" />
                    <i class="el-icon-check" @click="handleSave(index)" />
                    <i class="el-icon-picture-outline" @click="handleAddLogo(index)" />
                    <i class="el-icon-delete" @click="handleDelete(index)" />
                  </td>
                </tr>
              </div>
            </tbody>
          </table>
        </div>
        <span>{{ data }}</span>
      </el-col>
      <el-col :span="11" class="rightPart">
        <div class="videobox">
          <video ref="myvideo" :src="data" controls style="width:100%" />
          <div class="coverText">
            <p>{{ subTitle }}</p>
          </div>
          <div v-if="logoDistance" :style="logoStyle">
            <img :src="logo" alt style="width:117px" >
          </div>
        </div>
        <div class="controlboard">
          <div @click="handleAdd">
            <div class="controlcell">
              <i class="el-icon-document-add" />
              添加字幕
            </div>
            <div class="controlcell">
              <i class="el-icon-minus" />
              时间偏移 -100毫秒
            </div>
            <div class="controlcell">
              <i class="el-icon-plus" />
              时间偏移 +100毫秒
            </div>
          </div>
          <div>
            <div class="controlcell" @click="handleDeleteAll">
              <i class="el-icon-document-add" />
              删除全部
            </div>
            <div class="controlcell">
              <i class="el-icon-delete" />
              删除空的
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="bottomPlat">
      <div class="grid">
        <!-- 网格组件 -->

        <grid :current-time="currentTime" :duration="duration" />
      </div>
      <!-- 面板组件 -->
      <div class="dragview">
        <!-- 拖动组件 -->
        <div class="editePlat" ref="editePlat">
          <template v-for="(item,index) in tableValue">
            <div
              class="moverCell"
              :key="index"
              :style="'left:'+basisparam*item.time+'px;width:'+basisparam*item.duration+'px'"
            >
              <div data-order="fir" :data-my="index" />
              <div data-order="sec" data-logo="cell" :data-my="index">
                <p >{{ item.subtitles }}</p>
              </div>
              <div data-order="thr" :data-my="index" />
            </div>
          </template>
        </div>
      </div>
    </el-row>
    <add-logo :dialog-visible.sync="dialogVisible" @putLogo="putLogo" @closeDialog="closeDialog"/>
  </div>
</template>   
<script>
import grid from "./videoComponents/grid";
import addLogo from "@/components/videoCut/addLogo";
export default {
  components: { grid, addLogo },
  data() {
    return {
      hanleRow: -1, //全禁用状态
      data: "",
      tableValue: [],
      cutList: [],
      currentTime: "1",
      duration: 1,
      timer: null,
      basisparam: 100,
      currentIndex: "",
      subTitle: "此处是字幕",
      logoDistance: "",
      dialogVisible: false
    };
  },
  computed: {
    logoStyle: function() {
      let style = "";
      if (this.logoDistance) {
        //左上
        style =
          "position:absolute;left:" +
          this.logoDistance.split(":")[0] +
          "px;top:" +
          this.logoDistance.split(":")[1] +
          "px;";

        if (this.logoDistance.indexOf("main_w-overlay_w") > -1) {
          //右上
          style =
            "position:absolute;right:" +
            this.logoDistance.split(":")[0].replace(/[^0-9]/gi, "") +
            "px;top:" +
            this.logoDistance.split(":")[1] +
            "px;";
        }
        if (this.logoDistance.indexOf("main_h-overlay_h") > -1) {
          //左下
          style =
            "position:absolute;left:" +
            this.logoDistance.split(":")[0] +
            "px;bottom:" +
            this.logoDistance.split(":")[1].replace(/[^0-9]/gi, "") +
            "px;";
        }
        if (
          this.logoDistance.indexOf("main_h-overlay_h") > -1 &&
          this.logoDistance.indexOf("main_w-overlay_w") > -1
        ) {
          //右下
          style =
            "position:absolute;right:" +
            this.logoDistance.split(":")[0].replace(/[^0-9]/gi, "") +
            "px;bottom:" +
            this.logoDistance.split(":")[1].replace(/[^0-9]/gi, "") +
            "px;";
        }
      }
      return style;
    }
  },
  watch: {
    tableValue() {},
    currentTime() {
      this.ontranslate();
    }
  },
  created() {
    this.data = JSON.parse(this.$route.query.data);
  },
  mounted() {
    this.onMove();
    this.initNode();
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    initNode() {
      var _this = this;
      let myvideo = this.$refs.myvideo;
      let basisNode = this.$refs.editePlat;
      myvideo.addEventListener("canplay", function() {
        clearInterval(_this.timer);
        _this.duration = this.duration;
        //初始化滑块宽度
        basisNode.style.width = this.duration * _this.basisparam + 2000 + "px";
        // _this.duration=819;  //崩溃临界值
        _this.timer = setInterval(() => {
          //实时获取播放时间
          _this.currentTime = parseFloat(this.currentTime).toFixed(4);
          _this.showSubTitle(parseFloat(this.currentTime).toFixed(4));

          // console.log(this.currentTime,'time12312',_this.duration)
          if (this.currentTime.toFixed(2) === _this.duration.toFixed(2)) {
            clearInterval(_this.timer);
            _this.timer = null;
          }
        }, 16.7);
      });
    },

    handleEdite(index) {
      this.hanleRow = index;
    },
    handleSave(index) {
      this.hanleRow = -1;
    },
    handleAdd() {
      let time = 0;
      //在末尾添加片段
      let index=this.tableValue.length-1;
      if (this.tableValue[index]) {
        time =
          this.tableValue[index].time +
          this.tableValue[index].duration;
      }
      let duration = 2;
      let data = {
        time,
        beginTime: this.timeFactory(time, "second"),
        endTime: this.timeFactory(time + duration, "second"),
        duration,
        subtitles: "此处是字幕",
        logo: "",
        logoDistance: ""
      };

      this.tableValue.push(data);
    },
    handleDelete(index, row) {
      this.tableValue.splice(index, 1);
    },
    handleDeleteAll() {
      this.tableValue = [];
    },
    handleAddLogo(index) {
      this.dialogVisible = true;
      this.currentIndex = index;
    },
    putLogo(val) {
      this.tableValue[this.currentIndex].logo = val.logoPath;
      this.tableValue[this.currentIndex].logoDistance = val.logoDistance;
    },
    closeDialog() {
      this.dialogVisible = false;
    },

    showSubTitle(time) {
      let flag = false;
      let text = "";
      let pic = "";
      let logoDistance = "";
      this.tableValue.forEach((item, index) => {
        let time1 = item.time;
        let time2 = item.duration + item.time;
        if (time >= time1 && time < time2) {
          flag = true;
          text = item.subtitles;
          pic = item.logo;
          logoDistance = item.logoDistance;
        }
      });
      if (flag) {
        this.subTitle = text;
        this.logo = pic;
        this.logoDistance = logoDistance;
      } else {
        this.subTitle = "";
        this.logo = "";
        this.logoDistance = "";
      }
    },
    //时间处理函数
    timeFactory(val, type) {
      if (type === "second") {
        let min = Math.floor(val % 3600);
        let time =
          Math.floor(val / 3600) +
          ":" +
          Math.floor(min / 60) +
          ":" +
          (val % 60).toFixed(3);
        return time;
      }
      if (type == "string") {
        let arr = val.split(":");
        let time = arr[0] * 3600 + arr[1] * 60 + arr[2] * 1;
        return time;
      }
    },
    //拖动同步时间函数
    timeWatch(val, index, type) {
      if (type === 1) {
        this.tableValue[index].time = val / this.basisparam;
        this.tableValue[index].beginTime = this.timeFactory(
          this.tableValue[index].time,
          "second"
        );
        this.tableValue[index].endTime = this.timeFactory(
          this.tableValue[index].time + this.tableValue[index].duration,
          "second"
        );
      }
      if (type === 2) {
        this.tableValue[index].duration = val / this.basisparam;
        this.tableValue[index].endTime = this.timeFactory(
          this.tableValue[index].time + this.tableValue[index].duration,
          "second"
        );
      }
      if (type === 3) {
        this.tableValue[index].duration = val[0] / this.basisparam;
        this.tableValue[index].time = val[1] / this.basisparam;
        this.tableValue[index].beginTime = this.timeFactory(
          this.tableValue[index].time,
          "second"
        );
      }
    },
    handlebegin(index) {
      this.tableValue[index].time = this.timeFactory(
        this.tableValue[index].beginTime,
        "string"
      );
      this.tableValue[index].duration =
        this.timeFactory(this.tableValue[index].endTime, "string") -
        this.timeFactory(this.tableValue[index].beginTime, "string");
    },
    handleend(index) {
      this.tableValue[index].duration =
        this.timeFactory(this.tableValue[index].endTime, "string") -
        this.tableValue[index].time;
    },
    handleduration(index) {
      this.tableValue[index].endTime = this.timeFactory(
        this.tableValue[index].duration + this.tableValue[index].time,
        "second"
      );
    },
    // 面板组件事件监听
    // 拖动事件
    onFocuse() {
      //获取焦点
      let node = this.$refs.editePlat.childNodes;
      node.addEventListener("click", function() {
        console.log("停止播放，裁剪开始");
      });
    },
    ontranslate() {
      let basisNode = this.$refs.editePlat;
      let positon = this.currentTime * this.basisparam;
      basisNode.parentNode.scrollLeft = positon;
    },
    onMove() {
      var _this = this;
      // 拖动
      let node = this.$refs.editePlat;
      let clickPointx = 0;
      let endPointx = 0;
      let moveFlag = false;
      let rightResize = false;
      let leftResize = false;
      let currentWidth = 0; //当前片段宽度
      let start = 0;
      let end = 0;
      let order = 0;
      let ol = 0;
      let moverCell = document.getElementsByClassName("moverCell");
      document.addEventListener("mousemove", function(e) {
        end = e.clientX;
        if (moveFlag) {
          let dx = end - start;
          let data='';
         if((dx + ol)<0){
           data=0;
         }else{
           data=dx + ol
         }
        //  e.target.parentNode // 右边界问题 宽度读取问题（target 目标改变）
        //  let max=_this.duration*_this.basisparam-parseFloat(getStyle(e.target.parentNode, "width"));
        //  console.log(max,getStyle(e.target.parentNode, "width"),'kaun')
        //  if((dx + ol)>=max){
        //    data=max-98 //修正98
        //  }
          moverCell[order].style.left = data + "px";

          //反向监听移动
          _this.timeWatch(data, order, 1);
          //  console.log(dx,ol,'clientX')
        }
        if (rightResize) {
          let dx = end - start;
          console.log(dx, currentWidth, "width");
          moverCell[order].style.width = dx + currentWidth + "px";
          _this.timeWatch(dx + currentWidth, order, 2);
        }
        if (leftResize) {
          let dx = end - start;
          console.log(dx, currentWidth, "width");
          let data=(dx + ol)<0?0:(dx + ol);

          moverCell[order].style.width = -dx + currentWidth + "px";
          moverCell[order].style.left = data+ "px";
          _this.timeWatch([-dx + currentWidth, data], order, 3);
        }

        if (e.target.dataset.order == "sec") {
          //  console.log(e.target,'target')

          e.target.addEventListener("mousedown", function(e) {
            order = parseInt(
              e.target.dataset.my || e.target.parentNode.dataset.my
            );
            moveFlag = true;
            start = e.clientX;
            ol = this.parentNode.offsetLeft;
          });
        }

        if (e.target.dataset.order == "thr") {
          e.target.addEventListener("mousedown", function(e) {
            order = parseInt(
              e.target.dataset.my || e.target.parentNode.dataset.my
            );
            rightResize = true;
            start = e.clientX;
            ol = this.parentNode.offsetLeft;
            currentWidth = parseInt(getStyle(this.parentNode, "width"));
          });
        }
        if (e.target.dataset.order == "fir") {
          e.target.addEventListener("mousedown", function(e) {
            order = parseInt(
              e.target.dataset.my || e.target.parentNode.dataset.my
            );
            leftResize = true;
            start = e.clientX;
            ol = this.parentNode.offsetLeft;
            currentWidth = parseInt(getStyle(this.parentNode, "width"));
          });
        }

        document.addEventListener("mouseup", function(e) {
          moveFlag = false;
          rightResize = false;
          leftResize = false;
          end = e.clientX;
        });
        function getStyle(node, styleType) {
          return node.currentStyle
            ? node.currentStyle[styleType]
            : getComputedStyle(node)[styleType]; //浏览器中有node.currentStyle方法就用，没有就用另一个
        }
      });
    }
  }
};
</script> 
<style lang="scss" scoped>
$baseColor: #1c2022;
$heightColor: #2e363c;
$forColor: #cccccc;
.topPlat {
  background-color: $baseColor;
  // border: 1px solid red;
  height: 600px;
  .scrollPart {
    overflow: auto;
    height: 560px;
    padding-bottom: 10px;
  }
  .rightPart {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // flex-direction: column;
    // height: 600px;
    // overflow: hidden;
    padding: 10px;
  }
  font-size: 14px;
}
.bottomPlat {
  background-color: $baseColor;
  width: 100%;
  // border: 1px solid #00f;
  height: 150px;
  font-size: 14px;
  position: relative;
}
.dragview {
  width: 100%;
  overflow: hidden;
  height: 150px;
  position: absolute;
  left: 0;
  top: 0;
  font-size: 14px;
}

// table
.tableHead {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $forColor;
  background-color: $heightColor;
  height: 40px !important;
  width: 100%;
  text-align: center;
}
.tablemain tr {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $forColor;
  background-color: $heightColor;
  height: 60px;
  width: 100%;
  td input {
    width: 90px;
    background-color: transparent;
    border: none;
    height: 30px;
    outline: none;
    text-align: center;
    color: $forColor;
  }
}
.tablemain div tr:nth-child(2n) {
  background-color: $heightColor;
}
.tablemain div tr:nth-child(2n + 1) {
  background-color: $baseColor;
}
.tablemain tr i {
  cursor: pointer;
}
.dealicon {
  padding: 0 10px;
}
.tablemain .active {
  background-color: #2196f3 !important;

  td input {
    color: white;
    background-color: $baseColor;
  }
}

// 控制板
.controlboard {
  margin-top: 10px;
  color: $forColor;
  .controlcell {
    cursor: pointer;
    display: inline-block;
    margin: 5px;
    padding: 5px;
    background-color: $heightColor;
    &:hover {
      background-color: #3a4147;
    }
  }
}

// 底部编辑栏
$activeMover: #2a6696;
$nomalMover: rgba(255, 255, 255, 0.1);
.editePlat {
  // border: 1px solid black;
  border-left: 100px solid rgba(255, 0, 0, 0);
  border-right: 1000px solid rgba(255, 0, 0, 0);
  height: 100%;
  position: relative;
  background-color: transparent;
  //  background-image: linear-gradient(to right,rgba(255,0,0,0.2), rgba(0,0,255,0.2));

  & > div {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    width: 150px;
    background-color: $nomalMover;
    & > div:nth-child(1) {
      // border: 1px solid red;
      width: 15px;
      height: 100%;
      cursor: col-resize;
      position: absolute;
      left: 0;
      top: 0;
    }
    & > div:nth-child(2) {
      // border: 1px solid red;
      width: 100%;
      height: 100%;
      cursor: move;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      -webkit-touch-callout: none; /* iOS Safari */

      -webkit-user-select: none; /* Chrome/Safari/Opera */

      -khtml-user-select: none; /* Konqueror */

      -moz-user-select: none; /* Firefox */

      -ms-user-select: none; /* Internet Explorer/Edge */

      user-select: none; /* Non-prefixed version, currently

        not supported by any browser */
    }
    & > div:nth-child(3) {
      // border: 1px solid red;
      width: 15px;
      height: 100%;
      cursor: move;
      position: absolute;
      right: 0;
      top: 0;
      cursor: col-resize;
    }
    & > div:nth-child(3):hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
    & > div:nth-child(1):hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
}
.grid {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}

//video 悬浮字幕，logo
.videobox {
  position: relative;
  margin-top: 40px;
  .coverText {
    position: absolute;
    bottom: 60px;
    left: 0;
    right: 0;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.4);
    p {
      text-align: center;
      color: white;
    }
  }
}
</style>