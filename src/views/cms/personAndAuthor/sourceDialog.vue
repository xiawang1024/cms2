<template>
  <div class="source-diaolg-permission">
    <el-dialog
      title="来源权限设置"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <div class="pl-24">
        <el-checkbox v-model="allChecked" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      </div>
      <el-tree
        ref="tree"
        :data="treeData"
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultCheck"
        :check-on-click-node="true"
        @check="checked"
        :props="defaultProps"/>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="$emit('update:dialogVisible', false)">取消</el-button>
        <el-button type="primary" size="mini" @click="confirmSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { setSourceAccess, getSourceAccess,setSourceAccessMutip } from '@/api/cms/dataAccess'
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
    },
    multipleSelection: {
      default: ()=> {
        return []
      },
      type: Array
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultCheck: [],
      allChecked: false,
      // 不是全选样式
      isIndeterminate: true
    }
  },
  watch: {
    dialogVisible(val) {
      if(val) {
        // this.defaultCheck = []
        if(this.$refs.tree) {
          this.$refs.tree.setCheckedKeys([])
        }
        if(this.userInfor.userId) {
          this.getSourceAccess(this.userInfor.userId)
        }
        // 初始化全选状态
        this.allChecked = false
        this.isIndeterminate = false
      }
    }
  },
  methods: {
    // 全选
    handleCheckAllChange(val) {
      // console.log(val, 'val')
      let all = this.treeData.map((ele) => {
        return ele.id
      })
      if(val) {
        this.defaultCheck = all
        this.$refs.tree.setCheckedKeys(all)
      } else {
        this.$refs.tree.setCheckedKeys([])
      }
      this.isIndeterminate = false
    },
    // 复选框被点击
    checked(val1, val2) {
      if(val2.checkedKeys.length) {
        if(val2.checkedKeys.length === this.treeData.length) {
          this.isIndeterminate = false
          this.allChecked = true
        } else {
          this.isIndeterminate = true
        }
      } else {
        this.allChecked = false
        this.isIndeterminate = false
      }
    },
    getSourceAccess(userId) {
      return new Promise((resolve, reject) => {
        getSourceAccess(userId)
          .then((response) => {
            this.defaultCheck = response.data.result.articleOriginIdList ? response.data.result.articleOriginIdList : []
            this.isIndeterminate = this.defaultCheck.length ? true : false
            if(this.defaultCheck.length) {
              if(this.defaultCheck.length === this.treeData.length) {
                this.isIndeterminate = false
                this.allChecked = true
              } else {
                this.isIndeterminate = true
              }
            } else {
              this.allChecked = false
              this.isIndeterminate = false
            }
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
      if(this.userInfor.userId) {
        this.singleHandel()
      } else {
        this.multipleHandel()
      }
    },
    // 批量操作
    multipleHandel() {
       let userIdGroup=[];
        this.multipleSelection.map(item=>{
          userIdGroup.push(item.userId)
        })
        let params = {
        userIdList:userIdGroup,
        articleOriginIdList: this.$refs.tree.getCheckedNodes().map((ele) => {
          return ele.id
        })
      }
      return new Promise((resolve, reject) => {
        setSourceAccessMutip(params)
          .then((response) => {
            this.$message.success('操作成功')
            this.$emit('update:dialogVisible', false)
            this.$emit('handelSuccess')
            this.$store.dispatch('GetColumnAll')
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 单独操作
    singleHandel() {
      let params = {
        userId: this.userInfor.userId,
        articleOriginIdList: this.$refs.tree.getCheckedNodes().map((ele) => {
          return ele.id
        })
      }
      return new Promise((resolve, reject) => {
        setSourceAccess(params)
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
<style lang="scss">
  .source-diaolg-permission{
    .pl-24{
      padding-left:24px;
    }
  }
</style>