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
        <el-button type="primary" @click="handleSearch" size="mini" :disabled="formInline.type === 'getCheckScoreExport'">搜索</el-button>
        <el-button type="primary" @click="downLoad" size="mini">一键导出</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="大象号（播客）" prop="originName" />
        <el-table-column label="类型" prop="type" />
        <el-table-column label="图文" prop="pictureScore" />
        <el-table-column label="短视频" prop="videoScore" />
        <el-table-column label="直播" prop="liveScore" />
        <el-table-column label="播客" prop="blogScore" />
        <el-table-column label="总分" prop="totalScore" />
      </el-table>
    </el-row>
  </div>
</template>
<script>
import { downloadCheck,getArticleScoreByOrigin } from "@/api/cms/articleMarkStatistics";
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
      endPublishTime: "",
      tableData:[],

    };
  },
  methods: {
    handleSearch(){
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
        tenantId: store.get("BaseInfor").clientLicenseId
      };
      if (this.formInline.type === "getCheckScoreExport") {
        //考核打分（内部考核）
       
      }
      if(this.formInline.type=='getArticleScoreExport') {
        // 稿件打分
        this.articleMark(params);
      }





    },
    insideCheckMark(params){
      return new Promise((resolve,reject)=>{
          getArticleScoreByOrigin(params)
          .then(res=>{
            if(res.data.code==0){
              this.tableData=res.data.result;

            }else{
              this.$message.error(res.data.msg);
            }
          })
      })
    },
    articleMark(params){
      //稿件打分
      return new Promise((resolve,reject)=>{
        getArticleScoreByOrigin(params)
        .then(res=>{
          if(res.data.code==0){
            this.tableData=res.data.result;
          }else{
            this.$message.error(res.data.msg)
          }
        })
      })
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
