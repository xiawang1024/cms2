<template>
  <div>
    <div class="mainBox">
      <div class="leftSection">
        <div class="titleright">
          <h4>pc端统计</h4>
          <p>
            <span @click="showpc" v-if="checkAuth('cms:live:detail')" >查看详情>></span>
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
                <td class="rightLine">{{ dashdate.length==0?'--':dashdate[7][0] }}</td>
                <td class="rightLine">{{ dashdate.length==0?'--':dashdate[7][1] }}</td>
                <td class="rightLine">{{ dashdate.length==0?'--':dashdate[7][2] }}</td>
                <td class="nonerightline">{{ dashdate.length==0?'--':(dashdate[7][3]).toFixed(2) }}%</td>
              </tr>
              <tr class="heightSize">
                <td class="normal">昨日</td>
                <td class="rightLine">{{ dashdate.length==0?'--':dashdate[6][0] }}</td>
                <td class="rightLine">{{ dashdate.length==0?'--':dashdate[6][1] }}</td>
                <td class="rightLine">{{ dashdate.length==0?'--':dashdate[6][2] }}</td>
                <td class="nonerightline">{{ dashdate.length==0?'--':(dashdate[6][3]).toFixed(2) }}%</td>
              </tr>
              <tr class="heightSize">
                <td class="normal">近七日</td>
                <td class="rightLine">{{ sevendata==null?'--':sevendata[0] }}</td>
                <td class="rightLine">{{ sevendata==null?'--':sevendata[1] }}</td>
                <td class="rightLine">{{ sevendata==null?'--':sevendata[2] }}</td>
                <td class="nonerightline">{{ sevendata==null?'--':((sevendata[3]).toFixed(2)) }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--  -->
      </div>
      <div class="rightSection">
        <div class="titleright">
         
          <h4>移动端统计 
          &#x3000;
            <span class="androidColor">Android</span>
            /
            <span class="iosColor">IOS</span>
          </h4>
          <p>
            <span @click="showMobile" v-if="checkAuth('cms:live:detail')" >查看详情>></span>
          </p>
        </div>

        <div class="rightpart">
          <div class="floor">
            <div class="smallbox">
              <p class="mytitle">新增用户（7日平均）</p>
              <h3>
                <span class="androidColor">{{ android_datavalue.totalNewUserAverage7!=null?android_datavalue.totalNewUserAverage7.toFixed(0):'--' }}</span>
                /
                <span class="iosColor">{{ ios_datavalue.totalNewUserAverage7!=null?ios_datavalue.totalNewUserAverage7.toFixed(0):'--' }}</span>
              </h3>
              <p>
                同比
                <span class="androidColor">{{ android_datavalue.totalNewUserChangePre!=null?(android_datavalue.totalNewUserChangePre*100).toFixed(2):'--' }}%</span>
                <span v-if="android_datavalue.totalNewUserChangePre>0" class="redarrow">↑</span>
                <span v-else class="greenarrow">↓</span>
                <span class="iosColor">{{ ios_datavalue.totalNewUserChangePre!=null?(ios_datavalue.totalNewUserChangePre*100).toFixed(2):'--' }}%</span>
                <span v-if="ios_datavalue.totalNewUserChangePre>0" class="redarrow">↑</span>
                <span v-else class="greenarrow">↓</span>
              </p>
            </div>
            <div class="smallbox">
              <p class="mytitle">活跃用户（7日平均）</p>
              <h3>
                <span class="androidColor">{{ android_datavalue.activeUserAverage7!=null?android_datavalue.activeUserAverage7.toFixed(0):'--' }}</span>
                /
                <span class="iosColor">{{ ios_datavalue.activeUserAverage7!=null?ios_datavalue.activeUserAverage7.toFixed(0):'--' }}</span>
              </h3>
              <p>
                同比
                <span class="androidColor">{{ android_datavalue.activeUserChangePre!=null?(android_datavalue.activeUserChangePre*100).toFixed(2):'--' }}%</span>
                <span v-if="android_datavalue.activeUserChangePre>0" class="redarrow">↑</span>
                <span v-else class="greenarrow">↓</span>
                <span class="iosColor">{{ ios_datavalue.activeUserChangePre!=null?(ios_datavalue.activeUserChangePre*100).toFixed(2):'--' }}%</span>
                <span v-if="ios_datavalue.activeUserChangePre>0" class="redarrow">↑</span>
                <span v-else class="greenarrow">↓</span>
              </p>
            </div>
          </div>
          <div class="floor">
            <div class="smallbox">
              <p class="mytitle">新用户次日留存率（7日平均）</p>
              <h3>
                <span class="androidColor">{{ android_datavalue.retentionAverage7!=null?(android_datavalue.retentionAverage7*100).toFixed(2):'--' }}%</span>
                /
                <span class="iosColor">{{ ios_datavalue.retentionAverage7!=null?(ios_datavalue.retentionAverage7*100).toFixed(2):'--' }}%</span>
              </h3>
              <p>
                同比
                <span class="androidColor">{{ android_datavalue.retentionChangePre!=null?(android_datavalue.retentionChangePre*100).toFixed(2):'--' }}%</span>
                <span v-if="android_datavalue.retentionChangePre>0" class="redarrow">↑</span>
                <span v-else class="greenarrow">↓</span>
                <span class="iosColor">{{ ios_datavalue.retentionChangePre!=null?(ios_datavalue.retentionChangePre*100).toFixed(2):'--' }}%</span>
                <span v-if="ios_datavalue.retentionChangePre>0" class="redarrow">↑</span>
                <span v-else class="greenarrow">↓</span>
              </p>
            </div>
            <div class="smallbox">
              <p class="mytitle">使用时长（7日平均）</p>
              <h3>
                <span class="androidColor">{{ android_datavalue.durationAverage7!=null?(android_datavalue.durationAverage7.toFixed(2) ):'--'|computedTime }}</span>
                /
                <span class="iosColor">{{ ios_datavalue.durationAverage7!=null?(ios_datavalue.durationAverage7.toFixed(2) ):'--'|computedTime }}</span>
              </h3>
              <p>
                同比
                <span class="androidColor">{{ android_datavalue.durationChangePre!=null?(android_datavalue.durationChangePre*100).toFixed(2):'--' }}%</span>
                <span v-if="android_datavalue.durationChangePre>0" class="redarrow">↑</span>
                <span v-else class="greenarrow">↓</span>
                <span class="iosColor">{{ ios_datavalue.durationChangePre!=null?(ios_datavalue.durationChangePre*100).toFixed(2):'--' }}%</span>
                <span v-if="ios_datavalue.durationChangePre>0" class="redarrow">↑</span>
                <span v-else class="greenarrow">↓</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mainBox">
      <div class="rightSection">
        <div class="titleright">
          <h4>发稿量统计</h4>
        </div>

        <div class="rightpart">
          <div class="floor">
            <div class="smallbox">
              <p class="mytitle">发稿量（7日平均）</p>
              <h3>{{ chartValue.articleCountAverageWeek==null?'--':chartValue.articleCountAverageWeek }}</h3>
              <p>
                同比
                <span>{{ chartValue.articleCountAverageWeekChangePre==null?'--':(chartValue.articleCountAverageWeekChangePre*100).toFixed(2) }}%</span>
                <span v-if="chartValue.articleCountAverageWeekChangePre>0" class="redarrow">↑</span>
                <span v-else class="greenarrow">↓</span>
              </p>
            </div>
            <div class="smallbox">
              <p class="mytitle">发稿量（月平均）</p>
              <h3>{{ chartValue.articleCountAverageMonth==null?'--':chartValue.articleCountAverageMonth }}</h3>
              <p>
                同比
                <span>{{ chartValue.articleCountAverageMonthChangePre==null?'--':(chartValue.articleCountAverageMonthChangePre*100).toFixed(2) }}%</span>
                <span v-if="chartValue.articleCountAverageMonthChangePre>0" class="redarrow">↑</span>
                <span v-else class="greenarrow">↓</span>
              </p>
            </div>
          </div>
          <div class="floor">
            <div class="smallbox">
              <p class="mytitle">昨日发稿量</p>
              <h3>{{ chartValue.articleCountDailyYesterday==null?'--':chartValue.articleCountDailyYesterday }}</h3>
              <p>
                同比
                <span>{{ chartValue.articleCountDailyYesterdayChangePre==null?'--':(chartValue.articleCountDailyYesterdayChangePre*100).toFixed(2) }}%</span>
                <span v-if="chartValue.articleCountDailyYesterdayChangePre>0" class="redarrow">↑</span>
                <span v-else class="greenarrow">↓</span>
              </p>
            </div>
            <div class="smallbox">
              <p class="mytitle">总发稿量</p>
              <h3>{{ chartValue.articleCount==null?'--':chartValue.articleCount }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="rightSection">
        <div class="titleright">
          <h4>点击量统计</h4>
        </div>

        <div class="rightpart">
          <div class="floor">
            <div class="smallbox">
              <p class="mytitle">上周平均点击量</p>
              <h3>{{ chartValue.clickNumAverageWeek==null?'--':chartValue.clickNumAverageWeek }}</h3>
              <p>
                同比
                <span>{{ chartValue.clickNumAverageWeekChangePre==null?'--': (chartValue.clickNumAverageWeekChangePre*100).toFixed(2) }}%</span>
                <span v-if="chartValue.clickNumAverageWeekChangePre>0" class="redarrow">↑</span>
                <span v-else class="greenarrow">↓</span>
              </p>
            </div>
            <div class="smallbox">
              <p class="mytitle">上月平均点击量数</p>
              <h3>{{ chartValue.clickNumAverageMonth==null?'--':chartValue.clickNumAverageMonth }}</h3>
              <p>
                同比
                <span>{{ chartValue.clickNumAverageMonthChangePre==null?'--':(chartValue.clickNumAverageMonthChangePre*100).toFixed(2) }}%</span>
                <span v-if="chartValue.clickNumAverageMonthChangePre>0" class="redarrow">↑</span>
                <span v-else class="greenarrow">↓</span>
              </p>
            </div>
          </div>
          <div class="floor">
            <div class="smallbox">
              <p class="mytitle">昨日点击量</p>
              <h3>{{ chartValue.clickNumDailyYesterday==null?'--':chartValue.clickNumDailyYesterday }}</h3>
              <p>
                同比
                <span>{{ chartValue.clickNumDailyYesterdayChangePre==null?'--':(chartValue.clickNumDailyYesterdayChangePre*100).toFixed(2) }}%</span>
                <span v-if="chartValue.clickNumDailyYesterdayChangePre>0" class="redarrow">↑</span>
                <span v-else class="greenarrow">↓</span>
              </p>
              <p/>
            </div>
            <div class="smallbox">
              <p class="mytitle">累计点击量</p>
              <h3>{{ chartValue.clickNum==null?'--':chartValue.clickNum }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { fun_date } from "@/components/Charts/handleTimer.js";
import {
  getTrend,
  siteProfile,
  articleTrendByAuthor
} from "@/api/cms/liveCharts";
// import articleTitle from "@/components/Charts/articleTitle.vue";
export default {
  filters:{
    computedTime(val){
      let data='--'
      if(val!='--'){
        //  function formatSeconds(value) { 
   var theTime = parseInt(val);// 秒 
   var theTime1 = 0;// 分 
   var theTime2 = 0;// 小时 
  // alert(theTime); 
   if(theTime > 60) { 
      theTime1 = parseInt(theTime/60); 
      theTime = parseInt(theTime%60); 
      // alert(theTime1+"-"+theTime); 
      if(theTime1 > 60) { 
         theTime2 = parseInt(theTime1/60); 
         theTime1 = parseInt(theTime1%60); 
       } 
   } 
       var result = ""+(parseInt(theTime)<10?'0'+parseInt(theTime):parseInt(theTime)); 
       if(theTime1 >= 0) { 
       result = ""+(parseInt(theTime1)<10?'0'+parseInt(theTime1):parseInt(theTime1))+':'+result; 
       } 
       if(theTime2 >= 0) { 
       result = ""+(parseInt(theTime2)<10?'0'+parseInt(theTime2):parseInt(theTime2))+':'+result; 
       } 
      //  return result; 
  //  }
   data=result
      
      }
     
      return data
    }
  },
  data() {
    return {
      ios_datavalue: {},
      android_datavalue:{},
      chartValue: {
        activeUserAverage7: null,
        activeUserChangePre: null,
        activeUserMonthChangePre: null,
        activeUserMonthLast: null,
        activeUserWeekChangePre: null,
        activeUserWeekLast: null,
        durationAverage7: null,
        durationChangePre: null,
        launchAverage7: null,
        launchChangePre: null,
        retentionAverage7: null,
        retentionChangePre: null,
        totalNewUserAverage7: null,
        totalNewUserChangePre: null,
        totalUsers: null
      },
      dashdate: [],
      androidAppKey: "",
      IosAppKey:'',
      sevendayAgo: "",
      today: "",
      requestParams: {
        // area: "china",
        // domain: "nydt.cn",
        // endDate: "20190624",
        // gran: "day",
        // maxResults: "0",
        // method: "overview/getTimeTrendRpt",
        // metrics: "pv_count,visitor_count,ip_count,bounce_ratio",
        // order: "",
        // siteId: "13495008",
        // source: "string",
        // startDate: "20190601"
      },
      tenantId: "",
      author: "",
      sevendata:null,
    };
  },
  created() {
    this.timeInit();
    this.InitInfo();
    this.initParams();
    this.fetchTrend(this.androidAppKey,'android');
    this.fetchTrend(this.IosAppKey,'ios');
    this.profile();
    this.authorTrend();
  },
  mounted() {},
  methods: {

    checkAuth (authKey) {
      if (this.$store.getters.authorities.indexOf(authKey) === -1) {
        return false
      } else {
        return true
      }
    },
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
    fetchTrend(key,type) {
      var _this = this;
      return new Promise((resolve, reject) => {
        getTrend(key)
          .then(response => {
            if (response.data.code == 0) {
              let result = response.data.result;
              if(type=='android') {
                _this.android_datavalue=result;
              }else if(type=='ios'){
                _this.ios_datavalue=result;
              }
          
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    InitInfo() {
      this.tenantId = JSON.parse(
        localStorage.getItem("BaseInfor")
      ).clientLicenseId;
      this.author = JSON.parse(localStorage.getItem("BaseInfor")).userName;
    },
    //根据租户设置参数
    initParams(){
      // if(this.tenantId=='dxtv'){
      //   this.requestParams= {
      //   area: "china",
      //   domain: "hnr.cn",
      //   endDate: "20190624",
      //   gran: "day",
      //   maxResults: "0",
      //   method: "overview/getTimeTrendRpt",
      //   metrics: "pv_count,visitor_count,ip_count,bounce_ratio",
      //   order: "",
      //   siteId: "1453193",
      //   source: "string",
      //   startDate: "20190601"
      //   }
      //   this.appkey= "5b15ff3bf43e4808920000a6";

      // }
      if(this.tenantId=='nanyangradio'){
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
        this.androidAppKey= "5cc5930e4ca357f82b00083c";
        this.IosAppKey='5cbd29613fc19548f9000c25'
      }
      
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
              _this.getSevenData();
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    getSevenData(){
      //七天数据计算
    
      let total = [];
      let reactValue = [];
      if(this.dashdate.length!=0){
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
       this.sevendata=reactValue
      }else{
       this.sevendata= null;
      }
     
    
    },

    //获取文章点击量和发稿量整体趋势(按作者)
    authorTrend() {
      var _this = this;
      return new Promise((resolve, reject) => {
        articleTrendByAuthor(this.tenantId, this.author)
          .then(response => {
            if (response.data.code == 0) {
              let result = response.data.result;
              _this.chartValue = result;
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
  min-width: 1180px;

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
    .androidColor {
    text-indent: 1em;
    color: #67c23a;
  }
  .iosColor {
    color: #409eff;
  }
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
