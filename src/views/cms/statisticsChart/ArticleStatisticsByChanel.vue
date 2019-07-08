<template>
  <div class="mycharts">
    <div class="tool-bar">

      <el-cascader
        v-if="checkAuth('cms:charts:channel')"
        change-on-select
        v-model="chanelSelect"
        :options="options"
        @change="handleCommand"
        size="mini"
      />
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
      options:[],
      chanelSelect:'',
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
      tenantId: "hndzkj",
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
          .then(response => {
            if (response.data.code == 0) {
              let result = response.data.result;
              //生成频道树
              _this.options = _this.toTree(result);
              //默认显示第一个频道数据
              _this.channelId=result[0].value;
              _this.chanelSelect=_this.channelId;
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
    handleCommand(val) {
      console.log(val,'val')
      this.channelId=this.chanelSelect.reverse()[0]
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
    },
    checkAuth (authKey) {
      if (this.$store.getters.authorities.indexOf(authKey) === -1) {
        return false
      } else {
        return true
      }
    },
    //生成树方法
    toTree(data){
       // 删除 所有 children,以防止多次调用
      data.forEach(function(item) {
        delete item.children;
      });
      // 将数据存储为 以 id 为 KEY 的 map 索引数据列
      var map = {};
      data.forEach(function(item) {
        map[item.value] = item;
      });
      var val = [];
      data.forEach(function(item) {
        item.label = item.key;
        item.id = item.id;
        item.value = item.value;
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.parentId];
        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
          // item.label = item[channelName]
          (parent.children || (parent.children = [])).push(item);
        } else {
          // item.label = item[channelName]
          val.push(item);
        }
      });
      return val;
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
