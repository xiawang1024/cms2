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
export default {
  name: 'ColumnTree',
  props: {
    treeData: {
      default: ()=> {
        return []
      },
      type: Array
    },
    tagList: {
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
      filterText: ''
    }
  },
  computed: {
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    tagList(val) {
      this.defaultCheck = []
      if(val.length) {
        val.forEach((ele) => {
          this.defaultCheck.push(ele.id)
        })
      }
    }
  },
  mounted() {
  },
  methods: {
    checkChange(val) {
      this.$emit('getChoosed', this.$refs.tree.getCheckedNodes())
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
}
</script>