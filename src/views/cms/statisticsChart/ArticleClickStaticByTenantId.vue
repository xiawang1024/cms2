<template>
  <div class="mainBox">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="记者" prop="writer"/>
      <el-table-column label="文章点击量" prop="actualClickNum"/>
      <el-table-column label="分享点击量" prop="templateClickNum"/>
      <el-table-column label="文章数量" prop="articleCount"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { clickArticleStatisticsByWriter } from "@/api/cms/liveCharts";
export default {
  data() {
      return{
      tableData:[],

      }
  },
  created() {
      this.initTable();
  },
  methods: {
    //init Table
    initTable(){
            return new Promise((resolve,reject)=>{
                clickArticleStatisticsByWriter()
                .then(res=>{
                    if(res.data.code==0){
                        this.tableData=res.data.result
                    }else{
                        this.$message.error(res.data.msg)
                    }
                })
                .catch(err=>{
                    reject(err)
                })
            })
    },
    handleDetail(index,row){
        this.$router.push({
            path:'writerStaticDetail',
            query:{writer:encodeURI(row.writer)}
        })

    }

  }
};
</script>
<style lang="scss" scoped>
.mainBox{
    padding: 30px;
}
</style>