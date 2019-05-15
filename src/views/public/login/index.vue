<template>
  <div style="height: 100%">
    <div class="login-container">

      <el-form
        ref="loginForm"
        :model="loginForm"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >

        <div class="title-container">
          <h3 class="title">{{ login.title }}</h3>

        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            v-model="loginForm.username"
            :placeholder="login.username"
            name="username"
            type="text"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :type="passwordType"
            v-model="loginForm.password"
            :placeholder="login.password"
            name="password"
            auto-complete="on"
          />
          <span
            class="show-pwd"
            @click="showPwd"
          >
            <svg-icon icon-class="eye" />
          </span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleGoogleLogin"
        >{{ login.googleLoginIn }}</el-button>

        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
        >{{ login.logIn }}</el-button>
      </el-form>
    </div>

    <el-dialog class="binding" title="Google二次验证绑定" :visible.sync="dialogGoogleBindingVisible" width="30%">
      <span><img :src="dialogGoogleBindingQrCodeBase64" alt="二维码图片" ></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogGoogleBindingVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogGoogleBindingHandle">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog class="doublecheck" title="Google二次验证(请查看APP中的动态口令)" :visible.sync="dialogGoogleDoubleCheckVisible" width="30%">
      <el-form >
        <el-form-item label="动态口令" style="background: none">
          <el-input v-model="dialogGoogleInputSecondCheckkey" style="border: none;"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogGoogleDoubleCheckVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogGoogleDoubleCheckHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { UserNoAuthCheckUserInfo, UserNoAuthQrCode, UserNoAuthQrCodeBinding, UserNoAuthGoogleDoubleCheck } from '@/api/user/user'
export default {
  name: 'Login',
  data() {
    return {
      login: {
        title: '系统登录',
        username: '用户名',
        password: '密码',
        logIn: '登录',
        googleLoginIn: 'Google二次校验登录'
      },
      loginForm: {
        username: '',
        password: ''
      },

      passwordType: 'password',
      loading: false,
      redirect: undefined,
      // google 二次绑定功能
      dialogGoogleBindingVisible: false,
      dialogGoogleBindingSecretKey: '',
      dialogGoogleBindingQrCodeBase64: '',
      dialogGoogleDoubleCheckVisible: false,
      dialogGoogleInputSecondCheckkey: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log(route, 'route')
        this.redirect = route.query && route.query.redirect
      }
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleGoogleLogin() {
      var _this = this
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        UserNoAuthCheckUserInfo(_this.loginForm.username, _this.loginForm.password).then(async res => {
          console.log(res.data)
          if(res.data.code == 0) {
            if(res.data.result.bindingFlag == 0) {
              // 未绑定
              _this.dialogGoogleBindingSecretKey = res.data.result.secretKey
              _this.handleGoogleQrCode();
              _this.dialogGoogleBindingVisible = true
            }
            if(res.data.result.bindingFlag == 1) {
              // 已绑定
              _this.dialogGoogleDoubleCheckVisible = true
            }

          } else {
            _this.$message(res.data.msg);
          }
          // 结束
          resolve()
        })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },
    handleGoogleQrCode() {
      var _this = this
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        UserNoAuthQrCode(_this.loginForm.username, _this.loginForm.password, _this.dialogGoogleBindingSecretKey).then(async res => {
          console.log(res.data)
          if(res.data.code == 0) {
            _this.dialogGoogleBindingQrCodeBase64 = 'data:img/jpg;base64,' + res.data.result
          }
          // 结束
          resolve()
        })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },
    // 绑定二维码
    dialogGoogleBindingHandle() {
      var _this = this
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        UserNoAuthQrCodeBinding(_this.loginForm.username, _this.loginForm.password, _this.dialogGoogleBindingSecretKey).then(async res => {
          console.log(res.data)
          if(res.data.code == 0) {
            _this.dialogGoogleBindingVisible = false
            _this.dialogGoogleDoubleCheckVisible = true
          }
          // 结束
          resolve()
        })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },
    // double check
    dialogGoogleDoubleCheckHandle() {
      var _this = this
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        UserNoAuthGoogleDoubleCheck(_this.loginForm.username, _this.loginForm.password, _this.dialogGoogleInputSecondCheckkey).then(async res => {
          console.log(res.data)
          if(res.data.code == 0) {
            _this.handleLogin()
          } else {
            _this.$message(res.data.msg);
          }
          // 结束
          resolve()
        })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },
    handleLogin() {
      this.loading = true
      this.$store
        .dispatch('LoginByUsername', this.loginForm)
        .then((res) => {
          console.log(this.redirect, 'this.redirect ')
          this.loading = false
          this.$router.push({ path: this.redirect || '/' })
          this.$store.dispatch('GetCurrentInfor')
          this.$store.dispatch('GetColumnAll')
        })
        .catch((res) => {
          this.loading = false
          console.log(res, 'res')
          this.$message.error(res.error_description)
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>
