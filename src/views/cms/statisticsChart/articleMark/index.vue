<template>
  <div class="statistics-article-mark">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="类型">
        <el-select v-model="formInline.type" placeholder="请选择">
          <el-option label="大象内部考核" value="getCheckScoreExport" />
          <el-option label="大象号稿件打分" value="getArticleScoreExport" />
        </el-select>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-date-picker v-model="beginPublishTime" type="datetime" placeholder="选择日期时间"/>
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
        <el-button type="primary" @click="downLoad" size="mini">下载</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { downloadCheck } from "@/api/cms/articleMarkStatistics";
// import { mapGetters } from "vuex";
import { handleDate } from "@/utils/date-filter";
import store from "store";
export default {
  data() {
    return {
      formInline: {
        dateDuring: [],

        type: "getCheckScoreExport"
      },
      beginPublishTime: "",
      endPublishTime: ""
    };
  },
  methods: {
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
      let baseUrl = "/cms/score/getCheckScoreExport";
      let params = {
        beginPublishTime: handleDate(this.beginPublishTime, "time"),
        endPublishTime: handleDate(this.endPublishTime, "time"),
        tenantId: store.get("BaseInfor").clientLicenseId,
        //hnrToken: "bearer " + this.$store.getters.token.access_token,
        hnrToken: "bearer " + store.get("hnDt_token").access_token,
        url: "",
        hnrVersion: 1,
        downText: "大象内部考核"
      };
      if (this.formInline.type === "getCheckScoreExport") {
        //考核打分（内部考核）
        baseUrl = "/cms/score/getCheckScoreExport";
        params.downText = "大象内部考核";
      } else {
        // 稿件打分
        baseUrl = "/cms/score/getArticleScoreExport";
        params.downText = "大象号稿件打分";
      }
      (params.url = `${baseUrl}?tenantId=${
        store.get("BaseInfor").clientLicenseId
      }&beginPublishTime=${handleDate(
        this.beginPublishTime,
        "time"
      )}&endPublishTime=${handleDate(this.endPublishTime, "time")}`),
        downloadCheck(params);
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
