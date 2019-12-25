<template>
  <div class="water-setting">
    <v-form
      label-width="80px"
      ref="vform"
      :form-settings="formSettings"
      :form-data="formData"
      @save="submitSave"
      :btn-loading="isLoading"
    >
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
      <template slot="isScale">
        <div>
          <el-checkbox v-model="imageSetting.isScaleChecked">是否缩放</el-checkbox>
          <el-input
            v-if="imageSetting.isScaleChecked"
            v-model="imageSetting.width"
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
            v-if="imageSetting.isScaleChecked"
            v-model="imageSetting.height"
            style="width:10em"
            type="number"
            maxlength="3"
            step="10"
            max="100"
            min="0"
          >
            <template slot="prepend">高</template>
          </el-input>
        </div>
      </template>
    </v-form>
  </div>
</template>
<script>
import Upload from '@/components/cms/Upload/Upload'
import { columnInfor, editColumn } from '@/api/cms/columnManage'
export default {
  name: 'ImageWatermarking',
  components: { Upload },
  props: {
    columnRow: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
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
              type: 'img',
              limit: 1
            },
            {
              label: '',
              name: 'isScale',
              type: 'slot'
            },
          ]
        }
      ],
      isLoading: false,
      formData: {
      },
      // routeQuery: {},
      imageSetting: {
        isScaleChecked: false,
        height: '',
        width: ''
      }
    }
  },
  mounted() {
    // this.routeQuery = this.$route.query
    this.getColumnInfor()
  },
  methods: {
    getColumnInfor() {
      var _this = this
      return new Promise((resolve, reject) => {
        columnInfor(this.columnRow.channelId)
          .then((response) => {
            _this.formData = response.data.result
            _this.watermarkingForm.chooseLocation = response.data.result.stampSetting ? parseInt(response.data.result.stampSetting.coner) : 5
            if (_this.formData.stampSetting && _this.formData.stampSetting.url) {
              _this.formData.url = [{
                url: _this.formData.stampSetting.url
              }]
            } else {
              _this.formData.url = []
            }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    submitSave(formData) {
      formData.coner = this.watermarkingForm.chooseLocation
      this.isLoading = true
      var _this = this
      let iconUrlArray = []
      if (formData.url.length) {
        formData.url.forEach(ele => {
          iconUrlArray.push(ele.url)
        })
      }
      formData.url = iconUrlArray.length ? iconUrlArray.join(',') : ''
      return new Promise((resolve, reject) => {
        _this.formData.channelId = this.columnRow.channelId
        _this.formData.stampSetting = {
          coner: formData.coner,
          url: formData.url
        }
        editColumn(_this.formData)
          .then((response) => {
            _this.$message({ showClose: true, message: '操作成功!', type: 'success' })
            _this.isLoading = false
            resolve()
          })
          .catch((error) => {
            _this.isLoading = false
            reject(error)
          })
      })
    }
  }
}
</script>
<style lang="scss">
.water-setting {
  .el-form {
    .el-input-group__prepend {
      padding: 0 10px;
    }
  }
  .el-button + .el-button {
    margin: 5px 0px;
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
}
</style>

