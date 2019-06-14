<template>
  <div>
    百度统计
    <dashBoard :dashdate="dashdate" />

  </div>
</template>
<script>
import dashBoard from "@/components/Charts/dashBoard.vue";
import{siteProfile}from "@/api/cms/liveCharts";
import {fun_date} from "@/components/Charts/handleTimer.js";
export default {
  name: "Umeng",
  components: { dashBoard },
  data() {
    return {
      name:'webSiteCharts',
      today:'',
      yesteday:'',
      sevendayAgo:'',
      requestParams:{
          'header': {
            'username': "中原之声网",
            'password': "qingyuan19770963",
            'token': "a87df87040e014dc9aae104c5cddabaf",
            'account_type': 1
          },
          'body': {
            'site_id': "13495008",
            'start_date': "20190101",
            'end_date': "2019005",
            'metrics': "pv_count,visitor_count,ip_count,bounce_ratio",
            'method': "overview/getTimeTrendRpt"
          }
        },
        dashdate:[],
    };
  },
  created() {
     this.timeInit();
    this.profile();
   
  },
  mounted() {},
  methods: {
    timeInit(){
      let today=fun_date(0);
    this.today=today.replace(/-/gi,'');
    let yesteday=fun_date(-1);
    this.yesteday=yesteday.replace(/-/gi,'');
    let sevendayAgo=fun_date(-7);
    this.sevendayAgo=sevendayAgo.replace(/-/gi,'');
    },
    //获取最近七天数据
    profile() {
      var _this=this;
      return new Promise((resolve, reject) => {
        let data = this.requestParams
        data.body.start_date=this.sevendayAgo;
        data.body.end_date=this.today;

        siteProfile(data)
          .then(response => {
            console.log(response)
            if(response.data.header.desc==='success'){
              // _this.$set(_this.dashdate,'')
              _this.dashdate=response.data.body.data[0].result.items[1]
              console.log(_this.dashdate,'jiegou')
            }
            
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