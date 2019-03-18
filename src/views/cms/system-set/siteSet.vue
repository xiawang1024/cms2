<template>
  <div class="site-set-container">
    <div class="tool-bar">
      <el-button size="mini" type="primary" @click="handleAddDialog()">新增</el-button>
    </div>
    <el-table :data="dictObj.details" style="width: 100%">
      <el-table-column prop="dictDetailName" label="名称"/>
      <el-table-column label="代码">
        <template slot-scope="scope">
          <el-input v-model="scope.row.dictDetailCode"/>
        </template>
      </el-table-column>
      <el-table-column label="值">
        <template slot-scope="scope">
          <el-input v-model="scope.row.dictDetailValue"/>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="addSiteSetVisible" title="添加站点设置">
      <el-form :model="siteSetForm">
        <el-form-item label="设置名称">
          <el-input v-model="siteSetForm.dictDetailName"/>
        </el-form-item>
        <el-form-item label="代码">
          <el-input v-model="siteSetForm.dictDetailCode"/>
        </el-form-item>
        <el-form-item label="值">
          <el-input v-model="siteSetForm.dictDetailValue"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSiteSetVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="alterSiteSetVisible" title="修改站点设置">
      <el-form :model="siteSetForm">
        <el-form-item label="设置名称">
          <el-input :disabled="true" v-model="siteSetForm.dictDetailName"/>
        </el-form-item>
        <el-form-item label="代码">
          <el-input v-model="siteSetForm.dictDetailCode"/>
        </el-form-item>
        <el-form-item label="设置路径">
          <el-input v-model="siteSetForm.dictDetailValue"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="alterSiteSetVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAlter()">确 定</el-button>
      </div>
    </el-dialog>

    <el-button size="mini" type="primary" class="btn-save" @click="handleSubmit()">保存</el-button>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { fetchDictByDictName, createDict, updateDict } from "@/api/cms/dict";
export default {
  name: "SiteSet",
  data() {
    return {
      dictObj: {
        dictId: "",
        dictName: "站点设置",
        dictType: "",
        dictRemark: "",
        seqNo: "",
        sysFlag: "",
        createUser: "",
        createTime: "",
        createIp: "",
        modifyUser: "",
        modifyTime: "",
        modifyIp: "",
        clientLicenseId: "",
        details: []
      },
      addSiteSetVisible: false,
      alterSiteSetVisible: false,
      siteSetForm: {
        dictDetailId: "",
        dictDetailName: "",
        dictDetailValue: ""
      }
    };
  },
  created: function() {
    this.fetchDict();
  },
  mounted() {
    if (
      !(Cookies.get("sidebarStatus") == 0 || Cookies.get("sidebarStatus") == 1)
    ) {
      this.$store.dispatch("toggleSideBar");
    }
  },
  methods: {
    handleAddDialog() {
      this.siteSetForm.dictDetailId = "";
      this.siteSetForm.dictDetailName = "";
      this.siteSetForm.dictDetailValue = "";
      this.addSiteSetVisible = true;
    },
    handleAdd() {
      console.log("新增");
      this.handleDialogObjToList();
      this.addSiteSetVisible = false;
      // 新增保存
      this.handleSubmit();
    },
    beforeAlter(index, row) {
      this.siteSetForm.dictDetailId = row.dictDetailId;
      this.siteSetForm.dictDetailName = row.dictDetailName;
      this.siteSetForm.dictDetailValue = row.dictDetailValue;
      this.alterSiteSetVisible = true;
    },
    handleAlter() {
      console.log("修改");
      this.handleDialogObjToList();
      this.alterSiteSetVisible = false;
      // 修改保存
      this.handleSubmit();
    },
    handleDelete(index, row) {
      console.log("删除" + row.name);
      this.dictObj.details.splice(index, 1);
      // 删除保存
      this.handleSubmit();
    },
    // 将当前弹出框的数据重新维护到 dictObj.details 中
    handleDialogObjToList() {
      var _this = this;
      var currentOpeIdx = -1;
      _this.dictObj.details.forEach(function(v, k) {
        if (v.dictDetailName === _this.siteSetForm.dictDetailName) {
          currentOpeIdx = k;
        }
      });
      if (currentOpeIdx === -1) {
        _this.dictObj.details.push(Object.assign({}, _this.siteSetForm));
      } else {
        _this.dictObj.details[currentOpeIdx].dictDetailName =
          _this.siteSetForm.dictDetailName;
        _this.dictObj.details[currentOpeIdx].dictDetailValue =
          _this.siteSetForm.dictDetailValue;
      }
    },
    // 查询对象
    fetchDict() {
      var _this = this;
      return new Promise((resolve, reject) => {
        fetchDictByDictName(_this.dictObj.dictName)
          .then(response => {
            _this.dictObj = response.data.result;
            if (_this.dictObj.details === null) {
              _this.dictObj.details = [];
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 保存对象，实际为更新
    handleSubmit() {
      var _this = this;
      if (_this.dictObj.dictId === "" || _this.dictObj.dictId === null) {
        _this.dictObj.dictName = "站点设置";
        return new Promise((resolve, reject) => {
          createDict(_this.dictObj)
            .then(response => {
              _this.fetchDict();
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          updateDict(_this.dictObj)
            .then(response => {
              _this.fetchDict();
              resolve();
            })
            .catch(error => {
              reject(error);
            });
        });
      }
    }
  }
};
</script>

<style scoped>
.el-button + .el-button {
  margin-top: 5px;
  margin-left: 0px;
}

.siteSet-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}
/* liyu */
.site-set-container {
  box-sizing: border-box;
  margin: 30px;
}
.btn-save {
  margin-top: 20px;
}
</style>
