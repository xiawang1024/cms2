<template>
  <div>
    <div class="concactBoard">
      <div class="leftpart">
        <div class="floor">
          <div class="smallbox">
            <p class="mytitle">发稿量（7日平均）</p>
            <h3>{{ datavalue.articleCountAverageWeek==null?'--':datavalue.articleCountAverageWeek }}</h3>
            <p>
              同比
              <span>{{ datavalue.articleCountAverageWeekChangePre==null?'--':(datavalue.articleCountAverageWeekChangePre*100).toFixed(2) }}%</span>
              <span v-if="datavalue.articleCountAverageWeekChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
          <div class="smallbox">
            <p class="mytitle">发稿量（月平均）</p>
            <h3>{{ datavalue.articleCountAverageMonth==null?'--':datavalue.articleCountAverageMonth }}</h3>
            <p>
              同比
              <span>{{ datavalue.articleCountAverageMonthChangePre==null?'--':(datavalue.articleCountAverageMonthChangePre*100).toFixed(2) }}%</span>
              <span v-if="datavalue.articleCountAverageMonthChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
        </div>
        <div class="floor">
          <div class="smallbox">
            <p class="mytitle">昨日发稿量</p>
            <h3>{{ datavalue.articleCountDailyYesterday==null?'--':datavalue.articleCountDailyYesterday }}</h3>
            <p>
              同比
              <span>{{ datavalue.articleCountDailyYesterdayChangePre==null?'--':(datavalue.articleCountDailyYesterdayChangePre*100).toFixed(2) }}%</span>
              <span v-if="datavalue.articleCountDailyYesterdayChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
          <div class="smallbox">
            <p class="mytitle">总发稿量</p>
            <h3>{{ datavalue.articleCount==null?'--':datavalue.articleCount }}</h3>
          </div>
        </div>
      </div>
      <div class="rightpart">
        <div class="floor">
          <div class="smallbox">
            <p class="mytitle">上周平均点击量</p>
            <h3>{{ datavalue.clickNumAverageWeek==null?'--':datavalue.clickNumAverageWeek }}</h3>
            <p>
              同比
              <span>{{ datavalue.clickNumAverageWeekChangePre==null?'--': (datavalue.clickNumAverageWeekChangePre*100).toFixed(2) }}%</span>
              <span v-if="datavalue.clickNumAverageWeekChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
          <div class="smallbox">
            <p class="mytitle">上月平均点击量数</p>
            <h3>{{ datavalue.clickNumAverageMonth==null?'--':datavalue.clickNumAverageMonth }}</h3>
            <p>
              同比
              <span>{{ datavalue.clickNumAverageMonthChangePre==null?'--':(datavalue.clickNumAverageMonthChangePre*100).toFixed(2) }}%</span>
              <span v-if="datavalue.clickNumAverageMonthChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
        </div>
        <div class="floor">
          <div class="smallbox">
            <p class="mytitle">昨日点击量</p>
            <h3>{{ datavalue.clickNumDailyYesterday==null?'--':datavalue.clickNumDailyYesterday }}</h3>
            <p>
              同比
              <span>{{ datavalue.clickNumDailyYesterdayChangePre==null?'--':(datavalue.clickNumDailyYesterdayChangePre*100).toFixed(2) }}%</span>
              <span v-if="datavalue.clickNumDailyYesterdayChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
            <p/>
          </div>
          <div class="smallbox">
            <p class="mytitle">累计点击量</p>
            <h3>{{ datavalue.clickNum==null?'--':datavalue.clickNum }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    datavalue: {
      type: Object,
      default: () => {
        return {
          articleCount: "--", //发稿总数(null表示，第一次启动程序，没有获取到数据)

          articleCountAverageMonth: "--", //最近30天平均发稿总数(null表示，刚启动程序，没有获取到数据)

          articleCountAverageMonthChangePre: "--", //最近30天平均点击总量同比变化率(null表示，刚启动程序，没有获取到数据)

          articleCountAverageWeek: "--", //最近7天平均发稿总数(null表示，刚启动程序，没有获取到数据)

          articleCountAverageWeekChangePre: "--", //最近7天平均点击总量同比变化率(null表示，刚启动程序，没有获取到数据)

          articleCountDailyYesterday: "--", //昨天发稿总数(null表示，刚启动程序，没有获取到数据)

          articleCountDailyYesterdayChangePre: "--", //昨天点击总量同比变化率(null表示，刚启动程序，没有获取到数据)

          clickNum: "--", //点击总量(null表示，第一次启动程序，没有获取到数据)

          clickNumAverageMonth: "--", //最近30天平均点击总量(null表示，刚启动程序，没有获取到数据)

          clickNumAverageMonthChangePre: "--", //最近30天平均点击总量同比变化率(null表示，刚启动程序，没有获取到数据)

          clickNumAverageWeek: "--", //最近7天平均点击总量(null表示，刚启动程序，没有获取到数据)

          clickNumAverageWeekChangePre: "--", //最近7天平均点击总量同比变化率(null表示，刚启动程序，没有获取到数据)

          clickNumDailyYesterday: "--", //昨天点击总量(null表示，刚启动程序，没有获取到数据)

          clickNumDailyYesterdayChangePre: "--" //昨天点击总量同比变化率(null表示，刚启动程序，没有获取到数据)
        };
      }
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.concactBoard {
  width: 100%;
  min-width: 1080px;
  padding: 0 42px;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  //   border-bottom: 1px solid #dedede;
  .rightpart,
  .leftpart {
    box-sizing: border-box;
    box-shadow: 1px 5px 5px #dedede;
    width: 49%;
    .floor {
      background-color: #fff;
      display: flex;
      min-width: 520px;
      .smallbox {
        width: 49.5%;
        height: 146.438px;
        padding: 20px;
        padding-left: 30px;
        .mytitle {
          color: rgb(102, 102, 102);
          font-size: 14px;
        }
        p {
          color: rgb(153, 153, 153);
          font-size: 12px;
          .redarrow {
            color: red;
            font-weight: bolder;
            font-size: 18px;
          }
          .greenarrow {
            color: green;
            font-weight: bolder;
            font-size: 18px;
          }
        }
      }
    }
  }
  .rightpart {
    height: 100%;
  }
}
</style>
