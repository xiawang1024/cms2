<template>
  <div class="createPost-container">
    <el-form v-loading="loading" :rules="rules" ref="postForm" :model="postForm" class="form-container">

      <div class="createPost-main-container">
        <p class="warn-content">
          创建/编辑频率信息<br>
          <small>
            <span style="color: #F56C6C">标题红色字体为必填项</span>
          </small>
        </p>

        <el-form-item style="margin-bottom: 40px;" prop="channelName">
          <MDinput v-model="postForm.channelName" :maxlength="100" name="name" required>
            <label class="material-label-lighting">频率名称</label>
          </MDinput>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;">
          <MDinput v-model="secondName" :maxlength="100" name="name" required>
            对应直播的频率英文或拼音名称
          </MDinput>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" label="指定排序" class="redItem" prop="showOrder">
          <el-input v-model="postForm.showOrder" maxlength="10" placeholder="请输入数字"/>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;">
          <MDinput type="tel" v-model="channelHotline" :maxlength="100" name="name">
            频率热线
          </MDinput>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" class="redItem" label="所属类型">
          <el-select v-model="classIdArr" @change="selectClass" multiple placeholder="请选择">
            <el-option v-for="item in this.options" :key="item.class_id" :label="item.class_name" :value="item.class_id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="是否开启点播">
          <el-radio-group v-model="vodSet" @change="editVodRadio">
            <!-- label前不加冒号则无法回显整型值 -->
            <el-radio label="1">开启</el-radio>
            <el-radio label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否开启互动">
          <el-radio-group v-model="interactSet" @change="editInteractRadio">
            <el-radio label="1">开启</el-radio>
            <el-radio label="0">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" prop="streams">
          <MDinput v-model="postForm.streams" :maxlength="100" name="name" required>
            <label class="material-label-lighting">频率直播地址</label>
          </MDinput>
        </el-form-item>
        <el-form-item style="margin-bottom: 40px;" prop="videoStreams">
          <MDinput v-model="postForm.videoStreams" :maxlength="100" name="name" required>
            <label class="material-label-lighting">频率视频直播地址</label>
          </MDinput>
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
            <i v-else class="el-icon-plus avatar-uploader-icon"/>
          </el-upload>
        </el-form-item>
        <el-form-item label="频率描述" style="width: 40%">
          <el-input type="textarea" v-model="desc"/>
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
import { fetchChannel, createChannel } from '@/api/program/channel'
import MDinput from '@/components/MDinput'
import { validateURL } from '@/utils/validate'
import { getPinYinFirstCharacter } from '../components/PinYin'
import Vue from 'vue'

const defaultForm = {
  channelId: '',      // ID
  classId: '',        // 所属类别id串
  channelName: '',    // 频率名称
  channelNameE:'',    // 频率英文或拼音名称
  showOrder:'999',    // 指定排序
  channelInfo: '',    // 频率详情
  userId: '',         // 租户ID
  status: 1,          // 状态0未启用1启用
  streams: '',        // 频率直播地址
  videoStreams: ''    // 频率视频直播地址
}

export default {
  name: 'ChannelDetail',
  components: { MDinput, Vue },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validateURL(value)) {
          callback()
        } else {
          callback(new Error('url格式不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      postInfo: {},
      loading: false,
      secondName: '',       // 第二名称
      logo: '',             // logo
      desc: '',             // 描述
      channelHotline: '',   // 频率热线
      vodSet: '1',           // 是否开启点播
      interactSet: '1',      // 是否开启互动
      imgSrc: '',           // 图片
      classIdArr: [],       // 类别id数组
      options: [{
          class_id: 1,
          class_name: '河南台'
        }, {
          class_id: 2,
          class_name: '网络广播'
        }, {
          class_id: 3,
          class_name: '市县台'
        }, {
          class_id: 4,
          class_name: '警广之声'
        }, {
          class_id: 5,
          class_name: '中央台'
        }, {
          class_id: 6,
          class_name: '听电视'
        }],
      upLoadData: {
        fileRefId: 'program-channel'
      },
      rules: {
        channelName: [{ required: true, message: '频率名称为必填项', trigger: 'blur' }],
        showOrder: [{ required: true, message: '排序为必填项', trigger: 'blur' }],
        streams: [{required: true, message: '频率直播地址为必填项', trigger: 'blur'}, { validator: validateSourceUri, trigger: 'blur' }],
        videoStreams: [{ required: true, message: '频率视频直播地址为必填项', trigger: 'blur'}, {validator: validateSourceUri, trigger: 'blur' }]
      }
    }
  },
  created() {
    //回显数据
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    fetchData(id) {
      this.loading = true
      fetchChannel(id).then(response => {
        this.postForm = response.data.result
        this.logo = JSON.parse(response.data.result.channelInfo).logo
        this.imgSrc = process.env.BASE_API + this.logo
        this.desc = JSON.parse(response.data.result.channelInfo).desc
        this.channelHotline = JSON.parse(response.data.result.channelInfo).channel_hotline
        this.vodSet = JSON.parse(response.data.result.channelInfo).vod_set
        this.interactSet = JSON.parse(response.data.result.channelInfo).interact_set
        this.postForm.streams = JSON.parse(response.data.result.channelInfo).streams
        this.postForm.videoStreams = JSON.parse(response.data.result.channelInfo).video_streams
        this.secondName = JSON.parse(response.data.result.channelInfo).second_name
        //将数组内的id串拆分成数组后再转为整型
        let classJsonStr = this.postForm.classId
        // 去掉前后','
        if (classJsonStr.startsWith(',')) {
          classJsonStr=classJsonStr.substring(1)
        }
        if(classJsonStr.endsWith(',')) {
          classJsonStr = classJsonStr.substring(0, classJsonStr.lastIndexOf(','))
        }
        let dataStrArr = classJsonStr.split(',')
        this.classIdArr = dataStrArr.map(item => {  
            return +item;
        })
        this.loading = false

      }).catch(err => {
        console.log(err)
      })
    },
    submitData() {
      //将信息集体打包成json作为单独一个字段传入后台
      Vue.set(this.postInfo, 'second_name', this.secondName)
      Vue.set(this.postInfo, 'channel_hotline', this.channelHotline)
      Vue.set(this.postInfo, 'vod_set', this.vodSet)
      Vue.set(this.postInfo, 'interact_set', this.interactSet)
      Vue.set(this.postInfo, 'streams', this.postForm.streams)
      Vue.set(this.postInfo, 'video_streams', this.postForm.videoStreams)
      Vue.set(this.postInfo, 'logo', this.logo)
      Vue.set(this.postInfo, 'desc', this.desc)
      let myDate = new Date()
      let nowDate = myDate.toLocaleString('chinese', { hour12: false }).split('/').join('-')
      Vue.set(this.postInfo, 'update', nowDate)
      // 或者频率名称首字母拼音
      this.postForm.channelNameE = getPinYinFirstCharacter(this.postForm.channelName)
      this.postForm.channelInfo = JSON.stringify(this.postInfo)
      this.postForm.userId = 1 //TODO 登陆的租户userID先默认为1

      if (this.classIdArr.length === 0 || this.classIdArr.length == '') {
          this.$message.error('请选择所属类型')
          return false
      }
      this.$refs.postForm.validate(valid => {
        if(valid){
          this.loading = true
          createChannel(this.postForm).then(() => {
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
            // this.secondName = ''
            // this.channelHotline = ''
            // this.classIdArr = []
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
      this.postForm.channel_name = obj.channel_name
    },
    selectClass(cId) {
      this.classIdArr = cId
      this.postForm.classId = this.classIdArr.join(',')
    },
    editVodRadio(v) {
      this.vodSetSet = v
    },
    editInteractRadio(i) {
      this.interactSet = i
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
.redItem .el-form-item__label{
  color: red;
}
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
