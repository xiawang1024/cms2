<template>
  <div />
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    filterMethod(val) {
      console.log(val, "val11111");
      let filterSource = [];
      this.sourceList.forEach(ele => {
        if (ele.combinName.indexOf(val) !== -1) {
          filterSource.push(ele);
        }
      });
      this.filterSourceList = filterSource;
    }
  }
};
</script>