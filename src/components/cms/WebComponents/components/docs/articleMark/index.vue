<template>
  <el-dialog
    :title="
      scorePro.scoreType === 'DXNewsCheckScore' ? '考核' : '大象号稿件打分'
    "
    class="dialog-mark-dialog"
    :visible.sync="dialogVisible"
    :width="scorePro.scoreType === 'DXNewsCheckScore' ? '710px' : '550px'"
    :before-close="handleClose"
  >
    <v-form
      ref="vForm"
      :form-settings="markFormSettings"
      :form-data="formData"
      label-width="80px"
      :show-button="showButton"
      v-if="scorePro.scoreType === 'DXNewsCheckScore' && markFormSettings[0]"
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
          v-if="ele.reporterList && ele.reporterList.length"
          :key="ele.reporterName"
        >
          <el-option
            v-for="item in ele.reporterList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-radio-group v-model="markFormData[index].score" :key="ele.scoreName">
          <el-radio
            v-for="item in ele.radioList"
            :key="item.value"
            :label="item.value"
            @change="radioChange(index, item.label)"
          >{{ item.label }}</el-radio>
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
          <i slot="reference" class="el-icon-delete clearRadio" @click="clearRadio(index)" />
        </el-popover>
        <div class="input-score" :key="ele.defineName">
          <i class="el-icon-edit" style="color:#409EFF" />
          <el-input-number v-model="markFormData[index].extraScore" size="mini" :controls="false" />
          <span>分</span>
        </div>
      </template>
    </v-form>
    <dx-mark
      ref="dxMark"
      :form-data="articleFormData"
      v-if="scorePro.scoreType === 'DXNewsArticleScore'"
    />
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
      articleFormData: [],
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
        if (this.scorePro.scoreType === "DXNewsCheckScore") {
          console.log("考核");
          this.getMarkJson();
          // 稿件打分
        } else if (this.scorePro.scoreType === "DXNewsArticleScore") {
          console.log("稿件");
          this.getManuscriptScore();
        }
      }
    }
  },
  mounted() {},
  methods: {
    radioChange(index, label) {
      this.markFormData[index].labelName = label;
    },
    getMarkJson() {
      return new Promise((resolve, reject) => {
        getMarkJson()
          .then(async response => {
            this.markFormSettings = response.data.result.markFormSettings;
            this.markFormSettings[0].items.forEach(ele => {
              // 绑定for循环key值， 无实际意义
              ele.reporterName = `${ele.name}-reporter`;
              ele.scoreName = `${ele.name}-score`;
              ele.defineName = `${ele.name}-define`;
              this.markFormData.push({
                score: "",
                extraScore: 0,
                author: [],
                name: ele.name,
                labelName: "",
                itemName: ele.label,
                scoreType: 0
              });
            });
            const markScore = await this.getMarkScore();
            if (
              markScore.data.result.item &&
              markScore.data.result.item.length
            ) {
              this.markFormData = markScore.data.result.item;
            }
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
      // this.articleFormData = [
      //   {
      //     extraScore: 10,
      //     itemName: "直播",
      //     labelName: "A",
      //     name: "liveScore",
      //     score: 1,
      //     scoreType: 1
      //   },
      //   {
      //     extraScore: 20,
      //     itemName: "视频、图文",
      //     labelName: "B",
      //     name: "videoPictureScore",
      //     score: 2,
      //     scoreType: 1
      //   },
      //   {
      //     extraScore: 30,
      //     itemName: "播客",
      //     labelName: "C",
      //     name: "blogScore",
      //     score: 3,
      //     scoreType: 1
      //   }
      // ];
      return new Promise((resolve, reject) => {
        getManuscriptScore(this.scorePro.articleId)
          .then(response => {
            this.articleFormData = response.data.result;
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
    clearRadio(index) {
      this.markFormData[index].score = null;
    },
    save() {
      //稿件打分
      if (this.scorePro.scoreType === "DXNewsArticleScore") {
        // console.log(this.$refs.dxMark.formDataCopy, "articleData");
        let resData = Object.assign({}, this.$refs.dxMark.formDataCopy, {
          articleId: this.scorePro.articleId
        });
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
