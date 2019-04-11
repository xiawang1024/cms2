<template>
  <div>
    <el-container class="elcontainer">
      <el-header class="elheader">爆料详情</el-header>
      <el-main class="elmain1">
        <div class="biaoge">
          <el-row>
            <el-col :span="5">
              <div class="leftdiv coldiv">爆料ID</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv coldiv">313860326</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv coldiv">线索来源</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv coldiv">热线电话</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv coldiv">爆料分类</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv coldiv">新闻投诉</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv coldiv">爆料分类</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv coldiv">新闻投诉</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv coldiv">爆料分类</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv coldiv">新闻投诉</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv coldiv">爆料分类</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv coldiv">新闻投诉</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv coldiv">爆料人</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv coldiv">张飞</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv coldiv">爆料人联系方式</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv coldiv">18000000000</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="5">
              <div class="leftdiv coldiv">爆料内容</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv coldiv">在紫荆山路的下桥口有一只非常大的大狗</div>
            </el-col>
          </el-row>
        </div>
      </el-main>

      <el-main class="elmain2">
        <div class="biaoge">
          <el-row>
            <el-col :span="5">
              <div class="leftdiv coldiv">处理状态</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv coldiv">待审核</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv coldiv">爆料时间</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv coldiv">2019-01-05 08：55</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv coldiv">处理人</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv coldiv">小编貂蝉</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv coldiv">备注</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv coldiv">情绪特别激动的</div>
            </el-col>
          </el-row>
        </div>
      </el-main>
      <el-main class="elmain3">
        <el-button type="primary" >审核通过</el-button>
        <el-button type="danger" >审核拒绝</el-button>
        
      </el-main>

    </el-container>
  </div>
</template>

<script>
export default {
  name: "DisclosDetails",

  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.leftdiv {
  text-align: right;
  box-sizing: border-box;
  padding: 0 15px;
}

.rightdiv {
  padding-left: 15px;
  border-left: 1px solid rgba(228, 228, 228, 1);
}
.biaoge {
  box-sizing: border-box;
  padding: 15px;
}

.el-row {
  border: 1px solid rgba(228, 228, 228, 1);
  border-bottom: none;
  height: 50px;
  line-height: 50px;
}
.el-row:last-child {
  border-bottom: 1px solid rgba(228, 228, 228, 1);
}
.el-container {
  margin: 0 auto;
  width: 80%;
  border: 1px solid rgba(228, 228, 228, 1);
  margin-top: 30px;
      font-family: '微软雅黑';
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
        color: #666666;
  
}
.el-header {
  background: rgba(243, 243, 243, 1);
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  border-bottom: 1px solid rgba(228, 228, 228, 1);
}
.el-main {
  padding: 8px;
}

.elmain2 {
  margin-top: -20px;
}
.elmain3{
  text-align: center;
  margin-bottom: 30px;
}
.el-button+.el-button {
    margin-left: 80px;
}
</style>
