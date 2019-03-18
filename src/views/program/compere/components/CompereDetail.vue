<template>
  <div class="createPost-container">
    <el-form v-loading="loading" :rules="rules" ref="postForm" :model="postForm" class="form-container">

      <div class="createPost-main-container">
          <p class="warn-content">
            创建/编辑主持人信息
            <small>
              <span style="color: #F56C6C">标题红色字体为必填项</span>
            </small>
          </p>

          <el-form-item style="margin-bottom: 40px;" prop="compereName">
            <MDinput v-model="postForm.compereName" :maxlength="100" name="name" required>
              <span style="color: #F56C6C">主播名称</span>
            </MDinput>
          </el-form-item>
          <el-form-item style="margin-bottom: 40px;" label="所属频率" class="redItem" prop="channelId">
            <el-select v-model="postForm.channelId" @change="selectGet" placeholder="请选择所属频率">
              <el-option v-for="item in this.options" :key="item.channel_id" :label="item.channel_name" :value="item.channel_id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item style="margin-bottom: 40px;" label="上传头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl()"
              :data="upLoadData"
              name="file"
              list-type="picture-card"
              :show-file-list="false"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-error="imgUploadError">
              <img v-if="imgSrc" :src="imgSrc" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="主播描述" style="width: 40%">
            <el-input type="textarea" v-model="desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitData()">提交</el-button>
            <el-button @click="back()">返回</el-button>
          </el-form-item>
      </div>
    </el-form>

  </div>
</template>

<script>
import { fetchChannelAll } from '@/api/program/channel'
import { fetchCompere, createCompere } from '@/api/program/compere'
import MDinput from '@/components/MDinput'
import Vue from 'vue'

const defaultForm = {
  compereId: '',      // 主播Id
  compereName: '',    // 主播名称
  compereInfo: '',    // 主播详情
  channelId: '',      // 所属频率
  status: 1           // 状态    
}

export default {
  name: 'CompereDetail',
  components: { MDinput, Vue },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      postInfo: {},
      loading: false,
      options: [],
      imgSrc: '',
      channel_name: '',   // 所属频率中文名
      logo: '',           // 头像
      desc: '',           // 主播描述
      upLoadData: {
        fileRefId: 'program-compere'
      },
      rules: {
        compereName: [{ required: true, message: '主播名称为必填项', trigger: 'blur' }],
        channelId: [{ required: true, message: '请选择所属频率', trigger: 'change' }]
      }
    }
  },
  created() {
    //初始化频率值
    this.getChannelOptions()
    //回显数据
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    getChannelOptions() {
      let userid = 1  //假定租户id是1
      fetchChannelAll(userid).then(response => {
        this.options = response.data.result;
      })
    },
    fetchData(id) {
      this.loading = true
      fetchCompere(id).then(response => {
        this.postForm = response.data.result
        this.channel_name = JSON.parse(response.data.result.compereInfo).channel_name
        this.desc = JSON.parse(response.data.result.compereInfo).desc
        this.logo = JSON.parse(response.data.result.compereInfo).logo
        this.imgSrc = process.env.BASE_API + this.logo
        this.loading = false

      }).catch(err => {
        console.log(err)
      })
    },
    submitData() {
      //将信息集体打包成json作为单独一个字段传入后台
      Vue.set(this.postInfo, 'channel_name', this.channel_name)
      Vue.set(this.postInfo, 'logo', this.logo)
      Vue.set(this.postInfo, 'desc', this.desc)
      this.postForm.compereInfo = JSON.stringify(this.postInfo)
      this.$refs.postForm.validate(valid => {
        if(valid) {
          this.loading = true
          createCompere(this.postForm).then(() => {
            this.$notify({
              title: '成功',
              message: '提交成功',
              type: 'success',
              duration: 2000
            })
              //清空表单值
              // this.postForm = {brand_right:0}
              // this.imgSrc = ''
              // this.logo = ''
              // this.channel_name = ''
              // this.desc = ''
              // this.loading = false
              this.back()
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //获取select
    selectGet(vId) {
      let obj = {};
      obj = this.options.find((item)=>{//这里的options就是上面遍历的数据源
          return item.channel_id === vId//筛选出匹配数据
      });
      this.channel_name = obj.channel_name
    },
    back() {
      this.$router.go(-1)
    },
    uploadUrl() {
        var url = "http://172.20.5.4:55030/basefile/upload" // 文件服务地址
        return url
    },
    handleRemove(file, fileList) {//移除图片
        this.$message({
            type: 'info',
            message: '已删除原有图片',
            duration: 6000
        });
      },
    beforeAvatarUpload(file) {//文件上传之前调用做一些拦截限制
        const isJPG = true
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 3
 
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M;
      },
      handleAvatarSuccess(res, file) {//图片上传成功
        this.logo = file.response.result.filePath
        this.imgSrc = file.response.result.fileUrl + this.logo
      },
      imgUploadError(err, file, fileList){//图片上传失败调用
        this.$message.error('上传图片失败!')
      }
  }
}
</script>

<style>
.redItem .el-form-item__label{
  color: red;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 147px;
    height: 147px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 146px;
    height: 146px;
    display: block;
  }
</style>
