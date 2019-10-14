<template>
  <div class="mainBox">
    <div class="v-search-header">
      <el-row>
        <el-col :span="24">
          <v-search :search-settings="searchSettings" @search="searchItem" />
        </el-col>
        <el-col :span="2">
          <el-button class="exportBtn" type="success" size="mini" @click="handleExport">一键导出</el-button>
        </el-col>
      </el-row>
      
    </div>

    <el-table :data="tableData" style="width: 100%" >
      <el-table-column label="#" type="index" />
      <el-table-column label="部门" prop="departmentName" />
      <el-table-column label="来源" prop="origin" />
      <el-table-column label="点击量" prop="departmentArticleClickNumber" />
      <el-table-column label="发稿量" prop="departmentArticleNumber" />
    </el-table>
  </div>
</template>
<script>
import {getdxhStatistics,downdxhStatistics } from "@/api/cms/liveCharts";
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
          options: []
        },
        {
          label: "最近",
          name: "quckTime",
          type: "select",
          visible: true,
          value:'7',
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
          options: [],
          type: "datetime",
          changeOnSelect: true
        },
        {
          label: "结束时间",
          name: "endTime",
          visible: true,
          options: [],
          type: "datetime",
          changeOnSelect: true
        }
      ],
      beginTime: "",
      endTime: "",
      // sortBy:'clickNumInt',
      origin:'',
      tableData: []
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
      //获取来源列表
       fetchDict() {
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
              
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    searchItem(val) {


      //拦截重复时间
      if(val.quckTime&&val.beginTime||val.quckTime&&val.endTime){
           this.$message.error("请正确选择时间区间");
       return false;
      }
    //   if(val.columnId[0]==undefined){
    //        this.$message.error("请选择栏目");
    //     return false;
    //   }
      this.timeDeail(val);
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
      this.initTableList(this.channelId)
    },
    timeDeail(val) {
      
      if (val.quckTime) {
        //快捷
        this.endTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
        this.beginTime = dayjs()
          .subtract(val.quckTime, "day")
          .format("YYYY-MM-DD 00:00:00");
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
        } else if (val.beginTime == "") {
          this.$message.error("请选择开始时间");
          return false;
        } else if (val.endTime == "") {
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
        channelId:val,
        // sortBy:this.sortBy,
        origin:this.origin,
      };
      return new Promise((resolve, reject) => {
        getdxhStatistics(data)
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
    handleExport() {
       let data = {
        beginTime: this.beginTime,
        endTime: this.endTime,
        channelId:this.channelId,
        accessToken:'bearer '+JSON.parse(localStorage.getItem('hnDt_token')).access_token,
        // sortBy:this.sortBy,
        origin:this.origin,
      };

        // 调用下载接口
        downdxhStatistics(data)
        
      
    },

  }
};
</script>
<style lang="scss" scoped>
.mainBox {
  padding: 15px;
}
</style>