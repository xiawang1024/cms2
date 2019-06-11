<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>