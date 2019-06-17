<template>
  <div class="mainBox">
    <div class="chartBox half">
      <dashBoard :dashdate="dashdate"/>
    </div>
    <div>
      <div class="chartBox half leftMargin">
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="今日" name="first"/>
            <el-tab-pane label="昨日" name="second"/>
            <el-tab-pane label="近七日" name="third"/>
            <el-tab-pane label="近一月" name="fourth"/>
          </el-tabs>
        </template>
        <baiduCharts :chartsvalue="chartsvalue" width="100%" height="300px"/>
      </div>
      <div class="clearFloat"/>
      <div class="chartBox">
        <template>
          <el-table :data="tableData" stripe style="width: 100%" height="400">
            <el-table-column prop="area" label="地域" width="180"/>
            <el-table-column prop="source" label="来源"/>
            <el-table-column prop="keyword" label="关键词"/>
            <el-table-column prop="visit_time" label="访问时长（秒）"/>
            <el-table-column prop="visit_pages" label="访问页数"/>
          </el-table>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import baiduCharts from "@/components/Charts/baiduCharts.vue";
import dashBoard from "@/components/Charts/dashBoard.vue";
import { siteProfile } from "@/api/cms/liveCharts";
import { fun_date } from "@/components/Charts/handleTimer.js";
export default {
  name: "Baidu",
  components: { dashBoard, baiduCharts },
  data() {
    return {
      name: "webSiteCharts",
      today: "",
      yesteday: "",
      beforyesteday: "",
      sevendayAgo: "",
      monthAgo: "",
      requestParams: {
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
          metrics: "pv_count,visitor_count,ip_count,bounce_ratio",
          method: "overview/getTimeTrendRpt"
        }
      },
      dashdate: [],
      tableData: [],
      chartsvalue: [],
      chartsvalueto: [],
      chartsvaluese: [],
      chartsvalueth: [],
      chartsvaluefo: [],

      activeName: "first"
    };
  },
  created() {
    this.timeInit();
    this.getCurrentVisitor();
    this.profile();
    this.getProgress(this.yesteday,this.today,'to');
    this.getProgress(this.beforyesteday,this.yesteday,'se');
    this.getProgress(this.sevendayAgo,this.today,'th');
    this.getProgress(this.monthAgo,this.today,'fo');
  },
  mounted() {
  },
  methods: {
    timeInit() {
      let today = fun_date(0);
      this.today = today.replace(/-/gi, "");
      let yesteday = fun_date(-1);
      this.yesteday = yesteday.replace(/-/gi, "");
       let beforyesteday = fun_date(-2);
      this.beforyesteday = beforyesteday.replace(/-/gi, "");
      let sevendayAgo = fun_date(-7);
      this.sevendayAgo = sevendayAgo.replace(/-/gi, "");
      let monthAgo = fun_date(-30);
      this.monthAgo = monthAgo.replace(/-/gi, "");
    },
    //获取最近七天数据
    profile() {
      var _this = this;
      return new Promise((resolve, reject) => {
        let data = this.requestParams;
        data.body.start_date = this.sevendayAgo;
        data.body.end_date = this.today;

        siteProfile(data)
          .then(response => {
            if (response.data.header.desc === "success") {
              _this.dashdate = response.data.body.data[0].result.items[1];
              console.log(_this.dashdate, "数据");
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    //获取实时访客信息
    getCurrentVisitor() {
      var _this = this;
      return new Promise((resolve, reject) => {
        let data = {
          header: {
            username: "中原之声网",
            password: "qingyuan19770963",
            token: "a87df87040e014dc9aae104c5cddabaf",
            account_type: 1
          },
          body: {
            // site_id: "13495008",
            site_id: "1453193",
            metrics: "area,source,keyword,visit_time,visit_pages",
            method: "trend/latest/a",
            order: "visit_pages, desc",
            max_results: "100",
            source: "through",
            area: "china"
          }
        };

        siteProfile(data)
          .then(response => {
            console.log(response);
            if (response.data.header.desc === "success") {
              let result = response.data.body.data[0].result.items[1];
              _this.$nextTick(() => {
                _this.tableData = _this.handleData(result);
              });

              console.log(_this.tableData, "表格");
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    //趋势数据
    getProgress(starttime,endtime,type) {
      var _this = this;
      let data = {
        header: {
          username: "中原之声网",
          password: "qingyuan19770963",
          token: "a87df87040e014dc9aae104c5cddabaf",
          account_type: 1
        },
        body: {
          site_id: "13495008",
          start_date: starttime,
          end_date: endtime,
          metrics: "pv_count,visitor_count,ip_count ",
          method: "trend/time/a",
          gran: "hour",
          area: "china"
        }
      };
      siteProfile(data)
        .then(response => {
          console.log(response, "趋势");
          if (response.data.header.desc === "success") {
            let data = response.data.body.data[0].result.items[1];
            //判断请求图表类型
            console.log(type,'type')
            if(type=='to'){
                 _this.chartsvalueto = _this.handleChartData(data);
                 _this.chartInit();
            }else if(type=='se'){
               _this.chartsvaluese = _this.handleChartData(data);
            }else if(type=='th'){
               _this.chartsvalueth= _this.handleChartData(data);
            }else if(type=='fo'){
              _this.chartsvaluefo= _this.handleChartData(data);
            }
           
            console.log(_this.chartsvaluese, "趋势");
          }
        })
        .catch(reject => {
          console.log(reject);
        });
    },
    //table 数据处理
    handleData(val) {
      let newArr = [];
      val.forEach(item => {
        newArr.push({
          area: item[0],
          source: item[1].fromType,
          keyword: null, //无返回值，暂写为空
          visit_time: item[2],
          visit_pages: item[3]
        });
      });
      console.log(newArr);
      return newArr;
    },
    //趋势图数据处理
    handleChartData(val) {
      let newArr = [];
      val.forEach((item, index) => {
        item.forEach((ele, order) => {
          if (newArr[order]) {
            newArr[order].push(ele);
          } else {
            newArr.push([ele]);
          }
        });
      });
      console.log(newArr);
      return newArr;
    },
    handleClick(tab, event) {
      this.chartInit();
    },
    chartInit(){
      if(this.activeName=='first'){
        let data=[
          this.chartsvalueto[0].reverse(),
          this.chartsvalueto[1].reverse(),
          this.chartsvalueto[2].reverse()
          ]
         this.chartsvalue=data
      }else if(this.activeName=='second'){
         let data=[
          this.chartsvaluese[0].reverse(),
          this.chartsvaluese[1].reverse(),
          this.chartsvaluese[2].reverse()
          ]
         this.chartsvalue=data
      }else if(this.activeName=='third'){
         let data=[
          this.chartsvalueth[0].reverse(),
          this.chartsvalueth[1].reverse(),
          this.chartsvalueth[2].reverse()
          ]
         this.chartsvalue=data
      }else if(this.activeName=='fourth'){
         let data=[
          this.chartsvaluefo[0].reverse(),
          this.chartsvaluefo[1].reverse(),
          this.chartsvaluefo[2].reverse()
          ]
         this.chartsvalue=data
      }
    
    }
  }
};
</script>
<style lang="scss" scoped>
.mainBox {
  width: 100%;
  padding: 30px;
  .chartBox {
    box-shadow: 1px 5px 5px #dedede;
    margin: 10px 0;
  }
  .half {
    width: 49%;
    float: left;
  }
  .clearFloat {
    clear: both;
  }
  .leftMargin {
    margin-left: 1.5%;
  }
}
</style>