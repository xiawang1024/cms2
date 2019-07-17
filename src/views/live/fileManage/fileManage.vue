<template>
  <div>
    <header>
      <el-row>
        <el-col :span="24">
          <div class="file-header">
            <p>头部功能按钮</p>
            <bigUploader/>
          </div>
        </el-col>
      </el-row>
    </header>
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
              />-->
            </el-scrollbar>
          </div>
        </template>
        <template slot="paneR">
          <div class="right-container">
            <el-row>
              <el-col :span="24">
                <div class="fileTree">
                  <!--  -->
                  <!-- <el-popover
                    placement="right-end"
                    title="标题"
                    width="200"
                    trigger="manual"
                    v-model="visible"
                  >
                    <div class="abilityBox">
                      <li>复制</li>
                      <li>粘贴</li>
                      <li>剪切</li>
                      <li>删除</li>
                      <li>属性</li>
                    </div>
                    <el-button
                      type="text"
                      icon="el-icon-folder"
                      size="mini "
                      class="folderSize"
                      @click.left="handleLeft"
                      @dblclick.native="handleDouble"
                      @click.right.native="handleRight"
                      v-aleretAbility
                      slot="reference"
                    >
                      <span class="folderName">文件夹name</span>
                    </el-button>
                  </el-popover> -->
                  <!--  -->
                  <physicalView/>
                 
                  
                </div>
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
              />-->
              <demo/>
              <pictureCut/>
            </el-scrollbar>
          </div>
        </template>
      </split-pane>
    </div>
  </div>
</template>
<script>
import splitPane from "vue-splitpane";
import physicalView from "./physicalView"
import bigUploader from "./bigUploader";
import demo from "./demo";
import pictureCut from '@/components/live/pictureCut'
export default {
  components: { splitPane,physicalView,bigUploader,demo,pictureCut},
  directives: {
    aleretAbility: {
      inserted(el) {
        //阻止右键点击默认事件
        window.oncontextmenu = function() {
          return false;
        };
      }
    }
  },
  data() {
    return {
      fileList:[],
     
    };
  },
  mounted() {},
  methods: {
   
    resize() {
      //调整大小
    }
  }
};
</script>
<style lang="scss" scoped>
.file-header{
  padding: 10px  30px;
}
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

</style>
