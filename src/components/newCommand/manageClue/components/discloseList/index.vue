<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 15:25:26
 * @LastEditTime: 2019-08-19 15:38:54
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="column-manage">
    <div class="topdiv">
      <div class="topdivLeft">爆料列表</div>
      <div class="topdivRight">
        <el-button
          icon="el-icon-refresh"
          type="primary"
        >刷新</el-button>
      </div>
    </div>

    <div class="auditBtn">
      <div
        @click="auditBtnsClik(0,$event)"
        :class="[activeClass0 == 0 ? 'activeClass0':'','auditBtns','auditBtnAll']"
      >
        全部申请(
        <span class="auditBtnSpan">1000</span> )
      </div>
      <div
        @click="auditBtnsClik(1,$event)"
        :class="[activeClass0 == 1 ? 'activeClass0':'','auditBtns','auditBtnOrder']"
      >
        待审核(
        <span class="auditBtnSpan">1000</span> )
      </div>
      <div
        @click="auditBtnsClik(2,$event)"
        :class="[activeClass0 == 2 ? 'activeClass0':'','auditBtns','auditBtnOrder']"
      >
        已通过(
        <span class="auditBtnSpan">1000</span> )
      </div>
      <div
        @click="auditBtnsClik(3,$event)"
        :class="[activeClass0 == 3 ? 'activeClass0':'','auditBtns','auditBtnOrder']"
      >
        已拒绝(
        <span class="auditBtnSpan">1000</span> )
      </div>
    </div>

    <div class="v-search-header">
      <v-search
        :search-settings="searchSettings"
        @search="searchItem"
      />
    </div>
    <div class="tool-bar">
      <el-button
        type="primary"
        v-if="checkAuth('cms:channel:add')"
        @click="columnAddEdit('addDisclose')"
        size="small"
      >添加</el-button>
    </div>

    <el-table
      ref="multipleTable"
      :header-cell-style="{color:'#000'}"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        type="selection"
      />
      <el-table-column
        align="center"
        prop="channelName"
        label="标题"
        show-overflow-tooltip
      />

      <el-table-column
        align="center"
        prop="channelCode"
        label="线索来源"
      />
      <el-table-column
        align="center"
        prop="domainName"
        label="爆料分类"
      />
      <el-table-column
        align="center"
        prop="managerUser"
        label="爆料人"
      />
      <el-table-column
        align="center"
        prop="hiddenFlag"
        label="处理状态"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.hiddenFlag == 1">待处理</span>
          <span v-else>已通过</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        prop="modifyTime"
        label="爆料时间"
      />

      <el-table-column
        align="center"
        label="操作"
        width="150"
      >
        <template
          v-if="checkAuth('cms:channel:operation')"
          slot-scope="scope"
        >
          <el-button type="text">审核</el-button>
          <el-button
            type="text"
            v-if="checkAuth('cms:channel:delete')"
            @click="columnDel(scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            @click="columnAddEdit('discloseView')"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottomdiv">
      <div class="btmdivleft">
        <div class="choose">
          <el-checkbox
            size="medium"
            @change="allchooses"
            v-model="allchoose"
          >全选</el-checkbox>
        </div>
        <div class="operate">
          <template>
            <el-select
              size="mini"
              v-model="operateVal"
              placeholder="批量操作"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>

        </div>
        <el-button
          class="confirm"
          size="mini"
        >确定</el-button>

      </div>
      <div class="btmright">
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
    </div>
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
      allchoose: false,
      options1: [
        {
          value: "选项1",
          label: "审核"
        },
        {
          value: "选项2",
          label: "删除"
        },
        {
          value: "选项3",
          label: "其他"
        }
      ],
      operateVal: "",
      activeClass0: 0,
      tableData: [],
      pageNum: 1,
      pageSize: 100,
      totalCount: 0,
      searchSettings: [
        {
          label: "输入搜索",
          name: "shuruselect",
          placeholder: "服务单号",
          visible: true,
          options: [],
          type: "cascader"
        },
        {
          label: "爆料时间",
          name: "discloseTime",
          placeholder: "请选择时间",
          visible: true,
          options: [],
          type: "date"
        },

        {
          label: "状态",
          name: "chulistate",
          placeholder: "全部",
          visible: true,
          type: "select",
          options: [
            {
              label: "待处理",
              value: 0
            },
            {
              label: "已处理",
              value: 1
            },
            {
              label: "已拒绝",
              value: 2
            }
          ]
        },
        {
          label: "申请时间",
          name: "applyforTime",
          placeholder: "请选择时间",
          visible: false,
          options: [],
          type: "date"
        },

        {
          label: "操作人员",
          name: "chulistate",
          placeholder: "全部",
          visible: false,
          type: "select",
          options: [
            {
              label: "待处理",
              value: 0
            },
            {
              label: "已处理",
              value: 1
            },
            {
              label: "已拒绝",
              value: 2
            }
          ]
        },
        {
          label: "处理时间",
          name: "manageTime",
          placeholder: "请选择时间",
          visible: false,
          options: [],
          type: "date"
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
    allchooses() {
      var _this = this;
      if (this.allchoose) {
        this.tableData.forEach(row => {
          _this.$refs.multipleTable.toggleRowSelection(row, true);
        });
      } else {
        this.tableData.forEach(row => {
          _this.$refs.multipleTable.toggleRowSelection(row, false);
        });
      }
    },
    auditBtnsClik(num, e) {
      //  e.target 点击的元素  e.currentTarget是绑定事件元素
      console.log(666666555555444444);
      console.log(e, "4444");
      console.log(num, "66655");
      this.activeClass0 = num;
    },
    columnSearchList() {
      var _this = this;
      return new Promise((resolve, reject) => {
        columnList({}, 1, 1000)
          .then(response => {
            console.log(response, "666");
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
      if (handelType == "addDisclose") {
        this.$router.push({
          path: "/newCommand/manageClue/addDisclose"
        });
      } else if (handelType == "discloseView") {
        this.$router.push({
          path: "/newCommand/manageClue/discloseDetails"
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
.confirm {
  height: 28px;
  margin-left: 10px;
}
.operate {
  width: 122px;
  margin-left: 10px;
}
.btmdivleft {
  display: flex;
  align-items: center;
}
.bottomdiv {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.choose {
  padding-left: 16px;
}
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
  background: #409eff;
}
.auditBtn {
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
  background-color: white;
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
.activeClass0 {
  background-color: #409eff;
  color: white;
  .auditBtnSpan {
    color: white;
  }
}

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
