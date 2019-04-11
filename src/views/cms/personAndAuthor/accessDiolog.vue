<template>
  <div>
    <el-dialog
      title="权限设置"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-tree
        ref="tree"
        :data="treeData"
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultCheck"
        :check-on-click-node="true"
        :props="defaultProps"/>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="$emit('update:dialogVisible', false)">取消</el-button>
        <el-button type="primary" size="small" @click="confirmSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { setDataAccess, getDataAccess } from '@/api/cms/dataAccess'
export default {
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    },
    treeData: {
      default: ()=> {
        return []
      },
      type: Array
    },
    userInfor: {
      default: ()=> {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultCheck: []
    }
  },
  watch: {
    dialogVisible(val) {
      if(val) {
        // this.defaultCheck = []
        if(this.$refs.tree) {
          this.$refs.tree.setCheckedKeys([])
        }
        this.getUserAccess(this.userInfor.userId)
      }
    }
  },
  methods: {
    getUserAccess(userId) {
      return new Promise((resolve, reject) => {
        getDataAccess(userId)
          .then((response) => {
            // this.$refs.tree.setCheckedKeys(['1108265560111714304'])
            // this.$message.success('操作成功')
            // this.$emit('update:dialogVisible', false)
            // this.$emit('handelSuccess')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    handleClose() {
      this.$emit('update:dialogVisible', false)
    },
    confirmSave() {
      console.log(this.$refs.tree.getCheckedNodes())
      console.log(this.userInfor)
      let params = {
        userId: this.userInfor.userId,
        channelIdList: this.$refs.tree.getCheckedNodes().map((ele) => {
          return ele.channelId
        })
      }
      return new Promise((resolve, reject) => {
        setDataAccess(params)
          .then((response) => {
            this.$message.success('操作成功')
            this.$emit('update:dialogVisible', false)
            this.$emit('handelSuccess')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    }
  }
}
</script>