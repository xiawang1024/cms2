<template>
  <div class="statistics-article-mark">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="开始日期">
        <el-date-picker v-model="beginTime" type="datetime" placeholder="选择日期时间"/>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="选择日期时间"
          default-time="23:59:59"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleExport" size="mini">下载</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {downdxhStatistics2 } from "@/api/cms/liveCharts";
import dayjs from "dayjs";
export default {
  data() {
    return {
      beginTime: "",
      endTime: "",
    };
  },
  methods: {
    timeDeail() {
        if (this.beginTime && this.endTime) {
          // 发送请求
          if (this.beginTime > this.endTime) {
            this.beginTime = dayjs(this.endTime).format("YYYY-MM-DD HH:mm:ss");
            this.endTime = dayjs(this.beginTime).format("YYYY-MM-DD HH:mm:ss");
          } else {
            this.beginTime = dayjs(this.beginTime).format("YYYY-MM-DD HH:mm:ss");
            this.endTime = dayjs(this.endTime).format("YYYY-MM-DD HH:mm:ss");
          }
          return true;
        } else if (this.beginTime == ""||this.beginTime == undefined) {
          this.$message.error("请选择开始时间");
          return false;
        } else if (this.endTime == ""||this.endTime == undefined) {
          this.$message.error("请选择结束时间");
          return false;
        }
        //自选
      
    },
    handleExport() {
        let flag=this.timeDeail();
      if(flag){
          let data = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        accessToken:'bearer '+JSON.parse(localStorage.getItem('hnDt_token')).access_token,
      };
        // 调用下载接口
        downdxhStatistics2(data)
      } 
    },
  }
};
</script>
<style lang="scss" scoped>

</style>