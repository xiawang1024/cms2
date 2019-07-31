<template>
  <div>
    <div :class="className" :id="id" :style="{height:height,width:width}"/>
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
    articleCountDaily: {
      type: Array,
      default: () => {
        [];
      }
    },
    clickNumDaily: {
      type: Array,
      default: () => {
        [];
      }
    },
    articleCount: {
      type: Array,
      default: () => {
        [];
      }
    },
    clickNum: {
      type: Array,
      default: () => {
        [];
      }
    }
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
    clickNum:function(newValue,oldValue) {
      this.initChart();
     
    },
    articleCountDaily:function(newValue,oldValue) {
      this.initChart();
     
    },
    clickNumDaily:function(newValue,oldValue) {
      this.initChart();
     
    },
    articleCount:function(newValue,oldValue) {
      this.initChart();
     
    },
    immediate: true,
    deep: true
  },
  created() {},
  mounted() {
    // this.$nextTick(() => {
      this.initChart();
    // });
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
      var _this = this;
      if (this.timevalue) {
        this.show(this.timevalue[0], this.timevalue[1]);
      }

      this.chart = echarts.init(document.getElementById(this.id));

      //   const xAxisData = [];
      //   const data = [];
      //   const data2 = [];

      this.chart.setOption({
        title: {
          text: "基本指标"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["每日发稿量", "每日点击数", "发稿总数", "点击总数"]
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
          data: this.xdate
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "每日发稿量",
            type: "line",
            // stack: "总量",
            data: _this.articleCountDaily
          },
          {
            name: "每日点击数",
            type: "line",
            // stack: "总量",
            data: _this.clickNumDaily
          },
          {
            name: "发稿总数",
            type: "line",
            // stack: "总量",
            data: _this.articleCount
          },
          {
            name: "点击总数",
            type: "line",
            // stack: "总量",
            data: _this.clickNum
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

