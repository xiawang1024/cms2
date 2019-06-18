<template>
  <div class="mycharts">
    <umengTitle :datavalue="datavalue" :timevalue="timevalue" />
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
   
    <umeng id="mycharts1" height="300px" width="100%" :timevalue="timevalue" :chartsvalue="chartsvalue" />

  </div>
</template>
<script>
import umeng from "@/components/Charts/umeng.vue";
import umengTitle from "@/components/Charts/umengTitleBoard.vue";
// import {fun_date} from "@/components/Charts/handleTimer.js"
import {
  getActiveUser,
  getAppList,
  getDurations,
  getLaunches,
  getNewUsers,
  getRetentions,
  getTotalUsers,
  getTrend
} from "@/api/cms/liveCharts";
export default {
  name: "LiveCharts",
  components: { umeng, umengTitle },
  data() {
    return {
      //uemng
      datavalue: {},
      chartsvalue:{
        newUser:[],
        // activeUserInfo:[],
        // launchInfo:[],
        // totalUser:[],

      },
      startDate: "",
      endDate: "",
      periodType: "daily",
      date: "2019-05-01",
      appkey: "5cbd29613fc19548f9000c25",
      perPage: "15",
      page: "1",
      timevalue: [],
      activeName: "first"
    };
  },
  created() {
    this.getTime();
    
     this.Init();
   
  },
  mounted(){
   
    
  },
  methods: {

    getTime(){
      let date=new Date();
      let year=date.getFullYear('yyyy')
      let mon=date.getMonth('MM');
      let day=date.getDate('dd');
      this.startDate=year+'-'+(mon<10?('0'+mon):mon)+'-'+((day-1<10)?('0'+(day-1)):(day-1));
      this.endDate=year+'-'+((mon+1<10)?('0'+(mon+1)):(mon+1))+'-'+(day<10?('0'+day):day);
      this.timevalue=[this.startDate,this.endDate];
    },
    Init() {
      
      this.fetchActiveUser();
      this.fetchAppList();
      this.fetchTrend();
      this.fetchDurations();
      this.fetchLaunches();
      this.fetchNewUsers();
      this.fetchRetentions();
      this.fetchTotalUsers();
    },
    //请求数据umeng
    fetchActiveUser() {
      return new Promise((resolve, reject) => {
        var _this=this;
        let data = {
          appkey: this.appkey,
          startDate: this.startDate,
          endDate: this.endDate,
          periodType: this.periodType
        };
        getActiveUser(data)
          .then(response => {
             if(response.data.code==0){
              let result=JSON.parse(response.data.result)
                _this.$set(this.chartsvalue,'activeUserInfo',_this.formateDate(result.activeUserInfo))
              // _this.chartsvalue.activeUserInfo=_this.formateDate(result.activeUserInfo)
            }
            
            
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
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    //调用友盟接口
    // fetchDailyData() {
    //   let sevenAgo=fun_date(-7);
    //   console.log(sevenAgo,'sevenAgo')
      
    //   var _this = this;
    //   return new Promise((resolve, reject) => {
    //     getDailyData(this.appkey, this.date)
    //       .then(response => {
    //         this.datavalue = JSON.parse(response.data.result).dailyData;

    //         console.log(_this.datavalue, "getDailyData");
    //       })
    //       .catch(reject => {
    //         console.log(reject);
    //       });
    //   });
    // },
    fetchDurations() {
      return new Promise((resolve, reject) => {
        getDurations(this.appkey, this.date, this.periodType)
          .then(response => {
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    fetchLaunches() {
      var _this=this;
      return new Promise((resolve, reject) => {
        getLaunches(this.appkey, this.startDate, this.endDate, this.periodType)
          .then(response => {
             if(response.data.code==0){
              let result=JSON.parse(response.data.result)
               _this.$set(this.chartsvalue,'launchInfo',_this.formateDate(result.launchInfo))
              // _this.chartsvalue.launchInfo=_this.formateDate(result.launchInfo)
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    fetchNewUsers() {
      var _this=this;
      return new Promise((resolve, reject) => {
        getNewUsers(this.appkey, this.startDate, this.endDate, this.periodType)
          .then(response => {
            if(response.data.code==0){
              let result=JSON.parse(response.data.result)
              _this.$set(this.chartsvalue,'newUser',_this.formateDate(result.newUserInfo))
              // _this.chartsvalue.newUser=_this.formateDate(result.newUserInfo)
            }
            
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
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    fetchTotalUsers() {
      var _this=this;
      return new Promise((resolve, reject) => {
        getTotalUsers(this.appkey, this.startDate, this.endDate)
          .then(response => {
            if(response.data.code==0){
              let result=response.data.result;
              let allUser=[];
              Object.values(result).forEach((item)=>{
                allUser.push(parseInt(item))
               
              })
              _this.$set(this.chartsvalue,'totalUser',allUser)
              // _this.chartsvalue.totalUser=allUser;
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
      fetchTrend() {
      var _this=this;
      return new Promise((resolve, reject) => {
        getTrend(this.appkey)
          .then(response => {
            if(response.data.code==0){
              let result=response.data.result;
              _this.datavalue=result;
              //-------------------------------
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },

    
    //

    getNewData() {
      //获取时间区间数据

      //获取新增用户数
      this.fetchNewUsers()

    },
    handleClick(tab, event) {
      //获取切换区间数据

    },
    // 数据处理
    formateDate(value){
      let result=[];
      value.forEach((item)=>{
        result.push(item.value)
      })
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
  padding: 0 0 0 30px;
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
