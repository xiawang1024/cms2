<template>
  <div>
    <el-table :data="tableValue">
      <el-table-column prop="image" label="图标" width="100">
        <template slot-scope="scope">
          <img :src="baseUrl.DOWN_URL+scope.row.image" style="width:30px" >
        </template>
      </el-table-column>
      <el-table-column prop="name" label="频率/频道" width="200" />
      <el-table-column prop="streams" label="流地址" />
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            v-if="isCopy!=scope.row.streams"
            v-clipboard:copy="scope.row.streams"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >复制</el-button>
          <el-button size="mini" type="primary" v-else>成功</el-button>
          <!-- <el-button size="mini" type="primary" @click="handlePlay(scope.$index,scope.row)">播放</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- <stream-player :shareStream="shareStream" :playVisible.sync="playVisible"></stream-player> -->
  </div>
</template>
<script>
import { TVStream } from "@/api/live/steamAdressManage.js";
import baseUrl from "@/config/base-url";
// import streamPlayer from "@/components/live/streamPlayer.vue";
export default {
  // components: { streamPlayer },
  data() {
    return {
      isCopy: "",
      sharHTMLContent: null,
      tableValue: [],
      baseUrl: baseUrl,
      // shareStream: "",
      // playVisible: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.tableValue = [];
      this.getList(1).then(this.getList(11));
    },
    getList(type) {
      return new Promise((resolve, reject) => {
        //获取电台流信息
        TVStream(type)
          .then(res => {
            this.tableValue = this.tableValue.concat(res.data);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    onCopy(e) {
      // 复制成功
      this.isCopy = e.text;
      this.$message({
        message: "复制成功！",
        type: "success"
      });
    },
    onError(e) {
      // 复制失败
      this.$message({
        message: "复制失败！",
        type: "error"
      });
    },
    // handlePlay(index, row) {
    //   this.shareStream = row.streams[0];
    //   this.playVisible = true;
    // }
  }
};
</script>
<style lang="scss" scoped>
</style>