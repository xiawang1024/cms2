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
      default:()=>{["2019-04-01","2019-05-01"]}

    }
  },
  
  data() {
    return {
      chart: null,
      xdate:[],
    };
  },
  watch:{
      timevalue(){
          this.initChart();
      }
  },
  created(){
     
  },
  mounted() {
    this.initChart();
    
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
         this.show(this.timevalue[0],this.timevalue[1]);
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
          data: ["今日", "昨日", "7天前", "30天前"]
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
          data:this.xdate,
          
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "今日",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "昨日",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "7天前",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "30天前",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          }
        ]
      });
    },
     show(value1,value2){
        var getDate=function(str){
        var tempDate=new Date();
        var list=str.split("-");
        tempDate.setFullYear(list[0]);
        tempDate.setMonth(list[1]-1);
        tempDate.setDate(list[2]);
        return tempDate;
        }
        var date1=getDate(value1);
        var date2=getDate(value2);
        if(date1>date2){
        var tempDate=date1;
        date1=date2;
        date2=tempDate;
        }
        date1.setDate(date1.getDate()+1);
        let allDate=[]
        while(!(date1.getFullYear()==date2.getFullYear()&&date1.getMonth()==date2.getMonth()&&date1.getDate()==date2.getDate())){
            allDate.push(date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate())
        
        date1.setDate(date1.getDate()+1);
        }
        this.xdate=allDate;
        console.log(allDate);
        },

  }
};
</script>
<style scoped lang='scss'>
</style>

