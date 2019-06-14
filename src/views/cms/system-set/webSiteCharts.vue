<template>
  <div>
    百度统计
    <dashBoard/>
  </div>
</template>
<script>
import dashBoard from "@/components/Charts/dashBoard.vue";
import{siteProfile}from "@/api/cms/liveCharts";
export default {
  name: "Umeng",
  components: { dashBoard },
  data() {
    return {
      name:'webSiteCharts'
    };
  },
  created() {
    this.profile();
  },
  mounted() {},
  methods: {
    profile() {
      return new Promise((resolve, reject) => {
        let data = {
          header: {
            username: "中原之声网",
            password: "qingyuan19770963",
            token: "a87df87040e014dc9aae104c5cddabaf",
            account_type: 1
          },
          body: {
            site_id: "13495008",
            start_date: "20190101",
            end_date: "2019005",
            metrics: "pv_count,visitor_count,ip_count",
            method: "overview/getTimeTrendRpt"
          }
        };
        siteProfile(data)
          .then(response => {
            console.log(response, "response");
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>