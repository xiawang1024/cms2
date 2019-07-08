<template>
  <div class="mycharts">
    <umengTitle :ios_datavalue="ios_datavalue" :android_datavalue="android_datavalue" />
    <div class="dateselect">
      <div class="block">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="timevalue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getNewData"
        />
      </div>
    </div>
    <el-row>
      <el-col :span="11">
        <div class="grid-content bg-purple">
          <umeng
            id="mycharts1"
            height="450px"
            width="100%"
            :timevalue="timevalue"
            :title="&quot;苹果统计&quot;"
            :new-user="ios_newUser"
            :active-user-info="ios_activeUserInfo"
            :launch-info="ios_launchInfo"
            :total-user="ios_totalUser"
          />
        </div>
      </el-col>
      <el-col :span="11">
        <div class="grid-content bg-purple-light">
          <umeng
            id="mycharts2"
            height="450px"
            width="100%"
            :timevalue="timevalue"
            :title="&quot;安卓统计&quot;"
            :new-user="android_newUser"
            :active-user-info="android_activeUserInfo"
            :launch-info="android_launchInfo"
            :total-user="android_totalUser"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import umeng from "@/components/Charts/umeng.vue";
import umengTitle from "@/components/Charts/umengTitleBoard.vue";
// import {fun_date} from "@/components/Charts/handleTimer.js"
import {
  getActiveUser,
  getAppList,
  // getDurations,
  getLaunches,
  getNewUsers,
  // getRetentions,
  getTotalUsers,
  getTrend
} from "@/api/cms/liveCharts";
export default {
  name: "LiveCharts",
  components: { umeng, umengTitle },
  data() {
    return {
      //uemng
      ios_datavalue: {},
      android_datavalue: {},
      startDate: "",
      endDate: "",
      periodType: "daily",
      date: "2019-05-01",
      IosAppKey: "",
      androidAppKey:'',
      perPage: "15",
      page: "1",
      timevalue: [],
      activeName: "first",
      tenantId: "",
      today: "",
      ios_newUser: [],
      ios_activeUserInfo: [],
      ios_launchInfo: [],
      ios_totalUser: [],
      android_newUser: [],
      android_activeUserInfo: [],
      android_launchInfo: [],
      android_totalUser: []
    };
  },
  created() {
    this.getTime();
    this.InitInfo();
    this.initParams();
    this.Init();
  },
  mounted() {},
  methods: {
    getTime() {
      let date = new Date();
      let year = date.getFullYear("yyyy");
      let mon = date.getMonth("MM");
      let day = date.getDate("dd");
      this.startDate =
        year +
        "-" +
        (mon < 10 ? "0" + mon : mon) +
        "-" +
        (day < 10 ? "0" + day : day);
      this.endDate =
        year +
        "-" +
        (mon + 1 < 10 ? "0" + (mon + 1) : mon + 1) +
        "-" +
        (day < 10 ? "0" + day : day);
      this.today = this.endDate;
      this.timevalue = [this.startDate, this.endDate];
    },
    InitInfo() {
      this.tenantId = JSON.parse(
        localStorage.getItem("BaseInfor")
      ).clientLicenseId;
    },
    Init() {
      this.fetchActiveUser(this.IosAppKey, "Ios");
      this.fetchActiveUser(this.androidAppKey, "android");
      this.fetchAppList();
      this.fetchTrend(this.IosAppKey,'Ios');

      this.fetchTrend(this.androidAppKey,'android');
      // this.fetchDurations();
      this.fetchLaunches(this.IosAppKey, "Ios");
      this.fetchLaunches(this.androidAppKey, "android");
      this.fetchNewUsers(this.IosAppKey, "Ios");
      this.fetchNewUsers(this.androidAppKey, "android");
      // this.fetchRetentions();
      this.fetchTotalUsers(this.IosAppKey, "Ios");
      this.fetchTotalUsers(this.androidAppKey, "android");
    },
    initParams() {
      // if(this.tenantId=='dxtv'){

      //   this.IosAppKey= "5b15ff3bf43e4808920000a6";

      // }
      if (this.tenantId == "nanyangradio") {
      this.IosAppKey = "5cbd29613fc19548f9000c25";
      this.androidAppKey = "5cc5930e4ca357f82b00083c";
      }
    },
    //请求数据umeng
    fetchActiveUser(appkey, type) {
      return new Promise((resolve, reject) => {
        var _this = this;
        let data = {
          appkey: appkey,
          startDate: this.startDate,
          endDate: this.endDate,
          periodType: this.periodType
        };
        getActiveUser(data)
          .then(response => {
            if (response.data.code == 0) {
              let result = JSON.parse(response.data.result);
              if (type == "android") {
                _this.android_activeUserInfo = _this.formateDate(
                  result.activeUserInfo
                );
              } else if (type == "Ios") {
                _this.ios_activeUserInfo = _this.formateDate(result.activeUserInfo);
              }
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchAppList() {
      return new Promise((resolve, reject) => {
        getAppList(this.page, this.perPage)
          .then(response => {})
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    fetchLaunches(appkey, type) {
      var _this = this;
      return new Promise((resolve, reject) => {
        getLaunches(appkey, this.startDate, this.endDate, this.periodType)
          .then(response => {
            if (response.data.code == 0) {
              let result = JSON.parse(response.data.result);

              if (type == "android") {
                _this.android_launchInfo = _this.formateDate(result.launchInfo);
              } else if (type == "Ios") {
                _this.ios_launchInfo = _this.formateDate(result.launchInfo);
              }
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchNewUsers(appkey, type) {
      var _this = this;
      return new Promise((resolve, reject) => {
        getNewUsers(appkey, this.startDate, this.endDate, this.periodType)
          .then(response => {
            if (response.data.code == 0) {
              let result = JSON.parse(response.data.result);
              if (type == "android") {
                _this.android_newUser = _this.formateDate(result.newUserInfo);
              } else if (type == "Ios") {
                _this.ios_newUser = _this.formateDate(result.newUserInfo);
              }
            }
            resolve();
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    // fetchRetentions() {
    //   return new Promise((resolve, reject) => {
    //     getRetentions(
    //       this.IosAppKey,
    //       this.startDate,
    //       this.endDate,
    //       this.periodType
    //     )
    //       .then(response => {})
    //       .catch(reject => {
    //         console.log(reject);
    //       });
    //   });
    // },
    fetchTotalUsers(appkey, type) {
      var _this = this;
      return new Promise((resolve, reject) => {
        getTotalUsers(appkey, this.startDate, this.endDate)
          .then(response => {
            if (response.data.code == 0) {
              let result = response.data.result;
              let allUser = [];
              console.log(result, "result");

              Object.values(result).forEach(item => {
                if (item.key <= _this.today) {
                  allUser.push(parseInt(item.value));
                } else {
                  allUser.push("--");
                }
              });
             
              if (type == "android") {
                _this.android_totalUser = allUser;
              } else if (type == "Ios") {
                _this.ios_totalUser = allUser;
              }
            }
            resolve();
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    fetchTrend(key,type) {
      var _this = this;
      return new Promise((resolve, reject) => {
        getTrend(key)
          .then(response => {
            if (response.data.code == 0) {
              let result = response.data.result;
              if(type=='Ios'){
                _this.ios_datavalue = result;
              }else if(type=='android'){
                _this.android_datavalue = result;
              }
              
            }
            resolve();
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },

    //

    getNewData() {
      //获取时间区间数据

      this.startDate = this.timevalue[0];
      this.endDate = this.timevalue[1];
      //获取新增用户数
      this.fetchActiveUser(this.IosAppKey, "Ios");
      this.fetchActiveUser(this.androidAppKey, "android");
      this.fetchLaunches(this.IosAppKey, "Ios");
      this.fetchLaunches(this.androidAppKey, "android");
      this.fetchNewUsers(this.IosAppKey, "Ios");
      this.fetchNewUsers(this.androidAppKey, "android");
      this.fetchTotalUsers(this.IosAppKey, "Ios");
      this.fetchTotalUsers(this.androidAppKey, "android");
    },
    handleClick(tab, event) {
      //获取切换区间数据
    },
    // 数据处理
    formateDate(value) {
      let result = [];
      value.forEach(item => {
          //有值得放值
        if (item.value) {
          result.push(item.value);
        } else {
          //没有值得返回0，处理措施：1，当前日期之前的按0 显示，当前日期之后的替换为 '--',echarts 不进行折线的绘制
          if(item.date<=this.today){
          result.push(0);
          }else{
          result.push("--");

          }
        }
      });
      return result;
    }
  }
};
</script>
<style scoped>
.mycharts {
  width: 100%;
  min-width: 1080px;
  margin: 0 auto;
  padding: 20px 0 0 30px;
  box-sizing: border-box;
}
.dateselect {
  padding: 15px 0 15px 40px;
}
/deep/.el-date-editor .el-range-separator {
  padding: 0 0px;
  line-height: 32px;
  width: 5%;
  color: #303133;
}
</style>
