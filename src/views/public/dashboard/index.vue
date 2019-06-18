<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole"/> -->
    <indexCharts v-if="showChart"/>
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
</style>
