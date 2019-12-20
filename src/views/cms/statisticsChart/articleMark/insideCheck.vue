<template>
  <div class="statistics-article-mark">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="开始日期">
        <el-date-picker v-model="beginPublishTime" type="datetime" placeholder="选择日期时间" />
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
          v-model="endPublishTime"
          type="datetime"
          placeholder="选择日期时间"
          default-time="23:59:59"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch" size="mini">搜索</el-button>
        <el-button type="primary" @click="downLoad" size="mini">一键导出</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="编辑" name="编辑打分"/>
        <el-tab-pane label="文字记者" name="文字记者"/>
        <el-tab-pane label="直播记者" name="直播记者"/>
        <el-tab-pane label="图片记者" name="图片记者"/>
        <el-tab-pane label="视频剪辑" name="视频剪辑"/>
        <el-tab-pane label="视频拍摄" name="视频拍摄"/>
      </el-tabs>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column label="人员名单" prop="author" width="120" />
        <el-table-column label="文章（ID）" prop="article_id" width="180" />
        <el-table-column label="文章标题" prop="article_title" />
        <!-- <el-table-column label="点击量" prop="" width="120" align="center" /> -->
        <el-table-column label="发稿时间" prop="publish_time" width="180" />
        <el-table-column label="打分类型" prop="label_name" width="120" align="center" />
        <el-table-column label="得分" prop="score" width="80" align="center" />
        <el-table-column label="额外得分" prop="extra_score" width="80" align="center" />
        <el-table-column label="总分" prop="total_score" width="120" align="center" />
      </el-table>
    </el-row>
    <el-pagination
      class="fenyeDiv"
      :current-page="pageNo"
      :page-sizes="[10,30,60,100]"
      :page-size="pageSize"
      :total="total"
      background
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
import {
  downloadCheck,
  getCheckScoreResultByPage
} from "@/api/cms/articleMarkStatistics";
import { handleDate } from "@/utils/date-filter";
import store from "store";
export default {
  data() {
    return {
      formInline: {},
      beginPublishTime: "",
      endPublishTime: "",
      tableData: [],
      activeName: "编辑打分",
      pageSize: 10,
      pageNo: 1,
      total: 0,
      itemName: "编辑打分"
    };
  },

  created() {},

  methods: {
    handleClick(tab, event) {
      this.initPage();  
      this.itemName = tab.name;
      this.handleSearch();
    },
    initPage() {
      this.pageSize = 10;
      this.pageNo = 1;
    },
    timeDefend() {
      if (!this.beginPublishTime) {
        this.$message.warning("请选择开始时间");

        return false;
      }
      if (!this.endPublishTime) {
        this.$message.warning("请选择结束时间");

        return false;
      }
      if (this.endPublishTime < this.beginPublishTime) {
        let date = this.beginPublishTime;
        this.beginPublishTime = this.endPublishTime;
        this.endPublishTime = date;
      }
      return true;
    },
    handleSearch() {
      if (this.timeDefend()) {
        this.initPage();

        this.insideCheckMark();
      }
    },
    insideCheckMark() {
      let params = {
        beginPublishTime: handleDate(this.beginPublishTime, "time"),
        endPublishTime: handleDate(this.endPublishTime, "time"),
        itemName: this.itemName,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };

      return new Promise((resolve, reject) => {
        getCheckScoreResultByPage(params).then(res => {
          if (res.data.code == 0) {
            this.tableData = res.data.result.content;
            this.total = res.data.result.total;
          } else {
            this.$message.error(res.data.msg);
          }
        });
      });
    },

    downLoad() {
      if (this.timeDefend()) {
        let baseUrl = "/cms/score/getCheckScoreExport";
        let params = {
          beginPublishTime: handleDate(this.beginPublishTime, "time"),
          endPublishTime: handleDate(this.endPublishTime, "time"),
          //hnrToken: "bearer " + this.$store.getters.token.access_token,
          hnrToken: "bearer " + store.get("hnDt_token").access_token,
          url: "",
          hnrVersion: 1,
          downText: "大象内部考核"
        };

        (params.url = `${baseUrl}?beginPublishTime=${handleDate(
          this.beginPublishTime,
          "time"
        )}&endPublishTime=${handleDate(this.endPublishTime, "time")}`),
          downloadCheck(params);
      }
    },
    //分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      this.insideCheckMark();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.insideCheckMark();
    }
  }
};
</script>
<style lang="scss">
.statistics-article-mark {
  .el-date-editor {
    .el-range-separator {
      line-height: 24px;
    }
  }
  .el-date-editor {
    .el-range__icon {
      line-height: 24px;
    }
  }
  .el-date-editor {
    .el-range__close-icon {
      line-height: 24px;
    }
  }
}
</style>
