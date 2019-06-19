<template>
  <div class="dashboard-container">
    <indexCharts v-if="showChart"/>
    <div v-if="!showChart" class="dashboard-editor-container">
      <div class="index-bgc"/>
    </div>
    <!-- <component :is="currentRole"/> -->
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import adminDashboard from './admin'
// import editorDashboard from './editor'
import indexCharts from "@/views/cms/statisticsChart/indexchart.vue";

export default {
  name: 'Dashboard',
  // components: { adminDashboard, editorDashboard},
  components: { indexCharts },
  data() {
    return {
      currentRole: 'adminDashboard',
      showChart:false,
    }
  },
  computed: {
    ...mapGetters([
      'authorities'
    ])
  },
  created() {
    if (!this.authorities.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
    this.checkUser();
  },
  methods:{
    checkUser(){
      let user=JSON.parse(localStorage.getItem('BaseInfor'))
        console.log(user.clientLicenseId,'user')

        if (user.clientLicenseId==='nanyangradio') {
        this.showChart = true
    }
    }
  }
}
</script>
<style lang="scss">
  .dashboard-container{
    overflow: hidden !important;
    height: calc(100vh + 85px) !important ;
  }
  .index-bgc{
  background-color: #e3e3e3;
  background-image: url('./pic/bgc.png');
  background-repeat: no-repeat;
  background-size: contain;
  width: 300px;
  height: 150px;
  margin: 0 auto;
  margin-top:100px;
}
.dashboard-editor-container {
  background-color: #e3e3e3;
  height: 100%;
  padding: 50px 0px 10px 0px;
  
}
</style>
