<template>
  <el-dialog
    title="考核打分"
    class="dialog-mark-dialog"
    :visible.sync="dialogVisible"
    width="675px"
    :before-close="handleClose"
  >
    <v-form
      ref="mark"
      :form-settings="markSettings"
      :form-data="formData"
      label-width="80px"
      :show-button="showButton"
    >
      <!-- 编辑打分 -->
      <template slot="editorMark" slot-scope="scope">
        <el-radio-group v-model="scope.model.editorMarkRadio">
          <el-radio
            v-for="(ele,index) in radioSetting.editorRadio"
            :key="index"
            :label="ele.label"
          >{{ ele.value }}</el-radio>
        </el-radio-group>
        <div class="input-score">
          <i class="el-icon-edit" style="color:#409EFF" />
          <el-input-number v-model="editorNum" size="mini" :controls="false" />
          <span>分</span>
        </div>
      </template>
      <!-- 文字记者打分 -->
      <template slot="wordReporter" slot-scope="scope">
        <input-score v-model="scope.model.wordReporterList"/>
        <!-- <el-select v-model="scope.model.wordReporterList" multiple placeholder="请选择">
          <el-option
            v-for="item in radioSetting.wordReporter.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-radio-group v-model="scope.model.wordReporterRadio">
          <el-radio
            v-for="(ele,index) in radioSetting.wordRadio"
            :key="index"
            :label="ele.label"
          >{{ ele.value }}</el-radio>
        </el-radio-group>
        <div class="input-score">
          <i class="el-icon-edit" style="color:#409EFF" />
          <el-input-number v-model="editorNum" size="mini" :controls="false" />
          <span>分</span>
        </div>-->
      </template>
      <!-- 直播记者打分 -->
      <template slot="liveReporter" slot-scope="scope">
        <el-select v-model="scope.model.liveReporterList" multiple placeholder="请选择">
          <el-option
            v-for="item in radioSetting.liveReporter.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-radio-group v-model="scope.model.liveReporterRadio">
          <el-radio
            v-for="(ele,index) in radioSetting.liveRadio"
            :key="index"
            :label="ele.label"
          >{{ ele.value }}</el-radio>
        </el-radio-group>
        <div class="input-score">
          <i class="el-icon-edit" style="color:#409EFF" />
          <el-input-number v-model="editorNum" size="mini" :controls="false" />
          <span>分</span>
        </div>
      </template>
      <!-- 图片记者打分 -->
      <template slot="pictureReporter" slot-scope="scope">
        <el-select v-model="scope.model.pictureReporterList" multiple placeholder="请选择">
          <el-option
            v-for="item in radioSetting.pictureReporter.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-radio-group v-model="scope.model.pictureReporterRadio">
          <el-radio
            v-for="(ele,index) in radioSetting.pictureRadio"
            :key="index"
            :label="ele.label"
          >{{ ele.value }}</el-radio>
        </el-radio-group>
        <div class="input-score">
          <i class="el-icon-edit" style="color:#409EFF" />
          <el-input-number v-model="editorNum" size="mini" :controls="false" />
          <span>分</span>
        </div>
      </template>
      <!-- 视频拍摄打分 -->
      <template slot="videoShoot" slot-scope="scope">
        <el-select v-model="scope.model.videoShootReporterList" multiple placeholder="请选择">
          <el-option
            v-for="item in radioSetting.videoShootReporter.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-radio-group v-model="scope.model.videoShootRadio">
          <el-radio
            v-for="(ele,index) in radioSetting.videoShootRadio"
            :key="index"
            :label="ele.label"
          >{{ ele.value }}</el-radio>
        </el-radio-group>
        <div class="input-score">
          <i class="el-icon-edit" style="color:#409EFF" />
          <el-input-number v-model="editorNum" size="mini" :controls="false" />
          <span>分</span>
        </div>
      </template>
      <!-- 视频剪辑打分 -->
      <template slot="videoCut" slot-scope="scope">
        <el-select v-model="scope.model.videoCutReporterList" multiple placeholder="请选择">
          <el-option
            v-for="item in radioSetting.videoCutReporter.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-radio-group v-model="scope.model.videoCutRadio">
          <el-radio
            v-for="(ele,index) in radioSetting.videoCutRadio"
            :key="index"
            :label="ele.label"
          >{{ ele.value }}</el-radio>
        </el-radio-group>
        <div class="input-score">
          <i class="el-icon-edit" style="color:#409EFF" />
          <el-input-number v-model="editorNum" size="mini" :controls="false" />
          <span>分</span>
        </div>
      </template>
    </v-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
// import { checkHandel } from "@/api/cms/articleCheck";
import inputScore from "./inputScore";
export default {
  components: {
    inputScore
  },
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    }
    // rowData: {
    //   default: () => {
    //     return {};
    //   },
    //   type: Object
    // }
  },
  data() {
    return {
      formData: {},
      defineText: ["选中且禁用", "复选框 A"],
      editorNum: 0,
      markSettings: [
        {
          items: [
            {
              label: "编辑打分",
              name: "editorMark",
              type: "slot",
              valueType: "string",
              placeholder: "请输入关键词"
            },
            {
              label: "文字记者",
              name: "wordReporter",
              type: "slot",
              placeholder: "请选择"
            },
            {
              label: "直播记者",
              name: "liveReporter",
              type: "slot"
            },
            {
              label: "图片记者",
              name: "pictureReporter",
              type: "slot"
            },
            {
              label: "视频拍摄",
              name: "videoShoot",
              type: "slot"
            },
            {
              label: "视频剪辑",
              name: "videoCut",
              type: "slot"
            }
          ]
        }
      ],
      radioSetting: {
        editorRadio: [
          {
            label: "1",
            value: "深度稿"
          },
          {
            label: "2",
            value: "整合稿"
          },
          {
            label: "3",
            value: "记者稿"
          },
          {
            label: "4",
            value: "外稿"
          },
          {
            label: "5",
            value: "直播"
          }
        ],
        liveRadio: [
          {
            label: "1",
            value: "2小时内"
          },
          {
            label: "2",
            value: "2小时外"
          }
        ],
        wordRadio: [
          {
            label: "1",
            value: "特稿"
          },
          {
            label: "2",
            value: "重点稿"
          },
          {
            label: "3",
            value: "现场稿"
          },
          {
            label: "4",
            value: "一般稿"
          },
          {
            label: "5",
            value: "通稿"
          }
        ],
        pictureRadio: [
          {
            label: "1",
            value: "单图"
          },
          {
            label: "2",
            value: "多图"
          },
          {
            label: "3",
            value: "图集"
          }
        ],
        videoShootRadio: [
          {
            label: "1",
            value: "精品"
          },
          {
            label: "2",
            value: "一般"
          },
          {
            label: "3",
            value: "及格"
          }
        ],
        videoCutRadio: [
          {
            label: "1",
            value: "创意"
          },
          {
            label: "2",
            value: "普通"
          },
          {
            label: "3",
            value: "及格"
          }
        ],
        wordReporter: {
          options: [
            {
              value: "选项1",
              label: "黄金糕"
            },
            {
              value: "选项2",
              label: "双皮奶"
            },
            {
              value: "选项3",
              label: "蚵仔煎"
            },
            {
              value: "选项4",
              label: "龙须面"
            },
            {
              value: "选项5",
              label: "北京烤鸭"
            }
          ]
        },
        liveReporter: {
          options: [
            {
              value: "选项1",
              label: "黄金糕"
            },
            {
              value: "选项2",
              label: "双皮奶"
            },
            {
              value: "选项3",
              label: "蚵仔煎"
            },
            {
              value: "选项4",
              label: "龙须面"
            },
            {
              value: "选项5",
              label: "北京烤鸭"
            }
          ]
        },
        pictureReporter: {
          options: [
            {
              value: "选项1",
              label: "黄金糕"
            },
            {
              value: "选项2",
              label: "双皮奶"
            },
            {
              value: "选项3",
              label: "蚵仔煎"
            },
            {
              value: "选项4",
              label: "龙须面"
            },
            {
              value: "选项5",
              label: "北京烤鸭"
            }
          ]
        },
        videoShootReporter: {
          options: [
            {
              value: "选项1",
              label: "黄金糕"
            },
            {
              value: "选项2",
              label: "双皮奶"
            },
            {
              value: "选项3",
              label: "蚵仔煎"
            },
            {
              value: "选项4",
              label: "龙须面"
            },
            {
              value: "选项5",
              label: "北京烤鸭"
            }
          ]
        },
        videoCutReporter: {
          options: [
            {
              value: "选项1",
              label: "黄金糕"
            },
            {
              value: "选项2",
              label: "双皮奶"
            },
            {
              value: "选项3",
              label: "蚵仔煎"
            },
            {
              value: "选项4",
              label: "龙须面"
            },
            {
              value: "选项5",
              label: "北京烤鸭"
            }
          ]
        }
      },
      showButton: false
    };
  },
  watch: {
    // dialogVisible(val) {
    //   if (val) {
    //     this.form.auditOpinion = "";
    //   }
    // }
  },
  methods: {
    save() {
      console.log(this.$refs.mark.formModel);
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
}
</style>