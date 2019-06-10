<template>
  <el-menu
    v-show="visible"
    id="rightClickMenu"
    background-color="#545c64"
    text-color="#fff"
    @select="handleSelect"
  >
    <div class="channel-code">
      {{ choosedTag[choosedTag.length - 1] ? choosedTag[choosedTag.length - 1].channelCode : '' }}
    </div>
    <el-menu-item
      v-for="item of menuList"
      :index="item.id.toString()"
      :key="item.id"
      v-if="canCreate || !item.control"
    >
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

  </el-menu>
</template>

<script>
var MENU_LIST = [
  {
    id: '1',
    label: '新建文档',
    control: true
  },
  // {
  //   id: '2',
  //   label: '增量发布'
  // },
  // {
  //   id: '3',
  //   label: '发布栏目首页'
  // },
  {
    id: '4',
    label: '修改栏目'
  },
  {
    id: '5',
    label: '建立子栏目'
  },
  // {
  //   id: '6',
  //   label: '批量发布'
  // },
  // {
  //   id: '7',
  //   label: '栏目模板'
  // },
  // {
  //   id: '8',
  //   label: '扩展字段'
  // },
  // {
  //   id: '9',
  //   label: '标记设置'
  // },
  // {
  //   id: '10',
  //   label: '图片水印'
  // },
  // {
  //   id: '11',
  //   label: '图片组'
  // },
  // {
  //   id: '12',
  //   label: '自定义文档列表'
  // },
  // {
  //   id: '13',
  //   label: '静态网页片段'
  // },
  // {
  //   id: '14',
  //   label: '废件箱'
  // }
]
export default {
  name: 'ContextMenu',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    left: {
      type: String,
      default: '0px'
    },
    top: {
      type: String,
      default: '0px'
    },
    isCreate: {
      type: Boolean,
      default: false
    },
    choosedTag: {
      type: Array,
      default: ()=> {
        []
      }
    },
    allowDoc: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      menuList: MENU_LIST
    }
  },
  computed: {
    canCreate() {
      return this.isCreate
    }
  },
  watch: {
    left: function() {
      this.refreshPosition()
    },
    top: function() {
      this.refreshPosition()
    },
    isCreate: function(val) {
      // console.log(val, 'val')
    },
    visible(val) {
      if(this.allowDoc) {
        this.menuList = [
          {
            id: '1',
            label: '新建文档',
            control: true
          },
          {
            id: '4',
            label: '修改栏目'
          },
          {
            id: '5',
            label: '建立子栏目'
          },
        ]
      } else {
        this.menuList = [
          {
            id: '4',
            label: '修改栏目'
          },
          {
            id: '5',
            label: '建立子栏目'
          },
        ]
      }
    },
    allowDoc(val) {
    }
  },
  mounted() {
    setTimeout(() => {
      this.refreshPosition()
    }, 20)
  },
  methods: {
    refreshPosition() {
      const menu = document.querySelector('#rightClickMenu')
      menu.style.left = this.left
      menu.style.top = this.top
    },
    handleSelect(key, keyPath) {
      const selectMenu = this.menuList.filter(item => item.id === key)
      console.log(selectMenu, 'selectMenu')
      this.$store.dispatch('setContextMenu', selectMenu[0])
    }
  }
}
</script>

<style lang="scss" scoped>
#rightClickMenu {
  position: fixed;
  z-index: 100;
  width: 106px;
  border-radius: 4px;
  overflow: hidden;
  .channel-code{
    color: #C0C4CC;
    font-size: 12px;
    padding-left: 6px;
    padding-top:6px;
  }
  .el-menu-item {
    padding: 0 6px !important;
    height: 28px;
    line-height: 28px;
    text-align: left;
    font-size: 12px;
    &.is-active {
      color: #fff;
    }
  }
}
</style>

