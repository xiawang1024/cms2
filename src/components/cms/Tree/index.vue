<template>
  <div>
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
      @node-contextmenu="handleNodeContextmenu"
      :default-checked-keys = "defaultChecked"
      node-key="id"
    />
    <context-menu
      :visible="menuVisible"
      :left="menuLeft"
      :top="menuTop"
    />
  </div>
</template>

<script>
import ContextMenu from '@/components/cms/ContextMenu/index.vue'
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
      menuTop: '0px',
      // treeData: TreeData,
      objectID: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultChecked: []
    }
  },
  watch: {
    filterText(val) {
      this.$refs.websitTree.filter(val)
    },
    treeData(val) {
      if (val.length) {
        console.log('setKey')
        // this.defaultChecked = [val[0].id]
        // this.$refs.websitTree.setCheckedNodes([{
        //   id: val[0].id,
        //   label: val[0].label
        // }])
      }
    }
  },
  mounted() {
    console.log(this.treeData, 'treeData')
  },
  methods: {
    // TODO:左键点击
    handleNodeClick(object, node, element) {
      console.log(node, 'node')
      console.log(object, 'object')
      console.log(element, 'element')
      this.menuVisible = false
      this.webSitTags = []
      this.generateTags(node, 'left')
    },
    // TODO:右键点击
    handleNodeContextmenu(event, object, node, element) {
      const { clientWidth, clientHeight, nodeName } = event.target
      if (nodeName.toLowerCase() === 'span') {
        if (this.objectID !== object.id) {
          this.objectID = object.id
          this.menuVisible = true
          this.generateTags(node, 'right')
        } else {
          this.menuVisible = !this.menuVisible
        }
        document.addEventListener('click', () => {
          this.menuVisible = false
        })
        this.menuLeft = `${event.clientX + clientWidth / 2}px`
        this.menuTop = `${event.clientY + clientHeight}px`
      } else {
        return false
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    /**
     * 生成treeTag
     */
    generateTags(node, direct) {
      this.direct = direct
      this.webSitTags = []
      this.findParentNode(node)
    },
    findParentNode(node) {
      if (node.parent) {
        this.findParentNode(node.parent)
        const nodeVal = {}
        nodeVal.id = node.data.id
        nodeVal.label = node.data.label
        nodeVal.channelCode = node.data.channelCode
        this.webSitTags.push(nodeVal)
      } else {
        const webSiteTags = this.webSitTags
        /**
         * 操作清空
         */

        const direct = this.direct
        if (direct === 'left') {
          this.$store.dispatch('setContextMenu', {
            id: '0',
            label: ''
          })
        } else {
          this.$store.dispatch('setContextMenu', {})
        }
        /**
         * tree 路径
         */
        this.$store.dispatch('setTreeTags', webSiteTags)
        console.log(webSiteTags, 'webSiteTags')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-menu-item {
  height: 36px;
  line-height: 36px;
}
</style>

