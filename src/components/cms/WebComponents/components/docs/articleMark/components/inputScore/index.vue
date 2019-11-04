<template>
  <div class="mark-component">
    <el-select :value="value" @input="checkChange" multiple placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>
<script>
export default {
  // model: {
  //   prop: "value",
  //   event: "change"
  // },

  props: {
    value: {
      type: Array,
      default: () => {
        [];
      }
    }
  },
  data() {
    return {
      // radio: "1",
      test: 3,
      son: [],
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
    };
  },
  methods: {
    checkChange($event) {
      this.$emit("input", $event);
    },
    inputChange($event) {
      // console.log(typeof $event);
      // this.$emit("change", $event);
      console.log(this.$refs.checkBox);
    }
    // radioChange($event) {
    //   console.log($event.target.value, "$event.target.checked");
    //   console.log(this.$event, "$event.");
    //   // $emit("change", this.$event.target.checked);
    // }
  }
};
</script>
<style lang="scss">
.mark-component {
  .el-select {
    width: 100%;
  }
}
</style>