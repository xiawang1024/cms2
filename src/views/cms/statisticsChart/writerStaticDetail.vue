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
      <el-table-column label="发布时间" width="250" prop="createDate"/>
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
          label: "开始时间",
          name: "beginTime",
          visible: true,
          options: [],
          type: "date",
          changeOnSelect: true,
        },
        {
          label: "结束时间",
          name: "endTime",
          visible: true,
          options: [],
          type: "date",
          changeOnSelect: true,
        }
      ]
    };
  },
  created() {
    this.initUser();
    this.initTable();
  },
  mounted(){
    this.searchSettings[0].value=this.beginTime;
    this.searchSettings[1].value=this.endTime;
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
     
      if (searchData.beginTime && searchData.endTime) {

        this.beginTime = dayjs(searchData.beginTime).format("YYYY-MM-DD HH:mm:ss");
        this.endTime = dayjs(searchData.endTime).format("YYYY-MM-DD HH:mm:ss");
        
        if(this.beginTime>this.endTime){
          let time1=this.beginTime;
          this.beginTime=this.endTime;
          this.endTime=time1;
        }

        this.initTable();
      }else if(searchData.beginTime==undefined){
        this.$message.error('请选择起始时间')

      }else if(searchData.endTime==undefined){
        this.$message.error('请选择截止时间')
      }
    },
    handleExport() {
        this.handleDownload();
    },
     handleDownload() {
    //   this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['撰稿人', '标题', '文章点击量', '分享点击量', '发布时间']
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