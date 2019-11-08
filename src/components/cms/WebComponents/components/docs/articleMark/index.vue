<template>
  <el-dialog
    :title="showCheck?'考核打': '大象号稿件打分'"
    class="dialog-mark-dialog"
    :visible.sync="dialogVisible"
    width="710px"
    :before-close="handleClose"
  >
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
    <check-mark ref="checkMark" :form-data="formData" v-if="showCheck" />
    <dx-mark ref="dxMark" :form-data="formData" v-if="!showCheck" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)" size="mini">取 消</el-button>
      <el-button type="primary" size="mini" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import dxMark from "./components/dxMark";
import checkMark from "./components/checkMark";
export default {
  components: {
    dxMark,
    checkMark
  },
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      formData: {
        editorNum: 123,
        blogExtraScore: 3,
        blogScore: "3",
        liveExtraScore: 1,
        liveScore: "1",
        videoPictureExtraScore: 2,
        videoPictureScore: "2",

        editorDefineMark: 1,
        editorMark: "1",
        liveReporter: "1",
        pictureReporter: "1",
        videoCut: "1",
        videoShoot: "1",
        wordReporter: "1",
        editorRadio: "1",
        liveDefineMark: 3,
        liveRadio: "1",
        pictureDefineMark: 4,
        pictureRadio: "1",
        videoCutDefineMark: 6,
        videoDefineMark: 5,
        videoRadio: "1",
        vodeoCutRadio: "1",
        wordDefineMark: "122",
        wordRadio: "1",
        wordselect: ["选项1"]
      },
      defineText: ["选中且禁用", "复选框 A"],
      editorNum: 11,
      showButton: false,
      dxFromSettings: [
        {
          items: [{}]
        }
      ],
      showCheck: true
    };
  },
  watch: {
    dialogVisible(val) {
      console.log(val);
    }
  },
  mounted() {
    this.formData.editorNum = 1234556;
  },
  methods: {
    clearRadio(name) {
      this.$refs.mark.formModel[name] = null;
    },
    save() {
      //console.log(this.$refs.dxMark.$refs.vForm.formModel, "dxMark");
      console.log(this.$refs.checkMark.$refs.vForm.formModel, "checkMark");
      // this.formData.editorNum = 666;
      // this.$refs.mark.formModel.editorDefineMark = 666;
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