<template>
  <div>
    <div class="concactBoard">
      <div class="leftpart">
        <h3 class="clumtitle">
          <span class="androidColor">Android</span> /
          <span class="iosColor">IOS</span>
        </h3>
        <div class="floor">
          <div class="smallbox">
            <p class="mytitle">新增用户（7日平均）</p>
            <h3>
              <span
                class="androidColor"
              >{{ android_datavalue.totalNewUserAverage7|retainZeroDigits }}</span>
              /
              <span
                class="iosColor"
              >{{ ios_datavalue.totalNewUserAverage7|retainZeroDigits }}</span>
            </h3>
            <p>
              同比
              <span
                class="androidColor"
              >{{ android_datavalue.totalNewUserChangePre|retainTwoPercentDigits }}%</span>
              <span v-if="android_datavalue.totalNewUserChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
              <span
                class="iosColor"
              >{{ ios_datavalue.totalNewUserChangePre|retainTwoPercentDigits }}%</span>
              <span v-if="ios_datavalue.totalNewUserChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
          <div class="smallbox">
            <p class="mytitle">活跃用户（7日平均）</p>
            <h3>
              <span class="androidColor">{{ android_datavalue.activeUserAverage7|retainZeroDigits }}</span>
              /
              <span
                class="iosColor"
              >{{ ios_datavalue.activeUserAverage7|retainZeroDigits }}</span>
            </h3>
            <p>
              同比
              <span
                class="androidColor"
              >{{ ios_datavalue.activeUserChangePre|retainTwoPercentDigits }}%</span>
              <span v-if="android_datavalue.activeUserChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
              <span class="iosColor">{{ ios_datavalue.activeUserChangePre|retainTwoPercentDigits }}%</span>
              <span v-if="ios_datavalue.activeUserChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
        </div>
        <div class="floor">
          <div class="smallbox">
            <p class="mytitle">新用户次日留存率（7日平均）</p>
            <h3>
              <span
                class="androidColor"
              >{{ android_datavalue.retentionAverage7|retainTwoPercentDigits }}%</span>
              /
              <span
                class="iosColor"
              >{{ ios_datavalue.retentionAverage7|retainTwoPercentDigits }}%</span>
            </h3>
            <p>
              同比
              <span
                class="androidColor"
              >{{ android_datavalue.retentionChangePre|retainTwoPercentDigits }}%</span>
              <span v-if="android_datavalue.retentionChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
              <span class="iosColor">{{ ios_datavalue.retentionChangePre|retainTwoPercentDigits }}%</span>
              <span v-if="ios_datavalue.retentionChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
          <div class="smallbox">
            <p class="mytitle">使用时长（7日平均）</p>
            <h3>
              <span class="androidColor">{{ android_datavalue.durationAverage7|computedTime }}</span>
              /
              <span
                class="iosColor"
              >{{ ios_datavalue.durationAverage7|computedTime }}</span>
            </h3>
            <p>
              同比
              <span
                class="androidColor"
              >{{ android_datavalue.durationChangePre|retainTwoPercentDigits }}%</span>
              <span v-if="android_datavalue.durationChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
              <span class="iosColor">{{ ios_datavalue.durationChangePre|retainTwoPercentDigits }}%</span>
              <span v-if="ios_datavalue.durationChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
        </div>
      </div>
      <div class="rightpart">
        <h3 class="clumtitle">
          <span class="androidColor">Android</span> /
          <span class="iosColor">IOS</span>
        </h3>
        <div class="floor">
          <div class="smallbox">
            <p class="mytitle">上周总活跃用户数</p>
            <h3>
              <span class="androidColor">{{ android_datavalue.activeUserWeekLast|retainZeroDigits }}</span>
              /
              <span
                class="iosColor"
              >{{ ios_datavalue.activeUserWeekLast|retainZeroDigits }}</span>
            </h3>
            <p>
              同比
              <span
                class="androidColor"
              >{{ android_datavalue.activeUserWeekChangePre|retainTwoPercentDigits }}%</span>
              <span v-if="android_datavalue.activeUserWeekChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
              <span
                class="iosColor"
              >{{ ios_datavalue.activeUserWeekChangePre|retainTwoPercentDigits }}%</span>
              <span v-if="ios_datavalue.activeUserWeekChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
          <div class="smallbox">
            <p class="mytitle">上月总活跃用户数</p>
            <h3>
              <span
                class="androidColor"
              >{{ android_datavalue.activeUserMonthLast|retainZeroDigits }}</span>
              /
              <span
                class="iosColor"
              >{{ ios_datavalue.activeUserMonthLast|retainZeroDigits }}</span>
            </h3>
            <p>
              同比
              <span
                class="androidColor"
              >{{ android_datavalue.activeUserMonthChangePre|retainTwoPercentDigits }}%</span>
              <span v-if="android_datavalue.activeUserMonthChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
              <span
                class="iosColor"
              >{{ ios_datavalue.activeUserMonthChangePre|retainTwoPercentDigits }}%</span>
              <span v-if="ios_datavalue.activeUserMonthChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
        </div>
        <div class="floor">
          <div class="smallbox">
            <p class="mytitle">启动次数(7日平均)</p>
            <h3>
              <span class="androidColor">{{ android_datavalue.launchAverage7|retainZeroDigits }}</span>
              /
              <span
                class="iosColor"
              >{{ ios_datavalue.launchAverage7|retainZeroDigits }}</span>
            </h3>
            <p>
              同比
              <span
                class="androidColor"
              >{{ android_datavalue.launchChangePre|retainTwoPercentDigits }}%</span>
              <span v-if="android_datavalue.launchChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
              <span class="iosColor">{{ ios_datavalue.launchChangePre|retainTwoPercentDigits }}%</span>
              <span v-if="ios_datavalue.launchChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
            <p />
          </div>
          <div class="smallbox">
            <p class="mytitle">累计用户数</p>
            <h3>
              <span class="androidColor">{{ android_datavalue.totalUsers|retainZeroDigits }}</span>
              /
              <span class="iosColor">{{ ios_datavalue.totalUsers|retainZeroDigits }}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  filters: {
    retainTwoDigits(val) {
      let data = "--";
      if (val != null) {
        data = val.toFixed(2);
      }
      return data;
    },
    retainZeroDigits(val) {
      let data = "--";
      if (val != null) {
        data = val.toFixed(0);
      }
      return data;
    },
    retainTwoPercentDigits(val) {
      let data = "--";
      if (val != null) {
        data = (val * 100).toFixed(2);
      }
      return data;
    },
    computedTime(val) {
      let data = "--";
      if (val != null) {
        //  function formatSeconds(value) {
        var theTime = parseInt(val); // 秒
        var theTime1 = 0; // 分
        var theTime2 = 0; // 小时
        // alert(theTime);
        if (theTime > 60) {
          theTime1 = parseInt(theTime / 60);
          theTime = parseInt(theTime % 60);
          // alert(theTime1+"-"+theTime);
          if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
          }
        }
        var result =
          "" +
          (parseInt(theTime) < 10
            ? "0" + parseInt(theTime)
            : parseInt(theTime));
        if (theTime1 >= 0) {
          result =
            "" +
            (parseInt(theTime1) < 10
              ? "0" + parseInt(theTime1)
              : parseInt(theTime1)) +
            ":" +
            result;
        }
        if (theTime2 >= 0) {
          result =
            "" +
            (parseInt(theTime2) < 10
              ? "0" + parseInt(theTime2)
              : parseInt(theTime2)) +
            ":" +
            result;
        }
        //  return result;
        //  }
        data = result;
      }

      return data;
    }
  },

  props: {
    ios_datavalue: {
      type: Object,
      default: () => {
        return {
          activeUserAverage7: null, //活跃用户(7日平均)

          activeUserChangePre: null, //	活跃用户(7日平均)同比变化率

          activeUserMonthChangePre: null, //月总活跃用户数，最近一次的统计数据的同比变化率

          activeUserMonthLast: null, //月总活跃用户数，最近一次的统计数据

          activeUserWeekChangePre: null, //周总活跃用户数，最近一次的统计数据的同比变化率

          activeUserWeekLast: null, //周总活跃用户数，最近一次的统计数据

          durationAverage7: null, // 使用时长(7日平均)

          durationChangePre: null, //使用时长(7日平均)同比变化率

          launchAverage7: null, // 启动次数(7日平均)

          launchChangePre: null, // 启动次数(7日平均)同比变化率

          retentionAverage7: null, // 新用户次日留存率(7日平均)

          retentionChangePre: null, // 新用户次日留存率(7日平均)同比变化率

          totalNewUserAverage7: null, // 新增用户(7日平均)

          totalNewUserChangePre: null, // 新增用户(7日平均)同比变化率

          totalUsers: null // 累计用户数
        };
      }
    },
    android_datavalue: {
      type: Object,
      default: () => {
        return {
          activeUserAverage7: null, //活跃用户(7日平均)

          activeUserChangePre: null, //	活跃用户(7日平均)同比变化率

          activeUserMonthChangePre: null, //月总活跃用户数，最近一次的统计数据的同比变化率

          activeUserMonthLast: null, //月总活跃用户数，最近一次的统计数据

          activeUserWeekChangePre: null, //周总活跃用户数，最近一次的统计数据的同比变化率

          activeUserWeekLast: null, //周总活跃用户数，最近一次的统计数据

          durationAverage7: null, // 使用时长(7日平均)

          durationChangePre: null, //使用时长(7日平均)同比变化率

          launchAverage7: null, // 启动次数(7日平均)

          launchChangePre: null, // 启动次数(7日平均)同比变化率

          retentionAverage7: null, // 新用户次日留存率(7日平均)

          retentionChangePre: null, // 新用户次日留存率(7日平均)同比变化率

          totalNewUserAverage7: null, // 新增用户(7日平均)

          totalNewUserChangePre: null, // 新增用户(7日平均)同比变化率

          totalUsers: null // 累计用户数
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
  // margin-bottom: 20px;
  padding-bottom: 20px;
  //   border-bottom: 1px solid #dedede;
  .androidColor {
    text-indent: 1em;
    color: #67c23a;
  }
  .iosColor {
    color: #409eff;
  }
  .rightpart,
  .leftpart {
    box-sizing: border-box;
    box-shadow: 1px 5px 5px #dedede;
    width: 49%;
    .clumtitle {
      text-indent: 1em;
      margin: 0;
    }

    .floor {
      background-color: #fff;
      display: flex;
      min-width: 520px;
      .smallbox {
        width: 49.5%;
        height: 146.438px;
        padding: 20px 20px 0 20px;
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
