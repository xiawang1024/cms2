<template>
  <div class="contaner">
    <div class="v-search-header">
      <el-row>
        <el-col :span="24">
          <v-search :search-settings="searchSettings" @search="searchItem" ref="vserch" />
        </el-col>
      </el-row>
    </div>
    <div class="showBoard">
      <div>
        <p>累计发稿量</p>
        <p>{{ datavalue.articleNumTotal }}</p>
      </div>
      <div>
        <p>累计点击量</p>
        <p>{{ datavalue.articleClickTotal }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { periodArticleStatisticsTotal } from "@/api/cms/liveCharts";
import dayjs from "dayjs";
export default {
  data() {
    return {
        value1:'',
      datavalue: {
          articleNumTotal:0,
          articleClickTotal:0

      },
      tenantId: "",
       searchSettings: [
        {
          label: "开始时间",
          name: "beginTime",
          visible: true,
          type: "date",
          value:'',
          defaultTime:'00:00:00',
          pickerOptions:{
               selectableRange: '00:00:00 - 00:00:00'
          }
        },
        {
          label: "结束时间",
          name: "endTime",
          visible: true,
          type: "date",
          value:'',
        },
      ],
      beginTime:'',
      endTime:'',

    };
  },
  created() {
    this.InitInfo();
  },
  methods: {
    InitInfo() {
      this.tenantId = JSON.parse(
        localStorage.getItem("BaseInfor")
      ).clientLicenseId;
    },
    searchItem(val){
        this.timeDeail(val);
    },
    timeDeail(val) {
        if (val.beginTime && val.endTime) {
          // 发送请求
          if (val.beginTime > val.endTime) {
            this.beginTime = dayjs(val.endTime).format("YYYY-MM-DD");
            this.endTime = dayjs(val.beginTime).format("YYYY-MM-DD");
          } else {
            this.beginTime = dayjs(val.beginTime).format("YYYY-MM-DD");
            this.endTime = dayjs(val.endTime).format("YYYY-MM-DD");
          }
         this.fetchTrend();

        } else if (val.beginTime == ""||val.beginTime == undefined) {
          this.$message.error("请选择开始时间");
          return false;
        } else if (val.endTime == ""||val.endTime == undefined) {
          this.$message.error("请选择结束时间");
          return false;
        }
        //自选
      },
    //获取文章点击量和发稿量整体趋势(总站)
    fetchTrend() {
      var _this = this;
      let data={
          startDate:this.beginTime,
          endDate:this.endTime,
          tenantId:this.tenantId
      }
      return new Promise((resolve, reject) => {
        periodArticleStatisticsTotal(data)
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
    }
  }
};
</script>
<style lang="scss" scoped>
.contaner {
  padding: 10px 0;
}
.showBoard{
    display: flex;
    border: 1px solid #eee;
    box-shadow: 1px 1px 2px #eee;
    padding: 10px 0;
    div{
        width: 50%;
        &:nth-child(1){
            border-right: 1px solid #eee;
        }
       &>p:nth-child(1){
           text-align: center;
           font-size: 16px;
           color: rgb(96, 98, 102);
       }
       &>p:nth-child(2){
            text-align: center;
           font-size: 20px;
           color: rgb(96, 98, 102);

       }

    }
}
</style>
