<template>
  <el-tabs v-model="activeName" type="card" >
    <el-tab-pane label="大象内部考核" name="first">
      <inside-check v-if="activeName=='first'"/>
    </el-tab-pane>
    <el-tab-pane label="大象号稿件打分" name="second">
      <article-table v-if="activeName=='second'"/>
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
  
};
</script>

<style>
</style>


