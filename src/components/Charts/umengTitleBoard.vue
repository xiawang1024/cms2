<template>
  <div>
    <div class="concactBoard">
      <div class="leftpart">
        <div class="floor">
          <div class="smallbox">
            <p class="mytitle">新增用户（7日平均）</p>
            <h3>{{ datavalue?datavalue.totalNewUserAverage7.toFixed(0):'--' }}</h3>
            <p>
              同比
              <span>{{ datavalue?(datavalue.totalNewUserChangePre*100).toFixed(2):'--' }}%</span>
              <span v-if="datavalue.totalNewUserChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
          <div class="smallbox">
            <p class="mytitle">活跃用户（7日平均）</p>
            <h3>{{ datavalue?datavalue.activeUserWeekLast:'--' }}</h3>
            <p>
              同比
              <span>{{ datavalue?datavalue.activeUserWeekChangePre.toFixed(2):'--' }}%</span>
              <span v-if="datavalue.activeUserWeekChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
        </div>
        <div class="floor">
          <div class="smallbox">
            <p class="mytitle">新用户次日留存率（7日平均）</p>
            <h3>{{ datavalue?datavalue.retentionAverage7.toFixed(2):'--' }}%</h3>
            <p>
              同比
              <span>{{ datavalue?datavalue.retentionChangePre.toFixed(2):'--' }}%</span>
              <span v-if="datavalue.retentionChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
          <div class="smallbox">
            <p class="mytitle">使用时长（7日平均）</p>
            <h3>{{ datavalue?datavalue.durationAverage7.toFixed(2):'--' }}</h3>
            <p>
              同比
              <span>{{ datavalue?datavalue.durationChangePre.toFixed(2):'--' }}%</span>
              <span v-if="datavalue.durationChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
        </div>
      </div>
      <div class="rightpart">
        <div class="floor">
          <div class="smallbox">
            <p class="mytitle">上周总活跃用户数</p>
            <h3>{{ datavalue?datavalue.activeUserWeekLast:'--' }}</h3>
            <p>
              同比
              <span>{{ datavalue?datavalue.activeUserWeekChangePre.toFixed(2):'--' }}%</span>
              <span v-if="datavalue.activeUserWeekChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
          <div class="smallbox">
            <p class="mytitle">上月总活跃用户数</p>
            <h3>{{ datavalue?datavalue.activeUserMonthLast:'--' }}</h3>
            <p>
              同比
              <span>{{ datavalue?datavalue.activeUserMonthChangePre.toFixed(2):"--" }}%</span>
              <span v-if="datavalue.activeUserMonthChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
          </div>
        </div>
        <div class="floor">
          <div class="smallbox">
            <p class="mytitle">启动次数(7日平均)</p>
            <h3>{{ datavalue?datavalue.launchAverage7.toFixed(0):'--' }}</h3>
            <p>
              同比
              <span>{{ datavalue?datavalue.launchChangePre.toFixed(2):'--' }}%</span>
              <span v-if="datavalue.launchChangePre>0" class="redarrow">↑</span>
              <span v-else class="greenarrow">↓</span>
            </p>
            <p/>
          </div>
          <div class="smallbox">
            <p class="mytitle">累计用户数</p>
            <h3>{{ datavalue?datavalue.totalUsers:'--' }}</h3>
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
          activeUserAverage7: "--", //活跃用户(7日平均)

          activeUserChangePre: "--", //	活跃用户(7日平均)同比变化率

          activeUserMonthChangePre: "--", //月总活跃用户数，最近一次的统计数据的同比变化率

          activeUserMonthLast: "--", //月总活跃用户数，最近一次的统计数据

          activeUserWeekChangePre: "--", //周总活跃用户数，最近一次的统计数据的同比变化率

          activeUserWeekLast: "--", //周总活跃用户数，最近一次的统计数据

          durationAverage7: "--", // 使用时长(7日平均)

          durationChangePre: "--", //使用时长(7日平均)同比变化率

          launchAverage7: "--", // 启动次数(7日平均)

          launchChangePre: "--", // 启动次数(7日平均)同比变化率

          retentionAverage7: "--", // 新用户次日留存率(7日平均)

          retentionChangePre: "--", // 新用户次日留存率(7日平均)同比变化率

          totalNewUserAverage7: "--", // 新增用户(7日平均)

          totalNewUserChangePre: "--", // 新增用户(7日平均)同比变化率

          totalUsers: "--" // 累计用户数
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
