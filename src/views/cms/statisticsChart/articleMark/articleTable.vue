<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="来源">
        <el-select filterable v-model="selectSource" placeholder="请选择" @change="handleSource">
          <el-option label="全部" value="all" />
          <el-option
            v-for="(item,index) in sourceGroup"
            :label="item.label"
            :value="item.value"
            :key="index"
          />
        </el-select>
      </el-form-item>
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
    <el-row v-if="selectSource==='all'">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="大象号（播客）" prop="originName" />
        <el-table-column label="类型" prop="type" />
        <el-table-column label="图文" prop="pictureScore" align="center" />
        <el-table-column label="视频" prop="videoScore" align="center" />
        <el-table-column label="直播" prop="liveScore" align="center" />
        <el-table-column label="播客" prop="blogScore" align="center" />
        <el-table-column label="总分" prop="totalScore" align="center" />
      </el-table>
    </el-row>
    <el-row v-else>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="全部" />
        <el-tab-pane label="图文" name="图文" />
        <el-tab-pane label="视频" name="视频" />
        <el-tab-pane label="播客" name="播客" />
        <el-tab-pane label="直播" name="直播" />
      </el-tabs>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column label="来源" prop="article_origin" width="180" />
        <el-table-column label="标题" prop="article_title" />
        <el-table-column label="类型" prop="item_name" width="80" />
        <el-table-column label="发布时间" prop="publish_time" width="180" />
        <el-table-column label="撰稿人" prop="create_user" width="120" />
        <el-table-column label="分数" prop="total_score" width="120" align="center"/>
      </el-table>
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
    </el-row>
  </div>
</template>
<script>
import {
  downloadCheck,
  getArticleScoreByOrigin,
  getArticleScoreDetailByPage
} from "@/api/cms/articleMarkStatistics";
import { fetchDictByDictName } from "@/api/cms/dict";
import { handleDate } from "@/utils/date-filter";
import store from "store";

export default {
  data() {
    return {
      formInline: {},
      pageNo: 1,
      pageSize: 10,
      total: 0,
      beginPublishTime: "",
      endPublishTime: "",
      tableData: [],
      articleOrigin: "",
      selectSource: "all",
      sourceGroup: [],
      activeName: "全部",
      itemName: "全部"
    };
  },
  created() {
    this.fetchDict();
  },
  methods: {
    handleClick(tab, event) {
      this.itemName = tab.name;
      this.handleSearch();
    },
    handleSource() {
      this.tableData = [];
      if (this.selectSource === "all") {
        this.articleOrigin = "";
      } else {
        console.log(this.selectSource, "val");
        this.articleOrigin = this.selectSource;
      }
    },
    fetchDict() {
      //获取来源列表

      var _this = this;
      return new Promise((resolve, reject) => {
        fetchDictByDictName("文稿来源")
          .then(response => {
            if (
              response.data.result.details &&
              response.data.result.details.length
            ) {
              let result = response.data.result.details.map(ele => {
                return {
                  label: ele.dictDetailName,
                  value: ele.dictDetailName
                };
              });
              _this.sourceGroup = result;
              //初始化默认全部来源
              _this.handleSource();
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    handleSearch() {
      if (!this.beginPublishTime) {
        this.$message.warning("请选择开始时间");

        return;
      }
      if (!this.endPublishTime) {
        this.$message.warning("请选择结束时间");

        return;
      }
      if (this.endPublishTime < this.beginPublishTime) {
        let date = this.beginPublishTime;
        this.beginPublishTime = this.endPublishTime;
        this.endPublishTime = date;
      }
      let params = {
        beginPublishTime: handleDate(this.beginPublishTime, "time"),
        endPublishTime: handleDate(this.endPublishTime, "time"),
        articleOrigin: this.articleOrigin
      };
      if (this.selectSource === "all") {
        this.articleMark(params);
      } else {
        this.initPage();
      
        this.articleMarkByPage(params);
      }
    },
    initPage() {
      (this.pageNo = 1), (this.pageSize = 10);
    },
    articleMark(params) {
      //稿件打分
      return new Promise((resolve, reject) => {
        getArticleScoreByOrigin(params).then(res => {
          if (res.data.code == 0) {
            this.tableData = res.data.result;
          } else {
            this.$message.error(res.data.msg);
          }
        });
      });
    },
    articleMarkByPage(params) {

      //分页查询稿件打分
      let seledata = {
        itemName: this.itemName==='全部'?'':this.itemName,
        pageSize: this.pageSize,
        pageNo: this.pageNo
      };

      getArticleScoreDetailByPage(params, seledata).then(res => {
        if (res.data.code == 0) {
          this.tableData = res.data.result.content;
          this.total=res.data.result.total;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    downLoad() {
      if (!this.beginPublishTime) {
        this.$message.warning("请选择开始时间");

        return;
      }
      if (!this.endPublishTime) {
        this.$message.warning("请选择结束时间");

        return;
      }
      if (this.endPublishTime < this.beginPublishTime) {
        let date = this.beginPublishTime;
        this.beginPublishTime = this.endPublishTime;
        this.endPublishTime = date;
      }
      let baseUrl = "/cms/score/getArticleScoreExport";
      let params = {
        beginPublishTime: handleDate(this.beginPublishTime, "time"),
        endPublishTime: handleDate(this.endPublishTime, "time"),
        // tenantId: store.get("BaseInfor").clientLicenseId,
        hnrToken: "bearer " + store.get("hnDt_token").access_token,
        url: "",
        hnrVersion: 1,
        downText: "大象号稿件打分"
      };
      (params.url = `${baseUrl}?articleOrigin=${
        this.articleOrigin
      }&beginPublishTime=${handleDate(
        this.beginPublishTime,
        "time"
      )}&endPublishTime=${handleDate(this.endPublishTime, "time")}`),
        downloadCheck(params);
    },
    //分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      this.articleMarkByPage();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.articleMarkByPage();
    }
  }
};
</script>
<style lang="scss">
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
</style>