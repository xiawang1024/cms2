<template>
  <div class="water-setting">
    <!-- <div class="tool-bar">
      <el-button
        type="warning"
        @click="handleSave"
      >保存</el-button>
    </div> -->
    <!-- <h3 class="title">水印设置</h3> -->
    <!-- <el-form
      ref="watermarkingForm"
      :model="watermarkingForm"
      label-width="100px"
    >
      <el-form-item label="水印位置：">
        <div class="location-box">
          <el-button
            :type="watermarkingForm.chooseLocation===1?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =1"
          >上左</el-button>
          <el-button
            :type="watermarkingForm.chooseLocation===2?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =2"
          >上中</el-button>
          <el-button
            :type="watermarkingForm.chooseLocation===3?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =3"
          >上右</el-button>
          <el-button
            :type="watermarkingForm.chooseLocation===4?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =4"
          >中左</el-button>
          <el-button
            :type="watermarkingForm.chooseLocation===5?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =5"
          >中中</el-button>
          <el-button
            :type="watermarkingForm.chooseLocation===6?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =6"
          >中右</el-button>
          <el-button
            :type="watermarkingForm.chooseLocation===7?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =7"
          >下左</el-button>
          <el-button
            :type="watermarkingForm.chooseLocation===8?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =8"
          >下中</el-button>
          <el-button
            :type="watermarkingForm.chooseLocation===9?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =9"
          >下右</el-button>
        </div>
      </el-form-item>
      <el-form-item label="水印图片：">
        <Upload
          v-model="watermarkingForm.chooseImageUrl"
          width="20%"
        />
        <el-button
          type="danger"
          size="small"
          @click="handleDelete"
        >删除水印</el-button>
        <el-switch
          v-model="watermarkingForm.isScale"
          active-text="上传后缩放"
        />
        <el-input
          v-if="watermarkingForm.isScale"
          v-model="watermarkingForm.width"
          style="width:10em"
          type="number"
          maxlength="3"
          step="10"
          max="100"
          min="0"
        >
          <template slot="prepend">宽</template>
        </el-input>
        <el-input
          v-if="watermarkingForm.isScale"
          v-model="watermarkingForm.height"
          style="width:10em"
          type="number"
          maxlength="3"
          step="10"
          max="100"
          min="0"
        >
          <template slot="prepend">高</template>
        </el-input>
      </el-form-item>
    </el-form> -->
    <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" :btn-loading = "isLoading">
      <template slot="coner">
        <div class="location-box">
          <el-button
            :type="watermarkingForm.chooseLocation===1?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =1"
          >上左</el-button>
          <el-button
            :type="watermarkingForm.chooseLocation===2?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =2"
          >上中</el-button>
          <el-button
            :type="watermarkingForm.chooseLocation===3?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =3"
          >上右</el-button>
          <el-button
            :type="watermarkingForm.chooseLocation===4?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =4"
          >中左</el-button>
          <el-button
            :type="watermarkingForm.chooseLocation===5?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =5"
          >中中</el-button>
          <el-button
            :type="watermarkingForm.chooseLocation===6?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =6"
          >中右</el-button>
          <el-button
            :type="watermarkingForm.chooseLocation===7?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =7"
          >下左</el-button>
          <el-button
            :type="watermarkingForm.chooseLocation===8?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =8"
          >下中</el-button>
          <el-button
            :type="watermarkingForm.chooseLocation===9?'primary':''"
            class="location-btn"
            @click="watermarkingForm.chooseLocation =9"
          >下右</el-button>
        </div>
      </template>
    </v-form>
  </div>
</template>
<script>
import Upload from '@/components/cms/Upload/upload'
import { columnInfor, editColumn } from '@/api/cms/columnManage'
export default {
  name: 'ImageWatermarking',
  components: { Upload },
  data() {
    return {
      watermarkingForm: {
        chooseLocation: 5,
        chooseImageUrl:
          'http://admin.hndt.com/GEN/WORK/res/DJdqOmfT.png?1514167588947',
        isScale: false,
        width: 0,
        height: 0
      },
      formSettings: [
        {
          items: [
             {
              label: '水印位置',
              name: 'coner',
              type: 'slot'
            }, {
              label: '水印图片',
              name: 'url',
              type: 'img'
            }
          ]
        }
      ],
      isLoading: false,
      formData: {
      },
      routeQuery: {}
    }
  },
  mounted() {
    this.routeQuery = this.$route.query
    this.getColumnInfor()
  },
  methods: {
    getColumnInfor() {
      var _this = this
      console.log(_this.routeQuery.channelId)
      return new Promise((resolve, reject) => {
        columnInfor(_this.routeQuery.channelId)
          .then((response) => {
            _this.formData = response.data.result
            _this.watermarkingForm.chooseLocation = response.data.result.stampSetting.coner ? parseInt(response.data.result.stampSetting.coner) : 5
            // _this.tagRule = response.data.result.tagRule ? response.data.result.tagRule :  _this.tagRule
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // submitSave(formData) {
    //   console.log(formData)
    //   console.log(this.watermarkingForm.chooseLocation)
    // },
    submitSave(formData) {
      formData.coner = this.watermarkingForm.chooseLocation
      this.isLoading = true
      var _this = this
      return new Promise((resolve, reject) => {
        _this.formData.channelId = _this.routeQuery.channelId
        _this.formData.stampSetting = {
          coner: this.watermarkingForm.chooseLocation,
          url: ''
        }
        editColumn(_this.formData)
          .then((response) => {
            _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
            _this.gotoListPage(_this)
            _this.isLoading = false
            resolve()
          })
          .catch((error) => {
            _this.isLoading = false
            reject(error)
          })
      })
    },
    gotoListPage(context) {
      context.$store.dispatch('delView', this.$route).then(({ visitedViews }) => {
        if (context.isActive(context.$route)) {
          const latestView = visitedViews.slice(-1)[0]
          if (latestView) {
            context.$router.push(latestView)
          } else {
            context.$router.push('/')
          }
        }
      })
      context.$router.push({
        path: '/cms/website/column'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button + .el-button {
  margin: 5px 0px;
}
.water-setting {
}
.tool-bar {
  text-align: right;
}
.title {
  color: #454545;
  padding: 10px 0;
  font-weight: 700;
  border-bottom: 1px solid #444;
  margin-bottom: 20px;
}
.location-box {
  width: 267px;
}
.location-btn {
  width: 30%;
}
</style>

