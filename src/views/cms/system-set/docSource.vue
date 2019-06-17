<template>
  <div class="docSource-container">
    <div class="tool-bar">
      <el-button size="mini" type="primary" @click="handleDialog('add')">新增</el-button>
    </div>
    <el-table :data="dictObj.details" style="width: 100%" highlight-current-row >
      <el-table-column prop="dictDetailName" label="来源名称" min-width="150" show-overflow-tooltip/>
      <el-table-column prop="dictDetailValue" label="来源路径" min-width="150" show-overflow-tooltip/>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleDialog('edit', scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="docSourceVisible" :title="dialogTitle" width="30%">
      <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" label-width="80px" :btn-loading = "isLoading"/>
    </el-dialog>
  </div>
</template>

<script>
import { fetchDictAllByDictName, createDict, updateDict } from "@/api/cms/dict";
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
      },
      formData: {},
      formSettings: [
        {
          items: [
            {
              label: '来源名称',
              name: 'dictDetailName',
              type: 'text',
              valueType: 'string',
              disabled: false,
              required: true,
              placeholder: '请输入来源名称'
            },
            {
              label: '来源路径',
              name: 'dictDetailValue',
              type: 'text',
              required: true,
              placeholder: '请输入来源路径'
            },
            {
              label: '图标',
              name: 'dictDetailRemark',
              type: 'img',
              placeholder: '请输入排序',
              limit: 1
            }
          ]
        }
      ],
      isLoading: false,
      dialogTitle: '添加文稿来源',
      docSourceVisible: false,
      handelType: 'add',
      currentIndex: '',
      currentRow: {}
    }
  },
  created: function() {
    this.fetchDict();
  },
  methods: {
    // 弹框操作
    handleDialog(type, index, row) {
      this.handelType = type
      if(type == 'add') {
        this.dialogTitle = '添加文稿来源'
      } else {
        this.dialogTitle = '修改文稿来源'
      }
      this.docSourceVisible = true
      if(row) {
        this.formData = {
          dictDetailName: row.dictDetailName,
          dictDetailValue: row.dictDetailValue,
          dictDetailRemark: row.dictDetailRemark ? [{url: row.dictDetailRemark}] : []
        }
      } else {
        this.formData = {}
      }
      this.currentIndex = index,
      this.currentRow = row
    },
    // 确认提交
    submitSave(data) {
      let copyData = JSON.parse(JSON.stringify(this.dictObj))
      if(this.handelType == 'add') {
        copyData.details.push(data)
      } else {
        copyData.details[this.currentIndex] = Object.assign(copyData.details[this.currentIndex], data)
      }
      this.handleSubmit(copyData)
    },
    handleDelete(index, row) {
        this.$confirm('确定删除该来源吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let copyData = JSON.parse(JSON.stringify(this.dictObj))
          copyData.details.splice(index, 1)
          this.handleSubmit(copyData)
        }).catch(() => {        
        })
    },
    // 查询对象
    fetchDict() {
      var _this = this;
      return new Promise((resolve, reject) => {
        fetchDictAllByDictName('文稿来源')
          .then(response => {
            _this.dictObj = response.data.result;
            if (!_this.dictObj.details) {
              _this.dictObj.details = []
            }
            resolve();
          })
          .catch(error => {
            reject(error)
          });
      });
    },
    // 保存对象，实际为更新
    handleSubmit(data) {
      var _this = this;
      data.details.forEach((ele) => {
        if(ele.dictDetailRemark && typeof ele.dictDetailRemark == 'object' && ele.dictDetailRemark.length) {
          ele.dictDetailRemark = ele.dictDetailRemark[0].url
        } else if(ele.dictDetailRemark && typeof ele.dictDetailRemark !== 'object'){
          ele.dictDetailRemark =  ele.dictDetailRemark
        } else {
          ele.dictDetailRemark =  ''
        }
      })
      if (!_this.dictObj.dictId) {
        data.dictName = "文稿来源";
        return new Promise((resolve, reject) => {
          createDict(data)
            .then(response => {
              _this.fetchDict();
              this.$message.success('操作成功')
              this.docSourceVisible = false
              resolve()
            })
            .catch(error => {
              reject(error)
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          updateDict(data)
            .then(response => {
              _this.fetchDict();
              this.$message.success('操作成功')
              this.docSourceVisible = false
              resolve();
            })
            .catch(error => {
              reject(error)
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
