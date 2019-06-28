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
    chartsvalue: {
      type: Array,
      default: function() {
        return []
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
    chartsvalue:function(oldValue,newValue) {
      this.initChart();
      
    },
    immediate: true,
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
      var _this = this;
      this.chart = echarts.init(document.getElementById(this.id));

      //   const xAxisData = [];
      //   const data = [];
      //   const data2 = [];

      this.chart.setOption({
        title: {
          text: "趋势分析"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["浏览次数", "访客数", "ip数"]
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
          data: [
              0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "浏览次数",
            type: "line",
            // stack: "总量",
            data: _this.chartsvalue[0]
          },
          {
            name: "访客数",
            type: "line",
            // stack: "总量",
            data: _this.chartsvalue[1]
          },
          {
            name: "ip数",
            type: "line",
            // stack: "总量",
            data: _this.chartsvalue[2]
          }
        ]
      });
    },
   
  }
};
</script>
<style scoped lang='scss'>
</style>

