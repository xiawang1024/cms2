<template>
  <div class="dx-mark">
    <v-form
      ref="vForm"
      :form-settings="dxFormSettings"
      label-width="100px"
      :show-button="showButton"
    >
      <template
        v-for="(ele, index) in dxFormSettings[0].items"
        :slot="ele.name"
        slot-scope="scope"
      >
        <el-radio-group
          v-model="formDataCopy[index].score"
          :key="ele.radioName"
        >
          <el-radio
            v-for="(item, index) in ele.radioList"
            :key="index"
            :label="item.label"
            @change="radioChange(index, item.value)"
          >
            <el-popover
              popper-class="poperclass-title-dx"
              placement="top-start"
              title
              width="10"
              trigger="hover"
              :key="index"
            >
              <div>{{ item.label }}分</div>
              <span slot="reference">{{ item.value }}</span>
            </el-popover>
          </el-radio>
        </el-radio-group>

        <el-popover
          popper-class="poperclass-empty-dx"
          placement="top-start"
          title
          width="10"
          trigger="hover"
          content="清空单选"
          :key="index"
        >
          <i
            slot="reference"
            class="el-icon-delete clearRadio"
            @click="clearRadio(index)"
            v-if="ele.label"
          />
        </el-popover>
        <div class="input-score" :key="ele.defineScoreName" v-if="ele.label">
          <i class="el-icon-edit" style="color:#409EFF" />
          <el-input-number
            v-model="formDataCopy[index].extraScore"
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
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      formDataCopy: [],
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
                  label: 100,
                  value: "A"
                },
                {
                  label: 40,
                  value: "B"
                },
                {
                  label: 20,
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
                  label: 20,
                  value: "A"
                },
                {
                  label: 10,
                  value: "B"
                },
                {
                  label: 5,
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
                  label: 10,
                  value: "A"
                },
                {
                  label: 6,
                  value: "B"
                },
                {
                  label: 4,
                  value: "C"
                }
              ]
            }
            // {
            //   label: "",
            //   name: "liveExtraScore",
            //   hidden: true
            // },
            // {
            //   label: "",
            //   name: "videoPictureExtraScore",
            //   hidden: true
            // },
            // {
            //   label: "",
            //   name: "blogExtraScore",
            //   hidden: true
            // }
          ]
        }
      ]
    };
  },
  watch: {
    formData: {
      immediate: true,
      handler(val) {
        this.formDataCopy = val;
        if (val && !val.length) {
          this.formDataCopy = this.dxFormSettings[0].items.map(ele => {
            return {
              score: "",
              extraScore: 0,
              name: ele.name,
              labelName: "",
              itemName: ele.label,
              scoreType: "1"
            };
          });
        }
      }
    }
  },
  mounted() {},
  methods: {
    clearRadio(index) {
      this.formDataCopy[index].score = null;
    },
    radioChange(index, label) {
      this.formDataCopy[index].labelName = label;
    }
  }
};
</script>
<style lang="scss">
.poperclass-empty-dx {
  min-width: 70px;
  line-height: 1;
  padding: 8px 10px;
  font-size: 12px;
}
.poperclass-title-dx {
  min-width: 55px;
  line-height: 1;
  padding: 8px 10px;
  font-size: 12px;
}
</style>
