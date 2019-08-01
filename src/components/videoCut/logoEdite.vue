<template>
  <div>
    <div>
      <ul class="lgoshaft" ref="logoBar">
        <li v-for="(item,index) in time" :key="index" :style="computedStyle(item,index)">
          <span
            v-if="item.logoPath==''||item.logoPath==null"
            @click="handleAddLogo(index)"
          >添加LOGO</span>
          <img v-else :src="item.logoPath" alt >
        </li>
      </ul>
      <p>{{ logoBarWidth }}</p>
    </div> 
    <addLogo 
      @putLogo="putLogo"
      @closeDialog="closeDialog" 
      :dialog-visible="dialogVisible"
    />
  </div>
</template>
<script>
import addLogo from './addLogo'
export default {
    components:{addLogo},
  data() {
    return {
      time: [
        {
          start: 1,
          end: 10,
          logoPath:
            "http://172.20.5.4:8080/dl/2019/7/25/1154334138531053568HoneyBee.png"
        },
        {
          start: 20,
          end: 30,
          logoPath: ""
        },
        {
          start: 40,
          end: 55,
          
        }
      ],
      total: 60,
      logoBarWidth:820,
      dialogVisible:false,
      currentIndex:'',

    };
  },
  watch:{
      time(){
          this.$emit(':update',this.time)
      }
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLogo();
      this.getStyle(this.$refs.logoBar,'width')
    });
  },
  
  methods: {
    drawLogo() {
       
    },
    handleAddLogo(index) {
      this.dialogVisible=true;
      this.currentIndex=index;
    },
    computedStyle(item, index) {
      let leftPosition = (item.start / this.total) * this.logoBarWidth;
      let width = ((item.end - item.start) / this.total) * this.logoBarWidth;
      return "left:" + leftPosition + "px;" + "width:" + width+'px';
    },
    getStyle(node, styleType) {
     this.logoBarWidth= node.currentStyle
        ? node.currentStyle[styleType]
        : getComputedStyle(node)[styleType]; //浏览器中有node.currentStyle方法就用，没有就用另一个
    },
    closeDialog(){
        this.dialogVisible=false;
    },
    putLogo(value){
        //合并对象
         Object.assign( this.time[this.currentIndex], value);
         console.log(this.time,'this.time')
    }
  }
};
</script>
<style lang="scss" scoped>
.lgoshaft {
  position: relative;
  height: 100px;
  background-color: #333;
  list-style: none;
  padding: 0;
  overflow: hidden;

  li {
    position: absolute;
    height: 100px;
    left: 0;
    width: 20px;
    line-height: 100px;
    background-color: rgba(50, 64, 255, 0.466);
    span {
      color: red;
    }
    img {
      vertical-align: middle;
      width: 120px;
    }
  }
}
</style>
