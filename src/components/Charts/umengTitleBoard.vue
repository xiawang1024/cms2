<template>
  <div>
    <div class="concactBoard">
      <div class="leftpart">
        <div class="floor">
          <div class="smallbox">
            <p class="title">新增用户（7日平均）</p>
            <h3>{{ datavalue.newUsers }}</h3>
            <p>
              同比
              <span>27.742%</span>
              <span>↑</span>
            </p>
          </div>
          <div class="smallbox">
            <p class="title">活跃用户（7日平均）</p>
            <h3>{{ datavalue.activityUsers }}</h3>
            <p>
              同比
              <span>27.742%</span>
              <span>↑</span>
            </p>
          </div>
        </div>
        <div class="floor">
          <div class="smallbox">
            <p class="title">新用户次日留存率（7日平均）</p>
            <h3>{{ datavalue.activityUsers+"--" }}</h3>
            <p>
              同比
              <span>27.742%</span>
              <span>↑</span>
            </p>
          </div>
          <div class="smallbox">
            <p class="title">使用时长（7日平均）</p>
            <h3>{{ datavalue.activityUsers+"--" }}</h3>
            <p>
              同比
              <span>27.742%</span>
              <span>↑</span>
            </p>
          </div>
        </div>
      </div>
      <div class="rightpart">
        <div class="floor">
          <div class="smallbox">
            <p class="title">近7日总活跃用户数</p>
            <h3>{{ datavalue.launches }}</h3>
            <p>
              同比
              <span>27.742%</span>
              <span>↑</span>
            </p>
          </div>
          <div class="smallbox">
            <p class="title">近30日总活跃用户数</p>
            <h3>{{ datavalue.activityUsers+"--" }}</h3>
            <p>
              同比
              <span>27.742%</span>
              <span>↑</span>
            </p>
          </div>
        </div>
        <div class="floor">
          <div class="smallbox">
            <p class="title">累计用户数</p>
            <h3>{{ datavalue.totalUsers }}</h3>
            <p />
          </div>
          <div class="smallbox">
            <p class="title">总崩溃率</p>
            <h3>{{ datavalue.activityUsers+"--" }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props:{
        datavalue:{
            type:Object,
            default:()=>{
                [{}]

            }
        }
    },
    data(){
        return{

        }
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
        .title {
          color: rgb(102, 102, 102);
          font-size: 14px;
        }
        p {
          color: rgb(153, 153, 153);
          font-size: 12px;
          span:nth-last-child(1) {
            color: red;
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
