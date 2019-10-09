<template>
  <div>
    <el-dialog
      title="选择/查看"
      :visible.sync="dialogVisible"
      width="50%"
      :append-to-body = "true"
      :before-close="handleClose">
      <el-table
        :data="bindList"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          prop="nickname"
          label="姓名"
        />
        <el-table-column
          prop="registrationId"
          label="注册id"
        />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="$emit('update:dialogVisible', false)">取消</el-button>
        <el-button type="primary" size="mini" @click="save">确 定</el-button>
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
    },
    bindList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      multipleSelection: null
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    save() {
      this.$emit('update:dialogVisible', false)
      this.$emit('sendPeople', this.multipleSelection)
    }
  }
}
</script>
