<template>
  <div>
    <div class="biaoge">
      <el-row>
        <el-col :span="3"><div class="leftdiv coldiv">1235423</div></el-col>
        <el-col :span="21"><div class="rightdiv coldiv">123qsdadasd</div></el-col>
      </el-row>
    </div>


  </div>

</template>

<script>

export default {
  name: "DisclosDetails",
 
  data() {
    return {

    };
  },
  mounted() {
   
  },
  methods: {

  },
};
</script>

<style lang="scss">
.leftdiv{
  text-align: right;
  box-sizing: border-box;
  padding: 0 10px;
}

.coldiv{
  border: 1px solid #b6b6b6;
  height: 40px;
  line-height: 40px;
}
.rightdiv{
padding-left: 10px;
border-left:none; 
}
.biaoge{
  box-sizing: border-box;
  padding: 15px;
}
</style>
