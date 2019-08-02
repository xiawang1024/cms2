<template>
  <div>
    <div>
      <ul class="lgoshaft" ref="logoBar">
        <li v-for="(item,index) in cutList" :key="index" :style="'left:' + item.leftPosition + 'px;' + 'width:' + item.width+'px'">
          <span
            v-if="item.logoPath==''||item.logoPath==null"
            @click="handleAddLogo(index)"
          >添加LOGO</span>
          <img v-else :src="item.logoPath" alt >
        </li>
      </ul>
    </div> 
    <addLogo 
      @putLogo="putLogo"
      @closeDialog="closeDialog" 
      :dialog-visible="addDialogVisible"
    />
  </div>
</template>
<script>
import addLogo from './addLogo'
export default {
    components:{addLogo},
    props:{
      cutList:{
        type:Array,
        default:()=>{
          []
        }
      },
      duration:{
        type:Number,
        default:0
      }
    },
  data() {
    return {
      logoBarWidth:820,
      addDialogVisible:false,
      currentIndex:'',

    };
  },
   watch:{
   cutList(newValue){
     newValue.forEach((item,index) => {
        this.computedStyle()
     });
   },
   deep:true,
   immediate:true,
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLogo();
    });
  },
  
  methods: {
    drawLogo() {
       
    },
    handleAddLogo(index) {
      this.addDialogVisible=true;
      this.currentIndex=index;
    },
    computedStyle() {
      this.cutList.forEach((item,index)=>{
         item.leftPosition = (item.startTime / this.duration) * this.logoBarWidth;
      item.width = ((item.endTime - item.startTime) / this.duration) * this.logoBarWidth;
      })
    },
   
    closeDialog(){
        this.addDialogVisible=false;
    },
    putLogo(value){
        //合并对象
          this.$emit("putLogo",this.currentIndex,value)
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
    background-color: rgba(50, 64, 150, 0.466);
    span {
      color: #AAA;
      cursor: pointer;
    }
    span:hover{
      color:#fff
    }
    img {
      vertical-align: middle;
      width: 120px;
    }
  }
}
</style>
