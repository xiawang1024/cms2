<template>
  <div class="mainBox">
    <div class="v-search-header">
      <el-row>
        <el-col :span="22">
          <v-search :search-settings="searchSettings" @search="searchItem" />
        </el-col>
        <el-col :span="2" >
          <el-button class="exportBtn" type="success" size="mini" @click="handleExport">导出Excel</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="标题" prop="title"/>
      <el-table-column label="文章点击量" width="200" prop="actualClickNumInt"/>
      <el-table-column label="分享点击量" width="200" prop="templateClickNumInt"/>
      <el-table-column label="发稿时间" width="250" prop="createDate"/>
    </el-table>
  </div>
</template>
<script>
import { writerArticleStatisticsByTime } from "@/api/cms/liveCharts";
import dayjs from "dayjs";
export default {
  data() {
    return {
      tableData: [],
      writer: "",
      beginTime: "",
      endTime: "",
      searchSettings: [
        {
          label: "时间区间",
          name: "timeValue",
          visible: true,
          options: [],
          type: "daterange",
          changeOnSelect: true,
          return: {
            // 日期范围返回值自定义
            name: {
              dateStart: "beginTime", // 开始日期字段名
              dateEnd: "endTime" // 结束日期字段名
            },
            format: "YYYY-MM-DD HH:mm:ss" // 返回值格式，
          }
        }
      ]
    };
  },
  created() {
    this.initUser();
    this.initTable();
  },
  methods: {
    initUser() {
       this.writer= this.$route.query.writer;
      let endTime = dayjs()
        .endOf("month")
        .format("YYYY-MM-DD HH:mm:ss");
      let beginTime = dayjs()
        .startOf("month")
        .format("YYYY-MM-DD HH:mm:ss");
      this.beginTime = beginTime;
      this.endTime = endTime;
    },

    //init Table
    initTable() {
      let data = {
        writer: this.writer,
        beginTime: this.beginTime,
        endTime: this.endTime
      };
      return new Promise((resolve, reject) => {
        writerArticleStatisticsByTime(data)
          .then(res => {
            if (res.data.code == 0) {
              this.tableData = res.data.result;
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    searchItem(searchData) {
      console.log(searchData, "searchData");
      this.searchData = searchData;
      if (this.searchData.beginTime && this.searchData.endTime) {
        this.beginTime = this.searchData.beginTime;
        this.endTime = this.searchData.endTime;
        this.initTable();
      }
    },
    handleExport() {
        this.handleDownload();
    },
     handleDownload() {
    //   this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['writer', 'Title', 'actualClickNumInt', 'templateClickNumInt', 'createDate']
        const filterVal = ['writer', 'title', 'actualClickNumInt', 'templateClickNumInt', 'createDate']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
};
</script>
<style lang="scss" scoped>
.mainBox {
  padding: 30px;
  .v-search-header {
    border-bottom: 1px solid #ebeef5;
    .exportBtn{
        margin-top:1px;
    }
  }
}
</style>