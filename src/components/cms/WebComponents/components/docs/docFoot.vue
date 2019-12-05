<template>
  <div class="doc-foot">
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next,jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  name: 'DocFoot',
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      // currentPage: 1,
      // pageSize: 10
    }
  },
  watch: {
  },
  methods: {
    handleSizeChange(val) {
      // this.pageSize = val
      this.$emit('sizeChange', val)
      this.$emit('update:pageSize', val)
    },
    handleCurrentChange(val) {
      // this.currentPage = val
      this.$emit('pageChange', val)
      this.$emit('update:currentPage', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.doc-foot {
  width: 100%;
  margin-top: 30px;
  padding: 0 30px;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
}
</style>

