<template>
  <div>
    <el-row class="mergetitle">
      <el-col :span="24">
        <el-button type="primary" size="mini" @click="handleMove(0)" :disabled="radio<=0">前移</el-button>
        <el-button type="primary" size="mini" @click="handleMove(1)" :disabled="radio==multipleSelection.length-1">后移</el-button>
        <el-button type="primary" size="mini" @click="handleMove(2)" :disabled="multipleSelection.length==0">移除</el-button>
        <el-button type="primary" size="mini" @click="handleMerge()" :disabled="multipleSelection.length==0">完成</el-button>

      </el-col>
    </el-row>


    <el-row>
      <el-col :key="index" v-for="(item,index) in multipleSelection" :span="6" class="square">
        <el-col :span="6">
          <el-radio v-model="radio" :label="index">视频{{ index+1 }}</el-radio>
          <video style="width:200px" controls :src="item.editUrl"/>
        </el-col>
      </el-col>
    </el-row>

    <!-- 样式-->

    <!-- <el-row :key="index"  v-for="(item,index) in multipleSelection" >

                 <el-col :span="2" >
                     <el-radio v-model="radio" :label='index'>视频{{index+1}}</el-radio>
                </el-col>
                <el-col :span="21">
                        <video style='width:200px' controls :src="item.editUrl"></video>
                    </el-col>
            </el-row> -->
            
  </div>
</template>
<script>
export default {
    props:{
        multipleSelection:{
            type:Array,
            default:()=>{
                []
            }
        }
    },

    data(){
        return{
            radio:0
        
        }
    },
    created(){

    },
    mounted(){

    },
    methods:{
        handleMove(val){

             const swapItems = function(arr, index1, index2) {
                arr[index1] = arr.splice(index2, 1, arr[index1])[0];
                return arr;
            };

            if(val==0){
                //上移

                let num=this.radio;
                if(num == 0) {
                    return;
                }
                swapItems(this.multipleSelection, num, num - 1);
                this.radio=num-1

            }
            if(val==1){
                //下移
                 let num=this.radio;
                if(num == this.multipleSelection.length-1) {
                    return;
                }
                swapItems(this.multipleSelection, num, num + 1);
                this.radio=num+1


            }
            if(val==2){
                //删除
                let num=this.radio;
                 this.multipleSelection.splice(num,1);
                 this.radio=num-1
                 
            }
        },
        handleMerge(){
            let arr=JSON.parse(JSON.stringify(this.multipleSelection))
            this.$emit('handleMerge',arr)
        }
    }
}
</script>
<style lang="scss" scoped>
    .mergetitle{
        margin-bottom: 20px;
    }
    .square{
        margin-bottom: 10px;
        padding: 5px;
    }
</style>