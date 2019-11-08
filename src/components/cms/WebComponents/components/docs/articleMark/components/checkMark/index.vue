<template>
  <div ckass="check-mark">
    <v-form
      ref="vForm"
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
  </div>
</template>
<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      showButton: false,
      markFormSettings: [
        {
          items: [
            {
              label: "编辑打分",
              name: "editorMark",
              defineScoreName: "editorDefineMark",
              selectName: "editorselect",
              radioName: "editorRadio",
              type: "slot",
              radioList: [
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
              ]
            },
            {
              label: "文字记者",
              name: "wordReporter",
              type: "slot",
              defineScoreName: "wordDefineMark",
              selectName: "wordselect",
              radioName: "wordRadio",
              reporterLists: [
                {
                  value: "选项1",
                  label: "黄金糕"
                },
                {
                  value: "选项2",
                  label: "双皮奶"
                }
              ],
              radioList: [
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
              ]
            },
            {
              label: "直播记者",
              name: "liveReporter",
              type: "slot",
              defineScoreName: "liveDefineMark",
              selectName: "liveselect",
              radioName: "liveRadio",
              reporterLists: [
                {
                  value: "选项1",
                  label: "黄金糕"
                },
                {
                  value: "选项2",
                  label: "双皮奶"
                }
              ],
              radioList: [
                {
                  label: "1",
                  value: "2小时内"
                },
                {
                  label: "2",
                  value: "2小时外"
                }
              ]
            },
            {
              label: "图片记者",
              name: "pictureReporter",
              type: "slot",
              defineScoreName: "pictureDefineMark",
              selectName: "pictureselect",
              radioName: "pictureRadio",
              reporterLists: [
                {
                  value: "选项1",
                  label: "黄金糕"
                },
                {
                  value: "选项2",
                  label: "双皮奶"
                }
              ],
              radioList: [
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
              ]
            },
            {
              label: "视频拍摄",
              name: "videoShoot",
              type: "slot",
              defineScoreName: "videoDefineMark",
              selectName: "videoselect",
              radioName: "videoRadio",
              reporterLists: [
                {
                  value: "选项1",
                  label: "黄金糕"
                },
                {
                  value: "选项2",
                  label: "双皮奶"
                }
              ],
              radioList: [
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
              ]
            },
            {
              label: "视频剪辑",
              name: "videoCut",
              type: "slot",
              defineScoreName: "videoCutDefineMark",
              selectName: "videoCutselect",
              radioName: "vodeoCutRadio",
              reporterLists: [
                {
                  value: "选项1",
                  label: "黄金糕"
                },
                {
                  value: "选项2",
                  label: "双皮奶"
                }
              ],
              radioList: [
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
              ]
            }
          ]
        }
      ]
    };
  },
  watch: {
    formData: {
      immediate: true,
      handler(val) {
        console.log(val, "val");
      }
    }
  },
  mounted() {
    console.log("vv");
    this.$nextTick(() => {
      this.$refs.vForm.formModel = this.formData;
    });
    // this.$refs.vForm.formModel = this.formData;
  },
  methods: {
    clearRadio(name) {
      this.$refs.vForm.formModel[name] = null;
    }
  }
};
</script>