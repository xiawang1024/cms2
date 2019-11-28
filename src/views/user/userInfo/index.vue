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
      <el-row>
        <el-button
          @click="handleGroupManage"
          size="mini"
          type="primary"
          :disabled="!selectUser.length>0"
        >批量操作</el-button>
      </el-row>
    </div>
    <el-table :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="icon" label="图像" width="80px">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height:20px;marginTop:5px" >
        </template>
      </el-table-column>
      <el-table-column prop="description" label="用户名" min-width="150px" />
      <el-table-column prop="nickname" label="昵称" min-width="180px" />
      <el-table-column prop="email" label="邮箱" min-width="160px" />
      <el-table-column prop="gender" label="性别">
        <template slot-scope="scope">
          <span v-if="scope.row.gender==1">男</span>
          <span v-if="scope.row.gender==0">女</span>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="手机" min-width="120px" />
      <el-table-column prop="inviteCode" label="邀请码" />
      <el-table-column prop="orgId" label="分组" :formatter="groupDeal"/>
      <el-table-column prop="fansCount" label="赞扬数" />
      <el-table-column prop="favoriteCount" label="最喜欢数" />
      <el-table-column prop="fansCount" label="粉丝数" />
      <el-table-column prop="origin" label="来源" min-width="200px" />
      <el-table-column prop="createtime" label="创建时间" min-width="160px" :formatter="timeHandle" />
      <el-table-column
        prop="firstLogonTime"
        label="首次登录时间"
        min-width="160px"
        :formatter="timeHandle"
      />
      <el-table-column prop="openid" label="openid" min-width="250px" />
      <el-table-column prop="unionid" label="unionid" min-width="300px" />
      <el-table-column prop="birthday" label="生日" min-width="120px" />
      <el-table-column prop="country" label="国家" />
      <el-table-column prop="city" label="城市" />
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdite(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      class="fenyeDiv"
      :current-page="pageNo"
      :page-sizes="[10,20,50,100]"
      :page-size="pageSize"
      :total="total"
      background
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog :visible.sync="dialogVisible" title="分组" width="820px;">
      <v-form
        ref="vform"
        :form-settings="formSettings"
        :form-data="formData"
        @save="submitSave"
        label-width="130px"
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  userInfoList,
  groupingList,
  batchUserGroup
} from "@/api/user/userInfo.js";
import dayjs from "dayjs";
export default {
  data() {
    return {
      pageNo: 1,
      pageSize:10,
      mobile: "",
      nickname: "",
      total: 0,
      tableData: [],
      selectUser: [],
      dialogVisible: false,
      searchSettings: [
        {
          label: "昵称",
          name: "nickname",
          type: "text",
          visible: "true",
          value: ""
        },
        {
          label: "手机号",
          name: "mobile",
          type: "text",
          visible: "true",
          value: ""
        }
      ],
      formData: {},
      formSettings: [
        {
          items: [
            {
              label: "组别",
              type: "select",
              name: "orgId",
              options: []
            }
          ]
        }
      ],
      groupList:[],
    };
  },
  created() {
    this.init();
    this.getGroup();
  },
  methods: {
    init() {
      return new Promise((resolve, reject) => {
        let data = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          nickname: this.nickname,
          mobile: this.mobile
        };
        userInfoList(data)
          .then(res => {
            if (res.data.code == 0) {
              this.tableData = res.data.result.content;
              this.total = res.data.result.total;
            } else {
              this.$message.error(res.data.msg);
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getGroup() {
      return new Promise((resolve, reject) => {
        groupingList()
          .then(res => {
            if (res.data.code == 0) {
              let data = res.data.result;

              data.forEach((item, index) => {
                item.label = item.groupName;
                item.value = item.id;
              });
              this.formSettings[0].items[0].options = data;
              this.groupList=data;
              console.log(res.data.result, "aaa");
            } else {
              this.$message.error(res.data.msg);
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    timeHandle(val) {
      let time = "";
      if (val.createtime) {
        return (time = dayjs(val.createtime).format("YYYY-MM-DD HH:mm:ss"));
      }
    },
    groupDeal(val){
      let group='';
      if(val.orgId){
        this.groupList.forEach((item,index)=>{
          console.log(item.id,val.orgId,'id');
          
          if(item.id===val.orgId){
            group=item.groupName;
          }
        })
        return group;
      }
    },
    searchItem(val) {
      this.pageNo = 1;
      this.pageSize = 10;
      this.total = 0;
      this.tableData = [];
      console.log(val, "val");
      if (val.nickname) {
        this.nickname = val.nickname;
      }
      if (val.mobile) {
        this.mobile = val.mobile;
      }
      this.init();
    },
    reset() {
      this.nickname = "";
      this.mobile = "";
    },
    handleSelectionChange(val) {
      console.log(val, "val");
      this.selectUser = [];
      val.forEach((item, index) => {
        this.selectUser.push(item.id);
      });
    },
    handleGroupManage() {
      this.dialogVisible = true;
    },
    submitSave(val) {
      //保存分组
      let data = {
        orgId: val.orgId,
        userIdList: this.selectUser
      };
      return new Promise((resolve, reject) => {
        batchUserGroup(data)
          .then(res => {
            if (res.data.code == 0) {
              this.$message.success(res.data.msg);
              this.dialogVisible = false;
              this.init();
            } else {
              this.$message.error(res.data.msg);
            }
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.init();
    }
  }
};
</script>

<style lang='scss' scoped>
.fenyeDiv {
  margin-top: 30px;
}
</style>