<template>
  <div class="disclisedetails">
    <!-- <div class="topdiv">
      <div class="topdivLeft">爆料详情</div>
      <div class="topdivRight">
        <el-button size="mini" @click="godiscloselist" icon="el-icon-back" type="primary">返回</el-button>
      </div>
    </div>-->
    <el-row class="noborder">
      <el-col :span="12">
        <el-container class="elcontainer">
          <!-- <el-header class="elheader">爆料详情</el-header> -->
          <el-main class="elmain1 elrow">
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
                  <div class="rightdiv">{{ formData.breakingType }}</div>
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
              <el-row>
                <el-col :span="5">
                  <div class="leftdiv">是否公开</div>
                </el-col>
                <el-col :span="19">
                  <div class="rightdiv">{{ formData.publicFlag==0?'不公开':'公开' }}</div>
                </el-col>
              </el-row>
            </div>
          </el-main>
          <el-main class="elmain2 elrow">
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
                  <div class="leftdiv">处理理由</div>
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
            <el-button size="small" @click="amendDiscloseStateBtn(1)" type="primary">审核通过</el-button>
            <el-button size="small" @click="amendDiscloseStateBtn(2)" type="danger">审核拒绝</el-button>
          </el-main>
        </el-container>
      </el-col>
      <el-col :span="12" class="noborder">
        <div class="videoUrl" v-if="formImgVide">
          <div class="img-wrap-list" v-for="(item,index) in formImgVide" :key="index">
            <div class="video-wrap">
              <video v-if="item.dataFlag == false" controls="controls" :src="item.dataUrl" />
              <img v-if="item.dataFlag==true" :src="item.dataUrl" alt >
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row style="paddingLeft:20px;paddingBottom:20px;">
      <el-col :span="2">
        <el-button size="mini" type="primary" @click="handleAdd">添加</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" class="noborder">
        <div style="height: 300px; paddingLeft:40px;">
          <el-steps
            direction="vertical"
            :active="stepList.length"
            finish-status="success"
            v-if="stepList"
          >
            <el-step
              :title="item.operateReply"
              :description="item.operateTime"
              v-for="(item,index) in stepList"
              :key="index"
            />
          </el-steps>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="添加操作记录">
      <v-form
        ref="vform"
        :form-settings="formSettings"
        :form-data="addData"
        @save="submitSave"
        label-width="80px"
        :btn-loading="isLoading"
      />
    </el-dialog>
    <!-- <div>{{discloseClassify}}</div> -->
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import {
  amendDiscloseState,
  discloseClassify,
  discloseInfor,
  addOprate
} from "@/api/newsCommand/dxDisclose.js";
export default {
  name: "DisclosDetails",
  data() {
    return {
      formData: {},
      searchlist: [],
      auditStatus: 0,
      discloseId: "",
      formImgVide: {},
      stepList: [],
      formSettings: [
        {
          items: [
            {
              label: "描述",
              name: "description",
              type: "text",
              required: true,
              placeholder: "请输入描述"
            },
            {
              label: "启用",
              name: "remindFlag",
              type: "checkbox",
              value: false,
              options: [
                {
                  label: "短信提醒"
                }
              ]
            }
          ]
        }
      ],
      addData: [],
      dialogVisible: false
    };
  },
  computed: {
    // ...mapGetters(['discloseClassify'])
  },
  mounted() {
    this.discloseId = this.$route.query.discloseId;
    this.discloseInfor(this.discloseId);
  },
  methods: {
    handleAdd() {
      //显示对会话框
      this.dialogVisible = true;
    },
    submitSave(val) {
      var _this = this;
      //提交操作记录
      let data = {
        ...val,
        discloseId: this.discloseId
      };
      return new Promise((resolve, reject) => {
        addOprate(data)
          .then(res => {
            if (res.data.code == 0) {
              this.$message({
                type: "success",
                message: "成功"
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
            _this.$refs.vform.resetFields();
            _this.dialogVisible = false;
            _this.discloseInfor(_this.discloseId);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    gotoListPage(context) {
      context.$store
        .dispatch("delView", this.$route)
        .then(({ visitedViews }) => {
          if (context.isActive(context.$route)) {
            const latestView = visitedViews.slice(-1)[0];
            if (latestView) {
              if (latestView.path == "/newCommand/dxClue/discloseList") {
                context.$router.push(latestView);
              } else {
                this.$router.replace({
                  path:
                    "/newCommand/dxClue/discloseList?time=" +
                    new Date().getTime()
                });
              }
            } else {
              context.$router.push("/");
            }
          }
        });
    },
    godiscloselist() {
      this.gotoListPage(this);
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
            _this.formData = response.data.result;
            _this.auditStatus = _this.formData.auditStatus;
            _this.discloseClassify();
            _this.amendState();
            _this.stepList = response.data.result.list;
            if (response.data.result.videoUrl) {
              _this.formImgVide = response.data.result.videoUrl;
            }
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
          });
        });
      });
    },
    openMessage(queryObj, message) {
      let _this = this;
      this.$prompt(message, "提示", {
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
          _this.formData.refuseReasons = queryObj.refuseReasons;
          _this.$message({
            showClose: true,
            message: "操作成功!",
            type: "success"
          });
        });
      });
    },
    amendDiscloseStateBtn(num) {
      // let hnrToken = localStorage.getItem("hnDt_token");
      let queryObj = {
        // hnrToken: hnrToken,
        id: this.discloseId,
        auditStatus: num
      };
      if (num == 2) {
        // 拒绝 添加理由
        this.openMessage(queryObj, "请输入拒绝理由");
      } else {
        // 通过
        this.openMessage(queryObj, "审核通过反馈意见");

        // this.amendDiscloseState(queryObj);
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
.disclisedetails {
  .leftdiv {
    text-align: right;
    box-sizing: border-box;
    padding: 0 15px;
    border-right: 1px solid rgba(228, 228, 228, 1);
    font-weight: 600;
  }
  .rightdiv {
    padding-left: 15px;
  }
  .biaoge {
    box-sizing: border-box;
    padding: 15px;
  }
  .elrow .el-row {
    border: 1px solid rgba(228, 228, 228, 1);
    border-bottom: none;
    height: 50px;
    line-height: 50px;
  }
  .elrow .el-row:last-child {
    border-bottom: 1px solid rgba(228, 228, 228, 1);
  }
  .elcontainer {
    width: 700px;
    // border: 1px solid rgba(228, 228, 228, 1);
    // margin-top: 30px;
    font-family: "微软雅黑";
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    color: #666666;
    display: block;
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
  .noborder {
    border: none !important;
    border-bottom: none;
    min-width: 700px;
  }
}
// .videoUrl {
//   display: flex;
//   flex-direction: column;
//   flex-wrap: wrap;
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
// }
.videoUrl {
  width: 700px;
  height: 100%;
  overflow: hidden;
  margin-top: 20px;
}
.videoUrl .img-wrap-list {
  width: 47%;
  height: 300px;
  overflow: hidden;
  display: inline-block;
  margin-bottom: 30px;
  margin-right: 20px;
}
.videoUrl .img-wrap-list .video-wrap,
.img-wrap {
  width: 100%;
  height: 300px;
  overflow: hidden;
}
.videoUrl .img-wrap-list .video-wrap video,
img {
  width: 100%;
  height: 100%;
}

// .videoUrl .img-wrap-list {
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   margin-bottom: 20px;
// }
// .videoUrl .img-wrap-list .video-wrap {
//   width: 100%;
//   height: 300px;
//   overflow: hidden;
// }
// .videoUrl .img-wrap-list .video-wrap video {
//   width: 100%;
//   height: 100%;
// }
// .videoUrl .img-wrap-list .img-wrap {
//   width: 45%;
//   height: 300px;
// }
// .videoUrl .img-wrap-list .video-wrap img {
//   width: 100%;
//   height: 100%;
// }
</style>
