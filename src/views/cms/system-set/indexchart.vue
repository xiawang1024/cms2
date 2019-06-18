<template>
  <div class="mainBox">
    <div class="leftSection">
      <div class="titleright">
        <h4>pc端统计</h4>
        <p ><span @click="showpc">查看详情>></span></p>
      </div>
      <!--  -->
      <div class="table-list">
        <table class="list">
          <tbody class="rightLine nonerightline">
            <tr class="title heightSize">
              <th/>
              <th>浏览量(PV)</th>
              <th>访客数(UV)</th>
              <th>IP数</th>
              <th>跳出率</th>
              <th>平均访问时长</th>
            </tr>
            <tr class="highlight heightSize">
              <td class="normal">今日</td>
              <td class="rightLine">{{ dashdate[7][0] }}</td>
              <td class="rightLine">{{ dashdate[7][1] }}</td>
              <td class="rightLine">{{ dashdate[7][2] }}</td>
              <td class="rightLine">{{ dashdate[7][3] }}%</td>
              <td class="nonerightline">00:02:37</td>
            </tr>
            <tr class="heightSize">
              <td class="normal">昨日</td>
              <td class="rightLine">{{ dashdate[6][0] }}</td>
              <td class="rightLine">{{ dashdate[6][1] }}</td>
              <td class="rightLine">{{ dashdate[6][2] }}</td>
              <td class="rightLine">{{ dashdate[6][3] }}%</td>
              <td class="nonerightline">00:02:45</td>
            </tr>
            <tr class="heightSize">
              <td class="normal">近七日</td>
              <td class="rightLine">{{ sevendata[0] }}</td>
              <td class="rightLine">{{ sevendata[1] }}</td>
              <td class="rightLine">{{ sevendata[2] }}</td>
              <td class="rightLine">{{ sevendata[3] }}%</td>
              <td class="nonerightline">--</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--  -->
    </div>
    <div class="rightSection">
      <div class="titleright">
        <h4>移动端统计</h4>
        <p ><span @click="showMobile">查看详情>></span></p>
      </div>

      <div class="rightpart">
        <div class="floor">
          <div class="smallbox">
            <p class="title">新增用户（7日平均）</p>
            <h3>{{ datavalue?datavalue.totalNewUserAverage7.toFixed(0):'--' }}</h3>
            <p>
              同比
              <span>{{ datavalue?(datavalue.totalNewUserChangePre*100).toFixed(2):'--' }}%</span>
              <span v-if="datavalue.totalNewUserChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
          <div class="smallbox">
            <p class="title">活跃用户（7日平均）</p>
            <h3>{{ datavalue?datavalue.activeUserWeekLast:'--' }}</h3>
            <p>
              同比
              <span>{{ datavalue?datavalue.activeUserWeekChangePre.toFixed(2):'--' }}%</span>
              <span v-if="datavalue.activeUserWeekChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
        </div>
        <div class="floor">
          <div class="smallbox">
            <p class="title">新用户次日留存率（7日平均）</p>
            <h3>{{ datavalue?datavalue.retentionAverage7.toFixed(2):'--' }}%</h3>
            <p>
              同比
              <span>{{ datavalue?datavalue.retentionChangePre.toFixed(2):'--' }}%</span>
              <span v-if="datavalue.retentionChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
          <div class="smallbox">
            <p class="title">使用时长（7日平均）</p>
            <h3>{{ datavalue?datavalue.durationAverage7.toFixed(2):'--' }}</h3>
            <p>
              同比
              <span>{{ datavalue?datavalue.durationChangePre.toFixed(2):'--' }}%</span>
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
import Vbaidu from "@/views/cms/system-set/webSiteCharts.vue";
import { fun_date } from "@/components/Charts/handleTimer.js";
import { getTrend, siteProfile } from "@/api/cms/liveCharts";
export default {
  name: "Indexcharts",
  components: { Vbaidu },
  data() {
    return {
      datavalue: {},
      dashdate: [],
      appkey: "5cbd29613fc19548f9000c25",
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
      sevendayAgo:'',
      today:''

    };
  },
  computed:{
      //七天数据计算
      sevendata:function(){
        let total=[];
        let reactValue=[];
        this.dashdate.forEach((item,index) => {
         item.forEach((value,order)=>{
           if(total[order]){
             total[order]=total[order]+value
           }else{
              total.push(value)
           }
              
            })
           
        });
         total.forEach((item)=>{
              reactValue.push(parseInt(item/8))
            })
        return reactValue
      }
    },
  created() {
    this.timeInit();
    this.fetchTrend();
    this.profile();
  },
  mounted() {

  },
  methods: {
      showpc(){
              this.$router.push({
        path: "/cms/systemSet/webSiteCharts"
      })
      },
      showMobile(){
              this.$router.push({
        path: "/cms/systemSet/liveCharts"
      })
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
      return new Promise((resolve, reject) => {
        let data = this.requestParams;
        data.body.start_date = this.sevendayAgo;
        data.body.end_date = this.today;

        siteProfile(data)
          .then(response => {
            if (response.data.header.desc === "success") {
              _this.dashdate = response.data.body.data[0].result.items[1];
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
  padding: 0 42px;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  //   border-bottom: 1px solid #dedede;
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
        .title {
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
    .list {
    //   margin-top: 55px;
    }
    div.table-list table.list {
      border-collapse: collapse;
      width: 100%;
      font-size: 12px;
    }
    .title {
      border-bottom: none;
      height: 60px;
      line-height: 50px;
    }
    .heightSize{
         height: 82px;;
    }
    td.normal {
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      color: rgbrgb(102, 102, 102)
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
