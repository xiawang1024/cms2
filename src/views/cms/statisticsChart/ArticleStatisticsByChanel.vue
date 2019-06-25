<template>
  <div class="mycharts">
    <div class="tool-bar">
      <el-dropdown size="mini" @command="handleCommand">
        <el-button size="mini" type="primary" :disabled="chanelList.length==0">
          {{ nowChanel }}
          <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item,index) in chanelList"
            :command="item.value"
            :key="index"
          >{{ item.label }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <articleTitle :datavalue="datavalue"/>
    <div class="dateselect">
      <div class="block">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="timevalue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="getNewData"
        />
      </div>
    </div>

    <articleCount
      id="mycharts1"
      height="450px"
      width="100%"
      :timevalue="timevalue"
      :chartsvalue="chartsvalue"
    />
  </div>
</template>
<script>
import articleCount from "@/components/Charts/articleCount.vue";
import articleTitle from "@/components/Charts/articleTitle.vue";
import {
  articleTrend,
  articleStatisticsByChannelId,
  fullChanelList
} from "@/api/cms/liveCharts";
export default {
  name: "LiveCharts",
  components: { articleCount, articleTitle },
  data() {
    return {
      //uemng
      datavalue: {},
      chartsvalue: {},
      startDate: "",
      endDate: "",
      periodType: "daily",
      date: "2019-05-01",
      appkey: "5cbd29613fc19548f9000c25",
      perPage: "15",
      page: "1",
      timevalue: [],
      activeName: "first",
      channelId: "1108265560111714304", //暂时写死
      chanelList: [],
      tenantId: "hndzkj",
      nowChanel: "请选择查看频道"
    };
  },
  created() {
    this.getTime();
    this.InitInfo();  //获取频道  暂时写死
    this.Init();
  },
  mounted() {},
  methods: {
    //初始化信息
    InitInfo() {
      this.tenantId = JSON.parse(
        localStorage.getItem("BaseInfor")
      ).clientLicenseId;
      this.getChanelList();
    },
    //获取默认数据
    Init() {
      this.fetchTrend();
      this.fetchActiveUser();
    },

    //请求全部频道列表
    getChanelList() {
      var _this = this;
      return new Promise((resolve, reject) => {
        fullChanelList(this.tenantId)
        // fullChanelList("hndzkj")
          .then(response => {
            if (response.data.code == 0) {
              let result = response.data.result;
              _this.chanelList = result;
              _this.channelId=_this.chanelList[0].value
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    //请求折线图数据
    fetchActiveUser() {
      return new Promise((resolve, reject) => {
        var _this = this;
        let data = {
          channelId: this.channelId,
          startDate: this.startDate,
          endDate: this.endDate
        };
        articleStatisticsByChannelId(data)
          .then(response => {
            if (response.data.code == 0) {
              let result = response.data.result;
              _this.$set(
                this.chartsvalue,
                "articleCountDaily",
                _this.formateDate(result, "articleCountDaily")
              );
              _this.$set(
                this.chartsvalue,
                "clickNumDaily",
                _this.formateDate(result, "clickNumDaily")
              );
              _this.$set(
                this.chartsvalue,
                "articleCount",
                _this.formateDate(result, "articleCount")
              );
              _this.$set(
                this.chartsvalue,
                "clickNum",
                _this.formateDate(result, "clickNum")
              );
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    //获取文章点击量和发稿量整体趋势(按频道)
    fetchTrend() {
      var _this = this;
      return new Promise((resolve, reject) => {
        articleTrend(this.channelId)
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
    },

    // 数据处理
    formateDate(value, type) {
      if (type == "clickNum") {
        let result = [];
        value.forEach(item => {
          result.push(item.clickNum);
        });
        //处理没有数据的显示（）规定-1 为空值。
        result.forEach((item, index) => {
          if (item == "-1") {
            result[index] = "--";
          }
        });
        return result.reverse();
      }
      if (type == "articleCountDaily") {
        let result = [];
        value.forEach(item => {
          result.push(item.articleCountDaily);
        });
        result.forEach((item, index) => {
          if (item == "-1") {
            result[index] = "--";
          }
        });
        return result.reverse();
      }
      if (type == "clickNumDaily") {
        let result = [];
        value.forEach(item => {
          result.push(item.clickNumDaily);
        });
        result.forEach((item, index) => {
          if (item == "-1") {
            result[index] = "--";
          }
        });
        return result.reverse();
      }
      if (type == "articleCount") {
        let result = [];
        value.forEach(item => {
          result.push(item.articleCount);
        });
        result.forEach((item, index) => {
          if (item == "-1") {
            result[index] = "--";
          }
        });
        return result.reverse();
      }
    },

    //频道切换
    handleCommand(command) {
      console.log(command);
      this.channelId = command;
      this.chanelList.forEach(item => {
        if (item.value == command) {
          this.nowChanel = item.label;
        }
      });
      this.Init();
    },
    //日期选择
    getNewData() {
      this.startDate = this.timevalue[0];
      this.endDate = this.timevalue[1];
      this.fetchActiveUser();
    },
    getTime() {
      let date = new Date();
      let year = date.getFullYear("yyyy");
      let mon = date.getMonth("MM");
      let day = date.getDate("dd");
      this.startDate =
        year +
        "-" +
        (mon < 10 ? "0" + mon : mon) +
        "-" +
        (day - 1 < 10 ? "0" + (day - 1) : day - 1);
      this.endDate =
        year +
        "-" +
        (mon + 1 < 10 ? "0" + (mon + 1) : mon + 1) +
        "-" +
        (day < 10 ? "0" + day : day);
      this.timevalue = [this.startDate, this.endDate];
    }
  }
};
</script>
<style scoped>
.tool-bar {
  text-align: right;
  padding: 0 42px;
}
.mycharts {
  width: 100%;
  min-width: 1080px;
  margin: 0 auto;
  padding: 20px 0 0 30px;
  box-sizing: border-box;
}
.dateselect {
  padding: 15px 0 15px 40px;
}
/deep/.el-date-editor .el-range-separator {
  padding: 0 0px;
  line-height: 32px;
  width: 5%;
  color: #303133;
}
</style>
