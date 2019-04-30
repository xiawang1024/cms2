<template>
  <div class="box">
    <div class="tool-bar">
      <el-button size="mini" type="primary" @click="addTopList">新增</el-button>
    </div>
    <el-table :data="fullTopList">
      <el-table-column prop="name" label="顶部列表名字" :formatter="fomateName"/>
      <el-table-column prop="description" label="描述" :formatter="fomateDes"/>
      <el-table-column prop="url" label="链接地址" :formatter="fomateUrl"/>
      <el-table-column prop="sort" label="排序"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdite(scope.$index,scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="handleDetail(scope.$index,scope.row)">详情</el-button>
          <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :title="dialogTitle">
      <v-form
        ref="vform"
        :form-settings="formSettings"
        :form-data="formData"
        @save="submitSave"
        label-width="130px"
        @selectChange="selectChange"
        :btn-loading="isLoading"
      />
    </el-dialog>
  </div>
</template>
<script>
import {
  topTableSwitch,
  addtopTable,
  deletetopTable,
  edittopTable
} from "@/api/cms/appConfig.js";
export default {
  data() {
    return {
      navigationId: this.$route.query.navigationId,
      fullTopList: [],
      nothing: false,
      dialogVisible: false,
      dialogTitle: "添加",
      formData: {},
      formSettings: [
        {
          items: [
            {
              name: "have",
              label: "选择类型",
              type: "select",
              required: true,
              placeholder: "请选择类型",
              options: [
                {
                  label: "无顶部分类",
                  value: "0"
                },
                {
                  label: "有顶部分类",
                  value: "1"
                }
              ],
              events: {
                change: "selectChange"
              }
            },
            {
              label: "顶部列表名字",
              name: "name",
              type: "text",
              valueType: "string",
              disabled: false,
              hidden: true,
              //   required:true,
              placeholder: "请输入顶部列表名字"
            },
            {
              label: "描述",
              name: "description",
              type: "text",
              valueType: "string",
              disabled: false,
              hidden: true,
              placeholder: "请输入描述"
            },
            {
              label: "URL",
              name: "url",
              type: "text",
              valueType: "string",
              disabled: false,
              hidden: true,
              //   required:true,
              placeholder: "请输入URL"
            },
            {
              label: "排序",
              name: "sort",
              value: 1,
              type: "number",
              valueType: "number",
              disabled: false,
              required: true,
              placeholder: "请输入序列号"
            }
          ]
        }
      ],
      handleType: "",
      currentRow: "",
      currentIndex: "",
      isLoading: false,
      pageNo: 1,
      pageSize: 10
    };
  },
  created() {
    //发送请求数据
    this.getFullTobList();
  },

  methods: {
    //格式化数据
    fomateName(val) {
      let data = "";
      if (val.name == "undefined") {
        data = "无";
        return data;
      }
       return val.name
      
    },
    fomateDes(val) {
      let data = "";
      if (val.description == "undefined") {
        data = "无";
        return data
      }
      return val.description;
    },
    fomateUrl(val) {
      let data = "";
      if (val.url == "undefined") {
        data = "无";
        return data
      }
      return val.url;
    },
    getFullTobList() {
      var _this = this;
      return new Promise((resolve, reject) => {
        topTableSwitch(_this.pageNo, _this.navigationId)
          .then(response => {
            if (response.data.code == "0") {
              _this.fullTopList = response.data.result.content;
              if (_this.fullTopList == []) {
                _this.nothing = true;
              }
            } else {
              this.$message({
                type: "error",
                message: response.data.msg
              });
            }

            resolve();
          })
          .catch(reject => {
            console.log(reject, "reject");
            this.$message({
              type: "error",
              message: reject.error
            });
          });
      });
    },
    addTopList() {
      this.handleType = "add";
      this.dialogTitle = "添加";
      this.formData = {};
      this.dialogVisible = true;
    },
    //有顶部列表的跳转
    handleDetail(index, row) {
      this.$router.push({
        path: "appPages",
        query: {
          pageId: row.id
        }
      });
    },
    handleDelete(index, row) {
      var _this = this;
      this.$confirm("此操作将永久删除该组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          new Promise((resolve, reject) => {
            deletetopTable(row.id)
              .then(response => {
                if (response.data.code == 0) {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  _this.getFullTobList();
                } else {
                  this.$message({
                    type: "error",
                    message: response.data.msg
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
    handleEdite(index, row) {
      console.log(index, row, "row");

      this.handleType = "edit";
      this.currentRow = row;
      this.dialogTitle = "编辑";
      this.formData = row;
      this.currentIndex = index;
      this.dialogVisible = true;
    },
    addTopContent(data) {
      var _this = this;

      return new Promise((resolve, reject) => {
        addtopTable(data)
          .then(response => {
            if (response.data.code == "0") {
              this.$message({
                type: "success",
                message: "添加成功！"
              });
              _this.getFullTobList();
            } else {
              this.$message({
                type: "error",
                message: response.data.msg
              });
            }
            resolve();
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    submitSave(res) {
      console.log(res);
      if (this.handleType == "add") {
        if (res.have == 1) {
          let data = {
            ...res,
            have: res.have,
            navigationId: this.navigationId
          };
          if (data.name == "" || data.name == null) {
            this.$message({
              type: "error",
              message: "请填写名字"
            });
            return false;
          }
          if (data.url == "" || data.name == null) {
            this.$message({
              type: "error",
              message: "请填写URL"
            });
            return false;
          }

          this.addTopContent(data);
        } else {
          let data = {
            sort: res.sort,
            have: res.have,
            navigationId: this.navigationId
          };
          this.addTopContent(data);
        }
      } else if (this.handleType == "edit") {
        let data = {
          ...res,
          have: res.have,
          id: this.currentRow.id,
          navigationId: this.navigationId
        };
        this.edittopContent(data);
      }

      this.dialogVisible = false;
    },
    edittopContent(data) {
      var _this = this;

      return new Promise((resolve, reject) => {
        edittopTable(data)
          .then(response => {
            if (response.data.code == "0") {
              this.$message({
                type: "success",
                message: "修改成功！"
              });
              _this.getFullTobList();
            } else {
              this.$message({
                type: "error",
                message: response.data.msg
              });
            }
            resolve();
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    selectChange(val) {
      if (val == 0) {
        this.formSettings[0].items[1].hidden = true;
        this.formSettings[0].items[2].hidden = true;
        this.formSettings[0].items[3].hidden = true;
      }
      if (val == 1) {
        this.formSettings[0].items[1].hidden = false;
        this.formSettings[0].items[2].hidden = false;
        this.formSettings[0].items[3].hidden = false;
      }
    }
  }
};
</script>
<style scoped>
.box {
  margin: 30px;
}
.tool-bar {
  text-align: right;
}
</style>