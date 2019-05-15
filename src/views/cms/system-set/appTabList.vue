<template>
  <div class="box">
    <el-table :data="fullTabList">
      <el-table-column prop="name" label="列表名字"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column label="图标1">
        <template slot-scope="scope">
          <img :src="scope.row.icon0" class="icon">
        </template>
      </el-table-column>
      <el-table-column label="图标2">
        <template slot-scope="scope">
          <img :src="scope.row.icon1" class="icon">
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdite(scope.$index,scope.row)">编辑</el-button>
          <el-checkbox
            @change="startUsing(scope.row)"
            v-model="scope.row.enable"
            class="selectbox"
          >启用</el-checkbox>
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
  </div>
</template>
<script>
import { initNavigation, editNavigation } from "@/api/cms/appConfig.js";
export default {
  name: "AppTabList",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error("请输入正数！"));
      } else {
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      let type = value[0].url.split(".").reverse()[0];
      type = type.toLowerCase();
      console.log(type, "判断值！");

      if (type != "png") {
        callback(new Error("请上传PNG格式图片！"));
      } else {
        callback();
      }
    };

    return {
      fullTabList: [],
      dialogVisible: false,
      dialogTitle: "添加",
      formData: {},
      formSettings: [
        {
          items: [
            {
              label: "列表名字",
              name: "name",
              type: "text",
              valueType: "string",
              disabled: false,
              required: true,
              placeholder: "请输入列表名字"
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
              label: "图标1",
              name: "icon0",
              type: "img",
              disabled: false,
              limit: 1,

              placeholder: "请上传图片",
              defineMessage: "图片",
              rule: [
                {
                  required: true,
                  validator: validatePass1,
                  trigger: "blur"
                }
              ]
            },
            {
              label: "图标2",
              name: "icon1",
              type: "img",
              disabled: false,
              limit: 1,

              placeholder: "请上传图片",
              defineMessage: "图片",
              rule: [
                {
                  required: true,
                  validator: validatePass1,
                  trigger: "blur"
                }
              ]
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
                  validator: validatePass,
                  trigger: "blur"
                }
              ]
            }
          ]
        }
      ],
      handleType: "",
      currentRow: { id: "", enable: "" },
      currentIndex: "",
      isLoading: false,
      pageNo: 1,
      pageSize: 10
    };
  },
  created() {
    // 发送请求数据
    this.getFullTab();
  },
  methods: {
    handleEdite(index, row) {
      console.log(row,"row");
      (this.currentRow.id = row.id), (this.currentRow.enable = row.enable);
      this.formData={
         name: row.name,
        description: row.description,
        icon0: [{url:row.icon0}],
        icon1: [{url:row.icon1}],
        sort: row.sort,
        ...this.currentRow
      }
      this.dialogVisible = true;
      
    },
    submitSave(res) {
      //保存触发
      let data = {
        name: res.name,
        description: res.description,
        icon0: res.icon0[0].url,
        icon1: res.icon1[0].url,
        sort: res.sort,
        ...this.currentRow
      };
      console.log(data);

      this.editTabContent(data);
      this.dialogVisible = false;
    },
    getFullTab() {
      var _this = this;
      return new Promise((resolve, reject) => {
        initNavigation(_this.pageNo, _this.pageSize, _this.$route.query.appId)
          .then(response => {
            if (response.data.code == "0") {
              _this.fullTabList = response.data.result.content;
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

    editTabContent(data) {
      var _this = this;
      return new Promise((resolve, reject) => {
        editNavigation(data)
          .then(response => {
            console.log(response, "点击修改");
            if (response.data.result.description === "null") {
              response.data.result.description = "";
            }
            if (response.data.code == "0") {
              this.$message({
                type: "success",
                message: "修改成功！"
              });
              _this.getFullTab();
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
    //切换选中状态
    startUsing(row) {
      this.editTabContent(row);
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
.icon {
  width: 60px;
}
/deep/  .el-checkbox__label {
  font-size: 12px
}
/deep/.selectbox {
  
  margin-left: 10px;
}
</style>
