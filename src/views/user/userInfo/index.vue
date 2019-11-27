<template>
  <div>
    <div class="v-search-header">
      <el-row>
        <el-col :span="24">
          <v-search
            :search-settings="searchSettings"
            @search="searchItem"
            @reset="reset"
            ref="vserch"
          />
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData">
      <!-- 图像  用户名  昵称  邮箱  性别  手机  邀请码  分组  0：个人 1：机构  0：没直播权限 1：有直播权限  0：没认证 1:认证  赞扬数  最喜欢数  粉丝数  来源  创建时间    首次登录时间  openid  unionid    生日  国家城市   -->
      <el-table-column prop="description" label="图像">
        <template slot-scope="scope">
          <img :src="scope.row.url" alt style="width:60px" >
        </template>
      </el-table-column>
      <el-table-column prop="description" label="用户名" />
      <el-table-column prop="description" label="昵称" />
      <el-table-column prop="description" label="邮箱" />
      <el-table-column prop="description" label="性别" />
      <el-table-column prop="description" label="手机" />
      <el-table-column prop="description" label="邀请码" />
      <el-table-column prop="description" label="分组" />
      <el-table-column prop="description" label="赞扬数" />
      <el-table-column prop="description" label="最喜欢数" />
      <el-table-column prop="description" label="粉丝数" />
      <el-table-column prop="description" label="来源" />
      <el-table-column prop="description" label="创建时间" min-width="120px" />
      <el-table-column prop="description" label="首次登录时间" min-width="120px" />
      <el-table-column prop="description" label="openid" />
      <el-table-column prop="description" label="unionid" />
      <el-table-column prop="description" label="生日" />
      <el-table-column prop="description" label="国家城市" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdite(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
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
  </div>
</template>

<script>
import { userInfoList } from "@/api/user/userInfo.js";

export default {
  data() {
    return {
      pageNo: 1,
      pageSize: 30,
      total: 0,
      tableData: [],
      searchSettings: [
        {
          label: "来源",
          name: "origin",
          type: "select",
          visible: "true",
          value: "",
          changeOnSelect: true,
          filterable: true,
          options: []
        },
        {
          label: "最近",
          name: "quckTime",
          type: "select",
          visible: true,
          value: "",
          options: [
            { label: "7天", value: "7" },
            {
              label: "30天",
              value: "30"
            }
          ]
        },
        {
          label: "开始时间",
          name: "beginTime",
          visible: true,
          type: "datetime",
          defaultTime: "00:00:00",
          value: ""
        },
        {
          label: "结束时间",
          name: "endTime",
          visible: true,
          type: "datetime",
          defaultTime: "23:59:59",
          value: ""
        }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {},
    searchItem(val){
        console.log(val,'val')

    },
    reset(){

    },

    //分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      if (this.pageFlag) {
        this.getList();
      } else {
        this.SearchAttribute();
      }
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      if (this.pageFlag) {
        this.getList();
      } else {
        this.SearchAttribute();
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.fenyeDiv{
    margin-top: 30px;
}
</style>