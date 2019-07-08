<template>
  <div class="mainBox">
    <div class="chartBox half">
      <pcBoard :dashdate="dashdate"/>
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
            <el-table-column prop="start_time" label="访问时间" />
            <el-table-column prop="source" label="来源"/>
            <el-table-column prop="access_page" label="入口页面"/>
            <el-table-column prop="ip" label="ip"/>
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
import pcBoard from "@/components/Charts/pcBoard.vue";
import { siteProfile } from "@/api/cms/liveCharts";
import { fun_date } from "@/components/Charts/handleTimer.js";
import { setTimeout } from 'timers';
export default {
  name: "Baidu",
  components: { pcBoard, baiduCharts },
  data() {
    return {
      name: "webSiteCharts",
      today: "",
      yesteday: "",
      beforyesteday: "",
      sevendayAgo: "",
      monthAgo: "",
      visitorData: {},
      progressData: {},
      requestParams: {
      },
      site_id: "13495008",
      dashdate: [],
      tableData: [],
      chartsvalue: [],
      chartsvalueto: [],
      chartsvaluese: [],
      chartsvalueth: [],
      chartsvaluefo: [],

      activeName: "first",
      tenantId: ""
    };
  },
  created() {
    this.timeInit();
    this.InitInfo();
    this.initParams();
    this.getCurrentVisitor();
    this.profile();
    
    this.getProgress("to");
    setTimeout(()=>{
      this.getProgress("se");
    },100)
    setTimeout(()=>{
      this.getProgress("th");
    },200)
    setTimeout(()=>{
      this.getProgress("fo");
    },300)
  },
  mounted() {},
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
    InitInfo() {
      this.tenantId = JSON.parse(
        localStorage.getItem("BaseInfor")
      ).clientLicenseId;
    },
    initParams() {
      // if (this.tenantId == "dxtv") {
      //    this.visitorData = {
      //     area: "china",
      //     domain: "hnr.cn",
      //     maxResults: "0",
      //     metrics: "area,source,visit_time,visit_pages,access_page,ip",
      //     method: "trend/latest/a",
      //     order: "visit_pages, desc",
      //     siteId: "1453193",
      //     source: "through"
      //   };
      //   this.progressData = {
      //     area: "china",
      //     domain: "hnr.cn",
      //     endDate: "20190624",
      //     gran: "hour",
      //     maxResults: "0",
      //     metrics: "pv_count,visitor_count,ip_count ",
      //     method: "trend/time/a",
      //     siteId: "1453193",
      //     source: "string",
      //     startDate: "20190601"
      //   };
      //   this.requestParams= {
      //   area: "china",
      //   domain: "hnr.cn", //关键参数
      //   endDate: "20190624",
      //   gran: "day",
      //   maxResults: "0",
      //   method: "overview/getTimeTrendRpt",
      //   metrics: "pv_count,visitor_count,ip_count,bounce_ratio",
      //   order: "",
      //   siteId: "1453193",//关键参数
      //   source: "string",
      //   startDate: "20190601"
      // }
      // }
      if (this.tenantId == "nanyangradio") {
        this.visitorData = {
          area: "china",
          domain: "nydt.cn",
          maxResults: "0",
          metrics: "area,source,visit_time,visit_pages,access_page,ip,start_time",
          method: "trend/latest/a",
          order: "start_time, desc",
          siteId: "13495008",
          source: "through"
        };
        this.progressData = {
          area: "china",
          domain: "nydt.cn",
          endDate: "20190624",
          gran: "hour",
          maxResults: "0",
          metrics: "pv_count,visitor_count,ip_count ",
          method: "trend/time/a",
          siteId: "13495008",
          source: "string",
          startDate: "20190601"
        };
        this.requestParams= {
        area: "china",
        domain: "nydt.cn",
        endDate: "20190624",
        gran: "day",
        maxResults: "0",
        method: "overview/getTimeTrendRpt",
        metrics: "pv_count,visitor_count,ip_count,bounce_ratio",
        order: "",
        siteId: "13495008",
        source: "string",
        startDate: "20190601"
      }
      }
    },
    //获取最近七天数据
    profile() {
      var _this = this;
      let data = this.requestParams;
      data.startDate = _this.sevendayAgo;
      data.endDate = _this.today;
      return new Promise((resolve, reject) => {
        siteProfile(data)
          .then(response => {
            if (response.data.code === 0) {
              let result = JSON.parse(response.data.result);
              _this.dashdate = result.body.data[0].result.items[1];
            }
          })
          .catch(error => {
            console.log(error);
          });
      });
    },

    //获取实时访客信息
    getCurrentVisitor() {
      var _this = this;
      return new Promise((resolve, reject) => {
        siteProfile(this.visitorData)
          .then(response => {
            if (response.data.code == 0) {
              let result = JSON.parse(response.data.result);
              let res = result.body.data[0].result.items[1];
              _this.$nextTick(() => {
                _this.tableData = _this.handleData(res);
              });

            } else {
              this.$message({
                type: "error",
                message: "请求失败"
              });
            }
          })
          .catch(error => {
              console.log(error);
          });
      });
    },
    //趋势数据
    getProgress( type) {
      var _this = this;
      // let data = {
      //   area: "china",
      //   domain: "nydt.cn",
      //   endDate: "20190624",
      //   gran: "hour",
      //   maxResults: "0",
      //   metrics: "pv_count,visitor_count,ip_count ",
      //   method: "trend/time/a",
      //   siteId: "13495008",
      //   source: "string",
      //   startDate: "20190601"
      // };
      let data = this.progressData;
      if (type == "to") {
        data.endDate = this.today;
        data.startDate = this.today;
      } else if (type == "se") {
        data.endDate = this.yesteday;
        data.startDate = this.yesteday;
      } else if (type == "th") {
        data.endDate = this.today;
        data.startDate = this.sevendayAgo;
      } else if (type == "fo") {
        data.endDate = this.today;
        data.startDate = this.monthAgo;
      }
      siteProfile(data)
        .then(response => {
          if (response.data.code == 0) {
            let result = JSON.parse(response.data.result);
            let data = result.body.data[0].result.items[1];
            if (type == "to") {
              _this.chartsvalueto = _this.handleChartData(data);
              _this.chartInit();
            } else if (type == "se") {
              _this.chartsvaluese = _this.handleChartData(data);
            } else if (type == "th") {
              _this.chartsvalueth = _this.handleChartData(data);
            } else if (type == "fo") {
              _this.chartsvaluefo = _this.handleChartData(data);
            }
          } else {
            this.$message({
              type: "error",
              message: "请求失败"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //table 数据处理
    handleData(val) {
      let newArr = [];
      val.forEach(item => {
        newArr.push({
          start_time:item[0],
          area: item[1],
          source: item[2].fromType,
          keyword: null, //无返回值，暂写为空
          access_page: item[3],
          ip: item[4],
          visit_time: item[5],
          visit_pages: item[6],
          
          
        });
      });
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
      return newArr;
    },
    handleClick(tab, event) {
      this.chartInit();
    },
    chartInit() {
      if (this.activeName == "first") {
        let data = [
          [...this.chartsvalueto[0]],
          [...this.chartsvalueto[1]],
          [...this.chartsvalueto[2]],
        ];
        data.forEach(item=>{
          item=item.reverse()
        })
        this.chartsvalue = data;
      } else if (this.activeName == "second") {
        let data = [
          [...this.chartsvaluese[0]],
          [...this.chartsvaluese[1]],
          [...this.chartsvaluese[2]],
        ];
        data.forEach(item=>{
          item=item.reverse()
        })
        this.chartsvalue = data;
      } else if (this.activeName == "third") {
        let data = [
          [...this.chartsvalueth[0]],
          [...this.chartsvalueth[1]],
          [...this.chartsvalueth[2]],
        ];
        data.forEach(item=>{
          item=item.reverse()
        })
        this.chartsvalue = data;
      } else if (this.activeName == "fourth") {
        let data = [
          [...this.chartsvaluefo[0]],
          [...this.chartsvaluefo[1]],
          [...this.chartsvaluefo[2]],
        ];
        data.forEach(item=>{
          item=item.reverse()
        })
        this.chartsvalue = data;
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
    height: 20px;
    width: 100%;
  }
  .leftMargin {
    margin-left: 1.5%;
    padding-left: 20px;
  }
}
</style>