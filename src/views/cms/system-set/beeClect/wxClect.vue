<template>
  <div class="mainBox">
    <ul>
      <li>
        <label>微信号</label>
        <el-input v-model="weChatId" type="text" class="dfinput" />
      </li>
      <li />
      <li>
        <label>&nbsp;</label>
        <el-button size="mini" type="primary" @click="wxtest" >
          测试
        </el-button> &#x3000;
        <el-button size="mini" type="primary" @click="wxsave" >
          保存
        </el-button>
      </li>
      <li>
        <label>微信认证</label>
        <el-input v-model="wxData.wechatCertification" type="text" class="dfinput" />
      </li>
      <li>
        <label>功能介绍</label>
        <el-input v-model="wxData.wechatFeatures" type="text" class="dfinput" />
      </li>
      <li>
        <label>公众号名称</label>
        <el-input v-model="wxData.wechatName" type="text" class="dfinput" />
      </li>
      <li>
        <label>页面URL</label>
        <el-input v-model="wxData.wechatUrl" type="text" class="dfinput" />
      </li>
    </ul>
  </div>
</template>
<script>
import {
  wxTestRequest,
  wxSaveRequest,
} from "@/api/cms/beeClect.js";
export default {
    data(){
        return{
            weChatId:'',
            wxData: {},
        }
    },
    created(){

    },
    methods:{
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
            if (response.data.status == "success") {
              _this.loading = false;
              _this.wxData = response.data.data;
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
              if (response.data.status == "success") {
                _this.loading = false;
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
}
</script>
<style lang="scss" scoped>
.mainBox{
    padding: 15px;
    
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
}
</style>