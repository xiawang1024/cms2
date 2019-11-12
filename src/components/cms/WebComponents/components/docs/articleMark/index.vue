<template>
  <el-dialog
    :title="scorePro.authorityType === 'articleScore'?'大象号稿件打分': '考核打分'"
    class="dialog-mark-dialog"
    :visible.sync="dialogVisible"
    :width="scorePro.authorityType === 'articleScore'?'550px': '710px'"
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
          v-model="markFormData[index].author"
          multiple
          placeholder="请选择"
          v-if="ele.reporterLists && ele.reporterLists.length"
          :key="ele.reporterName"
        >
          <el-option
            v-for="item in ele.reporterLists"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-radio-group v-model="markFormData[index].score" :key="ele.scoreName">
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
        <div class="input-score" :key="ele.defineName">
          <i class="el-icon-edit" style="color:#409EFF" />
          <el-input-number v-model="markFormData[index].extraScore" size="mini" :controls="false" />
          <span>分</span>
        </div>
      </template>
    </v-form>
    <dx-mark ref="dxMark" :form-data="formData" v-if="scorePro.authorityType === 'articleScore'" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import dxMark from "./components/dxMark";
import {
  getManuscriptScore,
  getMarkScore,
  getMarkJson,
  postManuscriptScore,
  postMarkScore
} from "@/api/cms/article";
export default {
  components: {
    dxMark
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
      markFormData: [],
      formData: {},
      showButton: false,
      markFormSettings: []
      // 数据模板
      // formModel: [
      //   {
      //     items: [
      //       {
      //         label: "文字记者",
      //         name: "wordReporter",
      //         type: "slot",
      //         reporterLists: [
      //           {
      //             value: "选项2",
      //             label: "双皮奶"
      //           }
      //         ],
      //         radioList: [
      //           {
      //             label: "1",
      //             value: "特稿"
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // ],
      // showCheck: true,
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
  mounted() {},
  methods: {
    getMarkJson() {
      // this.markFormData = [];
      return new Promise((resolve, reject) => {
        getMarkJson()
          .then(async response => {
            this.markFormSettings = response.data.result.markFormSettings;
            this.markFormSettings[0].items.forEach(ele => {
              ele.reporterName = `${ele.name}-reporter`;
              ele.scoreName = `${ele.name}-score`;
              ele.defineName = `${ele.name}-define`;
              this.markFormData.push({
                score: "",
                extraScore: 0,
                author: [],
                name: ele.name
              });
            });
            const markScore = await this.getMarkScore();
            // this.markFormData = markScore.data.result.item;
            console.log(
              markScore.data.result.item,
              "markScore.data.result.item"
            );
            this.markFormData = [
              { score: "1", extraScore: 1, author: [], name: "editorMark" },
              {
                score: "2",
                extraScore: 2,
                author: ["zhaojinpeng"],
                name: "wordReporter"
              },
              {
                score: "2",
                extraScore: 3,
                author: ["hnr1"],
                name: "liveReporter"
              },
              {
                score: "2",
                extraScore: 4,
                author: ["liukai"],
                name: "pictureReporter"
              },
              {
                score: "3",
                extraScore: 5,
                author: ["liukai"],
                name: "videoShoot"
              },
              {
                score: "3",
                extraScore: 6,
                author: ["liukai"],
                name: "videoCut"
              }
            ];
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    getMarkScore() {
      return new Promise((resolve, reject) => {
        getMarkScore(this.scorePro.articleId)
          .then(response => {
            resolve(response);
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
    // 考核打分
    postMarkScore(data) {
      return new Promise((resolve, reject) => {
        postMarkScore(data)
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
    clearRadio(name) {
      this.$refs.mark.formModel[name] = null;
    },
    save() {
      if (this.scorePro.authorityType === "articleScore") {
        let resData = Object.assign(
          {},
          this.$refs.dxMark.$refs.vForm.formModel,
          { articleId: this.scorePro.articleId }
        );
        this.postManuscriptScore(resData);
      } else {
        // 考核打分
        let markData = {
          articleId: this.scorePro.articleId,
          item: this.markFormData
        };
        console.log(this.markFormData);
        this.postMarkScore(markData);
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
  .el-dialog__body {
    min-height: 192px;
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