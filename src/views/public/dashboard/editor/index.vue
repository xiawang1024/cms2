<template>
  <div class="dashboard-editor-container">
    <div class="index-bgc"/>
    <!-- <div class="clearfix">
      <pan-thumb
        :image="avatar"
        style="float: left"
      > Your roles:
        <span
          v-for="item in authorities"
          :key="item"
          class="pan-info-roles"
        >{{ item }}</span>
      </pan-thumb>
      <div class="info-container">
        <span class="display_name">{{ name }}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;">Editor's Dashboard</span>
      </div>
    </div>
    <div>
      <img
        :src="emptyGif"
        class="emptyGif"
      >
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/public/PanThumb'

export default {
  name: 'DashboardEditor',
  components: { PanThumb },
  data() {
    return {
      emptyGif:
        'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'authorities'])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.emptyGif {
  display: block;
  width: 45%;
  margin: 0 auto;
}
.index-bgc{
  background-color: #e3e3e3;
  background-image: url('../pic/bgc.png');
  background-repeat: no-repeat;
  background-size: contain;
  width: 300px;
  height: 150px;
  margin: 0 auto;
  margin-top:100px;
}
.dashboard-editor-container {
  background-color: #e3e3e3;
  // min-height: 100vh;
  //height: calc(100vh + 85px);
  height: 100%;
  padding: 50px 0px 10px 0px;
  // .pan-info-roles {
  //   font-size: 12px;
  //   font-weight: 700;
  //   color: #333;
  //   display: block;
  // }
  // .info-container {
  //   position: relative;
  //   margin-left: 190px;
  //   height: 150px;
  //   line-height: 200px;
  //   .display_name {
  //     font-size: 48px;
  //     line-height: 48px;
  //     color: #212121;
  //     position: absolute;
  //     top: 25px;
  //   }
  // }
}
</style>
