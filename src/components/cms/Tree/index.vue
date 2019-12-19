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
    <context-menu
      :visible="menuVisible"
      :left="menuLeft"
      :top="menuTop"
      :is-create="isCreate"
      :choosed-tag="treeTags"
      :allow-doc="allowDoc"
    />
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
      expandedKeys: [],
      allowDoc: 0
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
        // console.log(this.treeTags, 'val')
        this.treeData.forEach((ele) => {
          this.expandedKeys.push(ele.id)
        })
        if (this.treeTags && this.treeTags.length) {
          this.treeTags.forEach((ele) => {
            this.expandedKeys.push(ele.id)
          })
        }
        // this.defaultChecked = [val[0].id]
        // this.$refs.websitTree.setCheckedNodes([{
        //   id: val[0].id,
        //   label: val[0].label
        // }])
      }
    }
  },
  mounted() {
  },
  methods: {
    // TODO:左键点击
    handleNodeClick(object, node, element) {
      this.menuVisible = false
      this.webSitTags = []
      this.generateTags(node, 'left', element)
      if ((object.parentChannelId == -1 || !object.parentChannelId) && object.children) {
        this.isCreate = false
      } else {
        this.isCreate = true
      }
    },
    // TODO:右键点击   @node-contextmenu="handleNodeContextmenu"
    handleNodeContextmenu(event, object, node, element) {
      // console.log(object.pubArticleFlag, 'object')
      this.allowDoc = object.pubArticleFlag
      if ((object.parentChannelId == -1 || !object.parentChannelId) && object.children) {
        this.isCreate = false
      } else {
        this.isCreate = true
      }
      const { clientWidth, clientHeight, nodeName } = event.target
      if (nodeName.toLowerCase() === 'span') {
        if (this.objectID !== object.id) {
          this.objectID = object.id
          this.menuVisible = true
          this.generateTags(node, 'right', element)
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
    generateTags(node, direct, element) {
      this.$nextTick(() => {
        if (this.treeData && this.treeData.length) {
          if (this.treeData[0].children) {
            if (node.data.channelId == this.treeData[0].children[0].channelId) {
              document.querySelectorAll('.el-tree-node')[1].classList.add('is-current')
            } else {
              document.querySelectorAll('.el-tree-node')[1].classList.remove('is-current')
            }
          } else {
            if (node.data.channelId == this.treeData[0].channelId) {
              document.querySelectorAll('.el-tree-node')[0].classList.add('is-current')
            } else {
              document.querySelectorAll('.el-tree-node')[0].classList.remove('is-current')
            }
          }
        }
      })
      this.direct = direct
      this.webSitTags = []
      this.findParentNode(node)
    },
    findParentNode(node) {
      // console.log(node, 'node')
      if (node.parent) {
        this.findParentNode(node.parent)
        const nodeVal = {}
        nodeVal.id = node.data.id
        nodeVal.label = node.data.label
        nodeVal.channelCode = node.data.channelCode,
          nodeVal.isCreate = this.isCreate
        nodeVal.pubArticleFlag = node.data.pubArticleFlag
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
            label: '',
            pageNum: 1,
            pageSize: 10
          })
        } else {
          this.$store.dispatch('setContextMenu', {})
        }
        /**
         * tree 路径
         */
        this.$store.dispatch('setTreeTags', webSiteTags)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.column-list-left {
  .el-menu-item {
    height: 36px;
    line-height: 36px;
  }
  .el-tree--highlight-current {
    padding-bottom: 80px;
  }
}
</style>

