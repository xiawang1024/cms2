<template>
  <div class="mainBox">
    <div class="v-search-header">
      <el-row>
        <el-col :span="24">
          <v-search :search-settings="searchSettings" @search="searchItem" ref="vserch" />
        </el-col>
        <el-col :span="2">
          <el-button class="exportBtn" type="success" size="mini" @click="handleExport">一键导出</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      show-summary
      style="width: 100%"
      stripe
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="编辑" prop="origin" width="150" />
      <el-table-column label="发稿量" width="200" prop="id" />
      <el-table-column label="点击量" prop="title" />
      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="commentForm(scope.$index,scope.row)">详单</el-button>
          <el-button size="mini" type="danger" @click="handleDownload(scope.$index, scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      class="fenyeDiv"
      :current-page="pageNo"
      :page-sizes="[10,30,60,100]"
      :page-size="pageSize"
      :total="total"
      background
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    /> -->
  </div>
</template>
<script>
import { getdxCreateUserCheck} from "@/api/cms/liveCharts";
import dayjs from "dayjs";
export default {
  data() {
    return {
      searchSettings: [
        {
          label: "开始时间",
          name: "beginTime",
          visible: true,
          type: "datetime",
          value:'',
        },
        {
          label: "结束时间",
          name: "endTime",
          visible: true,
          type: "datetime",
          value:'',
        },
        {
            label: "编辑",
          name: "createUser",
          type: "text",
          placeholder:'全部',
          visible: "true",
          value:'',
         
        },
      ],
      beginTime: "",
      endTime: "",
      origin:'',
      tableData: [],
      createUser:'',
    };
  },
  created() {
     

  },
  mounted() {
   

  },
  methods: {
    searchItem(val) {
      this.timeDeail(val);
      this.createUser=val.createUser||'';
     
    },
    timeDeail(val) {
        if (val.beginTime && val.endTime) {
          // 发送请求
          if (val.beginTime > val.endTime) {
            this.beginTime = dayjs(val.endTime).format("YYYY-MM-DD HH:mm:ss");
            this.endTime = dayjs(val.beginTime).format("YYYY-MM-DD HH:mm:ss");
          } else {
            this.beginTime = dayjs(val.beginTime).format("YYYY-MM-DD HH:mm:ss");
            this.endTime = dayjs(val.endTime).format("YYYY-MM-DD HH:mm:ss");
          }
         this.initTableList();

        } else if (val.beginTime == ""||val.beginTime == undefined) {
          this.$message.error("请选择开始时间");
          return false;
        } else if (val.endTime == ""||val.endTime == undefined) {
          this.$message.error("请选择结束时间");
          return false;
        }
        //自选
      },
    

    //查询请求
    initTableList() {
      let data = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        createUser:this.createUser,
      };
      return new Promise((resolve, reject) => {
        getdxCreateUserCheck(data)
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
    handleExport() {
       let data = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        channelId:this.channelId,
        accessToken:'bearer '+JSON.parse(localStorage.getItem('hnDt_token')).access_token,
        //  sortBy:this.sortBy,
        origin:this.origin,
      };
        downdxDocumentStatistics(data)
    },
    
    //分页处理
    // handleSizeChange(val) {
    //   this.pageSize = val;
    //  this. initTableList();
    // },
    // handleCurrentChange(val) {
    //   this.pageNo = val;
    //   this.initTableList();
     
    // },
    handleSelectionChange(val){
         this.multipleSelection = val;
    }
  }
  }

</script>
<style lang="scss" scoped>
.mainBox {
  padding: 15px;
}
.fenyeDiv {
  margin-top: 30px;
}
</style>