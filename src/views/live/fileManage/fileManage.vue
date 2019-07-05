<template>
  <div>
    <header>
      <el-row>
        <el-col :span="24">
          <div>
            <p>头部功能按钮</p>
          </div>
        </el-col>
      </el-row>
    </header>
    <!-- <div class="mainbox">
       
      <el-row>
        <el-col :span="4">
          <div class="fileTree">
              左侧
         </div>
        </el-col>
        <el-col :span="20">
          <div class="fileView">
              右侧
          </div>
        </el-col>
      </el-row>
        
    </div>-->

    <div class="components-container">
      <split-pane
        :min-percent="10"
        :max-percent="30"
        :default-percent="20"
        class="pane-wrap"
        split="vertical"
        @resize="resize"
      >
        <template slot="paneL">
          <div class="left-container">
            <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%;">
              <!-- <el-tree
                ref="tree"
                :data="treeData"
                show-checkbox
                node-key="id"
                :default-checked-keys="defaultCheck"
                :check-on-click-node="true"
                :props="defaultProps"
                @check="addColumn"
                check-strictly
              /> -->
            </el-scrollbar>
          </div>
        </template>
        <template slot="paneR">
          <div class="right-container">
            <el-row>
              <el-col :span="4">
                <div class="fileTree">
                  左侧
                  <el-button type="text" icon="el-icon-folder" size="mini " class="folderSize" @click.left="handleLeft" @click.stop="handleRight" 
                             v-aleretAbility
                  >
                    <span class="folderName">文件夹</span>
                  </el-button>
                  <el-button type="text" icon="el-icon-folder-opened" size="mini " class="folderSize">
                    <span class="folderName">打开文件夹</span>
                  </el-button>
                  <el-button type="text" icon="el-icon-folder-add" size="mini " class="folderSize">
                    <span class="folderName">新建文件夹</span>
                  </el-button>
                  <el-button type="text" icon="el-icon-folder-remove" size="mini " class="folderSize">
                    <span class="folderName">移动文件夹</span>
                  </el-button>
                  <el-button type="text" icon="el-icon-folder-delete" size="mini " class="folderSize">
                    <span class="folderName">删除文件夹</span>
                  </el-button>
                  
                  <el-button type="text" icon="el-icon-tickets" size="mini " class="folderSize">
                    <span class="folderName">文件</span>
                  </el-button>

                </div>
              </el-col>
              <el-col :span="20">
                <div class="fileView">右侧</div>
              </el-col>
            </el-row>

            <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%;">
              <el-table :data="fileList" style="width: 100%" size="small" highlight-current-row>
                <el-table-column prop="userName" label="用户名" />
                <el-table-column label="操作" width="150">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      @click.stop="seeUserRight(scope.$index, scope.row)"
                    >查看权限</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!-- <el-pagination
                class="fenyeDiv"
                :current-page="pageNo"
                :page-sizes="[10,30,60,100]"
                :page-size="pageSize"
                :total="userTotal"
                background
                layout="total, sizes, prev, pager, next, jumper"
                style="float: right"
                @size-change="sizeChange"
                @current-change="pageChange"
              /> -->
            </el-scrollbar>
          </div>
        </template>
      </split-pane>
    </div>
  </div>
</template>
<script>
import splitPane from "vue-splitpane";
export default {
  components: { splitPane },
  directives:{
    aleretAbility:{
      inserted(el){
        window.onload = function(el){ 
          el.oncontextmenu=false; 
          } 
      } 
    }
  },
  data() {
    return {
      treeData:[],
      fileList:[],

    };
  },
  mounted(){

  },
  methods: {
    handleLeft(){
      console.log('点击了左键')
    },
    handleRight(e){
      console.log('点击了右键')

    },
    resize(){
      //调整大小
    }
  }
};
</script>
<style lang="scss" scoped>
.pane-wrap {
  margin-top: 12px;
}
.splitter-pane-resizer {
  background: #ccc !important;
}
.components-container {
  position: relative;
  height: calc(100vh - 124px);
  margin: 12px 10px;
}
.mainbox {
  width: 100%;
  .fileTree {
    height: 800px;
    border-right: 1px dashed #dedede;
  }
}
.left-container {
  /* background-color: #f38181; */
  height: 100%;
  /* overflow: hidden; */
}

.right-container {
  height: 100%;
  padding-left: 30px;
}
.folderSize {
  /deep/i {
    font-size: 70px;
  }

  .folderName {
    display: block;
    font-size: 16px;
  }
}
</style>
