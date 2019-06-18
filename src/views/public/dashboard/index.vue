<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole"/> -->
    <indexCharts/>
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
      currentRole: 'adminDashboard'
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
  }
}
</script>
<style lang="scss">
  .dashboard-container{
    overflow: hidden !important;
    height: calc(100vh + 85px) !important ;
  }
</style>
