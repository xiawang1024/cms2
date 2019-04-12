<template>
  <div>
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText"/>
    <el-tree
      ref="tree"
      :data="treeData"
      show-checkbox
      node-key="id"
      :default-checked-keys="defaultCheck"
      :check-on-click-node="true"
      :filter-node-method="filterNode"
      :props="defaultProps"
      @check-change="checkChange"/>
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
      defaultCheck: [],
      filterText: ''
    }
  },
  computed: {
    // getChecked() {
    //   console.log(this.$refs.tree, '$refs')
    //   return this.$refs.tree.getCheckedNodes
    // },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    dialogVisible(val) {
      if(val) {
        // this.defaultCheck = []
        if(this.$refs.tree) {
          this.$refs.tree.setCheckedKeys([])
        }
        this.getUserAccess(this.userInfor.userId)
      }
    },

  },
  methods: {
    checkChange(val) {
      this.$emit('getChoosed', this.$refs.tree.getCheckedNodes())
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
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