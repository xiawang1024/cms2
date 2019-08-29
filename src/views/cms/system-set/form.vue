

<template>
  <div>
    <el-tabs v-model="activeName" class="formBox">
      <el-tab-pane label="抓取PC端信息规则" name="first">
        <div class="formbody" >
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
                <el-input name="newslisturl" :rules="[{required:true}]" v-model="res.newsListUrl" type="text" class="dfinput" />
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
                <el-input name="titleurl" v-model="res.titleUrl" type="text" class="dfinput"/>
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
                <el-input name="newsrule" v-model="res.newsRule" type="text" class="dfinput"/>
              </li>
              <li>
                <label>
                  标题标签
                  <span class="redTip">*</span>
                </label>
                <el-input name="titlerule" v-model="res.titleRule" type="text" class="dfinput"/>
              </li>
              <li>
                <label>
                  正文标签
                  <span class="redTip">*</span>
                </label>
                <el-input name="contentrule" v-model="res.contentRule" type="text" class="dfinput"/>
              </li>
              <li>
                <label>
                  发布时间
                  <span class="redTip">*</span>
                </label>
                <el-input name="contentrule" v-model="res.creatTime" type="text" class="dfinput"/>
              </li>
              <li>
                <label>
                  编码
                  <span class="redTip">*</span>
                </label>
                <el-input name="Encoding" v-model="res.encoding" type="text" class="dfinput"/>
              </li>
              <li>
                <label>来源标签</label>
                <el-input name="formrule" v-model="res.formRule" type="text" class="dfinput"/>
              </li>
              <li>
                <label>备注来源</label>
                <el-input name="formStandby" v-model="res.formStandby" type="text" class="dfinput"/>
              </li>
              <li>
                <label>关键词</label>
                <el-input name="keyWord" v-model="res.keyWord" type="text" class="dfinput" placeholder="请最多输入五个关键词，以 ；隔开"/>
              </li>
              <li>
                <label>&nbsp;</label>
                <label>&nbsp;</label>

                <button type="submit" class="loginbtn" @click="test">测试</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  type="submit"
                  class="loginbtn"
                  @click="save"
                >保存</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  type="submit"
                  class="loginbtn"
                  @click="saveAs"
                >另存</button>
              </li>
            </div>
            <div class="right">
              <li class="smiltextinput">
                <label>标题：</label>
                <el-input type="text" v-model="testData.title"/>
              </li>
              <li class="smiltextinput">
                <label>发布时间：</label>
                <el-input type="text" v-model="testData.creatTime"/>
              </li>
              <li class="smiltextinput">
                <label>来源：</label>
                <el-input type="text" v-model="testData.form"/>
              </li>
              <li class="topaside">
                <label>正文：</label>
                <el-input type="textarea" v-model="testData.content" class="bigtextarea"/>
              </li>
            </div>
          </ul>
          <ul class="bottom">
            <h4>已有规则列表：</h4>
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
      <el-tab-pane label="抓取公众号信息规则" name="second" >
        <ul>
          <li>
            <label>微信号</label>
            <el-input v-model="weChatId" type="text" class="dfinput"/>
          </li>
          <li/>
          <li>
            <label>&nbsp;</label>
            <button type="submit" class="loginbtn" @click="wxtest">测试</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="submit" class="loginbtn" @click="wxsave">保存</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </li>
          <li>
            <label>微信认证</label>
            <el-input v-model="wxData.wechatCertification" type="text" class="dfinput"/>
          </li>
          <li>
            <label>功能介绍</label>
            <el-input v-model="wxData.wechatFeatures" type="text" class="dfinput"/>
          </li>
          <li>
            <label>公众号名称</label>
            <el-input v-model="wxData.wechatName" type="text" class="dfinput"/>
          </li>
          <li>
            <label>页面URL</label>
            <el-input v-model="wxData.wechatUrl" type="text" class="dfinput"/>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
  <script>
import { columnList } from "@/api/cms/columnManage.js";
import {
  getRuler,
  getCloumRule,
  getFullRuleSend,
  // currentuser,
  testRequest,
  saveRequest,
  wxTestRequest,
  wxSaveRequest
} from "@/api/cms/beeClect.js";
export default {
  name: "Form",
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
        creatTime:"",
        formRule: "",
        encoding: "",
        formStandby: "",
        keyWord:''
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
        creatTime:"",
        formRule: "",
        encoding: "",
        formStandby: "",
        keyWord:''
      },
      activeName: "first",
      weChatId: "",
      wxData: {},
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
        creatTime:'',
        formRule: "",
        encoding: "",
        formStandby: "",
        keyWord:''
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
            //   console.log(response)
            if (response.data.status == "success") {
              _this.res = response.data.data;
            } else {
              _this.res = _this.saveRes;
            }

            console.log(_this.res, "当前结果res");
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  },
  created() {
    this.initInfo()
    //获取全部已有规则
    this.getFullRule();
    //获取当前用户信息
    // this.getcurrentuser();

    //获取栏目列表信息
    var _this = this;
    return new Promise((resolve, reject) => {
      columnList({}, 1, 1000)
        .then(response => {
          _this.$nextTick(() => {
            _this.content = response.data.result.content;
              console.log(_this.content,'所有栏目')
          });
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  methods: {
    initInfo(){
      let userInfo=JSON.parse(localStorage.getItem('BaseInfor'));
      this.clientLicenseId=userInfo.clientLicenseId;
      this.userName=userInfo.userName;
    },
    /** 选择栏目
     */

    // getcurrentuser() {
    //   var _this = this;
    //   return new Promise((resolve, reject) => {
    //     currentuser()
    //       .then(response => {
    //         // console.log(response)
    //         _this.clientLicenseId = response.data.result.clientLicenseId;
    //         _this.userName = response.data.result.userName;
    //         resolve();
    //       })
    //       .catch(reject => {
    //         console.log(reject);
    //       });
    //   });
    // },

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
                creatTime:'',
                formRule: "",
                encoding: "",
                formStandby: "",
                keyWord:''
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
                  creatTime:'',
                  formRule: "",
                  encoding: "",
                  formStandby: "",
                  keyWord:''
                };
                alert(response.data.data);
              }
            }
          })
          .catch(reject => {
            alert("请求失败");
            console.log(reject);
          });
      });
    },

    check() {
      if (this.res.newsListUrl == "" || this.res.newsListUrl == null) {
        alert("列表页面URL不能为空");
        return false;
      }
      if (this.res.newsListUrlRule == "" || this.res.newsListUrlRule == null) {
        alert("列表页面URL规则不能为空");
        return false;
      }
      if (this.res.newsListTitle == "" || this.res.newsListTitle == null) {
        alert("列表标题规则不能为空");
        return false;
      }
      if (this.res.titleUrl == "" || this.res.titleUrl == null) {
        alert("列表标题链接规则不能为空");
        return false;
      }
      if (this.res.newsListRule == "" || this.res.newsListRule == null) {
        alert("抓取信息的规则不能为空");
        return false;
      }
      if (this.res.newsRule == "" || this.res.newsRule == null) {
        alert("详情页面规则不能为空");
        return false;
      }
      if (this.res.titleRule == "" || this.res.titleRule == null) {
        alert("标题标签不能为空");
        return false;
      }
      if (this.res.contentRule == "" || this.res.contentRule == null) {
        alert("正文标签不能为空");
        return false;
      }
      if ( this.res.creatTime == null||this.res.creatTime.toString() == "" ) {
        alert("发布时间不能为空");
        return false;
      }
      if (this.res.encoding == "" || this.res.encoding == null) {
        alert("编码不能为空");
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
              alert(response.data);
            }
            resolve();
          })
          .catch(reject => {
            alert("请求失败");
          });
      });
    },
    handlekeyWord(val){
      if(val){
        let mykeyWord=val;
      mykeyWord=mykeyWord.replace(/；/gi,';');
      mykeyWord=mykeyWord.replace(/，/gi,';');
      mykeyWord=mykeyWord.replace(/,/gi,';');
      if(mykeyWord.split(';').length>5){
         this.$message({
          type:'error',
          message:'请最多输入5个关键词'
        })
        return false;
      }
      console.log(mykeyWord)
      return mykeyWord
      }else{
        return true
      }
      
    },
    test() {
      let flag = this.check();
       let mykeyWord=this.handlekeyWord(this.res.keyWord)
      if (flag&&mykeyWord) {
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
          creatTime:this.res.creatTime,
          formrule: this.res.formRule,
          encoding: this.res.encoding,
          clientLicenseId: this.clientLicenseId,
          userName: this.userName,
          formStandby: this.res.formStandby,
          //处理空值情况
          keyWord:mykeyWord==true?'':mykeyWord
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
       let mykeyWord=this.handlekeyWord(this.res.keyWord)
      if (flag&&mykeyWord) {
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
          creatTime:this.res.creatTime,
          formrule: this.res.formRule,
          encoding: this.res.encoding,
          clientLicenseId: this.clientLicenseId,
          userName: this.userName,
          formStandby: this.res.formStandby,
          keyWord:mykeyWord==true?'':mykeyWord
        };
        var _this = this;

        return new Promise((resolve, reject) => {
          saveRequest(sendData)
            .then(response => {
              _this.loading = false;
              // console.log(response.data)
              if (response.data.status == "success") {
                this.$message({
                  type:'success',
                  message:response.data.data
                })
                _this.getRule();
              }else{
                this.$message({
                  type:'error',
                  message:response.data.data.errMsg
                })
              }
              resolve();
            })
            .catch(reject => {
              console.log(reject);
              _this.loading = false;
              alert("失败");
            });
        });
      }
    },
    saveAs() {
      let flag = this.check();
       let mykeyWord=this.handlekeyWord(this.res.keyWord)
      if (flag&&mykeyWord) {
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
          creatTime:this.res.creatTime,
          formrule: this.res.formRule,
          encoding: this.res.encoding,
          clientLicenseId: this.clientLicenseId,
          userName: this.userName,
          formStandby: this.res.formStandby,
          keyWord:mykeyWord==true?'':mykeyWord
        };
        var _this = this;
        return new Promise((resolve, reject) => {
          saveRequest(sendData)
            .then(response => {
              _this.loading = false;
              // console.log(response.data)
              if (response.data.status == "success") {
                this.$message({
                  type:'success',
                  message:response.data.data
                })
                _this.getRule();
              }
              resolve();
            })
            .catch(reject => {
              console.log(reject);
              _this.loading = false;
              alert("失败");
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
    wxcheck() {
      if (
        this.wxData.wechatCertification == "" ||
        this.wxData.wechatCertification == null
      ) {
        alert("微信认证不能为空！");
        return false;
      }
      if (
        this.wxData.wechatFeatures == "" ||
        this.wxData.wechatFeatures == null
      ) {
        alert("功能介绍不能为空！");
        return false;
      }
      if (this.wxData.wechatName == "" || this.wxData.wechatName == null) {
        alert("公众号名称不能为空！");
        return false;
      }
      if (this.wxData.wechatUrl == "" || this.wxData.wechatUrl == null) {
        alert("页面URL不能为空！");
        return false;
      }
      return true;
    },
    wxtest() {
      if (this.weChatId == "" || this.weChatId == null) {
        alert("微信号不能为空！");
        return false;
      }
      this.loading = true;

      var _this = this;
      return new Promise((resolve, reject) => {
        wxTestRequest(_this.weChatId)
          .then(response => {
            // console.log(response)
            if (response.data.status == "success") {
              _this.loading = false;
              _this.wxData = response.data.data;
              //    console.log( this.wxData)
            } else {
              _this.loading = false;
              alert("请求失败");
            }
            resolve();
          })
          .catch(reject => {
            console.log(reject);
            _this.loading = false;
            alert(reject);
          });
      });
    },
    wxsave() {
      let flag = this.wxcheck();
      if (flag) {
        this.loading = true;
        var _this = this;

        return new Promise((resolve, reject) => {
          wxSaveRequest(_this.wxData.wechatNumber, _this.wxData.wechatName)
            .then(response => {
              // console.log(response.data)
              if (response.data.status == "success") {
                _this.loading = false;
                //   console.log(data)
                alert("保存成功");
              } else {
                _this.loading = false;
                alert("请求失败");
              }
              resolve();
            })
            .catch(reject => {
              _this.loading = false;
              alert(reject);
            });
        });
      }
    }
  }
};
</script>
  <style scoped>
* {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: black;
}
.left {
  float: left;
  width: 550px;
}
.right {
  float: left;
  width: 650px;
}
.formBox {
 
}
.formbody {
  position: relative;
  margin: 0 40px;
  text-align: left;
}
.forminfo {
  overflow: hidden;
}
.formbody li {
  list-style: none;
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

button {
  width: 56px;
  height: 28px;
  background-color: #409eff;
  font-size: 12px;
  border-radius: 5px;
  color: #fff;
  line-height: 28px;
  text-align: center;
  border: none;
  outline: none;
}
button:active {
  opacity: 0.8;
}
.smiltextinput {
  margin-top: 5px;
  width: 526px;
  padding: 0 0;
  resize: none;
}
/deep/.el-textarea__inner {
  width: 526px;
  min-height: 400px !important;
}
.topaside {
  margin-top: 5px;
  overflow: hidden;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
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
  
  