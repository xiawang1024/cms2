<template>
  <el-dialog
    :title="scorePro.authorityType === 'articleScore'?'大象号稿件打分': '考核打分'"
    class="dialog-mark-dialog"
    :visible.sync="dialogVisible"
    width="710px"
    :before-close="handleClose"
  >
    <v-form
      ref="vForm"
      :form-settings="markFormSettings"
      :form-data="formData"
      label-width="80px"
      :show-button="showButton"
      v-if="scorePro.authorityType === 'checkScore' && markFormSettings[0]"
    >
      <template
        v-for="(ele, index) in markFormSettings[0].items"
        :slot="ele.name"
        slot-scope="scope"
      >
        <el-select
          v-model="scope.model[ele.selectName]"
          multiple
          placeholder="请选择"
          v-if="ele.reporterLists && ele.reporterLists.length"
          :key="ele.selectName"
        >
          <el-option
            v-for="item in ele.reporterLists"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-radio-group v-model="scope.model[ele.name]" :key="ele.name">
          <el-radio
            v-for="(item,index) in ele.radioList"
            :key="index"
            :label="item.label"
          >{{ item.value }}</el-radio>
        </el-radio-group>

        <el-popover
          popper-class="poperclass"
          placement="top-start"
          title
          width="10"
          trigger="hover"
          content="清空单选"
          :key="index"
        >
          <i slot="reference" class="el-icon-delete clearRadio" @click="clearRadio(ele.name)" />
        </el-popover>
        <div class="input-score" :key="ele.defineScoreName">
          <i class="el-icon-edit" style="color:#409EFF" />
          <el-input-number
            v-model="scope.model[ele.defineScoreName]"
            size="mini"
            :controls="false"
          />
          <span>分</span>
        </div>
      </template>
    </v-form>
    <!-- <v-form
      v-if="showCheck"
      ref="mark"
      :form-settings="markFormSettings"
      :form-data="formData"
      label-width="80px"
      :show-button="showButton"
    >
      <template
        v-for="(ele, index) in markFormSettings[0].items"
        :slot="ele.name"
        slot-scope="scope"
      >
        <el-select
          v-model="scope.model[ele.selectName]"
          multiple
          placeholder="请选择"
          v-if="ele.reporterLists && ele.reporterLists.length"
          :key="ele.selectName"
        >
          <el-option
            v-for="item in ele.reporterLists"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-radio-group v-model="scope.model[ele.radioName]" :key="ele.radioName">
          <el-radio
            v-for="(item,index) in ele.radioList"
            :key="index"
            :label="item.label"
          >{{ item.value }}</el-radio>
        </el-radio-group>

        <el-popover
          popper-class="poperclass"
          placement="top-start"
          title
          width="10"
          trigger="hover"
          content="清空单选"
          :key="index"
        >
          <i slot="reference" class="el-icon-delete clearRadio" @click="clearRadio(ele.radioName)" />
        </el-popover>
        <div class="input-score" :key="ele.defineScoreName">
          <i class="el-icon-edit" style="color:#409EFF" />
          <el-input-number
            v-model="scope.model[ele.defineScoreName]"
            size="mini"
            :controls="false"
          />
          <span>分</span>
        </div>
      </template>
    </v-form>-->
    <!-- <check-mark ref="checkMark" :form-data="formData" v-if="showCheck" /> -->
    <dx-mark ref="dxMark" :form-data="formData" v-if="scorePro.authorityType === 'articleScore'" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import dxMark from "./components/dxMark";
import checkMark from "./components/checkMark";
import {
  getManuscriptScore,
  // getMarkScore,
  getMarkJson,
  postManuscriptScore,
  postMarkScore
} from "@/api/cms/article";
export default {
  components: {
    dxMark,
    checkMark
  },
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    },
    scorePro: {
      default: () => {
        return {};
      },
      type: Object
    }
  },
  data() {
    return {
      formData: {
        // blogExtraScore: "",
        // blogScore: "",
        // liveExtraScore: "",
        // liveScore: "",
        // videoPictureExtraScore: "",
        // videoPictureScore: ""
        // editorNum: 123,
        // blogExtraScore: 3,
        // blogScore: "3",
        // liveExtraScore: 1,
        // liveScore: "1",
        // videoPictureExtraScore: 2,
        // videoPictureScore: "2",
        // editorDefineMark: 1,
        // editorMark: "1",
        // liveReporter: "1",
        // pictureReporter: "1",
        // videoCut: "1",
        // videoShoot: "1",
        // wordReporter: "1",
        // editorRadio: "1",
        // liveDefineMark: 3,
        // liveRadio: "1",
        // pictureDefineMark: 4,
        // pictureRadio: "1",
        // videoCutDefineMark: 6,
        // videoDefineMark: 5,
        // videoRadio: "1",
        // vodeoCutRadio: "1",
        // wordDefineMark: "122",
        // wordRadio: "1",
        // wordselect: ["选项1"]
      },
      showButton: false,
      markFormSettings: [
        // {
        //   items: [
        //     {
        //       label: "编辑打分",
        //       name: "editorMark",
        //       defineScoreName: "editorDefineMark",
        //       selectName: "editorselect",
        //       radioName: "editorRadio",
        //       type: "slot",
        //       radioList: [
        //         {
        //           label: "1",
        //           value: "深度稿"
        //         },
        //         {
        //           label: "2",
        //           value: "整合稿"
        //         },
        //         {
        //           label: "3",
        //           value: "记者稿"
        //         },
        //         {
        //           label: "4",
        //           value: "外稿"
        //         },
        //         {
        //           label: "5",
        //           value: "直播"
        //         }
        //       ]
        //     },
        //     {
        //       label: "文字记者",
        //       name: "wordReporter",
        //       type: "slot",
        //       defineScoreName: "wordDefineMark",
        //       selectName: "wordselect",
        //       radioName: "wordRadio",
        //       reporterLists: [
        //         {
        //           value: "选项1",
        //           label: "黄金糕"
        //         },
        //         {
        //           value: "选项2",
        //           label: "双皮奶"
        //         }
        //       ],
        //       radioList: [
        //         {
        //           label: "1",
        //           value: "特稿"
        //         },
        //         {
        //           label: "2",
        //           value: "重点稿"
        //         },
        //         {
        //           label: "3",
        //           value: "现场稿"
        //         },
        //         {
        //           label: "4",
        //           value: "一般稿"
        //         },
        //         {
        //           label: "5",
        //           value: "通稿"
        //         }
        //       ]
        //     },
        //     {
        //       label: "直播记者",
        //       name: "liveReporter",
        //       type: "slot",
        //       defineScoreName: "liveDefineMark",
        //       selectName: "liveselect",
        //       radioName: "liveRadio",
        //       reporterLists: [
        //         {
        //           value: "选项1",
        //           label: "黄金糕"
        //         },
        //         {
        //           value: "选项2",
        //           label: "双皮奶"
        //         }
        //       ],
        //       radioList: [
        //         {
        //           label: "1",
        //           value: "2小时内"
        //         },
        //         {
        //           label: "2",
        //           value: "2小时外"
        //         }
        //       ]
        //     },
        //     {
        //       label: "图片记者",
        //       name: "pictureReporter",
        //       type: "slot",
        //       defineScoreName: "pictureDefineMark",
        //       selectName: "pictureselect",
        //       radioName: "pictureRadio",
        //       reporterLists: [
        //         {
        //           value: "选项1",
        //           label: "黄金糕"
        //         },
        //         {
        //           value: "选项2",
        //           label: "双皮奶"
        //         }
        //       ],
        //       radioList: [
        //         {
        //           label: "1",
        //           value: "单图"
        //         },
        //         {
        //           label: "2",
        //           value: "多图"
        //         },
        //         {
        //           label: "3",
        //           value: "图集"
        //         }
        //       ]
        //     },
        //     {
        //       label: "视频拍摄",
        //       name: "videoShoot",
        //       type: "slot",
        //       defineScoreName: "videoDefineMark",
        //       selectName: "videoselect",
        //       radioName: "videoRadio",
        //       reporterLists: [
        //         {
        //           value: "选项1",
        //           label: "黄金糕"
        //         },
        //         {
        //           value: "选项2",
        //           label: "双皮奶"
        //         }
        //       ],
        //       radioList: [
        //         {
        //           label: "1",
        //           value: "精品"
        //         },
        //         {
        //           label: "2",
        //           value: "一般"
        //         },
        //         {
        //           label: "3",
        //           value: "及格"
        //         }
        //       ]
        //     },
        //     {
        //       label: "视频剪辑",
        //       name: "videoCut",
        //       type: "slot",
        //       defineScoreName: "videoCutDefineMark",
        //       selectName: "videoCutselect",
        //       radioName: "vodeoCutRadio",
        //       reporterLists: [
        //         {
        //           value: "选项1",
        //           label: "黄金糕"
        //         },
        //         {
        //           value: "选项2",
        //           label: "双皮奶"
        //         }
        //       ],
        //       radioList: [
        //         {
        //           label: "1",
        //           value: "创意"
        //         },
        //         {
        //           label: "2",
        //           value: "普通"
        //         },
        //         {
        //           label: "3",
        //           value: "及格"
        //         }
        //       ]
        //     }
        //   ]
        // }
      ]
      // showCheck: true
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        // 考核打分
        if (this.scorePro.authorityType === "checkScore") {
          // this.getMarkScore();
          this.getMarkJson();
          // 稿件打分
        } else if (this.scorePro.authorityType === "articleScore") {
          this.getManuscriptScore();
        }
      }
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.formData = {
    //     editorNum: 123,
    //     blogExtraScore: 3,
    //     blogScore: "3",
    //     liveExtraScore: 1,
    //     liveScore: "1",
    //     videoPictureExtraScore: 2,
    //     videoPictureScore: "2",
    //     editorDefineMark: 1,
    //     editorMark: "1",
    //     liveReporter: "1",
    //     pictureReporter: "1",
    //     videoCut: "1",
    //     videoShoot: "1",
    //     wordReporter: "1",
    //     editorRadio: "1",
    //     liveDefineMark: 3,
    //     liveRadio: "1",
    //     pictureDefineMark: 4,
    //     pictureRadio: "1",
    //     videoCutDefineMark: 6,
    //     videoDefineMark: 5,
    //     videoRadio: "1",
    //     vodeoCutRadio: "1",
    //     wordDefineMark: "122",
    //     wordRadio: "1",
    //     wordselect: ["选项1"]
    //   };
    // });
  },
  methods: {
    getMarkJson() {
      console.log(3333);
      return new Promise((resolve, reject) => {
        getMarkJson(this.scorePro.articleId)
          .then(response => {
            // let dataOrigin = response.data.result.markFormSettings;

            this.markFormSettings = response.data.result.markFormSettings;
            this.markFormSettings[0].items.forEach(ele => {
              ele.reporterName = `${ele.name}-reporter`;
              ele.scoreName = `${ele.name}-score`;
              ele.defineName = `${ele.name}-define`;
            });
            console.log(this.markFormSettings, "6666");
            // this.markFormSettings[0].items = dataOrigin.forEach((ele) => {
            //   ele.
            // })
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getManuscriptScore() {
      return new Promise((resolve, reject) => {
        getManuscriptScore(this.scorePro.articleId)
          .then(response => {
            this.formData = response.data.result;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    postManuscriptScore(data) {
      return new Promise((resolve, reject) => {
        postManuscriptScore(data)
          .then(response => {
            this.$message.success("打分成功");
            this.$emit("update:dialogVisible", false);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    postMarkScore(data) {
      return new Promise((resolve, reject) => {
        postMarkScore(data)
          .then(response => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // getMarkScore() {
    //   return new Promise((resolve, reject) => {
    //     getMarkScore(this.scorePro.articleId)
    //       .then(response => {
    //         resolve();
    //       })
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // },
    clearRadio(name) {
      this.$refs.mark.formModel[name] = null;
    },
    save() {
      //console.log(this.$refs.dxMark.$refs.vForm.formModel, "dxMark");
      console.log(this.$refs.dxMark.$refs.vForm.formModel, "checkMark");
      // this.formData.editorNum = 666;
      // this.$refs.mark.formModel.editorDefineMark = 666;
      // 考核打分
      console.log(this.scorePro.authorityType, "this.scorePro.authorityType");
      if (this.scorePro.authorityType === "articleScore") {
        let resData = Object.assign(
          {},
          this.$refs.dxMark.$refs.vForm.formModel,
          { articleId: this.scorePro.articleId }
        );
        this.postManuscriptScore(resData);
      } else {
        // 稿件打分
      }
    },
    handleClose() {
      this.$emit("update:dialogVisible", false);
    }
  }
};
</script>
<style lang="scss">
.dialog-mark-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #ebeef5;
  }
  .input-score {
    display: inline-block;
    margin-left: 30px;
  }
  .el-input-number--mini {
    width: 50px;
  }
  .el-input-number {
    .el-input--mini {
      .el-input__inner {
        border-top: none;
        border-left: none;
        border-right: none;
        border-radius: 0;
      }
    }
  }
  .clearRadio {
    color: #f56c6c;
    cursor: pointer;
    margin-left: 10px;
  }
}
.poperclass {
  min-width: 70px;
  line-height: 1;
  padding: 8px 10px;
  font-size: 12px;
}
</style>