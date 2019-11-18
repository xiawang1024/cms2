<template>
  <div class="mainBox">
    <div class="v-search-header">
      <el-row>
        <el-col :span="24">
          <v-search :search-settings="searchSettings" @search="searchItem" @reset="reset" ref="vserch" />
        </el-col>
        <el-col :span="2">
          <el-button class="exportBtn" type="primary" size="mini" @click="handleExport" :disabled="tableData.length==0">一键导出</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="tableData" style="width: 100%" stripe>
      <!-- <el-table-column label="部门" prop="departmentName" width="200" /> -->
      <el-table-column label="来源" prop="origin" width="150" />
      <el-table-column label="ID序号" width="200" prop="id" />
      <el-table-column label="标题" prop="title" />
      <el-table-column label="类型" width="80" prop="articleShowStyle" />
      <el-table-column label="发布时间" width="200" prop="publishDate" />
      <el-table-column label="编辑" width="100" prop="createUser" />
      <el-table-column label="点击" width="200" prop="clickNumInt" />
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
import { getdxDocumentStatistics,downdxDocumentStatistics } from "@/api/cms/liveCharts";
import dayjs from "dayjs";
import store from "store";
import { mapGetters } from "vuex";
import { fetchDictByDictName } from "@/api/cms/dict";
export default {
  data() {
    return {
      channelId:'1161447048013287424',
      searchSettings: [
        {
          label: "栏目名称",
          name: "columnId",
          type: "cascader",
          visible: "true",
          value:["1161445440512724992",'1161447048013287424'],
          // value:["1108265560111714304","1126019193184063488"], //默认大象号ID  "1161447048013287424"
          changeOnSelect: true,
          options: []
        },
        // {
        //   label: "排序方式",
        //   name: "sortBy",
        //   type: "select",
        //   visible: "true",
        //   value:'clickNumInt',
        //   changeOnSelect: true,
        //   options: [
        //       {
        //           label:'点击量',
        //           value:'clickNumInt'

        //       },
        //       {
        //           label:'来源',
        //           value:'origin'

        //       }
        //   ]
        // },
        {
            label: "来源",
          name: "origin",
          type: "select",
          visible: "true",
          value:'',
          changeOnSelect: true,
          filterable:true,
          options: []
        },
        {
          label: "最近",
          name: "quckTime",
          type: "select",
          visible: true,
          value:'',
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
        }
      ],
      beginTime: "",
      endTime: "",
      // sortBy:'clickNumInt',
      origin:'',
      tableData: [],
      pageNo:1,
      pageSize:10,
      total:0,
      tenantId:'',
    };
  },
  computed: {
    ...mapGetters(["columnAll"])
  },
  watch: {
    columnAll(val) {
      this.searchSettings[0].options = val;
    }
  },
  created() {
      this.fetchDict();

  },
  mounted() {
    this.searchSettings[0].options = this.columnAll.length
      ? this.columnAll
      : store.get("columnsAll");

   this.searchItem({quckTime:7,columnId:this.searchSettings[0].value});

  },
  methods: {
    searchItem(val) {


      //拦截重复时间
      if(val.quckTime&&val.beginTime||val.quckTime&&val.endTime){
           this.$message.error("请正确选择时间区间");
       return false;
      }
      // if(val.columnId[0]==undefined){
      //      this.$message.error("请选择栏目");
      //   return false;
      // }
      let flag=this.timeDeail(val);

      
      if(val.columnId){
        let columnId=JSON.parse(JSON.stringify(val.columnId)).reverse()[0]
        this.channelId=columnId;
      }else{
        this.channelId=''
      }
      
      // console.log(this.beginTime, this.endTime,columnId, "time");
      //  if(val.sortBy){
      //      this.sortBy=val.sortBy;
      //  }
       if(val.origin){
           this.origin=val.origin;
       }else{
         this.origin=''
       }
      
      // console.log(this.beginTime, this.endTime,columnId, "time");
      if(flag){
      this.initTableList(this.channelId)

      }
    },
    timeDeail(val) {
      
      if (val.quckTime) {
        //快捷
        this.endTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
        this.beginTime = dayjs()
          .subtract(val.quckTime, "day")
          .format("YYYY-MM-DD 00:00:00");
          return true;
      } else {
        if (val.beginTime && val.endTime) {
          // 发送请求
          if (val.beginTime > val.endTime) {
            this.beginTime = dayjs(val.endTime).format("YYYY-MM-DD HH:mm:ss");
            this.endTime = dayjs(val.beginTime).format("YYYY-MM-DD HH:mm:ss");
          } else {
            this.beginTime = dayjs(val.beginTime).format("YYYY-MM-DD HH:mm:ss");
            this.endTime = dayjs(val.endTime).format("YYYY-MM-DD HH:mm:ss");
          }
          return true;
        } else if (val.beginTime == ""||val.beginTime==undefined) {
          this.$message.error("请选择开始时间");
          return false;
        } else if (val.endTime == ""||val.endTime==undefined) {
          this.$message.error("请选择结束时间");
          return false;
        }
        //自选
      }
    },

    //查询请求
    initTableList(val) {
      let data = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        channelId:this.channelId,
        // sortBy:this.sortBy,
        origin:this.origin,
        pageNo:this.pageNo,
        pageSize:this.pageSize,
        tenantId:this.tenantId
      };
      return new Promise((resolve, reject) => {
        getdxDocumentStatistics(data)
          .then(res => {
            if (res.data.code == 0) {
              if(res.data.result.total>5000){
                this.$message.error("查询数据量超过5000条，请缩短时间范围！")
              }else{
                 this.tableData = res.data.result.content;
              this.total=res.data.result.total

              }
             
            } else {
              this.$message.error(res.data.msg);
              this.total=0;
              this.tableData=[];
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    handleExport() {
       let data = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        channelId:this.channelId,
        accessToken:'bearer '+JSON.parse(localStorage.getItem('hnDt_token')).access_token,
        //  sortBy:this.sortBy,
        origin:this.origin,
      };
      if(this.total>5000){
        this.$message.error("导出数据量不能超过5000条！")
      }else{
        downdxDocumentStatistics(data)

      }
     
        
      
    },

    //前端下载
    // handleDownload() {
    //   import("@/vendor/Export2Excel").then(excel => {
    //     const tHeader = [
    //       "来源",
    //       "ID序号",
    //       "标题",
    //       "类型",
    //       "发布时间",
    //       "编辑",
    //       "点击"
    //     ];
    //     const filterVal = [
    //       "origin",
    //       "id",
    //       "title",
    //       "articleShowStyle",
    //       "publishDate",
    //       "createUser",
    //       "clickNumInt"
    //     ];
    //     const list = this.tableData;
    //     const data = this.formatJson(filterVal, list);
    //     excel.export_json_to_excel({
    //       header: tHeader,
    //       data,
    //       filename: this.filename,
    //       autoWidth: this.autoWidth,
    //       bookType: this.bookType
    //     });
    //     this.downloadLoading = false;
    //   });
    // },
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v =>
    //     filterVal.map(j => {
    //       if (j === "timestamp") {
    //         return parseTime(v[j]);
    //       } else {
    //         return v[j];
    //       }
    //     })
    //   );
    // }
    //获取来源列表
       fetchDict() {
         this.tenantId=JSON.parse(localStorage.getItem('BaseInfor')).clientLicenseId;
      var _this = this;
      return new Promise((resolve, reject) => {
        fetchDictByDictName("文稿来源")
          .then(response => {
            if (
              response.data.result.details &&
              response.data.result.details.length
            ) {
              _this.sourceList = response.data.result.details.map(ele => {
                return {
                  label: ele.dictDetailName,
                  value: ele.dictDetailName
                };
              });
              _this.searchSettings[1].options = _this.sourceList;
              _this.$refs.vserch.updateForm();
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    reset(){
      this.beginTime='';
      this.endTime='';
      this.searchSettings[2].value='';
      this.pageNo=1;
      this.pageSize10;
      this.tableData=[];
      this.total=0;

    },
    //分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      this.initTableList();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.initTableList();
     
    }
  }
};
</script>
<style lang="scss" scoped>
.mainBox {
  padding: 15px;
}
</style>