<template>

  <div class="column-manages">

    <!-- <div class="topdiv">
      <div class="topdivLeft">爆料列表</div>
      <div class="topdivRight">
        <el-button @click="reloadlist" icon="el-icon-refresh" type="primary">刷新</el-button>
      </div>
    </div> -->
    <div class="auditBtn">
      <div
        @click="auditBtnsClik(0,$event)"
        :class="[activeClass0 == 0 ? 'activeClass0':'','auditBtns','auditBtnAll']"
      >
        全部申请(
        <span
          class="auditBtnSpan"
        >{{ discloseStatenum[0]+discloseStatenum[1]+discloseStatenum[2] }}</span> )
      </div>
      <div
        @click="auditBtnsClik(1,$event)"
        :class="[activeClass0 == 1 ? 'activeClass0':'','auditBtns','auditBtnOrder']"
      >
        待审核(
        <span class="auditBtnSpan">{{ discloseStatenum[0] }}</span> )
      </div>
      <div
        @click="auditBtnsClik(2,$event)"
        :class="[activeClass0 == 2 ? 'activeClass0':'','auditBtns','auditBtnOrder']"
      >
        已通过(
        <span class="auditBtnSpan">{{ discloseStatenum[1] }}</span> )
      </div>
      <div
        @click="auditBtnsClik(3,$event)"
        :class="[activeClass0 == 3 ? 'activeClass0':'','auditBtns','auditBtnOrder']"
      >
        已拒绝(
        <span class="auditBtnSpan">{{ discloseStatenum[2] }}</span> )
      </div>
    </div>
    <div class="el-card__header">
      <v-search :search-settings="searchSettings" @search="searchItem"/>
    </div>
    <div class="tool-bar">
      <el-button
        type="primary"
        v-if="checkAuth('cms:channel:add')"
        @click="columnAddEdit('addDisclose','')"
        size="small"
      >添加爆料</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :header-cell-style="{color:'#000'}"
      :data="tableData"
      style="width: 100%"
      size="mini">
      >
      <el-table-column min-width="300" align="left" prop="breakingName" label="标题" show-overflow-tooltip/>
      <el-table-column min-width="100" align="left" prop="newsOrigin" label="线索来源">
        <template slot-scope="scope">
          <span v-if="scope.row.newsOrigin == 0">电话</span>
          <span v-if="scope.row.newsOrigin == 1">数据接口</span>
          <span v-if="scope.row.newsOrigin == 2">App</span>
          <span v-if="scope.row.newsOrigin == 3">网站</span>
          <span v-if="scope.row.newsOrigin == 4">小程序</span>
          <span v-if="scope.row.newsOrigin == 5">其他</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100" align="left" prop="breakingType" label="爆料分类"/>
      <el-table-column min-width="100" align="left" prop="breakingPeople" label="爆料人"/>
      <el-table-column min-width="100" align="left" prop="auditStatus" label="处理状态">
        <template slot-scope="scope">
          <span class="colyellow" v-if="scope.row.auditStatus == 0">待处理</span>
          <span class="colgreen" v-if="scope.row.auditStatus == 1">已通过</span>
          <span class="colred" v-if="scope.row.auditStatus == 2">已拒绝</span>
        </template>
      </el-table-column>·
      <el-table-column min-width="220" align="left" prop="breakingTime" label="爆料时间"/>
      <el-table-column min-width="220" align="left" label="操作">
        <template v-if="checkAuth('cms:channel:operation')" slot-scope="scope">
          <div style="text-align:left">
            <el-button
              type="success"
              size="mini"
              @click="columnAddEdit('discloseView',scope.row.id)"
            >查看</el-button>
            <el-button
              type="primary"
              size="mini"
              v-if="checkAuth('cms:channel:delete')"
              @click="columnAddEdit('columnAddEdit',scope.row.id)"
            >编辑</el-button>
            <el-button
              v-if="scope.row.auditStatus==0"
              @click="columnAddEdit('discloseAudit',scope.row.id)"
              type="danger"
              size="mini"
            >审核</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageNum"
      :page-sizes="[15]"
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
import {
  discloseList,
  discloseState,
  discloseClassify
} from "@/api/newsCommand/disclose.js";
import { deleteColumn } from "@/api/cms/columnManage";
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
      pageSize: 15,
      totalCount: 0,
      searchSettings: [
        {
          label: "爆料名称",
          name: "breakingName",
          placeholder: "爆料名称",
          visible: true,
          type: "text"
        },
        {
          label: "爆料时间",
          name: "breakingTime",
          placeholder: "请选择时间",
          visible: true,
          options: [],
          type: "date"
        },
        {
          label: "状态",
          name: "auditStatus",
          placeholder: "全部",
          visible: true,
          type: "select",
          options: [
            {
              label: "待审核",
              value: 0
            },
            {
              label: "已通过",
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
      searchData: {},
      discloseClassifyNum: [], //爆料分类接口获取
      discloseStatenum: [0, 0, 0], //爆料状态数值
      uplistdata: {
        breakingName: "",
        breakingTime: "",
        auditStatus: "",
        pageNo: 1,
        pageSize: 15
      }
    };
  },
  watch: {
    $route(val) {
      // this.uplistdata.assign(this.searchData);
      // this.columnList(this.uplistdata);
      this.reloadlist()
    }
  },
  mounted() {
    // 获取爆料分类
    this.discloseClassify();
    this.discloseState(0);
    this.discloseState(1);
    this.discloseState(2);
  },
  created() {},
  methods: {
    reloadlist() {
      this.activeClass0 = 0;
      this.$router.replace({
        path: "/newCommand/manageClue/discloseList?time=" + new Date().getTime()
      });
    },
    checkAuth(authKey) {
      if (this.$store.getters.authorities.indexOf(authKey) === -1) {
        return false;
      } else {
        return true;
      }
    },
    // 搜索方法传入公共组件 searchData
    searchItem(searchData) {
      if ("auditStatus" in searchData) {
        this.activeClass0 = searchData.auditStatus + 1;
      } else {
        this.activeClass0 = 0;
      }
      this.searchData = searchData;
      if ("breakingTime" in this.searchData) {
        this.searchData.breakingTime = this.timeFormat(
          this.searchData.breakingTime
        );
      }
      this.pageNum = 1;
      let res = {};
      let uplistdata02 = Object.assign({}, this.uplistdata);
      let searchData02 = Object.assign({}, this.searchData);
      res = Object.assign(uplistdata02, searchData02);
      this.columnList(res);
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    timeFormat(timestamp) {
      //timestamp是整数，否则要parseInt转换,不会出现少个0的情况
      var time = new Date(timestamp);
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      var date = time.getDate();
      return year + "-" + this.add0(month) + "-" + this.add0(date);
    },
    // table列表数据
    columnList(res) {
      var _this = this;
      return new Promise((resolve, reject) => {
        discloseList(res)
          .then(response => {
            let content = response.data.result.content;
            content.forEach((element, idnex) => {
              element.breakingType =
                _this.discloseClassify[element.breakingType - 1].typeName;
            });
            _this.tableData = content;
            _this.totalCount = response.data.result.total;
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 搜索分类接口
    discloseClassify(callback) {
      var _this = this;
      return new Promise((resolve, reject) => {
        discloseClassify({}, 1, 1000)
          .then(response => {
            _this.discloseClassify = response.data.result;
          })
          .then(() => {
            // 初始化搜索信息
            let res = {
              breakingName: "",
              breakingTime: "",
              pageNo: _this.pageNum,
              pageSize: _this.pageSize
            };
            _this.columnList(res);
          });
      });
    },
    auditBtnsClik(num, e) {
      //  e.target 点击的元素  e.currentTarget是绑定事件元素
      this.activeClass0 = num;
      // 初始化搜索信息
      // 点击顶部按钮清空搜索条件 不然页数搜索附带条件
      this.searchData = {};
      if (num != 0) {
        this.uplistdata.auditStatus = num - 1;
      } else {
        this.uplistdata.auditStatus = "";
      }
      console.log(this.auditStatus);
      this.columnList(this.uplistdata);
    },
    /**
     * 查询审核状态0:待审核 1：已通过 2：已拒绝
     *  */
    discloseState(num) {
      var _this = this;
      return new Promise((resolve, reject) => {
        discloseState(num)
          .then(response => {
            _this.$nextTick(function() {
              this.$set(_this.discloseStatenum,num,response.data.result)
            });
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
      let res = {
        breakingName: "",
        breakingTime: "",
        auditStatus: null,
        pageNo: this.pageNum,
        pageSize: this.pageSize
      };
      this.columnList(res);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      let res = {
        breakingName: "",
        breakingTime: "",
        auditStatus: null,
        pageNo: this.pageNum,
        pageSize: this.pageSize
      };
      this.columnList(res);
    },
    columnAddEdit(handelType, id) {
      if (handelType == "addDisclose" || handelType == "columnAddEdit") {
        this.$router.push({
          path:
            "/newCommand/manageClue/addDisclose?Disclose=" +
            handelType +
            "&discloseId=" +
            id
        });
      } else if (
        handelType == "discloseView" ||
        handelType == "discloseAudit"
      ) {
        this.$router.push({
          path:
            "/newCommand/manageClue/discloseDetails?Disclose=" +
            handelType +
            "&discloseId=" +
            id
        });
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.column-manages {
.confirm {
  height: 28px;
  margin-left: 10px;
}
.operate {
  width: 122px;
  margin-left: 10px;
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
  display: flex;
  align-items: center;
  width: 520px;
  justify-content: space-between;
}
.auditBtns {
  cursor: pointer;
  width: 113px;
  height: 32px;
  line-height: 32px;
  background: inherit;
  background-color: white;
  font-family: "微软雅黑";
  font-weight: 400;
  font-style: normal;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(228, 228, 228, 1);
  border-radius: 4px;
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
  margin: 30px;
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
  .colyellow {
    color: #e6a23c;
  }
  .colgreen {
    color: #67c23a;
  }
  .colred {
    color: #f56c6c;
  }
  .el-card__header{
    padding-bottom: 0px;
  }
}
</style>
