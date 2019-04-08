<template>
  <div class="column-manage">
    <div class="topdiv">
      <div class="topdivLeft">爆料列表</div>
      <div class="topdivRight">
        <el-button icon="el-icon-refresh" type="primary">刷新</el-button>
      </div>
    </div>

    <div class="auditBtn">
      <div @click="auditBtnsClik(0,$event)" :class="[activeClass0 == 0 ? 'activeClass0':'','auditBtns','auditBtnAll']">
        全部申请(
        <span class="auditBtnSpan">1000</span> )
      </div>
      <div @click="auditBtnsClik(1,$event)" :class="[activeClass0 == 1 ? 'activeClass0':'','auditBtns','auditBtnOrder']">
        待审核(
        <span class="auditBtnSpan">1000</span> )
      </div>
      <div @click="auditBtnsClik" class="auditBtns auditBtnOver">
        已通过(
        <span class="auditBtnSpan">1000</span> )
      </div>
      <div @click="auditBtnsClik" class="auditBtns auditBtnReject">
        已拒绝(
        <span class="auditBtnSpan">1000</span> )
      </div>
    </div>

    <div class="el-card__header">
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div>
    <div class="tool-bar">
      <el-button
        type="primary"
        v-if="checkAuth('cms:channel:add')"
        @click="columnAddEdit('addDisclose')"
        size="small"
      >添加</el-button>
    </div>

    <el-table :header-cell-style="{color:'#000'}" border :data="tableData" style="width: 100%">
      <el-table-column align="center" type="selection"/>
      <el-table-column align="center" prop="channelName" label="标题" show-overflow-tooltip/>

      <el-table-column align="center" prop="channelCode" label="摘要"/>
      <el-table-column align="center" prop="domainName" label="爆料分类"/>
      <el-table-column align="center" prop="managerUser" label="爆料人"/>
      <el-table-column align="center" prop="hiddenFlag" label="处理状态">
        <template slot-scope="scope">
          <span v-if="scope.row.hiddenFlag == 1">待处理</span>
          <span v-else>已通过</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="modifyTime" label="爆料时间"/>

      <el-table-column align="center" label="操作" width="150">
        <template v-if="checkAuth('cms:channel:operation')" slot-scope="scope">
          <el-button type="text">审核</el-button>
          <el-button
            type="text"
            v-if="checkAuth('cms:channel:delete')"
            @click="columnDel(scope.row)"
          >编辑</el-button>
          <el-button type="text" @click="columnAddEdit('discloseView')">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageNum"
      :page-sizes="[100]"
      :page-size="pageSize"
      :total="totalCount"
      background
      class="pagination"
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
// import { fetchDictByDictName } from '@/api/cms/dict'
import { columnList, deleteColumn } from "@/api/cms/columnManage";
import mixins from "@/components/cms/mixins";
export default {
  name: "ColumnManage",
  mixins: [mixins],
  data() {
    return {
      activeClass0:0,
      tableData: [],
      pageNum: 1,
      pageSize: 100,
      totalCount: 0,
      searchSettings: [
        {
          label: "栏目名称",
          name: "channelName",
          placeholder: "请输入栏目名称",
          visible: true,
          options: [],
          type: "cascader"
        },
        {
          label: "状态",
          name: "hiddenFlag",
          placeholder: "请选择",
          visible: true,
          type: "select",
          options: [
            {
              label: "显示",
              value: 0
            },
            {
              label: "隐藏",
              value: 1
            }
          ]
        }
      ],
      searchData: {}
    };
  },
  watch: {
    $route(val) {
      console.log(val);
      this.columnList();
      this.columnSearchList();
    }
  },
  mounted() {
    this.columnList();
  },
  created() {
    this.columnSearchList();
  },
  methods: {
   auditBtnsClik(num,e){
    //  e.target 点击的元素  e.currentTarget是绑定事件元素
    console.log(e)
    console.log(num)
    this.activeClass0=num
   },
    columnSearchList() {
      var _this = this;
      return new Promise((resolve, reject) => {
        columnList({}, 1, 1000)
          .then(response => {
            this.$nextTick(() => {
              _this.searchSettings[0].options = _this.toTree(
                response.data.result.content
              );
            });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    channelNameChange(val) {
      let arr = [];
      if (val) {
        arr = val.split(",").concat([""]);
      } else {
        arr = [];
      }
      return arr;
    },
    checkAuth(authKey) {
      if (this.$store.getters.authorities.indexOf(authKey) === -1) {
        return false;
      } else {
        return true;
      }
    },
    searchItem(searchData) {
      this.searchData = searchData;
      if (this.searchData.channelName && this.searchData.channelName.length) {
        this.searchData.channelName = this.searchData.channelName[
          this.searchData.channelName.length - 1
        ];
      } else {
        this.searchData.channelName = "";
      }
      this.pageNum = 1;
      this.columnList();
    },
    columnList() {
      var _this = this;
      return new Promise((resolve, reject) => {
        columnList(_this.searchData, _this.pageNum, _this.pageSize)
          .then(response => {
            _this.tableData = response.data.result.content;
            console.log("_this.tableData_this.tableData_this.tableData");
            console.log(_this.tableData);
            _this.totalCount = response.data.result.total;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    columnDelFeatch(row) {
      var _this = this;
      return new Promise((resolve, reject) => {
        deleteColumn({ channelId: row.channelId })
          .then(response => {
            _this.columnList();
            console.log(321);
            if (response.data.code === 0) {
              _this.$message.success("操作成功！");
            } else {
              _this.$message.success(response.data.msg);
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.columnList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.columnList();
    },
    columnAddEdit(handelType) {
      if(handelType=="addDisclose"){
      this.$router.push({
        path: "/newCommand/manageClue/addDisclose",
   
      });
      }else if(handelType=="discloseView"){
      this.$router.push({
        path: "/newCommand/manageClue/discloseDetails",
   
      });
      }

    },
    columnTemplate(row) {
      this.$router.push({
        path: "/cms/website/columnTemplate",
        query: {
          channelId: row.channelId,
          parentChannelId: row.parentChannelId
        }
      });
    },
    extendsWord(row) {
      this.$router.push({
        path: "/cms/website/extendsWord",
        query: {
          channelId: row.channelId
        }
      });
    },
    tagSetting(row) {
      this.$router.push({
        path: "/cms/website/tagSetting",
        query: {
          channelId: row.channelId
        }
      });
    },
    waterSetting(row) {
      this.$router.push({
        path: "/cms/website/waterSetting",
        query: {
          channelId: row.channelId
        }
      });
    },
    columnDel(row) {
      this.$confirm("此操作将永久删除该栏目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.columnDelFeatch(row);
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang='scss'>
.topdiv {
  display: flex;
  justify-content: space-between;
  background: rgba(243, 243, 243, 1);
  align-items: center;
  height: 60px;
  box-sizing: border-box;
  padding: 0 18px;
}
.topdivLeft {
  position: relative;
  font-family: "微软雅黑";
  font-weight: 400;
  font-style: normal;
  color: #999999;
  box-sizing: border-box;
  padding: 0 10px;
}
.topdivLeft::before {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 5px;
  height: 24px;
  content: "";
  background: deepskyblue;
}
.auditBtn{
  height: 80px;
    display: flex;
    align-items: center;
    width: 600px;
    justify-content: space-between;
}
.auditBtns {
  cursor: pointer;
    width: 135px;
    height: 40px;
    line-height: 40px;
  background: inherit;
  // background-color: rgba(0, 121, 254, 1);
  background-color:white;
  font-family: "微软雅黑";
  font-weight: 400;
  font-style: normal;
  border-width: 1px;
    border-style: solid;
    border-color: rgba(228, 228, 228, 1);
    border-radius: 0px;
        text-align: center;
        font-size: 14px;
}
.activeClass0{
      background-color: rgba(0, 121, 254, 1);
      color: white;
      .auditBtnSpan {
          color: white;
      }
}
// .auditBtns:hover{
//   color: #67c23a;
// }
// .auditBtns:hover .auditBtnSpan{
//   color: #67c23a;
// }
.auditBtnSpan {
  color: rgb(240, 72, 68);
}
.column-manage {
  margin: 30px;
  .tool-bar {
    margin-top: 22px;
  }
  .pagination {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .el-table {
    // td, th{
    //   padding:0;
    // }
    .space-holder {
      width: 2px;
      height: 20px;
      background-color: #67c23a;
      display: inline-block;
      vertical-align: middle;
      margin-right: 5px;
    }
    .space-length {
      width: 10px;
      height: 20px;
      display: inline-block;
      vertical-align: middle;
    }
    tr {
      td {
        padding: 0px;
      }
    }
  }
}
</style>
