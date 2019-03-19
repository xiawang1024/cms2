<template>
  <div class="createPost-container">
    <el-form v-loading="loading" :rules="rules" ref="postForm" :model="postForm" class="form-container">

      <div class="createPost-main-container">
        <p class="warn-content">
          创建/编辑排单信息
          <small>
            <span style="color: #F56C6C">标题红色字体为必填项</span>
          </small>
        </p>

        <el-form-item style="margin-bottom: 40px;" prop="programlistName">
          <MDinput v-model="postForm.programlistName" :maxlength="100" name="name" required>
            <span style="color: #F56C6C">排单名称</span>
          </MDinput>
        </el-form-item>
        <el-row>
          <el-col :span="4">
            <el-form-item style="margin-bottom: 40px; margin-left: 20px;" prop="channelId">
              <span style="color: #F56C6C">所属频率</span>
              <el-select v-model="postForm.channelId" @change="selectGet" placeholder="请选择所属频率">
                <el-option v-for="item in this.channelOptions" :key="item.channel_id" :label="item.channel_name" :value="item.channel_id"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item style="margin-bottom: 40px; margin-left: 20px;" prop="startTime">
              <span style="color: #F56C6C">生效时间</span>
              <el-date-picker
                v-model="postForm.startTime"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :editable="false"
                :picker-options="pickerOptions"/>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item style="margin-bottom: 40px; margin-left: 20px;">
              <span class="demonstration">设置失效时间</span>
              <el-switch
                v-model="switchstate"
                active-text="设置"
                inactive-text="无"/>
            </el-form-item>
          </el-col>
          <el-col :span="4" v-show="switchstate">
            <el-form-item style="margin-bottom: 40px; margin-left: 15px;" prop="endTime">
              <span class="demonstration">设置失效时间</span>
              <el-date-picker
                v-model="postForm.endTime"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                value-format="timestamp"
                :picker-options="pickerOptions"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="适用范围">
          <el-radio-group v-model="range" @change="setRange">
            <el-radio label="everyday">每天</el-radio>
            <el-radio label="workday">周一至周五</el-radio>
            <el-radio label="weekend">周六至周日</el-radio>
            <el-radio label="custom">自定义</el-radio>
          </el-radio-group>
          <el-checkbox-group v-model="weekSet">
            <el-checkbox label="1">周一</el-checkbox>
            <el-checkbox label="2">周二</el-checkbox>
            <el-checkbox label="3">周三</el-checkbox>
            <el-checkbox label="4">周四</el-checkbox>
            <el-checkbox label="5">周五</el-checkbox>
            <el-checkbox label="6">周六</el-checkbox>
            <el-checkbox label="0">周日</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="排单描述" style="width: 40%">
          <el-input type="textarea" v-model="postForm.programlistDesc"/>
        </el-form-item>


        <!-- 节目单start -->
        <div style="margin-top: 30px" class="form-dynamic">
          <span>节目排单</span>
          <el-row v-for="(item) in programs" :key="item.key">
            <el-col :span="2">
              <el-form-item>
                <span class="demonstration">开始时间</span>
                <el-time-picker
                  v-model="item.start"
                  type="datetime"
                  placeholder="开始时间"
                  align="right"
                  :editable="false"
                  format="HH:mm"
                  value-format="HH:mm"/>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="margin-left: 5px">
              <el-form-item>
                <span class="demonstration">结束时间</span>
                <el-time-picker
                  v-model="item.end"
                  type="datetime"
                  placeholder="结束时间"
                  align="left"
                  :editable="false"
                  format="HH:mm"
                  value-format="HH:mm"/>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="margin-left: 5px; width: 180px">
              <el-form-item>
                <span class="demonstration">选择栏目</span>
                <el-select v-scroll="handleScroll" v-model="item.title" filterable placeholder="可输入关键字">
                  <el-option v-for="(item1, index) in columnNamesOptions" :key="index" :label="item1.column_name" :value="item1.column_name"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="margin-left: 10px">
              <el-form-item>
                <span class="demonstration">节目性质</span>
                <el-radio-group v-model="item.playtype">
                  <el-radio :label="1">首播</el-radio>
                  <el-radio :label="2" style="margin-left: 10px">重播</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="margin-left: 40px">
              <el-form-item>
                <span class="demonstration">点播与否</span>
                <el-radio-group v-model="item.vodstatus">
                  <el-radio :label="1">开启</el-radio>
                  <el-radio :label="0" style="margin-left: 10px">停用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="2" style="margin-left: 40px; margin-top: 25px">
              <el-form-item>
                <a class="remove-item" v-show="programs.length>1" @click.prevent="removeItem(item)"><i class="el-icon-close"/></a>
              </el-form-item>
            </el-col>
               
          </el-row>
          <el-form-item class="submit-btn">
            <el-button type="success" @click="addItem">新增一项</el-button>
          </el-form-item>
        </div>
        <!-- 节目单end -->


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
import { fetchColumnNames } from '@/api/program/column'
import { fetchProgram, createProgram, fetchProgramInfo } from '@/api/program/program'
import MDinput from '@/components/MDinput'
import Vue from 'vue'



const defaultForm = {
  programlistId: '',      // 排单Id
  programlistName: '',    // 排单名称
  starttime: '',          // 开始时间
  endtime: '',            // 结束时间
  weekset: '',            // 周设定
  programlistInfo: '',    // 节目排单
  channelId: '',          // 所属频率
  programlistDesc: '',    // 排单描述
  addtime: '',            // 添加时间
  adduser: '',            // 添加者
  status: 1,              // 状态    
  startTime: '',          // 开始时间戳
  endTime: ''             // 结束时间戳
  
}

export default {
  name: 'ProgramDetail',
  components: { MDinput, Vue },
  directives: {
    'scroll': {   //  下拉框懒加载
      bind (el, binding) {
        // 获取滚动页面DOM
        let SCROLL_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
        let scrollPosition = 0
        SCROLL_DOM.addEventListener('scroll', function () {
          /**
            * scrollHeight 获取元素内容高度(只读)
            * scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
            * clientHeight 读取元素的可见高度(只读)
            * 如果元素滚动到底, 下面等式返回true, 没有则返回false:
            * ele.scrollHeight - ele.scrollTop === ele.clientHeight;
            */
          const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
          if (condition) {
              binding.value();
          }
        })
      }
    }
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    /**
     * 结束时间验证：结束时间必须大于开始时间
     */
    const vaildEndTime = (rule, value, callback) => {
      if(this.switchstate){ //结束时间设置按钮打开
        setTimeout(() => {
          const moment = require("moment");
          if (!moment(value).isAfter(this.postForm.startTime)) {
            callback(new Error("结束时间必须晚于开始时间"));
          } else {
            callback();
          }
        }, 500);
      } else {
        callback();
      }
    };
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      switchstate: false,
      range: '',           // 范围
      channelOptions: [],
      desc: '',            // 描述
      weekSet: [],         // 日期数组
      programs: [{         // 节目集合
        title: '',
        start: '',
        end: '',
        playtype: '',
        vodstatus: '',
      }],
      columnNamesOptions: [],
      formData: {
        pageIndex: 0,
        pageSize: 70,
      },
      pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      rules: {
        programlistName: [{ required: true, message: '节目单模板名称为必填项', trigger: 'blur' }],
        channelId: [{ required: true, message: '请选择所属频率', trigger: 'change' }],
        startTime: [{ required: true, message: '请输入开始时间', trigger: 'change' }],
        endTime: [{ type: "data", trigger: "change", validator: vaildEndTime }]
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
  mounted() {
    //初始化栏目选项 因数据过大防止渲染过慢，分页加载
    this.getColumnNames()
  },
  methods: {
    getChannelOptions() {
      let userid = this.$store.getters.tenantId
      fetchChannelAll(userid).then(response => {
        this.channelOptions = response.data.result;
      })
    },
    getColumnNames() {
      let userid = this.$store.getters.tenantId
      fetchColumnNames(userid, this.formData.pageIndex, this.formData.pageSize).then(response => {
        this.columnNamesOptions = [...this.columnNamesOptions, ...response.data.result];
        // this.columnNamesOptions = response.data.result;
      })
    },
    handleScroll () {
      this.formData.pageIndex++
      this.getColumnNames()
    },
    fetchData(id) {
      this.loading = true
      fetchProgram(id).then(response => {
        this.postForm = response.data.result
        this.weekSet = this.postForm.weekset.split(',')
        this.postForm.startTime = this.postForm.starttime*1000
        this.programs = JSON.parse(response.data.result.programlistInfo)
        if(this.postForm.endtime != 0){
          this.switchstate = true
          this.postForm.endTime = this.postForm.endtime*1000
        }
        this.loading = false

      }).catch(err => {
        console.log(err)
      })
    },
    submitData() {
      //将信息集体打包成json作为单独一个字段传入后台
      // this.postForm.programInfo = JSON.stringify(this.postInfo)
        this.postForm.weekset = this.weekSet.join(',')
        this.postForm.starttime = this.postForm.startTime/1000
        if(this.switchstate) {
          this.postForm.endtime = this.postForm.endTime/1000
        } else {
          this.postForm.endtime = 0
        }
        let date =  (new Date()).getTime()/1000
        this.postForm.addtime = date
        this.postForm.programlistInfo = JSON.stringify(this.programs)
        //TODO this.postForm.adduser = 

      this.$refs['postForm'].validate(valid => {
        if(valid) {
           this.loading = true
           createProgram(this.postForm).then(() => {
            this.$notify({
              title: '成功',
              message: '提交成功',
              type: 'success',
              duration: 2000
            })
            //清空表单值
            // this.postForm = {brand_right:0}
            // this.postForm.startTime = 0,        // 开始时间戳
            // this.postForm.endTime = 0,          // 开始时间戳
            // this.range = '',           // 范围
            // this.weekSet = [],         // 当前选中日期
            // this.programs = [{         // 节目集合
            //     title: '',
            //     start: '',
            //     end: '',
            //     playtype: '',
            //     vodstatus: '',
            //   }]
           this.back()
          })
        }
      })
    },
    //获取select
    selectGet(vId) {
      let obj = {}
      obj = this.channelOptions.find((item)=>{  //这里的options就是上面遍历的数据源
          return item.channel_id === vId        //筛选出匹配数据
      });
      this.postForm.channel_name = obj.channel_name
    },
    setRange(range) {
     if(range == "workday"){
       this.weekSet = ["1", "2", "3", "4", "5"]
     }else if(range == "weekend"){
       this.weekSet = ["6", "0"]
     }else if(range == "everyday"){
       this.weekSet = ["1", "2", "3", "4", "5", "6", "0"]
     }else {
       this.weekSet = []
     }
    },
    /*删除表单项*/
    removeItem(item) {
      var index = this.programs.indexOf(item)
      if (index !== -1) {
        this.programs.splice(index, 1)
      }
    },
    /*增加表单项*/
    addItem() {
      this.programs.push({
        title: '',
        start: '',
        end: '',
        playtype: '',
        vodstatus: '',
      });
    },
    back() {
      this.$router.go(-1)
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

// 节目单
 .form-dynamic{
    width: 100%;
    background: #fff;
    padding: 20px;
    padding-top: 40px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    text-align: left;
  }
  .el-input{
    width: 95%;
  }
  .remove-item{
    color: red;
  }
  .submit-btn{
    text-align: center;
    margin-left: -60px;
  }
</style>
