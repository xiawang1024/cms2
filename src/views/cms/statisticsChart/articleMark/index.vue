<template>
  <div class="statistics-article-mark">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="类型">
        <el-select v-model="formInline.type" placeholder="请选择">
          <el-option label="大象内部考核" value="getCheckScoreExport" />
          <el-option label="大象号考核" value="getArticleScoreExport" />
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="formInline.dateDuring"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
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
      }
    };
  },
  methods: {
    downLoad() {
      if (!(this.formInline.dateDuring && this.formInline.dateDuring.length)) {
        this.$message.warning("请选择日期范围");
        return;
      }
      let baseUrl = "/cms/score/getCheckScoreExport";
      let params = {
        beginPublishTime: handleDate(this.formInline.dateDuring[0], "time"),
        endPublishTime: handleDate(this.formInline.dateDuring[1], "time"),
        tenantId: store.get("BaseInfor").clientLicenseId,
        hnrToken: "bearer " + this.$store.getters.token.access_token,
        url: "",
        hnrVersion: 1,
        downText: "大象内核考核"
      };
      if (this.formInline.type === "getCheckScoreExport") {
        //考核打分（内部考核）
        baseUrl = "/cms/score/getCheckScoreExport";
        params.downText = "大象内核考核";
      } else {
        // 稿件打分
        baseUrl = "/cms/score/getArticleScoreExport";
        params.downText = "大象号考核";
      }
      (params.url = `${baseUrl}?tenantId=${
        store.get("BaseInfor").clientLicenseId
      }&beginPublishTime=${handleDate(
        this.formInline.dateDuring[0],
        "time"
      )}&endPublishTime=${handleDate(this.formInline.dateDuring[1], "time")}`),
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
