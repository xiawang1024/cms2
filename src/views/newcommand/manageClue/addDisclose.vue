<template>
  <div class="addbaoliao">
    <v-form ref="vform" :form-settings="formSettings" @save="submitSave" :btn-loading="isLoading">
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
// const Upload = _ => import('@/components/cms/Upload/upload')
import {
  createDisclose,
  editDisclose

} from "@/api/newsCommand/disclose.js";
export default {
  name: "ColumnHandel",

  data() {
    return {
      formSettings: [
        {
          items: [
            {
              label: "爆料名称：",
              name: "breakingName",
              type: "text",
              required: true,
              placeholder: "请您输入爆料名称"
            },
            {
              label: "爆料分类：",
              name: "breakingType",
              type: "select",
              required: true,
              placeholder: "请选择分类",
              options: [
                {
                  label: "交通事故",
                  value: "1",
                  numberNo: 1,
                  id: "1"
                },
                {
                  label: "天气气候",
                  value: "2",
                  numberNo: 2,
                  id: "2"
                },
                {
                  label: "消费投诉",
                  value: "3",
                  numberNo: 3,
                  id: "3"
                },
                {
                  label: "经济纠纷",
                  value: "4",
                  numberNo: 4,
                  id: "4"
                },
                {
                  label: "求助信息",
                  value: "5",
                  numberNo: 5,
                  id: "5"
                },
                {
                  label: "食品安全",
                  value: "6",
                  numberNo: 6,
                  id: "6"
                },
                {
                  label: "寻人寻物",
                  value: "7",
                  numberNo: 7,
                  id: "7"
                },
                {
                  label: "劳务投诉",
                  value: "8",
                  numberNo: 8,
                  id: "8"
                },
                {
                  label: "环保投诉",
                  value: "9",
                  numberNo: 9,
                  id: "9"
                },
                {
                  label: "医疗投诉",
                  value: "10",
                  numberNo: 10,
                  id: "10"
                },
                {
                  label: "房产投诉",
                  value: "11",
                  numberNo: 11,
                  id: "11"
                },
                {
                  label: "噪音投诉",
                  value: "12",
                  numberNo: 12,
                  id: "12"
                },
                {
                  label: "土地纠纷",
                  value: "13",
                  numberNo: 13,
                  id: "13"
                },
                {
                  label: "行政执法",
                  value: "14",
                  numberNo: 14,
                  id: "14"
                },
                {
                  label: "教育投诉",
                  value: "15",
                  numberNo: 15,
                  id: "15"
                }
              ]
            },
            {
              label: "爆料人：",
              name: "breakingPeople",
              type: "text",
              placeholder: "请输入爆料人"
            },
            {
              label: "爆料人电话：",
              name: "breakingPhone",
              type: "text",
              placeholder: "请输入爆料人电话"
            },
            {
              label: "爆料描述",
              name: "breakingDescribe",
              type: "textarea",
              placeholder: "请输入爆料描述"
            },
            {
              label: "爆料时间：",
              name: "breakingTime",
              type: "datetime",
              value: new Date()
            }
          ]
        }
      ],

      routeQuery: {},
      isEdit: true,
      isLoading: false,
      imageSetting: {
        isScaleChecked: false,
        height: "",
        width: ""
      },
      tijiaodata:''
    };
  },
  mounted() {
  
 
    this.isEdit=this.getUrlParam("Disclose")=="Disclose"?false:true;
  },
  methods: {
    getUrlParam(string){

	//构造一个含有目标参数的正则表达式对象
	var reg = new RegExp("(^|&)" + string + "=([^&]*)(&|$)");
	//匹配目标参数
	var r = window.location.search.substr(1).match(reg);
	//返回参数值
	if (r != null) return unescape(r[2]);
	return null;

    },
    // 添加爆料
    CreateDisclose(res) {
    
      return new Promise((resolve, reject) => {
        createDisclose(res)
          .then(response => {
            console.log(response);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 修改爆料
    editDisclose(res) {
     
      return new Promise((resolve, reject) => {
        editDisclose(res)
          .then(response => {
            console.log(response);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    gotoListPage(context) {
      context.$store.dispatch('delView', this.$route).then(({ visitedViews }) => {
        if (context.isActive(context.$route)) {
          console.log(visitedViews)
          const latestView = visitedViews.slice(-1)[0]
          if (latestView) {
            context.$router.push(latestView)
          } else {
            context.$router.push('/')
          }
        }
      })

    },
    isActive(route) {
      return route.path === this.$route.path
    },
    submitSave(formData1) {
      let _this=this
      console.log("form提交的数据");
      console.log(formData1);
      this.tijiaodata=formData1
      this.isLoading = true;

      if (this.isEdit) {

      return new Promise((resolve, reject) => {
        createDisclose(formData1)
          .then(response => {
            _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
            console.log(response);
             _this.gotoListPage(_this)
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      })

      } else {
      
      return new Promise((resolve, reject) => {
        editDisclose(formData1)
          .then(response => {
              _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
 _this.gotoListPage(_this)
            console.log(response);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      })

      }


    }
  }
};
</script>

<style lang="scss">
// .addbaoliao {
//   width: 700px;
//   margin: 0 auto;
//   margin-top: 50px;
// }
//  .el-form-item__label{width:200px!important;}
</style>
