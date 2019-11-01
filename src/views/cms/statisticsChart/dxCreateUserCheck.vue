<template>
  <div class="mainBox">
    <div class="v-search-header">
      <el-row>
        <el-col :span="24">
          <v-search :search-settings="searchSettings" @search="searchItem" ref="vserch" />
        </el-col>
       
      </el-row>
    </div>

    <el-table
      :data="tableData"
      show-summary
      style="width: 100%"
      stripe
    >
      <el-table-column label="编辑" prop="createUser" width="150" />
      <el-table-column label="发稿量" prop="articleCount" />
      <el-table-column label="点击量" prop="clickNum" />
      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="commentForm(scope.$index,scope.row)">详单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="2" :offset="22">
        <el-button class="exportBtn" type="primary" size="mini" @click="handleDownload">批量下载</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getdxCreateUserCheck,queryInsideEditorNames,downdxCreateUser} from "@/api/cms/liveCharts";
import dayjs from "dayjs";
export default {
  data() {
    return {
      searchSettings: [
        {
          label: "开始时间",
          name: "beginTime",
          visible: true,
          type: "datetime",
          defaultTime:'00:00:00',
          value:'',
        },
        {
          label: "结束时间",
          name: "endTime",
          visible: true,
          type: "datetime",
          defaultTime:'23:59:59',
          value:'',
        },
        {
          label: "编辑",
          name: "createUser",
          type: "select",
          visible: "true",
          value:'',
          options:[]
         
        },
      ],
      beginTime: "",
      endTime: "",
      origin:'',
      tableData: [],
      createUser:'',
    };
  },
  created() {
     this.getCreateUser();

  },
  mounted() {
   

  },
  methods: {
    searchItem(val) {
      this.createUser=val.createUser||'';
      this.timeDeail(val);
     
    },
    timeDeail(val) {
        if (val.beginTime && val.endTime) {
          // 发送请求
          if (val.beginTime > val.endTime) {
            this.beginTime = dayjs(val.endTime).format("YYYY-MM-DD HH:mm:ss");
            this.endTime = dayjs(val.beginTime).format("YYYY-MM-DD HH:mm:ss");
          } else {
            this.beginTime = dayjs(val.beginTime).format("YYYY-MM-DD HH:mm:ss");
            this.endTime = dayjs(val.endTime).format("YYYY-MM-DD HH:mm:ss");
          }
         this.initTableList();

        } else if (val.beginTime == ""||val.beginTime == undefined) {
          this.$message.error("请选择开始时间");
          return false;
        } else if (val.endTime == ""||val.endTime == undefined) {
          this.$message.error("请选择结束时间");
          return false;
        }
        //自选
      },
    

    //查询请求
    initTableList() {
      let data = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        createUser:this.createUser,
      };
      return new Promise((resolve, reject) => {
        getdxCreateUserCheck(data)
          .then(res => {
            if (res.data.code == 0) {
              this.tableData = res.data.result;
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
     handleDownload() {
       this.tableData.forEach((item,index)=>{
         setTimeout(() => {
       this.handleExport(item.createUser,item.articleCount);

         }, index*1000);

       })
    },

     handleExport(createUser,count) {
      let data = {
         pageNo:1,
          pageSize:5000,
        startPublishDate: this.beginTime,
        endPublishDate: this.endTime,
        createUser,
        accessToken:
          "bearer " +
          JSON.parse(localStorage.getItem("hnDt_token")).access_token,
      };
      if(count>5000){
        this.$message.error(createUser+"的发稿量超过5000,默认下载前5000条数据")
      }
      downdxCreateUser(data);
      

    },
    commentForm(index,row){
      this.$router.push({
        path:'dxCreateUser',
        query:{
          createUser:row.createUser,
          beginTime:this.beginTime,
          endTime:this.endTime
        }
      })
    },


   
    
    getCreateUser(){
      return new Promise((resolve,reject)=>{
        queryInsideEditorNames()
        .then(res=>{
          if(res.data.code===0){
            let data=res.data.result;
            let option=[{label:'全部',value:''}];
            data.forEach(item => {
                option.push({
                  label:item,
                  value:item
                })
            });
            this.searchSettings[2].options=option;

          }
        })
      })
    }
  }
  }

</script>
<style lang="scss" scoped>
.mainBox {
  padding: 15px;
}
.fenyeDiv {
  margin-top: 30px;
}
</style>