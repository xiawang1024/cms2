<template>
  <div class="box">
    <div class="tool-bar">
      <el-button size="mini" type="primary" @click="backFoword" v-show="!pageFlag">返回</el-button>
      <el-button size="mini" type="primary" @click="searchAppConfig">检索</el-button>
      <el-button size="mini" type="primary" @click="addAppConfig">新增</el-button>
    </div>

    <el-table :data="fullApp">
      <el-table-column prop="name" label="app名字"/>
      <el-table-column prop="version" label="版本"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="startingImage" label="启动页">
        <template slot-scope="scope">
          <img :src="scope.row.startingImage" class="icon">
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="APP图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon" class="icon">
        </template>
      </el-table-column>
      <el-table-column prop="iosurl" label="苹果下载链接"/>
      <el-table-column prop="androidURL" label="安卓下载链接"/>
      <el-table-column prop="sort" label="排序"/>
      <el-table-column prop="createTime" label="时间" width="190" :formatter="formatDate">
        <template slot-scope="scope1">
          <span>创建: {{ scope1.row.createTime }}</span>
          <span>修改: {{ scope1.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="text" @click="handleDetail(scope.row.id,scope.row)">详情</el-button>
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
        :btn-loading="isLoading"
      />
    </el-dialog>
    <el-pagination
      class="fenyeDiv"
      :current-page="pageNo"
      :page-sizes="[10,30,60,100]"
      :page-size="pageSize"
      :total="totalCount"
      background
      layout="total, sizes, prev, pager, next, jumper"
      style="float: right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import {
  appinfo,
  addAppInfo,
  findAppInfoById,
  searchAappinfo,
  deleteAppInfo,
  updateAppInfo,
  checkName
} from "@/api/cms/appConfig.js";
export default {
  name: "AppConfig",

  data() {
    var validateNumber = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数！"));
      } else {
        callback();
      }
    };
    return {
      currentUser: this.$store.getters.tenantId,
      currentId: "",
      searchApp: "",
      fullApp: [],
      pageNo: 1,
      pageSize: 10,
      totalCount: 0,
      dialogVisible: false,
      dialogTitle: "",
      handleType: "",
      isLoading: false,
      searchData: {},
      pageFlag: true,
      formData: {},
      formSettings: [
        {
          items: [
            {
              label: "app名字",
              name: "appName",
              type: "text",
              valueType: "string",
              disabled: false,
              required: true,
              placeholder: "请输入app名字",
              rule: [
                {
                  required: true,
                  validator: this.validatePass,
                  trigger: "blur"
                }
              ]
            },
            {
              label: "版本",
              name: "version",
              type: "text",
              valueType: "string",
              disabled: false,
              required: true,
              placeholder: "请输入版本号"
            },
            {
              label: "描述",
              name: "description",
              type: "text",
              valueType: "string",
              disabled: false,
              placeholder: "请输入描述"
            },
            {
              label: "启动页图片",
              name: "startingImage",
              type: "img",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请输入启动页图片URL"
            },
            {
              label: "APP图标",
              name: "icon",
              type: "img",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请输入APP图标URL"
            },
            {
              label: "苹果下载链接",
              name: "IOSURL",
              type: "text",
              valueType: "string",
              disabled: false,
              placeholder: "请输入下载URL"
            },
            {
              label: "安卓程序包",
              name: "androidURL",
              type: "file",
              disabled: false,
              limit: 1,
              required: true,
              placeholder: "请输入下载URL"
            },
            {
              label: "排序",
              name: "sort",
              type: "number",
              value: 1,
              valueType: "number",
              disabled: false,
              placeholder: "请输入序列号",
              rule: [
                {
                  validator: validateNumber,
                  trigger: "blur"
                }
              ]
            }
          ]
        }
      ],
      addData: [
        {
          items: [
            {
              label: "app名字",
              name: "appName",
              type: "text",
              valueType: "string",
              disabled: false,
              required: true,
              placeholder: "请输入app名字",
              rule: [
                {
                  required: true,
                  validator: this.validatePass,
                  trigger: "blur"
                }
              ]
            },
            {
              label: "版本",
              name: "version",
              type: "text",
              valueType: "string",
              disabled: false,
              required: true,
              placeholder: "请输入版本号"
            },
            {
              label: "描述",
              name: "description",
              type: "text",
              valueType: "string",
              disabled: false,
              placeholder: "请输入描述"
            },
            {
              label: "启动页图片",
              name: "startingImage",
              type: "img",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请输入启动页图片URL"
            },
            {
              label: "APP图标",
              name: "icon",
              type: "img",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请输入APP图标URL"
            },
            {
              label: "苹果下载链接",
              name: "IOSURL",
              type: "text",
              valueType: "string",
              disabled: false,
              placeholder: "请输入下载URL"
            },
            {
              label: "安卓程序包",
              name: "androidURL",
              type: "file",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请输入下载URL"
            },
            {
              label: "排序",
              name: "sort",
              type: "number",
              value: 1,
              valueType: "number",
              disabled: false,
              placeholder: "请输入序列号",
              rule: [
                {
                  validator: validateNumber,
                  trigger: "blur"
                }
              ]
            }
          ]
        }
      ],
      editData: [
        {
          items: [
            {
              label: "app名字",
              name: "appName",
              type: "text",
              valueType: "string",
              required: true,
              placeholder: "请输入app名字",
              disabled: true
            },
            {
              label: "版本",
              name: "version",
              type: "text",
              valueType: "string",
              disabled: false,
              required: true,
              placeholder: "请输入版本号"
            },
            {
              label: "描述",
              name: "description",
              type: "text",
              valueType: "string",
              disabled: false,
              placeholder: "请输入描述"
            },
            {
              label: "启动页图片",
              name: "startingImage",
              type: "img",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请输入启动页图片URL"
            },
            {
              label: "APP图标",
              name: "icon",
              type: "img",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请输入APP图标URL"
            },
            {
              label: "苹果下载链接",
              name: "IOSURL",
              type: "text",
              valueType: "string",
              disabled: false,
              placeholder: "请输入下载URL"
            },
            {
              label: "安卓下载链接",
              name: "androidURL",
              type: "file",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请输入下载URL"
            },
            {
              label: "排序",
              name: "sort",
              type: "number",
              value: 1,
              valueType: "number",
              disabled: false,
              placeholder: "请输入序列号",
              rule: [
                {
                  validator: validateNumber,
                  trigger: "blur"
                }
              ]
            }
          ]
        }
      ],
      searchConfig: [
        {
          items: [
            {
              label: "app名字",
              name: "appName",
              type: "text",
              valueType: "string",
              disabled: false,
              placeholder: "请输入app名字"
            },
            {
              label: "版本",
              name: "version",
              type: "text",
              valueType: "string",
              disabled: false,
              placeholder: "请输入版本号"
            },
            {
              label: "描述",
              name: "description",
              type: "text",
              valueType: "string",
              disabled: false,
              placeholder: "请输入描述"
            },
            {
              label: "苹果下载链接",
              name: "IOSURL",
              type: "text",
              valueType: "string",
              disabled: false,
              placeholder: "请输入下载URL"
            },
            {
              label: "安卓下载链接",
              name: "androidURL",
              type: "text",
              valueType: "string",
              disabled: false,
              placeholder: "请输入下载URL"
            },
            {
              label: "排序",
              name: "sort",
              type: "number",
              valueType: "number",
              disabled: false,
              placeholder: "请输入序列号",
              rule: [
                {
                  validator: validateNumber,
                  trigger: "blur"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  created() {
    //请求app列表数据
    this.getAppList(this.pageNo, this.pageSize, { tenantId: this.currentUser });
  },
  methods: {
    formatDate(row) {
      if (row) {
        let date = row.createTime.replace("T", " ");
        date = date.replace(".000+0000", "");
        return date;
      } else {
        return "暂无数据";
      }
    },
    addAppConfig() {
      this.handleType = "add";
      this.dialogTitle = "添加";
      this.formData = {};
      this.formSettings = this.addData;
      this.dialogVisible = true;
    },
    handleDetail(row) {
      this.$router.push({
        path: "appTabList",
        query: {
          appId: row
        }
      });
    },
    handleEdit(index, row) {
      this.currentRow = index;
      this.handleType = "edit";
      this.dialogTitle = "编辑";
      this.currentId = row.id;
      console.log(row, "row");
      this.formData = {
        appName: row.name,
        androidURL: [{ url: row.androidURL }],
        description: row.description,
        icon: [{ url: row.icon }],
        id: row.id,
        IOSURL: row.iosurl,
        sort: row.sort,
        startingImage: [{ url: row.startingImage }],
        tenantId: row.tenantId,
        version: row.version
      };
      this.formSettings = this.editData;

      this.dialogVisible = true;
    },
    handleDelete(b, row) {
      var _this = this;
      this.$confirm("此操作将永久删除该组, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          new Promise((resolve, reject) => {
            deleteAppInfo(row.id)
              .then(response => {
                if (response.data.code == 0) {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  _this.getAppList(_this.pageNo, _this.pageSize, {
                    tenantId: _this.currentUser
                  });
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
    searchAppConfig() {
      this.handleType = "search";
      this.dialogTitle = "检索";
      this.formData = {};
      // console.log(this.formData);
      // this.formSettings.items.value.replace(/[^0-9]+/g, "");
      //检索的栏目显示
      this.formSettings = this.searchConfig;
      this.dialogVisible = true;
      // console.log(this.formSettings.items);
    },
    backFoword() {
      this.pageFlag = true;
      this.getAppList(this.pageNo, this.pageSize, {
        tenantId: this.currentUser
      });
    },
    submitSave(res) {
      if (this.handleType == "add") {
        let data = {
          tenantId: this.currentUser,
          ...res
        };
        console.log(data, "595");
        data.icon = res.icon[0].url;
        data.startingImage = res.startingImage[0].url;
        data.androidURL = res.androidURL[0].url;
        this.addApp(data);
      } else if (this.handleType == "edit") {
        let data = res;
        data.id = this.currentId;
        data.tenantId = this.currentUser;
        data.icon = res.icon[0].url;
        data.startingImage = res.startingImage[0].url;
        data.androidURL = res.androidURL[0].url;
        this.updateAPP(data);
      } else if (this.handleType == "search") {
        //获取数据

        this.searchData = {
          tenantId: this.currentUser,
          ...res
        };

        this.seracrAppList(this.pageNo, this.pageSize, this.searchData);
      }
      this.dialogVisible = false;
    },
    //分页处理
    handleSizeChange(val) {
      this.pageSize = val;
      if (this.pageFlag) {
        this.getAppList(this.pageNo, this.pageSize, {
          tenantId: this.currentUser
        });
      } else {
        this.seracrAppList(this.pageNo, this.pageSize, this.searchData);
      }
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      if (this.pageFlag) {
        this.getAppList(this.pageNo, this.pageSize, {
          tenantId: this.currentUser
        });
      } else {
        this.seracrAppList(this.pageNo, this.pageSize, this.searchData);
      }
    },

    //请求
    //分页条件检索
    seracrAppList(pageNo, pageSize, data) {
      data.sort = " ";
      var _this = this;
      return new Promise((resolve, reject) => {
        searchAappinfo(pageNo, pageSize, data)
          .then(response => {
            if (response.data.code == "0") {
              _this.fullApp = response.data.result.content;
              _this.totalCount = parseInt(response.data.result.total);
              _this.pageFlag = false;
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

    //初始化搜索
    getAppList(pageNo, pageSize, data) {
      var _this = this;
      return new Promise((resolve, reject) => {
        appinfo(pageNo, pageSize, data)
          .then(response => {
            if (response.data.code == "0") {
              _this.fullApp = response.data.result.content;
              _this.totalCount = parseInt(response.data.result.total);
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
    //添加
    addApp(data) {
      var _this = this;

      return new Promise((resolve, reject) => {
        addAppInfo(data)
          .then(response => {
            console.log(response, "696");
            if (response.data.code == "0") {
              this.$message({
                type: "success",
                message: "添加成功！"
              });
              _this.getAppList(_this.pageNo, _this.pageSize, {
                tenantId: _this.currentUser
              });
            } else {
              this.$message({
                type: "error",
                message: response.data.msg
              });
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      });
    },
    //根据app id检索
    search(id) {
      var _this = this;
      return new Promise((resolve, reject) => {
        findAppInfoById(id)
          .then(response => {
            console.log(response);
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
    //更新APP信息
    updateAPP(data) {
      var _this = this;
      return new Promise((resolve, reject) => {
        updateAppInfo(data)
          .then(response => {
            if (response.data.code == "0") {
              this.$message({
                type: "success",
                message: "修改成功！"
              });
              _this.getAppList(_this.pageNo, _this.pageSize, {
                tenantId: _this.currentUser
              });
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
    validatePass(rule, value, callback) {
      let data = {
        tenantId: this.currentUser,
        name: value
      };
      return new Promise((resolve, reject) => {
        checkName(data)
          .then(response => {
            if (response.data.result == true) {
              callback();
            } else {
              callback(new Error("名称重复,请重新输入"));
            }
            resolve();
          })
          .catch(reject => {
            console.log(reject);
          });
      });
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

.search-input {
  /* width: auto; */
  width: 200px;
}
.icon {
  width: 60px;
}
</style>
