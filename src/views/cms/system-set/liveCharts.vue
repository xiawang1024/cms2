<template>
  <div class="mycharts">
    <h3>图表</h3>
    <umengTitle :datavalue="datavalue" :timevalue="timevalue" />
    <div class="dateselect">
      <div class="block">
        <el-date-picker
          value-format="yyyy-MM-DD"
          v-model="timevalue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getNewData"
        />
      </div>
    </div>
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="新增用户" name="first">新增用户</el-tab-pane>
        <el-tab-pane label="活跃用户" name="second">活跃用户</el-tab-pane>
        <el-tab-pane label="启动次数" name="third">启动次数</el-tab-pane>
        <el-tab-pane label="累计用户" name="fourth">累计用户</el-tab-pane>
        
      </el-tabs>
    </template>
    <umeng id="mycharts1" height="300px" width="100%" :timevalue="timevalue" />

    <sd2 id="mycharts2" height="300px" width="100%"/>
  </div>
</template>
<script>
import umeng from "@/components/Charts/umeng.vue";
import umengTitle from "@/components/Charts/umengTitleBoard.vue";
import {
  getActiveUser,
  getAppList,
  getDailyData,
  getDurations,
  getLaunches,
  getNewUsers,
  getRetentions,
  getTotalUsers
} from "@/api/cms/liveCharts";
export default {
  name: "LiveCharts",
  components: { umeng, umengTitle },
  data() {
    return {
      //uemng
      datavalue:{},
      startDate: "2019-06-01",
      endDate: "2019-06-07",
      periodType: "daily",
      date: "2019-05-01",
      appkey: "5cbd29613fc19548f9000c25",
      perPage: "15",
      page: "1",
      timevalue: ["2019-03-01","2019-04-02"],
      activeName:'first',
    };
  },
  created() {
    this.Init();
  },
  methods: {
    Init() {
      this.fetchActiveUser();
      this.fetchAppList();
      this.fetchDailyData();
      this.fetchDurations();
      this.fetchLaunches();
      this.fetchNewUsers();
      this.fetchRetentions();
      this.fetchTotalUsers();
    },
    //请求数据umeng
    fetchActiveUser() {
      return new Promise((resolve, reject) => {
        let data = {
          appkey: this.appkey,
          startDate: this.startDate,
          endDate: this.endDate,
          periodType: this.periodType
        };
        getActiveUser(data)
          .then(response => {
            console.log(response, "getActiveUser");
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    fetchAppList() {
      return new Promise((resolve, reject) => {
        getAppList(this.page, this.perPage)
          .then(response => {
            console.log(response, "getAppList");
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    fetchDailyData() {
      var _this=this;
      return new Promise((resolve, reject) => {
        getDailyData(this.appkey, this.date)
          .then(response => {
            this.datavalue=JSON.parse(response.data.result).dailyData
            console.log(_this.datavalue, "getDailyData");
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    fetchDurations() {
      return new Promise((resolve, reject) => {
        getDurations(this.appkey, this.date, this.periodType)
          .then(response => {
            console.log(response, "getDurations");
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    fetchLaunches() {
      return new Promise((resolve, reject) => {
        getLaunches(this.appkey, this.startDate, this.endDate, this.periodType)
          .then(response => {
            console.log(response, "getLaunches");
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    fetchNewUsers() {
      return new Promise((resolve, reject) => {
        getNewUsers(this.appkey, this.startDate, this.endDate, this.periodType)
          .then(response => {
            console.log(response, "getNewUsers");
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    fetchRetentions() {
      return new Promise((resolve, reject) => {
        getRetentions(
          this.appkey,
          this.startDate,
          this.endDate,
          this.periodType
        )
          .then(response => {
            console.log(response, "getRetentions");
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    fetchTotalUsers() {
      return new Promise((resolve, reject) => {
        getTotalUsers(this.appkey, this.startDate, this.endDate)
          .then(response => {
            console.log(response, "getTotalUsers");
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    //

    getNewData() {
      //获取时间区间数据

      console.log(this.timevalue);
    },
     handleClick(tab, event) {
       //获取切换区间数据

        console.log(tab, event,'dianji');
      }
  }
};
</script>
<style scoped>
.mycharts {
  width: calc(100vw - 84px);
  margin: 0 auto;
}
.dateselect {
  padding: 15px 0;
}
</style>
