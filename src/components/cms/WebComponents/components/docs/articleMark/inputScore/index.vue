<template>
  <div @change="radioChange">
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
    <el-input v-model="inputValue"/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "1",
      inputValue: ""
    };
  },
  methods: {
    radioChange($event) {
      console.log($event.target.value, "$event.target.checked");
      console.log(this.$event, "$event.");
      // $emit("change", this.$event.target.checked);
    }
  }
};
</script>