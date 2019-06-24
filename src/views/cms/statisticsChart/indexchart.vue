<template>
  <div class="mainBox">
    <div class="leftSection">
      <div class="titleright">
        <h4>pc端统计</h4>
        <p>
          <span @click="showpc">查看详情>></span>
        </p>
      </div>
      <!--  -->
      <div class="table-list">
        <table class="list">
          <tbody class="rightLine nonerightline">
            <tr class="baiduTitle heightSize">
              <th/>
              <th>浏览量(PV)</th>
              <th>访客数(UV)</th>
              <th>IP数</th>
              <th>跳出率</th>
            </tr>
            <tr class="highlight heightSize">
              <td class="normal">今日</td>
              <td class="rightLine">{{ dashdate==null?'--':dashdate[7][0] }}</td>
              <td class="rightLine">{{ dashdate==null?'--':dashdate[7][1] }}</td>
              <td class="rightLine">{{ dashdate==null?'--':dashdate[7][2] }}</td>
              <td class="nonerightline">{{ dashdate==null?'--':dashdate[7][3] }}%</td>
            </tr>
            <tr class="heightSize">
              <td class="normal">昨日</td>
              <td class="rightLine">{{ dashdate==null?'--':dashdate[6][0] }}</td>
              <td class="rightLine">{{ dashdate==null?'--':dashdate[6][1] }}</td>
              <td class="rightLine">{{ dashdate==null?'--':dashdate[6][2] }}</td>
              <td class="nonerightline">{{ dashdate==null?'--':dashdate[6][3] }}%</td>
            </tr>
            <tr class="heightSize">
              <td class="normal">近七日</td>
              <td class="rightLine">{{ sevendata==null?'--':sevendata[0] }}</td>
              <td class="rightLine">{{ sevendata==null?'--':sevendata[1] }}</td>
              <td class="rightLine">{{ sevendata==null?'--':sevendata[2] }}</td>
              <td class="nonerightline">{{ sevendata==null?'--':sevendata[3] }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--  -->
    </div>
    <div class="rightSection">
      <div class="titleright">
        <h4>移动端统计</h4>
        <p>
          <span @click="showMobile">查看详情>></span>
        </p>
      </div>

      <div class="rightpart">
        <div class="floor">
          <div class="smallbox">
            <p class="mytitle">新增用户（7日平均）</p>
            <h3>{{ datavalue.totalNewUserAverage7!=null?datavalue.totalNewUserAverage7.toFixed(0):'--' }}</h3>
            <p>
              同比
              <span>{{ datavalue.totalNewUserChangePre!=null?(datavalue.totalNewUserChangePre*100).toFixed(2):'--' }}%</span>
              <span v-if="datavalue.totalNewUserChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
          <div class="smallbox">
            <p class="mytitle">活跃用户（7日平均）</p>
            <h3>{{ datavalue.activeUserWeekLast!=null?datavalue.activeUserWeekLast:'--' }}</h3>
            <p>
              同比
              <span>{{ datavalue.activeUserWeekChangePre!=null?datavalue.activeUserWeekChangePre.toFixed(2):'--' }}%</span>
              <span v-if="datavalue.activeUserWeekChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
        </div>
        <div class="floor">
          <div class="smallbox">
            <p class="mytitle">新用户次日留存率（7日平均）</p>
            <h3>{{ datavalue.retentionAverage7!=null?(datavalue.retentionAverage7*100).toFixed(2):'--' }}%</h3>
            <p>
              同比
              <span>{{ datavalue.retentionChangePre!=null?(datavalue.retentionChangePre*100).toFixed(2):'--' }}%</span>
              <span v-if="datavalue.retentionChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
          <div class="smallbox">
            <p class="mytitle">使用时长（7日平均）</p>
            <h3>{{ datavalue.durationAverage7!=null?datavalue.durationAverage7.toFixed(2):'--' }}</h3>
            <p>
              同比
              <span>{{ datavalue.durationChangePre!=null?(datavalue.durationChangePre*100).toFixed(2):'--' }}%</span>
              <span v-if="datavalue.durationChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fun_date } from "@/components/Charts/handleTimer.js";
import { getTrend, siteProfile } from "@/api/cms/liveCharts";
export default {
  data() {
    return {
      datavalue: {},
      dashdate: [],
      appkey: "5cbd29613fc19548f9000c25",
      site_id: "13495008",
      sevendayAgo: "",
      today: "",
      requestParams: {
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
    };
  },
  computed: {
    //七天数据计算
    sevendata: function() {
      let total = [];
      let reactValue = [];
      this.dashdate.forEach((item, index) => {
        item.forEach((value, order) => {
          if (total[order]) {
            total[order] = total[order] + value;
          } else {
            total.push(value);
          }
        });
      });
      total.forEach(item => {
        reactValue.push(parseInt(item / 8));
      });
      return reactValue;
    }
  },
  created() {
    this.timeInit();
    this.fetchTrend();
    this.profile();
  },
  mounted() {},
  methods: {
    showpc() {
      this.$router.push({
        path: "/cms/statisticsChart/pcSiteCharts"
      });
    },
    showMobile() {
      this.$router.push({
        path: "/cms/statisticsChart/mobileCharts"
      });
    },
    fetchTrend() {
      var _this = this;
      return new Promise((resolve, reject) => {
        getTrend(this.appkey)
          .then(response => {
            if (response.data.code == 0) {
              let result = response.data.result;
              _this.datavalue = result;
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    timeInit() {
      let today = fun_date(0);
      this.today = today.replace(/-/gi, "");
      let sevendayAgo = fun_date(-7);
      this.sevendayAgo = sevendayAgo.replace(/-/gi, "");
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
          .catch(reject => {
            console.log(reject);
          });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.mainBox {
  width: 100%;
  padding: 20px 42px 0 42px;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  .titleright {
    padding: 0 20px;
    p {
      text-align: right;
      color: #409eff;
      cursor: pointer;
      font-size: 14px;
    }
  }
  .rightSection,
  .leftSection {
    box-sizing: border-box;
    box-shadow: 1px 5px 5px #dedede;
    width: 49%;
    .floor {
      background-color: #fff;
      display: flex;
      min-width: 520px;
      .smallbox {
        width: 49.5%;
        padding: 0 20px;
        padding-left: 30px;
        .mytitle {
          color: rgb(102, 102, 102);
          font-size: 14px;
        }
        p {
          color: rgb(153, 153, 153);
          font-size: 12px;
          .redarrow {
            color: red;
            font-weight: bolder;
            font-size: 18px;
          }
          .greenarrow {
            color: green;
            font-weight: bolder;
            font-size: 18px;
          }
        }
      }
    }
    // ------------
    .overview-card-title-container {
      margin-top: 5px;
    }
    div.table-list {
      width: 100%;
      margin: 0 auto;
      padding-right: 1px;
      box-shadow: 1px 5px 5px #dedede;
      padding: 0 20px;
    }
    div.table-list table.list {
      border-collapse: collapse;
      width: 100%;
      font-size: 12px;
    }
    .baiduTitle {
      border-bottom: none;
      height: 60px;
      line-height: 50px;
    }
    .heightSize {
      height: 61px;
    }
    td.normal {
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      color: rgbrgb(102, 102, 102);
    }
    .rightLine {
      border-right: 1px solid #dedede;
      text-align: right;
      padding: 18px;
    }
    .nonerightline {
      border: none !important;
    }
    .highlight .rightLine {
      color: #111314;
      font-size: 16px;
      font-weight: bolder;
    }
  }
  .rightpart {
    height: 100%;
  }
}
</style>
