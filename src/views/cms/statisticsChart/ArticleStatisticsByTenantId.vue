<template>
  <div class="contaner">
    <articleTitle :datavalue="datavalue" />
  </div>
</template>
<script>
import articleTitle from "@/components/Charts/articleTitle.vue";
import { articleTrendBytenantId } from "@/api/cms/liveCharts";
export default {
  components: { articleTitle },
  data() {
    return {
      datavalue: {},
      tenantId: ""
    };
  },
  created() {
    this.InitInfo();
    this.fetchTrend();
  },
  methods: {
    InitInfo() {
      this.tenantId = JSON.parse(
        localStorage.getItem("BaseInfor")
      ).clientLicenseId;
    },
    //获取文章点击量和发稿量整体趋势(总站)
    fetchTrend() {
      var _this = this;
      return new Promise((resolve, reject) => {
        articleTrendBytenantId(this.tenantId)
          .then(response => {
            if (response.data.code == 0) {
              let result = response.data.result;
              _this.datavalue = result;
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.contaner {
  padding: 10px 0;
}
</style>
