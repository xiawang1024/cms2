<template>
  <el-form
    ref="form"
    label-width="80px"
    class="form-wrap"
    size="mini"
  >
    <el-form-item
      v-show="viewTypeShow"
      label="视图："
      class="form-item"
    >
      <el-select
        :value="viewTypeList[viewType].label"
        placeholder="请选择"
        @change="selectHandler"
      >
        <el-option
          v-for="item in viewTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { ViewConfig } from './config.js'
export default {
  data() {
    return {
      viewTypeList: ViewConfig
    }
  },
  computed: {
    ...mapGetters(['viewType', 'viewTypeShow'])
  },
  methods: {
    selectHandler(type) {
      this.$store.dispatch('setViewType', type)
    }
  },
  beforeRouteEnter(to, form, next) {
    console.log(to)
  }
}
</script>

<style lang="scss" scoped>
.form-wrap {
  height: 50px;
  .form-item {
    margin-bottom: 0;
    display: inline-block;
  }
}
</style>

