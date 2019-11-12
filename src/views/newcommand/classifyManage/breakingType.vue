<template>
  <div class="mainBox">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" size="mini" @click="handleAdd">添加</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="类名" prop="typeName" />
      <el-table-column label="序列号" prop="numberNo" />
      <el-table-column label="状态" prop="startFlag">
        <template slot-scope="scope">
          <span class="colorDanger" v-if="scope.row.startFlag==0">已禁用</span>
          <span class="colorSuccess" v-if="scope.row.startFlag==1">已启用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdite(scope.$index, scope.row)" >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :title="handleType">
      <v-form ref="vform" :form-data="formData" :form-settings="formSettings" @save="submitSave"/>
    </el-dialog>
  </div>
</template>
<script>
import {
  classifyList,
  saveClassify,
  updataClassify
} from "@/api/newsCommand/classifyManage";
export default {
  data() {
    return {
      dialogVisible: false,
      currentId: "",
      tableData: [],
      handleType: "添加",
      type: "",
      formData:{},
      formSettings: [
        {
          items: [
            {
              label: "分类",
              name: "typeName",
              type: "text",
              required: true,
              placeholder: "请输入分类"
            },
            {
              label: "启用",
              name: "startFlag",
              type: "radio",
              value: 1,
              options: [
                {
                  label: "启用",
                  value: 1
                },
                {
                  label: "禁用",
                  value: 0
                }
              ]
            }
          ]
        }
      ]
    };
  },
  created() {
    this.initTable();
  },
  methods: {
    initTable() {
      return new Promise((resolve, reject) => {
        classifyList()
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
    handleAdd() {
      this.formData = {};
      this.dialogVisible = true;
      this.handleType = "添加";
      this.currentId = "";
    },
    handleEdite(index, row) {
      this.formData = {
        typeName: row.typeName,
        startFlag: row.startFlag
      };
      this.dialogVisible = true;
      this.currentId = row.id;
      this.handleType = "编辑";
    },
    submitSave(val) {
      let data = {
        typeName: val.typeName,
        startFlag: val.startFlag
      };
      if (this.handleType == "编辑") {
        data.id = this.currentId;
        return new Promise((resolve, reject) => {
          updataClassify(data)
            .then(res => {
              if (res.data.code == 0) {
                this.$message.success(res.data.result);
                this.initTable();
                 //及时更新公共状态中的分类
                //  this.$store.dispatch('getClassifyList')
              } else {
                this.$message.error(res.data.result);
              }
              this.dialogVisible = false;
            })
            .catch(err => {
              reject(err);
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          saveClassify(data)
            .then(res => {
              if (res.data.code == 0) {
                this.$message.success(res.data.result);
                this.initTable();
                 //及时更新公共状态中的分类
                //  this.$store.dispatch('getClassifyList')
              } else {
                this.$message.error(res.data.result);
              }
              this.dialogVisible = false;
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.mainBox {
  padding: 15px;
  .colorSuccess {
    color: #67c23a;
  }
  .colorDanger {
    color: #f56c6c;
  }
}
</style>