<template>
  <div class="mycharts">
    <div class="el-card__header" v-if="checkAuth('cms:charts:author')">
      <v-search :search-settings="searchSettings" @search="searchItem" :hide-reset="true" />
    </div>
    <div class="tool-bar" />
    <articleTitle :datavalue="datavalue" />
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
      :click-num="clickNum"
      :article-count-daily="articleCountDaily"
      :click-num-daily="clickNumDaily"
      :article-count="articleCount"
    />
  </div>
</template>
<script>
import articleCount from "@/components/Charts/articleCount.vue";
import articleTitle from "@/components/Charts/articleTitle.vue";
import {
  articleStatisticsBycreateUser,
  articleTrendBycreateUser,
  fullcreateUserList
} from "@/api/cms/liveCharts";
export default {
  name: "LiveCharts",
  components: { articleCount, articleTitle },
  data() {
    return {
      //uemng
      datavalue: {},
      articleCountDaily: [],
      clickNumDaily: [],
      articleCount: [],
      clickNum: [],

      startDate: "",
      endDate: "",
      periodType: "daily",
      date: "2019-05-01",
      appkey: "5cbd29613fc19548f9000c25",
      perPage: "15",
      page: "1",
      timevalue: [],
      activeName: "first",
      defaultcreateUser: "",
      channelId: "1108260929071616000",
      createUserList: [],
      createUser: "南阳人民广播电台",
      tenantId: "nanyangradio",
      searchSettings: [
        {
          label: "作者",
          name: "hiddenFlag",
          placeholder: "请选择",
          visible: true,
          type: "select",
          optionValue: this.defaultcreateUser,
          options: []
        }
      ]
    };
  },
  created() {
    this.getTime();
    this.InitInfo(); //获取租户 ，作者  暂时写死
    this.Init();
  },
  mounted() {},
  methods: {
    InitInfo() {
      this.tenantId = JSON.parse(
        localStorage.getItem("BaseInfor")
      ).clientLicenseId;
      //初始化的默认作者
      this.createUser = JSON.parse(localStorage.getItem("BaseInfor")).userName;
      this.defaultcreateUser = this.createUser;
      this.getcreateUserList();
    },
    Init() {
      this.fetchTrend();
      this.fetchActiveUser();
    },
    //请求全部作者列表
    getcreateUserList() {
      var _this = this;
      return new Promise((resolve, reject) => {
        fullcreateUserList(this.tenantId)
          .then(response => {
            if (response.data.code == 0) {
              let result = response.data.result;
              _this.createUserList = result;
              _this.searchSettings = [
                {
                  label: "作者",
                  name: "hiddenFlag",
                  placeholder: "请选择",
                  visible: true,
                  type: "select",
                  options: result
                }
              ];
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    //请求折线图数据
    fetchActiveUser() {
      var _this = this;
      return new Promise((resolve, reject) => {
        let data = {
          tenantId: this.tenantId,
          createUser: this.createUser,
          startDate: this.startDate,
          endDate: this.endDate
        };
        articleStatisticsBycreateUser(data)
          .then(response => {
            if (response.data.code == 0) {
              let result = response.data.result;
              _this.clickNumDaily = _this.formateDate(result, "clickNumDaily");
              _this.articleCount = _this.formateDate(result, "articleCount");
              _this.clickNum = _this.formateDate(result, "clickNum");
              _this.clickNum = _this.formateDate(result, "clickNum");
              _this.articleCountDaily = _this.formateDate(
                result,
                "articleCountDaily"
              );
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    //获取文章点击量和发稿量整体趋势(按作者)
    fetchTrend() {
      var _this = this;
      return new Promise((resolve, reject) => {
        articleTrendBycreateUser(this.tenantId, this.createUser)
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
    //作者切换
    searchItem(searchData) {
      this.createUser = searchData.hiddenFlag;
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

      this.endDate =
        year +
        "-" +
        (mon + 1 < 10 ? "0" + (mon + 1) : mon + 1) +
        "-" +
        (day < 10 ? "0" + day : day);
      this.today = this.endDate;
      let lw = new Date(date - 1000 * 60 * 60 * 24 * 30); //最后一个数字30可改，30天的意思
      let lastY = lw.getFullYear();
      let lastM = lw.getMonth() + 1;
      let lastD = lw.getDate();
      this.startDate =
        lastY +
        "-" +
        (lastM < 10 ? "0" + lastM : lastM) +
        "-" +
        (lastD < 10 ? "0" + lastD : lastD); //三十天之let
      this.timevalue = [this.startDate, this.endDate];
    },
    checkAuth(authKey) {
      if (this.$store.getters.authorities.indexOf(authKey) === -1) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
<style scoped>
.tool-bar {
  text-align: right;
  padding: 0 42px 30px 42px;
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
