<template>
  <div class="helpdoc-container">
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="鉴权直播" name="0" />
        <el-tab-pane label="拉转直播" name="1" />
        <el-tab-pane label="分发直播" name="2" />
        <el-tab-pane label="频率/频道直播流地址" name="3" />
      </el-tabs>
    </template>
    <authentication v-if="activeName=='0'" />
    <rebroadcast v-if="activeName=='1'" />
    <dispense-stream v-if="activeName=='2'"/>
    <television-stream v-if="activeName=='3'"/>
  </div>
</template>
<script>
import addRebroadcast from "@/views/live/liveConfig/addRebroadcast.vue";
import rebroadcast from "@/views/live/liveConfig/rebroadcast.vue";
import dispenseStream from "@/views/live/liveConfig/dispenseStream.vue";
import authentication from "@/views/live/liveConfig/authentication.vue";
import televisionStream from "@/views/live/liveConfig/televisionStream.vue";

export default {
  components: { addRebroadcast, rebroadcast, authentication,dispenseStream,televisionStream },

  data() {
    
    return {
      
      activeName: "0"
     
    };
  },
  created() {
    
  },
  mounted() {},
  methods: {
    //tab切换
    handleClick(tab, event) {
    }
   
  }
};
</script>
<style lang="scss" scoped>
.helpdoc-container {
  margin: 30px;
}
.pagenation {
  margin: 30px 0;
}
.imgStyle {
  display: block;
  width: 160px;
  margin: 5px 0;
  border-radius: 5px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.tips {
  line-height: 28px;
}
</style>