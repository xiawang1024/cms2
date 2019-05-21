<template>
  <div class="kvBox">
    <div class="tool-bar">
      <el-input
        size="mini"
        v-model="searchKv"
        class="search-input"
        placeholder="请输入查询id"
        prefix-icon="el-icon-search"
        clearable
        @keyup.enter.native="search(searchKv)"
      />
      <el-button size="mini" type="primary" v-show="backButtonVisible" @click="backDetail">返回</el-button>
      <el-button size="mini" type="primary" @click="commentForm(3,'b')">检索</el-button>
      <el-button size="mini" type="primary" @click="commentForm(1,'b')">新增</el-button>
    </div>
    <el-table :data="allGroup">
      <el-table-column prop="id" label="组ID"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="tag" label="标签"/>
      <el-table-column prop="sort" label="排序"/>
      <el-table-column label="操作" fixed="right" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="commentForm(2, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleSerch(scope.row.id,scope.row.description)"
          >详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="fenyeDiv"
      :current-page="pageNum"
      :page-sizes="[10,30,60,100]"
      :page-size="pageSize"
      :total="totalCount"
      background
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog :visible.sync="dialogVisible" :title="handleType">
      <v-form
        ref="vform"
        :form-settings="formSettings"
        :form-data="formData"
        @save="submitSave"
        label-width="80px"
        :btn-loading="isLoading"
      />
    </el-dialog>
  </div>
</template>

<script>
import {
  getAllGroup,
  groupSave,
  deleteGroup,
  addGroupRequest,
  getAppDetail
} from "@/api/cms/KvGroup.js";

export default {
  data() {
    return {
      handdleID: "",
      searchKv: "",
      tenant: {
        kvGroupId: "",
        description: "",
        sort: "",
        tag: ""
      },
      addGroup: {
        tenantId: "",
        description: "",
        sort: "",
        tag: ""
      },
      Visible: false,
      addGroupVisible: false,
      allGroup: [],
      pageNum: 1, // 分页当前页
      pageSize: 10,
      totalCount: 0,
      backButtonVisible: false,
      defaultData: {
        description: "",
        id: "",
        sort: "",
        tag: "",
        tenantId: this.$store.getters.tenantId
      },
      searchData: {
        description: "",
        id: "",
        sort: "",
        tag: "",
        tenantId: this.$store.getters.tenantId
      },
      dialogTitle: "新增",
      dialogVisible: false,
      formData: {},
      formSettings: [
        {
          items: [
            {
              label: "描述",
              name: "description",
              type: "text",
              required: true,
              placeholder: "请输入描述"
            },
            {
              label: "排序",
              name: "sort",
              type: "text",
              required: true,
              value: 1,
              placeholder: "请输入数字"
            },
            {
              label: "标签",
              name: "tag",
              type: "text",
              required: true,
              placeholder: "请输入标签"
            },
            {
              label: "id",
              name: "id",
              type: "text",
              required: true,
              valueType: "number",
              placeholder: "请输入id",
              hidden: true
            }
          ]
        }
      ],
      isLoading: false,
      handleType: ""
    };
  },
  created() {
    var _this = this;
    this.getTableData(_this.defaultData);
  },
  methods: {
    //通用对话框
    commentForm(a, b) {
      this.dialogVisible = true;
      if (a == 1) {
        this.handleType = "新增";
        this.formData = {};
        this.formSettings[0].items[3].hidden = true;
        this.formSettings[0].items[0].required = true;
        this.formSettings[0].items[1].required = false;
        this.formSettings[0].items[2].required = false;
        this.formSettings[0].items[1].value = 1;

        //新增
      } else if (a == 2) {
        //修改
        this.handleType = "编辑";
        this.formData = {};

        // this.formSettings[0].items[3].hidden=true
        this.formSettings[0].items[3].hidden = true;
        this.formSettings[0].items[0].required = true;
        this.formSettings[0].items[1].required = false;
        this.formSettings[0].items[2].required = false;

        this.formData = b;
        this.handdleID = b.id;
      } else if (a == 3) {
        //检索
        this.handleType = "检索";
        this.formData = {};
        this.formSettings[0].items.forEach(item => {
          item.required = false;
        });
        // this.formSettings[0].items[3].hidden=false
        this.formSettings[0].items[1].value = "";
      }
    },
    submitSave(row) {
      var _this = this;
      let sendPass = true;
      if (this.handleType == "新增") {
        //新增接口

        let patt1 = /^[0-9]+$/;
        if (!patt1.test(row.sort)) {
          sendPass = false;
          return _this.$message({
            type: "error",
            message: "请在sort栏目输入数字!"
          });
        }
        if (sendPass) {
          this.addGroup = {
            tenantId: this.$store.getters.tenantId,
            description: row.description,
            sort: row.sort,
            tag: row.tag
          };
          this.handleAdd(this.addGroup);
          this.formData = {};
        }
      } else if (this.handleType == "编辑") {
        //修改接口

        let patt1 = /^[0-9]+$/;
        if (!patt1.test(row.sort)) {
          sendPass = false;
          return _this.$message({
            type: "error",
            message: "请在sort栏目输入数字!"
          });
        }
        if (sendPass) {
          _this.tenant = {
            description: row.description,
            sort: row.sort,
            tag: row.tag,
            id: _this.handdleID,
            tenantId: this.$store.getters.tenantId
          };
          this.handleEditeSave();
        }
      } else if (this.handleType == "检索") {
        if (sendPass) {
          this.searchData = {
            tenantId: this.$store.getters.tenantId,
            description: row.description,
            sort: row.sort,
            tag: row.tag,
            id: row.id
          };
          this.getTableData(this.searchData);
          _this.backButtonVisible = true;
        }
      }
    },

    //获取所有列表
    getTableData(obj) {
      var _this = this;
      return new Promise((resolve, reject) => {
        getAllGroup(_this.pageNum, _this.pageSize, obj)
          .then(response => {
            _this.totalCount = response.data.result.totalElements;
            _this.allGroup = response.data.result.content;
            _this.dialogVisible = false;
            resolve();
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },

    //根据配置组id检索
    search(id) {
      var _this = this;
      return new Promise((resolve, reject) => {
        getAppDetail(id)
          .then(response => {
            if (response.data.code == 0) {
              _this.allGroup = [response.data.result];
              _this.backButtonVisible = true;
            } else {
              alert("搜索失败");
            }

            resolve();
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    backDetail() {
      this.getTableData(this.defaultData);
      this.backButtonVisible = false;
      this.searchKv = "";
    },
    handleAdd(obj) {
      var _this = this;
      return new Promise((resolve, reject) => {
        addGroupRequest(obj)
          .then(response => {
            _this.dialogVisible = false;
            if (response.data.code == 0) {
              _this.$message({
                type: "success",
                message: "添加成功!"
              });
              _this.getTableData(_this.defaultData);
            }
            resolve();
          })
          .catch(reject => {
            console.log(reject);
            alert("请稍后再试！");
          });
      });
    },
    //查看详情
    handleSerch(id, des) {
      this.$router.push({
        path: "Kvdetail",
        query: {
          userid: id,
          des
        }
      });
    },
    //修改
    handleEdite(a, b) {
      //调用模态框
      this.Visible = true;
    },
    //修改保存、发送保存请求
    handleEditeSave() {
      var _this = this;

      return new Promise((resolve, reject) => {
        groupSave(_this.tenant)
          .then(response => {
            if (response.data.code == 0) {
              _this.dialogVisible = false;
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              _this.getTableData(this.defaultData);
            } else {
              this.$message({
                type: "error",
                message: "修改失败，请稍后再试!"
              });
            }
            resolve();
          })
          .catch(reject => {
            console.log(reject);
            this.$message({
              type: "error",
              message: "修改失败，请稍后再试!"
            });
          });
      });
    },
    //删除组
    handleDelete(a, b) {
      var _this = this;
      this.$confirm("此操作将永久删除该组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          new Promise((resolve, reject) => {
            deleteGroup(b.id)
              .then(response => {
                if (response.data.code == 0) {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  _this.getTableData(_this.defaultData);
                } else {
                  this.$message({
                    type: "error",
                    message: "删除失败，请稍后再试!"
                  });
                }

                resolve();
              })
              .catch(reject => {
                console.log(reject);
              });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData(this.defaultData);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getTableData(this.defaultData);
    }
  }
};
</script>
<style scoped>
.el-button + .el-button {
  margin-top: 5px;
  margin-left: 0px;
}
.kvBox {
  margin: 30px;
}
.helpdoc-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}

.search-input {
  /* width: auto; */
  width: 200px;
}
.fenyeDiv {
  margin-top: 30px;
}
</style>