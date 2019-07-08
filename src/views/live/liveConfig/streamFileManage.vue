<template>
  <div class="helpdoc-container">
    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="视频剪辑" name="0"/>
        <el-tab-pane label="视频转码" name="1"/>
      </el-tabs>
    </template>
    <el-table :data="tableValue" 
              :load="load"
              lazy
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
              row-key="id">
      <el-table-column type="index" width="50" />
      <el-table-column prop="appName" width="150" label="APP名称" />
      <el-table-column prop="userName" width="120" label="用户名" />
      <el-table-column prop="recordBeginTime" width="180" :formatter="formatStart" label="录制开始时间" />
      <el-table-column prop="recordEngTime" width="180" :formatter="formatEnd" label="录制结束时间" />
      <el-table-column prop="recordFormat" width="80" label="录制格式" />
      <el-table-column prop="recordLength" width="80" label="录制时长" />
      <el-table-column prop="filePath" label="文件路径" show-overflow-tooltip />
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="prime" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            :disabled="true"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagenation"
      :current-page="pageNo"
      :page-sizes="[10,30,60,100]"
      :page-size="pageSize"
      :total="totalCount"
      background
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog title="视频剪辑" :visible.sync="dialogVisible" width="860px">
      <videoEdite
        @cutResult="cutResult"
        :video-url="rowUrl"
        v-loading="loading"
        element-loading-text="上传中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
      />
      
    </el-dialog>
  </div>
</template>
<script>
import { streamfile, editeStreamfile,childrenStreamfile } from "@/api/live/streamFileManage.js";
import videoEdite from "@/components/videoCut/videoEdite.vue";
import { Promise } from 'q';
export default {
  components: { videoEdite },
  data() {
    return {
      tableValue: [],
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      sortBy: "",
      order: "",
      dialogVisible: false,
      rowUrl: "", //播放地址
      rowId: "", //当前文件id
      url: "", //文件路径
      loading: false,
      activeName:'0',
      childrenNode:[],
    };
  },
  created() {
    this.requestTableValue();
  },
  mounted() {},
  methods: {
    requestTableValue() {
      var _this = this;
      let data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sortBy: this.sortBy,
        order: this.order
      };
      return new Promise((resolve, reject) => {
        streamfile(data)
          .then(response => {
            if (response.data.code == 0) {
              _this.tableValue = response.data.result.content;
              
              _this.totalCount = response.data.result.total;
            } else {
              this.$message({
                type: "error",
                message: response.data.msg
              });
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.rowUrl = row.editUrl;
      this.rowId = row.id;
      this.url = row.filePath;
    },
    handleDelete() {},

    //时间格式化
    formatStart(row) {
      let date = "";
      if (row.recordBeginTime) {
        date = row.recordBeginTime.replace("T", " ");
        date = date.replace(".000+0000", "");
      }
      return date;
    },
    formatEnd(row) {
      let date = "";
      if (row.recordEngTime) {
        date = row.recordEngTime.replace("T", " ");
        date = date.replace(".000+0000", "");
      }
      return date;
    },

    //分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      this.requestTableValue();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.requestTableValue();
    },
    cutResult(value) {
      var _this = this;
      this.loading = true;
      //添加上 url , order, id 等字段
      console.log(value, "emit");
      
      let data=[];
      data=JSON.parse(JSON.stringify(value))
      data.map((item, index) => {
        //时间格式化00:00:00.0
        item.duration =
          item.endTimeArr[0] -
          item.startTimeArr[0] +
          ":" +
          (item.endTimeArr[1] - item.startTimeArr[1]) +
          ":" +
          (item.endTimeArr[2] -
            item.startTimeArr[2] -1+
            (item.duration - parseInt(item.duration)));
        item.startTime =
          item.startTimeArr[0] +
          ":" +
          item.startTimeArr[1] +
          ":" +
          (parseInt(item.startTimeArr[2]) +
            (item.startTime - parseInt(item.startTime)));
        item.order = index;
        item.url = this.url;
        item.id = this.rowId;
      });
      console.log(data, "data");
      //执行保存请求
      return new Promise((resolve, reject) => {
        editeStreamfile(data)
          .then(response => {
            if (response.data.code == 0) {
              this.$message({
                type: "success",
                message: response.data.msg
              });
            } else {
              this.$message({
                type: "error",
                message: response.data.msg
              });
            }
            _this.loading = false;
            resolve();
          })
          .catch(error => {
            reject(error);
            _this.loading = false;
          });
      });
    },
    //tab切换
    handleClick(tab, event) {
      if(this.activeName=='0'){
          this.requestTableValue();
      }
      if(this.activeName=='1'){
        this.tableValue=[]
      }

      },
      
    load(tree, treeNode, resolve) {
      //传入当前节点id,查询子节点列表
      //发送请求，将请求结果resolve出去，
      var _resolve=resolve;
       var _this=this;
        return new Promise((resolve,reject)=>{
        childrenStreamfile(tree.id)
        .then(response=>{
          console.log(response);
            if(response.data.code==0){
              _this.childrenNode=response.data.result
               _resolve( _this.childrenNode)
            }else{
              //没有子节点返回空值
               _resolve([])
            }
          resolve();
        })
        .catch(error=>{
          reject(error);
        })
      })
       
      },
      
  }
};
</script>
<style lang="scss" scoped>
.helpdoc-container {
  margin: 30px;
}
.pagenation {
  margin: 30px 0;
}
</style>