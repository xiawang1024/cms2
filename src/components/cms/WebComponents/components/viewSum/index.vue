<template>
  <div>
    <div class="tableintroduce">*下表数据为2019年2月统计的数据，包括：频率活动，新闻，品牌栏目，播客*</div>
    <div class="tablediv">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="编辑姓名" width="180"/>
        <el-table-column prop="clickNum" label="点击数量" width="180"/>
        <el-table-column prop="firstdraftNum" label="首发稿量" width="180"/>
        <el-table-column prop="activitiesNum" label="活动数量" width="180"/>
        <el-table-column prop="newsNum" label="新闻数量" width="180"/>
        <el-table-column prop="podcastNum" label="播客数量" width="180"/>
        <el-table-column prop="brandNum" label="品牌栏目数量"/>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewSum",
  data() {
    return {
      tableData: [
        {
          name: "liyu",
          clickNum: 1,
          firstdraftNum: 1,
          activitiesNum: 1,
          newsNum: 100,
          podcastNum: 100,
          brandNum: 111
        },
        {
          name: "liyu",
          clickNum: 1,
          firstdraftNum: 1,
          activitiesNum: 1,
          newsNum: 100,
          podcastNum: 100,
          brandNum: 111
        },
        {
          name: "liyu",
          clickNum: 1,
          firstdraftNum: 1,
          activitiesNum: 1,
          newsNum: 100,
          podcastNum: 100,
          brandNum: 111
        }
      ]
    };
  }
};
</script>
<style scoped>
.tablediv {
  padding: 10px;
  box-sizing: border-box;
}
.tableintroduce {
  padding: 10px;
  box-sizing: border-box;
  color: #dd514c;
}
</style>
