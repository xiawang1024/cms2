

<template>
  <div>
    <el-tabs v-model="activeName" class="formBox">
      <el-tab-pane label="抓取PC端信息规则" name="first">
        <div class="formbody">
          <el-row>
            <ul class="forminfo">
              <div class="left">
                <li>
                  <label>栏目</label>
                  <el-select
                    v-model="selectCloum"
                    class="dfinput"
                    style="opacity:1"
                    placeholder="--请选择栏目--"
                  >
                    <el-option
                      v-for="item in content"
                      :value="item.channelId"
                      :key="item.channelId"
                      :label="item.channelName"
                      class="cloumoption"
                    />
                  </el-select>
                </li>
                <li>
                  <label>已有规则</label>
                  <el-select
                    v-model="selectRule"
                    class="dfinput"
                    style="opacity:1"
                    placeholder="--请选择规则--"
                  >
                    <el-option
                      v-for="item in ruleContent"
                      :value="item.id"
                      :key="item.channelId"
                      :label="selectCloumName+' / Ruler '+item.id "
                      class="cloumoption"
                    />
                  </el-select>
                </li>
                <li>
                  <label>
                    列表页面URL
                    <span class="redTip">*</span>
                  </label>
                  <el-input
                    name="newslisturl"
                    :rules="[{required:true}]"
                    v-model="res.newsListUrl"
                    type="text"
                    class="dfinput"
                  />
                </li>
                <li>
                  <label>
                    列表页面URL规则
                    <span class="redTip">*</span>
                  </label>
                  <el-input
                    name="newslisturlrule"
                    v-model="res.newsListUrlRule"
                    type="text"
                    class="dfinput"
                  />
                </li>
                <li>
                  <label>
                    列表标题规则
                    <span class="redTip">*</span>
                  </label>
                  <el-input
                    name="newslisttitle"
                    v-model="res.newsListTitle"
                    type="text"
                    class="dfinput"
                  />
                </li>
                <li>
                  <label>
                    列表标题链接规则
                    <span class="redTip">*</span>
                  </label>
                  <el-input name="titleurl" v-model="res.titleUrl" type="text" class="dfinput" />
                </li>
                <li>
                  <label>
                    列表规则
                    <span class="redTip">*</span>
                  </label>
                  <el-input
                    name="newslistrule"
                    v-model="res.newsListRule"
                    type="text"
                    class="dfinput"
                  />
                </li>
                <li>
                  <label>
                    详情页面规则
                    <span class="redTip">*</span>
                  </label>
                  <el-input name="newsrule" v-model="res.newsRule" type="text" class="dfinput" />
                </li>
                <li>
                  <label>
                    标题标签
                    <span class="redTip">*</span>
                  </label>
                  <el-input name="titlerule" v-model="res.titleRule" type="text" class="dfinput" />
                </li>
                <li>
                  <label>
                    正文标签
                    <span class="redTip">*</span>
                  </label>
                  <el-input
                    name="contentrule"
                    v-model="res.contentRule"
                    type="text"
                    class="dfinput"
                  />
                </li>
                <li>
                  <label>
                    发布时间
                    <span class="redTip">*</span>
                  </label>
                  <el-input name="contentrule" v-model="res.creatTime" type="text" class="dfinput" />
                </li>
                <li>
                  <label>
                    编码
                    <span class="redTip">*</span>
                  </label>
                  <el-input name="Encoding" v-model="res.encoding" type="text" class="dfinput" />
                </li>
                <li>
                  <label>来源标签</label>
                  <el-input name="formrule" v-model="res.formRule" type="text" class="dfinput" />
                </li>
                <li>
                  <label>备注来源</label>
                  <el-input
                    name="formStandby"
                    v-model="res.formStandby"
                    type="text"
                    class="dfinput"
                  />
                </li>
                <li>
                  <label>关键词</label>
                  <el-input
                    name="keyWord"
                    v-model="res.keyWord"
                    type="text"
                    class="dfinput"
                    placeholder="请最多输入五个关键词，以 ；隔开"
                  />
                </li>
                <li>
                  <el-row>
                    <el-col :span="12" :offset="10">
                      <el-button size="mini" type="primary" @click="test">测试</el-button>
                      <el-button size="mini" type="primary" @click="save">保存</el-button>
                      <el-button size="mini" type="primary" @click="saveAs">另存</el-button>
                    </el-col>
                  </el-row>
                </li>
              </div>
              <div class="right">
                <li class="smiltextinput">
                  <label>标题：</label>
                  <el-input type="text" v-model="testData.title" />
                </li>
                <li class="smiltextinput">
                  <label>发布时间：</label>
                  <el-input type="text" v-model="testData.creatTime" />
                </li>
                <li class="smiltextinput">
                  <label>来源：</label>
                  <el-input type="text" v-model="testData.form" />
                </li>
                <li class="topaside">
                  <label>正文：</label>
                  <el-input type="textarea" v-model="testData.content" class="bigtextarea" />
                </li>
              </div>
            </ul>
          </el-row>
          <ul class="bottom">
            <el-row>
              <el-col :span="24" style="marginTop:20px;">
                <h4>
                  已有规则列表：
                  <el-button size="mini" type="primary" @click="handleStart">开启爬虫</el-button>
                  <el-button size="mini" type="primary" @click="handleClear">清除库存</el-button>
                  <el-button size="mini" type="primary" @click="handleSave">上传文档</el-button>
                </h4>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col v-for="(item,index) in fullRule" :span="6" :key="item.id">
                <div
                  :title="item.newsListUrl"
                  class="grid-content bg-purple handover"
                  :class="{active:checkRuleId==index}"
                  @click="choice(index)"
                >{{ item.id }}: {{ item.newsListUrl }}</div>
              </el-col>
            </el-row>
          </ul>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="抓取公众号信息规则" name="second"> -->
      <!-- <wx-clect></wx-clect> -->
      <!-- </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
  <script>
import { columnList } from "@/api/cms/columnManage.js";
// import wxClect from './wxClect'
import {
  getRuler,
  getCloumRule,
  getFullRuleSend,
  testRequest,
  saveRequest,
  startBee,
  clearStore,
  saveCms
} from "@/api/cms/beeClect.js";
export default {
  name: "Form",
  //   components:{wxClect},
  data() {
    return {
      clientLicenseId: "",
      userName: "",
      content: [],
      selectCloum: "",
      ruleContent: [],
      selectRule: "",
      res: {
        id: "",
        clumnId: "",
        newsListUrl: "",
        newsListUrlRule: "",
        newsListTitle: "",
        titleUrl: "",
        newsListRule: "",
        newsRule: "",
        titleRule: "",
        contentRule: "",
        creatTime: "",
        formRule: "",
        encoding: "",
        formStandby: "",
        keyWord: ""
      },
      testData: {},
      loading: false,
      fullRule: {},
      checkRuleId: "",
      toggle: "",
      saveRes: {
        id: "",
        clumnId: "",
        newsListUrl: "",
        newsListUrlRule: "",
        newsListTitle: "",
        titleUrl: "",
        newsListRule: "",
        newsRule: "",
        titleRule: "",
        contentRule: "",
        creatTime: "",
        formRule: "",
        encoding: "",
        formStandby: "",
        keyWord: ""
      },
      activeName: "first",
      selectCloumName: ""
    };
  },
  watch: {
    /**
     *选择栏目
     **/

    selectCloum() {
      var _this = this;
      this.ruleContent = [];
      this.res = {
        id: "",
        clumnId: "",
        newsListUrl: "",
        newsListUrlRule: "",
        newsListTitle: "",
        titleUrl: "",
        newsListRule: "",
        newsRule: "",
        titleRule: "",
        contentRule: "",
        creatTime: "",
        formRule: "",
        encoding: "",
        formStandby: "",
        keyWord: ""
      };
      this.testData = {};
      this.selectCloumName = "";
      for (let i = 0; i < this.content.length; i++) {
        if (_this.content[i].channelId == _this.selectCloum) {
          _this.selectCloumName = _this.content[i].channelName;
        }
      }
      this.getRule();
    },
    /**
     *选择规则
     **/

    selectRule() {
      this.res = {};
      var _this = this;
      return new Promise((resolve, reject) => {
        getRuler({ ruleid: _this.selectRule })
          .then(response => {
            if (response.data.status == "success") {
              _this.res = response.data.data;
            } else {
              _this.res = _this.saveRes;
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  created() {
    this.initInfo();
    //获取全部已有规则
    this.getFullRule();
    this.getColumnList();
  },

  methods: {
    initInfo() {
      let userInfo = JSON.parse(localStorage.getItem("BaseInfor"));
      this.clientLicenseId = userInfo.clientLicenseId;
      this.userName = userInfo.userName;
    },

    //获取栏目列表
    getColumnList() {
      return new Promise((resolve, reject) => {
        columnList({}, 1, 1000)
          .then(response => {
            this.$nextTick(() => {
              this.content = response.data.result.content;
            });
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    /** 选择栏目
     */

    getRule() {
      var _this = this;
      this.selectRule = "";
      return new Promise((resolve, reject) => {
        getCloumRule({ clumnid: _this.selectCloum })
          .then(response => {
            if (response.data.status == "success") {
              _this.ruleContent = response.data.data;
              this.res = {
                clumnId: _this.selectCloum,
                id: "",
                newsListUrl: "",
                newsListUrlRule: "",
                newsListTitle: "",
                titleUrl: "",
                newsListRule: "",
                newsRule: "",
                titleRule: "",
                contentRule: "",
                creatTime: "",
                formRule: "",
                encoding: "",
                formStandby: "",
                keyWord: ""
              };
            } else {
              if (_this.selectCloum == "") {
                _this.res = _this.saveRes;
              } else {
                _this.res = {
                  clumnId: _this.selectCloum,
                  id: "",
                  newsListUrl: "",
                  newsListUrlRule: "",
                  newsListTitle: "",
                  titleUrl: "",
                  newsListRule: "",
                  newsRule: "",
                  titleRule: "",
                  contentRule: "",
                  creatTime: "",
                  formRule: "",
                  encoding: "",
                  formStandby: "",
                  keyWord: ""
                };
                this.$message.error(response.data.data);
              }
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    check() {
      if (this.res.newsListUrl == "" || this.res.newsListUrl == null) {
        this.$message.error("列表页面URL不能为空");
        return false;
      }
      if (this.res.newsListUrlRule == "" || this.res.newsListUrlRule == null) {
        this.$message.error("列表页面URL规则不能为空");
        return false;
      }
      if (this.res.newsListTitle == "" || this.res.newsListTitle == null) {
        this.$message.error("列表标题规则不能为空");
        return false;
      }
      if (this.res.titleUrl == "" || this.res.titleUrl == null) {
        this.$message.error("列表标题链接规则不能为空");
        return false;
      }
      if (this.res.newsListRule == "" || this.res.newsListRule == null) {
        this.$message.error("抓取信息的规则不能为空");
        return false;
      }
      if (this.res.newsRule == "" || this.res.newsRule == null) {
        this.$message.error("详情页面规则不能为空");
        return false;
      }
      if (this.res.titleRule == "" || this.res.titleRule == null) {
        this.$message.error("标题标签不能为空");
        return false;
      }
      if (this.res.contentRule == "" || this.res.contentRule == null) {
        this.$message.error("正文标签不能为空");
        return false;
      }
      if (this.res.creatTime == null || this.res.creatTime.toString() == "") {
        this.$message.error("发布时间不能为空");
        return false;
      }
      if (this.res.encoding == "" || this.res.encoding == null) {
        this.$message.error("编码不能为空");
        return false;
      }
      return true;
    },
    getFullRule() {
      this.fullRule = {};
      var _this = this;
      return new Promise((resolve, reject) => {
        getFullRuleSend(this.clientLicenseId)
          .then(response => {
            if (response.data.status == "success") {
              _this.fullRule = response.data.data;
            } else {
              this.$message.error(response.data);
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    handlekeyWord(val) {
      if (val) {
        let mykeyWord = val;
        mykeyWord = mykeyWord.replace(/；/gi, ";");
        mykeyWord = mykeyWord.replace(/，/gi, ";");
        mykeyWord = mykeyWord.replace(/,/gi, ";");
        if (mykeyWord.split(";").length > 5) {
          this.$message({
            type: "error",
            message: "请最多输入5个关键词"
          });
          return false;
        }
        console.log(mykeyWord);
        return mykeyWord;
      } else {
        return true;
      }
    },
    test() {
      let flag = this.check();
      let mykeyWord = this.handlekeyWord(this.res.keyWord);
      if (flag && mykeyWord) {
        this.loading = true;

        var sendData = {
          column: this.res.clumnId,
          newslisturl: this.res.newsListUrl,
          newslisturlrule: this.res.newsListUrlRule,
          newslisttitle: this.res.newsListTitle,
          titleurl: this.res.titleUrl,
          newslistrule: this.res.newsListRule,
          newsrule: this.res.newsRule,
          titlerule: this.res.titleRule,
          contentrule: this.res.contentRule,
          creatTime: this.res.creatTime,
          formrule: this.res.formRule,
          encoding: this.res.encoding,
          clientLicenseId: this.clientLicenseId,
          userName: this.userName,
          formStandby: this.res.formStandby,
          //处理空值情况
          keyWord: mykeyWord == true ? "" : mykeyWord
        };
        var _this = this;
        return new Promise((resolve, reject) => {
          testRequest(sendData)
            .then(response => {
              if (response.data.status == "success") {
                _this.loading = false;
                _this.testData = response.data.data;
              } else {
                _this.loading = false;
                // alert("请求失败");
              }
              resolve();
            })
            .catch(reject => {
              _this.loading = false;
              // alert(reject);
            });
        });
      }
    },
    save() {
      var id = this.selectRule;
      if (id == " " || id == null) {
        alert("确定要修改这条规则信息吗？");
      }
      let flag = this.check();
      let mykeyWord = this.handlekeyWord(this.res.keyWord);
      if (flag && mykeyWord) {
        this.loading = true;
        var sendData = {
          id: this.res.id,
          column: this.res.clumnId,
          newslisturl: this.res.newsListUrl,
          newslisturlrule: this.res.newsListUrlRule,
          newslisttitle: this.res.newsListTitle,
          titleurl: this.res.titleUrl,
          newslistrule: this.res.newsListRule,
          newsrule: this.res.newsRule,
          titlerule: this.res.titleRule,
          contentrule: this.res.contentRule,
          creatTime: this.res.creatTime,
          formrule: this.res.formRule,
          encoding: this.res.encoding,
          clientLicenseId: this.clientLicenseId,
          userName: this.userName,
          formStandby: this.res.formStandby,
          keyWord: mykeyWord == true ? "" : mykeyWord
        };
        var _this = this;

        return new Promise((resolve, reject) => {
          saveRequest(sendData)
            .then(response => {
              _this.loading = false;
              if (response.data.status == "success") {
                this.$message({
                  type: "success",
                  message: response.data.data
                });
                _this.getRule();
              } else {
                this.$message({
                  type: "error",
                  message: response.data.data.errMsg
                });
              }
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    },
    saveAs() {
      let flag = this.check();
      let mykeyWord = this.handlekeyWord(this.res.keyWord);
      if (flag && mykeyWord) {
        this.loading = true;
        var sendData = {
          id: "",
          column: this.res.clumnId,
          newslisturl: this.res.newsListUrl,
          newslisturlrule: this.res.newsListUrlRule,
          newslisttitle: this.res.newsListTitle,
          titleurl: this.res.titleUrl,
          newslistrule: this.res.newsListRule,
          newsrule: this.res.newsRule,
          titlerule: this.res.titleRule,
          contentrule: this.res.contentRule,
          creatTime: this.res.creatTime,
          formrule: this.res.formRule,
          encoding: this.res.encoding,
          clientLicenseId: this.clientLicenseId,
          userName: this.userName,
          formStandby: this.res.formStandby,
          keyWord: mykeyWord == true ? "" : mykeyWord
        };
        var _this = this;
        return new Promise((resolve, reject) => {
          saveRequest(sendData)
            .then(response => {
              _this.loading = false;
              // console.log(response.data)
              if (response.data.status == "success") {
                this.$message({
                  type: "success",
                  message: response.data.data
                });
                _this.getRule();
              }
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    },
    choice(e) {
      this.checkRuleId = e;
      this.res = this.fullRule[e];
      this.saveRes = this.res;
      this.selectCloum = "";
      this.selectRule = "";
    },

    // 开启爬虫

    handleStart() {
      return new Promise((resolve, reject) => {
        startBee()
          .then(res => {
            if (res.data.data == "success") {
              this.$message({
                type: "success",
                message: res.data.status
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.status
              });
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    //清除库存

    handleClear() {
      this.$confirm("此操作将永久清除库存, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          new Promise((resolve, reject) => {
            clearStore()
              .then(res => {
                console.log(res, "res");
                if (res.data.data == "success") {
                  this.$message({
                    type: "success",
                    message: res.data.status
                  });
                } else {
                  this.$message({
                    type: "error",
                    message: res.data.status
                  });
                }
              })
              .catch(err => {
                reject(err);
              });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //上传文档

    handleSave() {
      return new Promise((resolve, reject) => {
        saveCms()
          .then(res => {
            if (res.data.data == "success") {
              this.$message({
                type: "success",
                message: res.data.status
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.status
              });
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
</script>
  <style scoped>
.left {
  float: left;
  width: 550px;
}
.right {
  float: left;
  width: 530px;
}
label {
  display: inline-block;
  width: 125px;
  height: 34px;
  font-size: 14px;
}
.dfinput {
  width: 347px;
  height: 34px;
  margin: 8px 0;
  font-size: 14px;
}
.cloumoption {
  text-indent: 1em;
}

/deep/.el-textarea__inner {
  width: 526px;
  min-height: 400px !important;
}
.topaside {
  margin-top: 5px;
  overflow: hidden;
}
.el-col {
  border-radius: 4px;
  margin-bottom: 5px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 36px;
  text-indent: 1em;
}
.active {
  background: #42b983;
  color: #fff;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.handover:hover {
  cursor: pointer;
}
.redTip {
  color: red;
  font-size: 16px;
}
</style>
  
  