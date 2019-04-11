<template>
  <div class="column-list-left">
    <el-input
      v-model="filterText"
      placeholder="搜索栏目"
      prefix-icon="el-icon-search"
      size="mini"
      clearable
    />
    <el-tree
      ref="websitTree"
      :data="treeData"
      :props="defaultProps"
      :highlight-current="true"
      :check-on-click-node="true"
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
      :default-expanded-keys="expandedKeys"
      :default-checked-keys="defaultChecked"
      node-key="id"
    />
    <!-- <context-menu
      :visible="menuVisible"
      :left="menuLeft"
      :top="menuTop"
      :is-create="isCreate"
      :choosed-tag="treeTags"
    /> -->
  </div>
</template>

<script>
import ContextMenu from '@/components/cms/ContextMenu/index.vue'
import { mapGetters } from 'vuex'
// import TreeData from './mockData.js'
export default {
  name: 'WebTree',
  components: {
    ContextMenu
  },
  props: {
    treeData: {
      default: () => {
        []
      },
      type: Array
    }
  },
  data() {
    return {
      filterText: '',
      webSitTags: [],
      menuVisible: false,
      menuLeft: '0px',
      menuTop: '10px',
      // treeData: TreeData,
      objectID: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultChecked: [],
      // 是否为父栏目且无子栏目
      isCreate: false,
      expandedKeys: []
    }
  },
  computed: {
    ...mapGetters(['contextMenu', 'treeTags'])
  },
  watch: {
    filterText(val) {
      this.$refs.websitTree.filter(val)
    },
    treeData(val) {
      if (val.length) {
        this.treeData.forEach((ele) => {
          this.expandedKeys.push(ele.id)
        })
      }
    }
  },
  mounted() {
  },
  methods: {
    // TODO:左键点击
    handleNodeClick(object, node, element) {
      this.$emit('chooseColumn', object)
      this.generateTags(node, 'left', element)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    /**
     * 生成treeTag
     */
    generateTags(node, direct, element) {
      this.$nextTick(() => {
        if(this.treeData && this.treeData.length) {
          if(this.treeData[0].children) {
            if(node.data.channelId == this.treeData[0].children[0].channelId) {
              document.querySelectorAll('.el-dialog__body .el-tree-node')[1].classList.add('is-current')
            } else {
              document.querySelectorAll('.el-dialog__body .el-tree-node')[1].classList.remove('is-current')
            }
          } else {
            if(node.data.channelId == this.treeData[0].channelId) {
              document.querySelectorAll('.el-dialog__body .el-tree-node')[0].classList.add('is-current')
            } else {
              document.querySelectorAll('.el-dialog__body .el-tree-node')[0].classList.remove('is-current')
            }
          }
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.column-list-left {
  .el-menu-item {
    height: 36px;
    line-height: 36px;
  }
  .el-tree--highlight-current{
    padding-bottom:80px;
  }
}
</style>

