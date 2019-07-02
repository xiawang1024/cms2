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
    chartsvalue:function(oldValue,newValue) {
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
            data: _this.chartsvalue.newUser
          },
          {
            name: "活跃用户",
            type: "line",
            // stack: "总量",
            data: _this.chartsvalue.activeUserInfo
          },
          {
            name: "启动次数",
            type: "line",
            // stack: "总量",
            data: _this.chartsvalue.launchInfo
          },
          {
            name: "累计用户",
            type: "line",
            // stack: "总量",
            data: _this.chartsvalue.totalUser
          }
        ]
      });
    },
    show(value1, value2) {
      var getDate = function(str) {
        var tempDate = new Date();
        var list = str.split("-");
        tempDate.setFullYear(list[0]);
        tempDate.setMonth(list[1] - 1);
        tempDate.setDate(list[2]);
        return tempDate;
      };
      var date1 = getDate(value1);
      var date2 = getDate(value2);
      if (date1 > date2) {
        var tempDate = date1;
        date1 = date2;
        date2 = tempDate;
      }
      date1.setDate(date1.getDate() + 1);
      let allDate = [value1];
      while (
        !(
          date1.getFullYear() == date2.getFullYear() &&
          date1.getMonth() == date2.getMonth() &&
          date1.getDate() == date2.getDate()
        )
      ) {
        allDate.push(
          date1.getFullYear() +
            "-" +
            (date1.getMonth() + 1) +
            "-" +
            date1.getDate()
        );

        date1.setDate(date1.getDate() + 1);
      }
      allDate.push(value2);
      this.xdate = allDate;
    }
  }
};
</script>
<style scoped lang='scss'>

</style>

