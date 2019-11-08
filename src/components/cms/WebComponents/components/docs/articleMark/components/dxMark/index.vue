<template>
  <div class="dx-mark">
    <v-form
      ref="vForm"
      :form-settings="dxFormSettings"
      :form-data="formData"
      label-width="100px"
      :show-button="showButton"
    >
      <template v-for="(ele, index) in dxFormSettings[0].items" :slot="ele.name" slot-scope="scope">
        <el-radio-group v-model="scope.model[ele.name]" :key="ele.radioName">
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
      formDatas: {},
      showButton: false,
      dxFormSettings: [
        {
          items: [
            {
              label: "直播",
              name: "liveScore",
              defineScoreName: "liveExtraScore",
              type: "slot",
              radioList: [
                {
                  label: "1",
                  value: "A"
                },
                {
                  label: "2",
                  value: "B"
                },
                {
                  label: "3",
                  value: "C"
                }
              ]
            },
            {
              label: "视频、图文",
              name: "videoPictureScore",
              defineScoreName: "videoPictureExtraScore",
              type: "slot",
              radioList: [
                {
                  label: "1",
                  value: "A"
                },
                {
                  label: "2",
                  value: "B"
                },
                {
                  label: "3",
                  value: "C"
                }
              ]
            },
            {
              label: "播客",
              name: "blogScore",
              defineScoreName: "blogExtraScore",
              type: "slot",
              radioList: [
                {
                  label: "1",
                  value: "A"
                },
                {
                  label: "2",
                  value: "B"
                },
                {
                  label: "3",
                  value: "C"
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
        console.log(val, "eee");
      }
    }
  },
  mounted() {
    this.$refs.vForm.formModel = this.formData;
  },
  methods: {
    clearRadio(name) {
      this.$refs.vForm.formModel[name] = null;
    }
  },
};
</script>