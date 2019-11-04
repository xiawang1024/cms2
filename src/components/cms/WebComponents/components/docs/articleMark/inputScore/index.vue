<template>
  <div class="mark-component">
    <!-- <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>-->
    <!-- <el-input v-bind:value="value" v-on:input="inputChange" /> -->
    <!-- <input type="text" v-bind:value="checked" v-on:input="inputChange" /> -->
    <!-- <el-input v-model="value"></el-input> -->
    <!-- <el-radio-group v-bind:checked="checked" v-on:input="inputChange">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>-->
    <!-- <el-radio :label="3" v-bind:checked="checked" v-on:input="inputChange">备选项</el-radio>
    <el-radio :label="6" v-bind:checked="checked" v-on:input="inputChange">备选项</el-radio>
    <el-radio :label="9" v-bind:checked="checked" v-on:input="inputChange">备选项</el-radio>-->
    <!-- <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    />-->

    <!-- <el-checkbox type="checkbox" v-bind:checked="checked" v-on:change="$emit('change', $event)">备选项</el-checkbox> -->
    <!-- <el-checkbox-group v-bind:value="checked" v-on:input="checkChange" ref="checkBox">
      <el-checkbox label="复选框 A"></el-checkbox>
      <el-checkbox label="复选框 B"></el-checkbox>
      <el-checkbox label="复选框 C"></el-checkbox>
      <el-checkbox label="禁用" disabled></el-checkbox>
      <el-checkbox label="选中且禁用" disabled></el-checkbox>
    </el-checkbox-group>-->
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
  .mark-component {
    width: 100%;
  }
}
</style>