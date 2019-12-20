<template>
  <el-tabs v-model="activeName" type="card" >
    <el-tab-pane label="大象内部考核" name="first" v-if="checkAuth('cms:dxnewsScoreDownload:insideCheck')" >
      <inside-check />
    </el-tab-pane>
    <el-tab-pane label="大象号稿件打分" name="second" v-if="checkAuth('cms:dxnewsScoreDownload:article')">
      <article-table />
    </el-tab-pane>
    
  </el-tabs>
</template>

<script>
import insideCheck from './insideCheck';
import articleTable from './articleTable';
export default {
  components:{
    insideCheck,
    articleTable
  },
  data() {
    return {
      activeName: "first"
    };
  },
  created(){
      this.init();
  },
  methods:{
    init(){
      let flag=this.checkAuth('cms:dxnewsScoreDownload:insideCheck')
        if(flag){
        this.activeName='first';
      }else{
        this.activeName='second'
      }
    },
    checkAuth (authKey) {
      if (this.$store.getters.authorities.indexOf(authKey) === -1) {
        return false
      } else {
        return true
      }
    },
  }
  
};
</script>

<style>
</style>


