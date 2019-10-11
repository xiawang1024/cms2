<template>
  <div class="components-container">
    <!-- <pap-search ref="papSearchForm" :content="searchForm">
    </pap-search>-->
    <div class="v-search-header">
      <v-search :search-settings="searchSettings" @search="search" />
    </div>
    <!-- 根据 buttonArray 中的 click 参数，对外暴露监听其中的方法，并在当前页面中监听并实现对应的业务 -->
    <button-group
      :button-array="buttonArray"
      @list-click="listClick()"
      @create-click="createClick"
      @edit-click="editClick"
      @enable-click="enableClick"
      @disable-click="disableClick"
    />
    <!-- 表格的数据展示，参数放置到 tableConfig 中进行传入。 -->
    <!-- 分页条处理：每页条数变化、当前页页码条数、表格选中数据监听 -->
    <pap-table
      ref="organizationTable"
      v-bind="tableConfig"
      @handle-size-change="handleSizeChange"
      @handle-current-change="handleCurrentChange"
      @multiple-selection="multipleSelectionEmit"
      @handel-permission="handelPermission"
    />
    <!-- 允许当前页面被其他组件依赖，依赖的过程中，允许具名slot，保证明确的节点被插入到当前组件中 -->
    <slot name="fotter-slot" />
    <!-- 向子组件内部传递dialogSubmitClickEmit 数据，数据对应的值，需要进行额外的监听，数据会返还回来  -->
    <pap-dialog
      ref="organization-dialog-ref"
      :dialog-submit-click-emit="dialogSubmitClickEmit"
      :content-form="dialogForm"
      @dialogSubmitClick="dialogSubmitClick"
    />
    <el-dialog title="分配权限" :visible.sync="sendPermissionVisible" width="70%">
      <!-- <el-input type="textarea" :rows="2" placeholder="请输入权限编码，用逗号隔开" v-model="permissionCode"></el-input> -->
      <div class="v-search-header">
        <v-search :search-settings="dialogSearchSettings" @search="dialogSearch" />
      </div>
      <pap-table
        ref="organizationDailogTable"
        v-bind="dialogTableConfig"
        @handle-size-change="dialogHandleSizeChange"
        @handle-current-change="dialogHandleCurrentChange"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="sendPermissionVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="sendPermission()" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PapSearch from "@/components/pap/search/index";
import PapTable from "@/components/pap/table/index";
import PapDialog from "@/components/pap/dialog/index";
import ButtonGroup from "@/components/pap/button-group/index";
import { PermissionList } from "@/api/user/permission";
import {
  OrganizationList,
  OrganizationCreate,
  OrganizationUpdate,
  OrganizationUpdateForEnable,
  OrganizationCheckCode,
  OrganizationPermission
} from "@/api/user/organization";
import {
  buttonArray,
  searchForm,
  searchSettings,
  dialogSearchSettings,
  dialogForm
} from "./setting.js";

export default {
  name: "SysOrganization",
  components: {
    PapSearch,
    PapTable,
    PapDialog,
    ButtonGroup
  },

  data() {
    dialogForm[3].rules[0].validator = this.checkOrganizationRepeat;
    return {
      /* eslint-disable */
      // 按钮组
      buttonArray: buttonArray,

      // 表格
      tableConfig: {
        // 多页选中数据回显，分页记录保存选中的数据
        rowKeys: "organizationId",
        colomn: [
          { prop: "organizationCode", label: "租户编码" },
          { prop: "organizationName", label: "租户名称" },
          { prop: "organizationManager", label: "租户管理者" },
          { prop: "remark", label: "备注" },
          {
            prop: "enableFlag",
            label: "状态",
            formatter: row => (row.enableFlag === 1 ? "启用" : "禁用")
          }
        ],
        // 表格内添加操作
        slotHandel: true,
        tableData: [],
        paginationPageNo: 1,
        paginationSize: 10,
        total: 0
      },
      // 表格选择的值
      multipleSelection: [],

      // 搜索框
      searchForm: searchForm,
      searchSettings: searchSettings,
      dialogSearchSettings: dialogSearchSettings,
      // 搜索条件
      searchData: {
        organizationCode: "",
        organizationName: "",
        organizationType: "CUSTOMER"
      },
      // 弹框内搜索
      dialogSearchData: {},
      // 弹出框表单
      dialogForm: dialogForm,
      dialogSubmitClickEmit: "dialogSubmitClick",
      dialogOperationType: "",
      dialogOrganizationCopyTemp: "",
      filename: "",
      // 分配权限弹框
      sendPermissionVisible: false,
      // 权限弹框数据
      dialogTableConfig: {
        rowKeys: "permissionId",
        colomn: [
          { prop: "permissionName", label: "权限名称" },
          { prop: "permissionCode", label: "权限编码" },
          { prop: "sysApplicationId", label: "所属系统" }
        ],
        // 表格内添加操作
        tableData: [],
        paginationPageNo: 1,
        paginationSize: 10,
        total: 0
      },
      organizationData: {}
      /* eslint-disable */
    };
  },
  mounted: function() {
    this.getList();
  },
  methods: {
    // 获取权限列表
    getPermissionList() {
      var _this = this;
      return new Promise((resolve, reject) => {
        PermissionList(
          _this.dialogSearchData,
          this.dialogTableConfig.paginationPageNo,
          this.dialogTableConfig.paginationSize
        )
          .then(async res => {
            _this.dialogTableConfig.total = res.data.result.total;
            _this.dialogTableConfig.tableData = res.data.result.content;
            // 结束
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 权限弹框操作事件
    dialogHandleSizeChange(val) {
      this.dialogTableConfig.paginationPageNo = 1;
      this.dialogTableConfig.paginationSize = val;
      this.getPermissionList();
    },
    dialogHandleCurrentChange(val) {
      this.dialogTableConfig.paginationPageNo = val;
      this.getPermissionList();
    },
    // 点击分配权限确定
    handelPermission(val) {
      this.organizationData = val;
      this.sendPermissionVisible = true;
      this.getPermissionList();
      this.$nextTick(() => {
        this.$refs.organizationDailogTable.$refs.papBaseTable.clearSelection();
      });
    },
    // 点击弹框内搜索
    dialogSearch(data) {
      this.$refs.organizationDailogTable.paginationPageNo = 1;
      this.dialogSearchData = data;
      this.dialogTableConfig.paginationPageNo = 1;
      this.getPermissionList();
    },
    // 点击搜索
    search(data) {
      this.searchData = data;
      this.tableConfig.paginationPageNo = 1;
      this.$refs.organizationTable.paginationPageNo = 1;
      this.searchData.organizationType = "CUSTOMER";
      this.getList();
    },
    getList() {
      var _this = this;
      // var searchFormObj = this.$refs.papSearchForm.$refs.formRender.getFormValue()
      return new Promise((resolve, reject) => {
        // 开始请求
        OrganizationList(
          _this.searchData,
          this.tableConfig.paginationPageNo,
          this.tableConfig.paginationSize
        )
          .then(async res => {
            _this.tableConfig.total = res.data.result.total;
            _this.tableConfig.tableData = res.data.result.content;
            // 结束
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 确认分配权限
    sendPermission() {
      const choosedPermission = this.$refs.organizationDailogTable.multipleSelection.map(
        ele => {
          return ele.permissionCode;
        }
      );
      if (!choosedPermission.length) {
        this.$message.warning("请选择至少一个权限");
        return;
      }
      return new Promise((resolve, reject) => {
        // 开始请求
        let params = {
          permissionCodeList: choosedPermission,
          clientLicenseId: this.organizationData.organizationCode
        };
        OrganizationPermission(params)
          .then(res => {
            this.sendPermissionVisible = false;
            this.$message.success("添加成功");
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 监听表格选中值变化, 并复制到当前组件中，便于手续也租户.
    multipleSelectionEmit(val) {
      this.multipleSelection = val;
      // 这里根据表格选中值的数据条数进行判断，将按钮中的数据进行动态维护
      if (this.multipleSelection.length !== 1) {
        // 在进行按钮组禁用/启用的过程中，有可能父组件会向当前组件传递buttonArrayProps 数据，此时buttonArray 数组的值将发生变化，故此处需要强制判断
        if (
          this.buttonArray.length > 2 &&
          this.buttonArray[2].name === "编辑" &&
          this.buttonArray[3].name === "审核通过" &&
          this.buttonArray[4].name === "审核拒绝"
        ) {
          this.buttonArray[2].disabled = true;
          this.buttonArray[3].disabled = true;
          this.buttonArray[4].disabled = true;
        }
      } else {
        if (
          this.buttonArray.length > 2 &&
          this.buttonArray[2].name === "编辑" &&
          this.buttonArray[3].name === "审核通过" &&
          this.buttonArray[4].name === "审核拒绝"
        ) {
          this.buttonArray[2].disabled = false;
          if (this.multipleSelection[0].enableFlag === 0) {
            this.buttonArray[3].disabled = false;
          }
          if (this.multipleSelection[0].enableFlag === 1) {
            this.buttonArray[4].disabled = false;
          }
        }
      }
    },
    listClick() {
      // 点击搜索按钮，则默认从第一页开始搜索
      this.tableConfig.paginationPageNo = 1;
      this.getList();
    },
    createClick() {
      var _this = this;
      _this.$refs["organization-dialog-ref"].baseDialogVisible = true;
      _this.$nextTick(function() {
        _this.$refs["organization-dialog-ref"].$refs.formRender.updateForm({
          organizationId: "",
          organizationCode: "",
          organizationName: "",
          organizationManager: "",
          remark: ""
        });
        _this.dialogOperationType = "新增";
      });
    },
    dialogSubmitClick(data) {
      var _this = this;
      if (data.organizationId !== undefined && data.organizationId !== "") {
        return new Promise((resolve, reject) => {
          // 开始请求
          OrganizationUpdate(data)
            .then(async res => {
              _this.dialogSubmitClickCallback("租户更新", res, _this);
              // 结束
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          // 开始请求
          OrganizationCreate(data)
            .then(async res => {
              _this.dialogSubmitClickCallback("租户新增", res, _this);
              // 结束
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    },
    enableClick() {
      var _this = this;
      var enableFlagObj = this.multipleSelection[0];
      enableFlagObj.enableFlag = 1;
      return new Promise((resolve, reject) => {
        // 开始请求
        OrganizationUpdateForEnable(enableFlagObj)
          .then(async res => {
            _this.dialogSubmitClickCallback("租户审核", res, _this);
            // 结束
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    disableClick() {
      var _this = this;
      var enableFlagObj = this.multipleSelection[0];
      enableFlagObj.enableFlag = 0;
      return new Promise((resolve, reject) => {
        // 开始请求
        OrganizationUpdateForEnable(enableFlagObj)
          .then(async res => {
            _this.dialogSubmitClickCallback("租户审核", res, _this);
            // 结束
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    dialogSubmitClickCallback(type, res, contextThis) {
      const h = contextThis.$createElement;
      if (res.data.code == 0) {
        contextThis.$notify({
          title: type,
          message: h("i", { style: "color: teal" }, type + "成功!")
        });
        contextThis.$refs["organization-dialog-ref"].baseDialogVisible = false;
        contextThis.getList();
        // 查询成功之后，清空表格的选中值
        contextThis.$refs["organization-table"].$refs[
          "pap-base-table"
        ].clearSelection();
      } else {
        contextThis.$notify({
          title: type,
          message: h("i", { style: "color: teal" }, res.data.result)
        });
      }
    },
    editClick() {
      var _this = this;
      _this.$refs["organization-dialog-ref"].baseDialogVisible = true;
      var selObj = _this.multipleSelection[0];
      _this.$nextTick(function() {
        _this.$refs["organization-dialog-ref"].$refs.formRender.updateForm(
          selObj
        );
        _this.dialogOperationType = "修改";
        _this.dialogOrganizationCopyTemp = selObj.organizationCode;
      });
    },
    checkOrganizationRepeat(rule, value, callback) {
      var _this = this;
      if (!value) {
        return callback(new Error("请输入租户编码"));
      }
      var organizationCode = _this.$refs[
        "organization-dialog-ref"
      ].$refs.formRender.getFormValue().organizationCode;
      return new Promise((resolve, reject) => {
        OrganizationCheckCode(organizationCode)
          .then(response => {
            if (_this.dialogOperationType == "新增") {
              if (response.data.result == 0 || response.data.result == -1) {
                callback();
              } else {
                callback(new Error("租户编码不能重复"));
              }
            }
            if (_this.dialogOperationType == "修改") {
              console.log(_this.dialogOrganizationCopyTemp);
              if (
                _this.dialogOrganizationCopyTemp ===
                _this.$refs[
                  "organization-dialog-ref"
                ].$refs.formRender.getFormValue().organizationCode
              ) {
                callback();
              }
              if (response.data.result == 0 || response.data.result == -1) {
                callback();
              } else {
                callback(new Error("租户编码不能重复"));
              }
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    handleSizeChange(val) {
      this.tableConfig.paginationPageNo = 1;
      this.tableConfig.paginationSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.tableConfig.paginationPageNo = val;
      this.getList();
    }
  }
};
</script>
