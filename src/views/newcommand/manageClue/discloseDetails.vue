<template>
  <div>
    <el-container class="elcontainer">
      <div class="topdiv">
        <div class="topdivLeft">爆料详情</div>
        <div class="topdivRight">
          <el-button size="mini" @click="godiscloselist" icon="el-icon-refresh" type="primary">返回</el-button>
        </div>
      </div>
      <el-header class="elheader">爆料详情</el-header>
      <el-main class="elmain1">
        <div class="biaoge">
          <el-row>
            <el-col :span="5">
              <div class="leftdiv">爆料ID</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv">{{ formData.id }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv">爆料标题</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv">{{ formData.breakingName }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv">线索来源</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv">热线电话</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv">爆料分类</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv"> {{ formData.breakingType }} </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="5">
              <div class="leftdiv">爆料人</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv">{{ formData.breakingPeople }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv">爆料人联系方式</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv">{{ formData.breakingPhone }}</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="5">
              <div class="leftdiv">爆料内容</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv">{{ formData.breakingDescribe }}</div>
            </el-col>
          </el-row>
        </div>
      </el-main>

      <el-main class="elmain2">
        <div class="biaoge">
          <el-row>
            <el-col :span="5">
              <div class="leftdiv">处理状态</div>
            </el-col>
            <el-col :span="19">
              <div
                :class="[formData.auditStatus==1?'colgreen':'colred','rightdiv']"
              >{{ formData.auditStatus01 }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv">爆料时间</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv">{{ formData.breakingTime }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv">处理人</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv">{{ formData.breakingPeople }}</div>
            </el-col>
          </el-row>
          <el-row v-if="formData.refuseReasons">
            <el-col :span="5">
              <div class="leftdiv">拒绝理由</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv">{{ formData.refuseReasons }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div class="leftdiv">备注</div>
            </el-col>
            <el-col :span="19">
              <div class="rightdiv">{{ formData.note }}</div>
            </el-col>
          </el-row>
        </div>
      </el-main>
      <el-main v-if="auditStatus==0" class="elmain3">
        <el-button @click="amendDiscloseStateBtn(1)" type="primary">审核通过</el-button>
        <el-button @click="amendDiscloseStateBtn(2)" type="danger">审核拒绝</el-button>
      </el-main>
    </el-container>
    <!-- <div>{{discloseClassify}}</div> -->
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

import {
  amendDiscloseState,
  discloseClassify,
  discloseInfor
} from "@/api/newsCommand/disclose.js";
export default {
  name: "DisclosDetails",

  data() {
    return {
      formData: {},
      searchlist: [],
      auditStatus: 0,
      discloseId: ""
    };
  },
  computed: {
    // ...mapGetters(['discloseClassify'])
  },
  mounted() {
    this.discloseId = this.$route.query.discloseId
    

    this.discloseInfor(this.discloseId);
  },
  methods: {
    gotoListPage(context) {
      context.$store
        .dispatch("delView", this.$route)
        .then(({ visitedViews }) => {
          if (context.isActive(context.$route)) {
            console.log(visitedViews);
            const latestView = visitedViews.slice(-1)[0];
            if (latestView) {
              context.$router.push(latestView);
            } else {
              context.$router.push("/");
            }
          }
        });
    },
    godiscloselist() {
      this.$router.replace({
        path: "/newCommand/manageClue/discloseList?time=" + new Date().getTime()
      });
    },
    isActive(route) {
      return route.path === this.$route.path;
    },

    // 爆料详情
    discloseInfor(res) {
      var _this = this;
      return new Promise((resolve, reject) => {
        discloseInfor(res)
          .then(response => {
            console.log(response);
            _this.formData = response.data.result;
            _this.auditStatus = _this.formData.auditStatus;
            _this.discloseClassify();
            _this.amendState();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 搜索分类接口
    discloseClassify() {
      var _this = this;
      return new Promise((resolve, reject) => {
        discloseClassify().then(response => {
          // let optionslist=this.discloseClassify
          _this.searchlist = response.data.result;
            _this.$nextTick(() => {
               _this.formData.breakingType =
            _this.searchlist[_this.formData.breakingType - 1].typeName;
            console.log(_this.formData.breakingType)
      })

            console.log( _this.formData)
        });
      });
    },
    openMessage(queryObj) {
      let _this = this;
      this.$prompt("请输入拒绝理由", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          // 成功
          queryObj.refuseReasons = value;
          _this.amendDiscloseState(queryObj);
        })
        .catch(() => {
          //  失败
        });
    },
    // 修改审核状态
    amendDiscloseState(queryObj) {
      var _this = this;
      return new Promise((resolve, reject) => {
        amendDiscloseState(queryObj).then(response => {
          _this.auditStatus = queryObj.auditStatus;
          _this.formData.auditStatus = queryObj.auditStatus;
          _this.amendState();
          _this.$message({
            showClose: true,
            message: "操作成功!",
            type: "success"
          });
        });
      });
    },
    amendDiscloseStateBtn(num) {
      let hnrToken=localStorage.getItem("hnDt_token")
      console.log(hnrToken)
      let queryObj = {
        hnrToken:hnrToken,
        id: this.discloseId,
        auditStatus: num
      };
      if (num == 2) {
        // 拒绝 添加理由
        this.openMessage(queryObj);
      } else {
        // 通过
        this.amendDiscloseState(queryObj);
      }
    },
    amendState(num) {
      if (this.formData.auditStatus == 0) {
        this.formData.auditStatus01 = "待审核";
      } else if (this.formData.auditStatus == 1) {
        this.formData.auditStatus01 = "审核通过";
      } else {
        this.formData.auditStatus01 = "已拒绝";
      }
    }
  }
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
  font-family: "微软雅黑";
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
.elmain3 {
  text-align: center;
  margin-bottom: 30px;
}
.el-button + .el-button {
  margin-left: 80px;
}
.topdiv {
  display: flex;
  justify-content: space-between;
  background: rgba(243, 243, 243, 1);
  align-items: center;
  height: 60px;
  box-sizing: border-box;
  padding: 0 18px;
  border-bottom: 1px solid #e4e4e4;
}
.topdivLeft {
  position: relative;
  font-family: "微软雅黑";
  font-weight: 400;
  font-style: normal;
  color: #999999;
  box-sizing: border-box;
  padding: 0 10px;
}
.topdivLeft::before {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 5px;
  height: 24px;
  content: "";
  background: #409eff;
}
.colblue {
  color: #409eff;
}
.colgreen {
  color: #67c23a;
}
.colred {
  color: #f56c6c;
}
</style>
