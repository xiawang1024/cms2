<template>
  <div class="docSource-container">
    <div class="tool-bar">
      <el-button size="mini" type="primary" @click="handleAddDialog()">新增</el-button>
    </div>
    <el-table :data="dictObj.details" style="width: 100%">
      <el-table-column prop="dictDetailName" label="来源名称"/>
      <el-table-column prop="dictDetailValue" label="来源路径"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="prime" @click="beforeAlter(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="addDocSourceVisible" title="添加文稿来源">
      <el-form :model="docSourceForm">
        <el-form-item label="来源名称">
          <el-input v-model="docSourceForm.dictDetailName"/>
        </el-form-item>
        <el-form-item label="来源路径">
          <el-input v-model="docSourceForm.dictDetailValue"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addDocSourceVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="alterDocSourceVisible" title="修改文稿来源">
      <el-form :model="docSourceForm">
        <el-form-item label="来源名称">
          <el-input :disabled="true" v-model="docSourceForm.dictDetailName"/>
        </el-form-item>
        <el-form-item label="来源路径">
          <el-input v-model="docSourceForm.dictDetailValue"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="alterDocSourceVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleAlter()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchDictByDictName, createDict, updateDict } from "@/api/cms/dict";
export default {
  name: "DocSource",
  data() {
    return {
      dictObj: {
        dictId: "",
        dictName: "文稿来源",
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
      addDocSourceVisible: false,
      alterDocSourceVisible: false,
      docSourceForm: {
        dictDetailId: "",
        dictDetailName: "",
        dictDetailValue: ""
      }
    };
  },
  created: function() {
    this.fetchDict();
  },
  methods: {
    handleAddDialog() {
      this.docSourceForm.dictDetailId = "";
      this.docSourceForm.dictDetailName = "";
      this.docSourceForm.dictDetailValue = "";
      this.addDocSourceVisible = true;
    },
    handleAdd() {
      console.log("新增");
      this.handleDialogObjToList();
      this.addDocSourceVisible = false;
      // 新增保存
      this.handleSubmit();
    },
    beforeAlter(index, row) {
      this.docSourceForm.dictDetailId = row.dictDetailId;
      this.docSourceForm.dictDetailName = row.dictDetailName;
      this.docSourceForm.dictDetailValue = row.dictDetailValue;
      this.alterDocSourceVisible = true;
    },
    handleAlter() {
      console.log("修改");
      this.handleDialogObjToList();
      this.alterDocSourceVisible = false;
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
        if (v.dictDetailName === _this.docSourceForm.dictDetailName) {
          currentOpeIdx = k;
        }
      });
      if (currentOpeIdx === -1) {
        _this.dictObj.details.push(Object.assign({}, _this.docSourceForm));
      } else {
        _this.dictObj.details[currentOpeIdx].dictDetailName =
          _this.docSourceForm.dictDetailName;
        _this.dictObj.details[currentOpeIdx].dictDetailValue =
          _this.docSourceForm.dictDetailValue;
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
        _this.dictObj.dictName = "文稿来源";
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

.docSource-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}
</style>
