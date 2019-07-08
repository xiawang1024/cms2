<template>
  <div class="folderPlat">
    <div
      v-for="(item,index) in treeFile"
      :key="item.id"
      style="width:150px;margin:10px;"
      class="fielcell"
    >
      <folder
        @handleLeft="handleLeft(index)"
        @handleDouble="handleDouble(index)"
        @handleRight="handleRight(index)"
        @mycopy="mycopy(index,item.id)"
        @mypaste="mypaste(index,item.id)"
        @mycute="mycute(index,item.id)"
        @mydelete="mydelete(index,item.id)"
        @myatribute="myatribute(index,item.id)"
        :file-name="item.name"
        :show-tips="item.visible"
        :icon="item.icon"
      />
    </div>
  </div>
</template>
<script>
import folder from "@/components/fileManage/folder.vue";

export default {
  components: { folder },
  data() {
    return {
      visible: false,
      fileName: "app",
      icon: "el-icon-folder-remove",
      historyIndex: null,
      treeFile: [
        {
          name: "app",
          icon: "el-icon-folder-remove",
          visible: false,
          id: 1
        },
        {
          name: "web",
          icon: "el-icon-folder-opened",
          visible: false,
          id: 2
        },
        {
          name: "sql",
          icon: "el-icon-folder-delete",
          visible: false,
          id: 3
        },
        {
          name: "python.textsldfjkaksjdf",
          icon: "el-icon-tickets",
          visible: false,
          id: 4
        },
        {
          name: "app",
          icon: "el-icon-folder-remove",
          visible: false,
          id: 11
        },
        {
          name: "web",
          icon: "el-icon-folder-opened",
          visible: false,
          id: 21
        },
        {
          name: "sql",
          icon: "el-icon-folder-delete",
          visible: false,
          id: 31
        },
        {
          name: "python.textsldfjkaksjdf",
          icon: "el-icon-tickets",
          visible: false,
          id: 41
        }
      ]
    };
  },
  methods: {
    getTreeList() {
      //获取文件树列表；
      //接收到的数据处理格式
      //重要字段
      // {
      //       *name:'python.textsldfjkaksjdf', 文件名
      //       *icon:'el-icon-tickets',        匹配文件后缀，添加icon类型
      //       *visible:false,                操作属性面板，默认false
      //       *id:41,                        在本层文件树的列表id
      //   }
    },
    handleLeft(e) {
      console.log("点击了左键", e);
    },
    handleDouble(e) {
      //进入下一级文件夹目录
      console.log("双击！！");
    },
    handleRight(index) {
      //处理点击显示隐藏
      if (this.historyIndex != index) {
        this.clearAllShowTips();
      }
      this.treeFile[index].visible = !this.treeFile[index].visible;
      this.historyIndex = index;
      console.log("右击 ");

      //执行点击操作任务
    },
    mycopy(index, id) {
      //掉接口
      console.log("复制 ");
      this.clearAllShowTips();
    },
    mypaste(index, id) {
      //掉接口
      console.log("粘贴 ");
      this.clearAllShowTips();
    },
    mycute(index, id) {
      //掉接口
      console.log("剪切 ");
      this.clearAllShowTips();
    },
    mydelete(index, id) {
      //掉接口
      console.log("删除 ");
      this.clearAllShowTips();
    },
    myatribute(index, id) {
      //掉接口
      console.log("属性 ");
      this.clearAllShowTips();
    },
    //遍历清除弹出的属性操作
    clearAllShowTips() {
      this.treeFile.map(item => {
        item.visible = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.folderPlat {
  width: 100%;
  overflow: hidden;
  .fielcell {
    float: left;
    display: flex;
    justify-content: center;
  }
  .fielcell:active {
    outline: 1px solid #409eff;
  }
}
</style>
