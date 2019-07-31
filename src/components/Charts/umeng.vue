<template>
  <div class="chartBox">
    <div :class="className" :id="id" :style="{height:height,width:width }"/>
  </div>
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "200px"
    },
    timevalue: {
      type: Array,
      default: () => {
        [];
      }
    },
    title: {
      type: String,
      default: "基本指标"
    },
    chartsvalue: {
      type: Object,
      default: function() {
        return {
          newUser: [],
          activeUserInfo: [],
          launchInfo: [],
          totalUser: []
        };
      }
    },
    newUser: {
      type: Array,
      default: () => {
        [];
      }
    },
    activeUserInfo: {
      type: Array,
      default: () => {
        [];
      }
    },
    launchInfo: {
      type: Array,
      default: () => {
        [];
      }
    },
    totalUser: {
      type: Array,
      default: () => {
        [];
      }
    },

  },

  data() {
    return {
      chart: null,
      xdate: []
    };
  },
  watch: {
    timevalue() {
      this.initChart();
    },
    newUser:function(val) {
      this.initChart();
      
    },

    activeUserInfo:function(val) {
      this.initChart();
      
    },
    launchInfo:function(val) {
      this.initChart();
      
    },
    totalUser:function(val) {
      this.initChart();
      
    },
    // immediate: true,
    deep: true
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      // var _this = this;
      if (this.timevalue) {
        this.show(this.timevalue[0], this.timevalue[1]);
      }

      this.chart = echarts.init(document.getElementById(this.id))

      //   const xAxisData = [];
      //   const data = [];
      //   const data2 = [];

      this.chart.setOption({
        title: {
          text: this.title
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["新增用户", "活跃用户", "启动次数", "累计用户"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xdate,
          axisLabel:{
            insterval:0,
            rotate:-80,
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "新增用户",
            type: "line",
            // stack: "总量",
            data: this.newUser
          },
          {
            name: "活跃用户",
            type: "line",
            // stack: "总量",
            data: this.activeUserInfo
          },
          {
            name: "启动次数",
            type: "line",
            // stack: "总量",
            data: this.launchInfo
          },
          {
            name: "累计用户",
            type: "line",
            // stack: "总量",
            data: this.totalUser
          }
        ]
      });
    },
    show(start,end){
            var result = [];
            var beginDay = start.split("-");
            var endDay = end.split("-");
            var diffDay = new Date();
            var dateList = new Array;
            var i = 0;
            diffDay.setDate(beginDay[2]);
            diffDay.setMonth(beginDay[1]-1);
            diffDay.setFullYear(beginDay[0]);
            result.push(start);
            while(i == 0){
                var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
                diffDay.setTime(countDay);
                dateList[2] = diffDay.getDate();
                dateList[1] = diffDay.getMonth() + 1;
                dateList[0] = diffDay.getFullYear();
                if(String(dateList[1]).length == 1){dateList[1] = "0"+dateList[1]}
                if(String(dateList[2]).length == 1){dateList[2] = "0"+dateList[2]}
                result.push(dateList[0]+"-"+dateList[1]+"-"+dateList[2]);
                if(dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]){ i = 1;
                }
            }
           this.xdate = result;
        }
  }
};
</script>
<style scoped lang='scss'>

</style>

