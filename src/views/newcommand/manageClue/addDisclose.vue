<template>
  <div class="addbaoliao">
    <el-row>
      <el-col :span="12">
        <v-form
          ref="vform"
          :form-data="formData"
          :form-settings="formSettings"
          @save="submitSave"
          :btn-loading="isLoading"
        >
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
      </el-col>
      <el-col :span="12">
        <div class="videoUrl" v-if="formImgVide">
          <div class="img-wrap-list" v-for="(item,index) in formImgVide" :key="index">
            <div class="video-wrap">
              <video v-if="item.dataFlag == false" controls="controls" :src="item.dataUrl" />
              <img v-if="item.dataFlag==true" :src="item.dataUrl" alt >
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    
    

  </div>
</template>
<script>
// const Upload = _ => import('@/components/cms/Upload/upload')
import {
  createDisclose,
  editDisclose,
  discloseInfor,
  discloseClassify
} from "@/api/newsCommand/disclose.js";
export default {
  name: "ColumnHandel",
  data() {
    return {
      formData: {},
      discloseId: "",
      formImgVide:'',
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
                  label: "交通事故111",
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
            },
            { 
              label: "是否公开",
              name: "publicFlag",
              type: "radio",
              value:1,
              options:[
                {
                  label:'不公开',
                  value:0
                },{
                  label:'公开',
                  value:1
                }
              ]
            }, { 
              label: "上传",
              name: "videoUrl",
              type: "file",
              // acceptFile:{accept:['.mp4','.jpg','.png','.jpeg']}

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
      tijiaodata: ""
    };
  },
  created(){
    //赋值
    let arr=this.$store.state.newCommand.clssifyList
    arr.forEach((item,index)=>{
      arr[index].label=item.typeName;
      arr[index].value=item.numberNo;

    })
    this.formSettings[0].items[1].options=arr;
    
  },
  mounted() {
    this.discloseClassify();
    if (this.$route.query.Disclose == "addDisclose") {
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
    if (this.isEdit) {
      this.discloseId = this.$route.query.discloseId;
      this.discloseInfor(this.discloseId);
    }

    console.log(this.$store.state.newCommand.clssifyList,
    'list')
    console.log(this.$refs.$el,'asdf')
    this.$refs.$el.updateForm();
  },
  methods: {
    // 添加爆料
    CreateDisclose(res) {
      return new Promise((resolve, reject) => {
        createDisclose(res)
          .then(response => {
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
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 搜索分类接口
    discloseClassify() {
      var _this = this;
      return new Promise((resolve, reject) => {
        discloseClassify().then(response => {
          _this.formSettings[0].items[1].options = response.data.result.map(
            ele => {
              return {
                label: ele.typeName,
                value: ele.numberNo
              };
            }
          );
        });
      });
    },
    // 爆料详情
    discloseInfor(res) {
      var _this=this;
      return new Promise((resolve, reject) => {
        discloseInfor(res)
          .then(response => {
            this.formData = response.data.result;
            if (response.data.result.videoUrl) {
              _this.formImgVide = response.data.result.videoUrl;
              //数据回显
              _this.formData.videoUrl.forEach((item,index)=>{
                item.url=item.dataUrl

                item.name=item.dataUrl.split("/").reverse()[0]
              })
              console.log( _this.formData.videoUrl,'回显数据')
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    gotoListPage(context) {
      context.$store
        .dispatch("delView", this.$route)
        .then(({ visitedViews }) => {
          if (context.isActive(context.$route)) {
            const latestView = visitedViews.slice(-1)[0];
            if (latestView) {
              if (latestView.path == "/newCommand/manageClue/discloseList") {
                context.$router.push(latestView);
              } else {
                this.$router.replace({
                  path:
                    "/newCommand/manageClue/discloseList?time=" +
                    new Date().getTime()
                });
              }
            } else {
              context.$router.push("/");
            }
          }
        });
    },
    isActive(route) {
      return route.path === this.$route.path;
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    timeFormat(timestamp) {
      //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
      var time = new Date(timestamp);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      var hours = time.getHours();
      var minutes = time.getMinutes();
      var seconds = time.getSeconds();
      return (
        year +
        "-" +
        this.add0(month) +
        "-" +
        this.add0(date) +
        " " +
        this.add0(hours) +
        ":" +
        this.add0(minutes) +
        ":" +
        this.add0(seconds)
      );
    },
    
    submitSave(formData1) {
      let _this = this;
      formData1.breakingTime = this.timeFormat(formData1.breakingTime);
      this.tijiaodata = formData1;
      this.isLoading = true;
      if (this.isEdit) {
        

        return new Promise((resolve, reject) => {
          let newformData1 = formData1;
          newformData1.id = _this.discloseId;
          newformData1.newsOrigin = _this.formData.newsOrigin;
          //处理修改后的数据格式
           let data=JSON.parse((JSON.stringify(newformData1)))
          data.videoUrl.forEach((item,index)=>{
           let boliaoUrl=item.url;
            data.videoUrl[index]={};
            data['videoUrl[' + index +'].dataUrl'] = boliaoUrl;
          })
          // let hnrToken = JSON.parse(localStorage.getItem("hnDt_token"));
          // hnrToken = hnrToken.access_token;
          // newformData1.hnrToken = hnrToken;
          editDisclose(data)
            .then(response => {
              _this.$message({
                showClose: true,
                message: "恭喜你，编辑操作成功!",
                type: "success"
              });
              _this.gotoListPage(_this);
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        });
      } else {
          //处理保存数据url 格式为后台格式
          let data=JSON.parse((JSON.stringify(formData1)))
          data.videoUrl.forEach((item,index)=>{
           let boliaoUrl=item.url;
            data.videoUrl[index]={};
            data['videoUrl[' + index +'].dataUrl'] = boliaoUrl;
          })

        return new Promise((resolve, reject) => {
          // let hnrToken = JSON.parse(localStorage.getItem("hnDt_token"));
          // hnrToken = hnrToken.access_token;
          // formData1.hnrToken = hnrToken;
          data.newsOrigin = 0;
          createDisclose(data)
            .then(response => {
              _this.$message({
                showClose: true,
                message: "恭喜你，添加操作成功!",
                type: "success"
              });
              _this.gotoListPage(_this);
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
// .addbaoliao {
//   width: 700px;
//   margin: 0 auto;
//   margin-top: 50px;
// }
//  .el-form-item__label{width:200px!important;}

.videoUrl {
  width: 700px;
  height: 100%;
  overflow: hidden;
}
.videoUrl .img-wrap-list {
  width: 47%;
  height: 300px;
  overflow: hidden;
  display: inline-block;
  margin-bottom: 30px;
  margin-right: 20px;
}
.videoUrl .img-wrap-list .video-wrap,
.img-wrap {
  width: 100%;
  height: 300px;
  overflow: hidden;
}
.videoUrl .img-wrap-list .video-wrap video,
img {
  width: 100%;
  height: 100%;
}
</style>
