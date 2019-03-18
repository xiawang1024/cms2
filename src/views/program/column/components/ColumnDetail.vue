<template>
  <div class="createPost-container">
    <el-form v-loading="loading" :rules="rules" ref="postForm" :model="postForm" class="form-container">

      <div class="createPost-main-container">
          <p class="warn-content">
            创建/编辑栏目信息
            <small>
              <span style="color: #F56C6C">标题红色字体为必填项</span>
            </small>
          </p>

          <el-form-item style="margin-bottom: 40px;" prop="columnName">
            <MDinput v-model="postForm.columnName" :maxlength="100" name="name" required>
              <span style="color: #F56C6C">栏目名称</span>
            </MDinput>
          </el-form-item>
          <el-form-item style="margin-bottom: 40px;" label="所属频率" class="redItem" prop="channelId">
            <el-select v-model="postForm.channelId" @change="selectChannel" placeholder="请选择所属频率">
              <el-option v-for="item in this.channelOptions" :key="item.channel_id" :label="item.channel_name" :value="item.channel_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 40px;" label="栏目主播">
            <el-select v-model="compere_arr" @change="selectCompere" multiple placeholder="多选">
              <el-option :key="0" label="无主播" :value="0"></el-option>
              <el-option :disabled="compereState" v-for="item in this.compereOptions" :key="item.compere_id" :label="item.compere_name" :value="item.compere_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 40px;" prop="className">
            <MDinput v-model="postForm.className" disabled="disabled" :maxlength="100" name="name" required>
              <span style="color: #F56C6C">所属分类</span>
            </MDinput>
          </el-form-item>
          <el-form-item style="margin-bottom: 40px;" label="选择分类">
            <el-tree style="margin-top: 50px;"
              :data="treeList"
              :props="defaultProps"
              default-expand-all
              @node-click="handleNodeClick">
            </el-tree>
          </el-form-item>

          <el-form-item style="margin-bottom: 40px;" label="上传logo">
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
          <el-form-item label="栏目描述" style="width: 40%">
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
import { fetchCompereAll } from '@/api/program/compere'
import { fetchClassAll } from '@/api/program/class'
import { fetchColumn, createColumn } from '@/api/program/column'
import MDinput from '@/components/MDinput'
import Vue from 'vue'

const defaultForm = {
  columnId: '',       // Id
  columnName: '',     // 名称
  columnInfo: '',     // 详情
  channelId: '',      // 所属频率
  classId: '',        // 所属分类Id
  status: 1,          // 状态0未启用1启用
  className: ''       // 分类名称
}

export default {
  name: 'ColumnDetail',
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
      channelOptions: [],
      compereOptions: [],
      imgSrc: '',
      compere_arr: [0],      // 主播数组
      compere_str: '',      // 主播字符串
      channel_name: '',     // 所属频率中文名
      logo: '',             // logo
      desc: '',             // 描述
      treeList: [],
      defaultProps: {
        id: 'classid',
        label: 'classname',
        children: 'childList',
      },
      upLoadData: {
        fileRefId: 'program-column'
      },
      rules: {
        columnName: [{ required: true, message: '栏目名称为必填项', trigger: 'blur' }],
        channelId: [{ required: true, message: '请选择所属频率', trigger: 'change' }],
        className: [{ required: true, message: '请选择所属分类', trigger: 'change' }]
      },
      compereState: false
    }
  },
  created() {
    //初始化频率选项
    this.getChannelOptions()
    //初始化主播选项
    this.getCompereOptions()
    //初始化类目
    this.getTreeList()
    //回显数据
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    getTreeList() {
      fetchClassAll().then(response => {
        this.treeList = response.data.result;
      })
    },
    getChannelOptions() {
      let userid = 1  //假定租户id是1
      fetchChannelAll(userid).then(response => {
        this.channelOptions = response.data.result
      })
    },
    getCompereOptions() {
      let userid = 1  //假定租户id是1
      fetchCompereAll(userid).then(response => {
        this.compereOptions = response.data.result
        // this.compereOptions.unshift({ //在下拉框顶部插入默认选项
        //     "compere_id": 0,
        //     "compere_name": "无主播"
        //   },
        // )
      })
    },
    fetchData(id) {
      this.loading = true
      fetchColumn(id).then(response => {
        this.postForm = response.data.result
        this.logo = JSON.parse(response.data.result.columnInfo).logo
        this.imgSrc = process.env.BASE_API + this.logo
        this.desc = JSON.parse(response.data.result.columnInfo).desc
        this.channel_name = JSON.parse(response.data.result.columnInfo).channel_name
        this.compere_str = JSON.parse(response.data.result.columnInfo).compere_str
        //将数组内的id串拆分成数组后再转为整型
        this.compere_arr = this.compere_str.split(',')
        // this.compere_arr = dataStrArr.map(item => {  
        //     return +item;
        // })
        this.loading = false

      }).catch(err => {
        console.log(err)
      })
    },
    submitData() {
      //将信息集体打包成json作为单独一个字段传入后台
      Vue.set(this.postInfo, 'channel_name', this.channel_name)
      Vue.set(this.postInfo, 'compere_str', this.compere_str)
      Vue.set(this.postInfo, 'logo', this.logo)
      Vue.set(this.postInfo, 'desc', this.desc)
      let myDate = new Date()
      let nowDate = myDate.toLocaleString('chinese', { hour12: false }).split('/').join('-')
      Vue.set(this.postInfo, 'update', nowDate)

      this.$refs['postForm'].validate(valid => {
        if(valid) {
          this.loading = true
          this.postForm.columnInfo = JSON.stringify(this.postInfo)
          createColumn(this.postForm).then(() => {
            this.$notify({
              title: '成功',
              message: '提交成功',
              type: 'success',
              duration: 2000
            })
            //清空表单值
            // this.postForm = {brand_right:0}
            // this.compere_arr = []
            // this.className = ''
            // this.imgSrc = ''
            // this.logo = ''
            // this.desc = ''
            // this.loading = false
            this.back()
          })
        }
      })
    },
    //获取select
    selectChannel(vId) {
      let obj = {};
      obj = this.channelOptions.find((item)=>{  //这里的channelOptions就是上面遍历的数据源
          return item.channel_id === vId  //筛选出匹配数据
      });
      this.channel_name = obj.channel_name
    },
    selectCompere(cId) {
      this.compere_arr = cId
      this.compereState = this.compere_arr.includes(0)
      if(this.compereState){  //如果选中无主播
        this.compere_arr = [0]
      }
      this.compere_str = this.compere_arr.join(',')
    },
    handleNodeClick(data) {
      this.postForm.className = data.classname
      this.postForm.classId = data.classid
    },
    back() {
      this.$router.go(-1)
    },
    uploadUrl() {
        // var url = process.env.BASE_API + "/system/common/imgUpload" // 生产环境和开发环境的判断
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
        // this.imageUrl = URL.createObjectURL(file.raw);
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
