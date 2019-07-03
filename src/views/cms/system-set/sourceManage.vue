<template>
  <div class="source-manage-container">
    <div class="tool-bar clearfix">
      <el-tag type="success" style="margin-left:20px;font-size: 16px">路径：{{ location }}</el-tag>
      <el-button
        size="mini"
        type="text"
        style="margin-left:20px;font-size: 16px"
        icon="el-icon-refresh"
        @click="refresh"
      >刷新</el-button>
      <el-button
        size="mini"
        type="text"
        style="margin-left:20px;font-size: 16px"
        @click="back"
      >返回上级目录</el-button>
      <el-popover v-model="popoverVisible" placement="bottom-start">
        <div style="text-align: right; margin: 0">
          <el-input
            :rows="2"
            v-model="folderName"
            style="margin-bottom:10px;"
            placeholder="请输入文件夹名称"
          />][ ]
          <el-button size="mini" type="primary" @click="popoverVisible = false">确定</el-button>
        </div>
        <el-button
          size="mini"
          slot="reference"
          type="primary pull-right"
          style="margin-left:20px"
          @click="popoverVisible = true"
        >新建文件夹</el-button>
      </el-popover>
      <el-button size="mini" type="primary pull-right" @click="upload">上传</el-button>
    </div>
    <el-table :data="sourceFileList" style="width: 100%">
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="size" label="大小"/>
      <el-table-column prop="type" label="类别"/>
      <el-table-column prop="updateTime" label="修改时间"/>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            title="同步资源文件到发布目录"
            @click="sync(scope.$index, scope.row)"
          >同步</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "SourceManage",
  data() {
    return {
      location: "/GEN/WORK",
      sourceFileList: [
        {
          id: 1,
          name: "WORK",
          size: "20KB",
          type: "文件夹",
          updateTime: "2018-01-02 12：24"
        }
      ],
      popoverVisible: false,
      folderName: ""
    };
  },
  methods: {
    refresh() {},
    upload() {},
    createFolder() {},
    back() {},
    sync() {},
    handleDelete() {}
  }
};
</script>

<style scoped>
.el-button + .el-button {
  margin-top: 5px;
  margin-left: 0px;
}

.source-manage-container {
 
}

.pull-right {
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
