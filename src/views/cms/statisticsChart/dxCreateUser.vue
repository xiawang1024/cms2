<template>
  <div class="mainBox">
    <el-row>
      <div class="board">
        <el-col :span="12">
          <div class="showBoard">
            <p>昨天</p>
            <div>
              <div>
                <p>发稿量</p>
                <p>{{ boardvalue.articleCountDailyYesterday }}</p>
              </div>
              <div class="hasboder">
                <p>阅读量</p>
                <p>{{ boardvalue.clickNumDailyYesterday }}</p>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="showBoard">
            <p>累计</p>
            <div>
              <div>
                <p>发稿量</p>
                <p>{{ boardvalue.articleCount }}</p>
              </div>
              <div>
                <p>阅读量</p>
                <p>{{ boardvalue.clickNum }}</p>
              </div>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
    <div class="v-search-header">
      <el-row>
        <el-col :span="24">
          <v-search
            :search-settings="searchSettings"
            @search="searchItem"
            ref="vserch"
            @reset="reset"
          />
        </el-col>
        <el-col :span="2">
          <el-button class="exportBtn" type="success" size="mini" @click="handleExport">一键导出</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column label="来源" prop="origin" width="150" />
      <el-table-column label="标题" prop="title" />
      <el-table-column label="发布时间" width="200" prop="publishDate" />
      <el-table-column label="文章类型" width="80" prop="articleType" :formatter="articleType" />
      <el-table-column label="点击量" width="200" prop="clickNumInt" />
    </el-table>
    <el-pagination
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
    />
  </div>
</template>
<script>
import { getdxCreateUser, downdxCreateUser } from "@/api/cms/liveCharts";
import { articleTrendBycreateUser } from "@/api/cms/liveCharts";
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
          value: ""
        },
        {
          label: "结束时间",
          name: "endTime",
          visible: true,
          type: "datetime",
          value: ""
        }
      ],
      beginTime: "",
      endTime: "",
      // sortBy:'clickNumInt',
      origin: "",
      tableData: [],
      boardvalue: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
      createUser: "",
      tenantId: ""
    };
  },
  created() {
    this.InitInfo();
  },
  mounted() {
    //    this.initTableList();
    this.fetchTrend();
  },
  methods: {
    InitInfo() {
      this.createUser = JSON.parse(localStorage.getItem("BaseInfor")).userName;
      this.tenantId = JSON.parse(
        localStorage.getItem("BaseInfor")
      ).clientLicenseId;
      //判断进入页面是否是从管理员界面，
      if (this.$route.query.beginTime) {
        this.beginTime = this.$route.query.beginTime;
        this.endTime = this.$route.query.endTime;
        this.createUser = this.$route.query.createUser;
        this.searchSettings[0].value = this.beginTime;
        this.searchSettings[1].value = this.endTime;
        this.initTableList();
      }
      //   this.beginTime=dayjs().subtract(1,'day').format("YYYY-MM-DD")+' 00:00:00';
      //   this.endTime=dayjs().subtract(1,'day').format("YYYY-MM-DD")+' 23:59:59';
      //     this.searchSettings[0].value=this.beginTime;
      //     this.searchSettings[1].value=this.endTime;
    },
    searchItem(val) {
      this.pageNo = 1;
      this.timeDeail(val);
    },
    reset() {
      this.tableData = [];
      this.beginTime = "";
      this.endTime = "";
      this.total = 0;
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
      } else if (val.beginTime == "" || val.beginTime == undefined) {
        this.$message.error("请选择开始时间");
        return false;
      } else if (val.endTime == "" || val.endTime == undefined) {
        this.$message.error("请选择结束时间");
        return false;
      }
      //自选
    },
    //作者预览面板
    fetchTrend() {
      var _this = this;
      return new Promise((resolve, reject) => {
        articleTrendBycreateUser(this.tenantId, this.createUser)
          .then(response => {
            if (response.data.code == 0) {
              let result = response.data.result;
              _this.boardvalue = result;
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },

    //查询请求
    initTableList() {
      let data = {
        startPublishDate: this.beginTime,
        endPublishDate: this.endTime,
        createUser: this.createUser
      };
      return new Promise((resolve, reject) => {
        getdxCreateUser(this.pageNo, this.pageSize, data)
          .then(res => {
            if (res.data.code == 0) {
              if(res.data.result.total>5000){
              this.$message.error("请求数据超过5000条，请缩短时间范围！");
                
              }else{
                this.tableData = res.data.result.content;
              this.total = res.data.result.total;
              }
              
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      this.initTableList();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.initTableList();
    },
    handleExport() {
      let data = {
        pageNo: 1,
        pageSize: this.total,
        startPublishDate: this.beginTime,
        endPublishDate: this.endTime,
        createUser: this.createUser,
        accessToken:
          "bearer " +
          JSON.parse(localStorage.getItem("hnDt_token")).access_token,
        //  sortBy:this.sortBy,
        origin: this.origin
      };
      if (this.total > 5000) {
        this.$message.error("下载条数不能超过5000");
      } else {
        downdxCreateUser(data);
      }
    },

    //获取来源列表
    fetchDict() {
      var _this = this;
      return new Promise((resolve, reject) => {
        fetchDictByDictName("文稿来源")
          .then(response => {
            if (
              response.data.result.details &&
              response.data.result.details.length
            ) {
              _this.sourceList = response.data.result.details.map(ele => {
                return {
                  label: ele.dictDetailName,
                  value: ele.dictDetailName
                };
              });
              _this.searchSettings[1].options = _this.sourceList;
              _this.$refs.vserch.updateForm();
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    articleType(val) {
      let data = "";
      if (val.articleType == 0) {
        data = "图文";
      }
      if (val.articleType == 1) {
        data = "图集";
      }
      if (val.articleType == 2) {
        data = "拼条";
      }
      if (val.articleType == 3) {
        data = "引用";
      }
      if (val.articleType == 4) {
        data = "URL";
      }
      if (val.articleType == 5) {
        data = "投票";
      }
      if (val.articleType == 6) {
        data = "调查";
      }
      if (val.articleType == 7) {
        data = "单页";
      }
      return data;
    }
  }
};
</script>
<style lang="scss" scoped>
.fenyeDiv {
  margin-top: 30px;
}
.mainBox {
  padding: 15px;
}
$textcolor: #303133;
.board {
  box-shadow: 1px 1px 5px #eee;
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
}
.showBoard {
  p {
    color: $textcolor;
    text-align: center;
  }
  div {
    display: flex;
    div {
      width: 50%;
      display: flex;
      flex-direction: column;

      p:nth-child(1) {
        color: $textcolor;
        font-size: 16px;
        margin: 0;
      }

      p:nth-child(2) {
        font-size: 40px;
        color: $textcolor;
        margin: 10px;
      }
      margin: 20px 0px;
    }
  }
  .hasboder {
    border-right: 1px solid #eee;
  }
}
</style>