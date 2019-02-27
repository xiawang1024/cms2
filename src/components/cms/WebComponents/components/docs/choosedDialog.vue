<template>
  <div class="choose-handel-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      title="提示"
      width="30%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer"/>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'DocFoot',
  props: {
    visible: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

