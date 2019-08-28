<template>
  <div>
    <el-dialog
      title="来源权限设置"
      :visible.sync="dialogVisible"
      width="50%"
      :append-to-body = "true"
      :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="$emit('update:dialogVisible', false)">取消</el-button>
        <el-button type="primary" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
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
