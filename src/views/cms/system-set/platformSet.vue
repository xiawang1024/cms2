<template>
  <div class="platform-container">
    <div class="tool-bar">
      <el-button size="mini" type="primary" @click="handleAddDialog()">新增</el-button>
    </div>
    <el-table :data="dictObj.details" style="width: 100%">
      <el-table-column prop="dictDetailName" label="平台"/>
      <el-table-column prop="dictDetailRemark" label="描述"/>
      <el-table-column prop="dictDetailValue" label="文件名"/>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="beforeAlter(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="addPlatFormVisible" title="添加发布平台">
      <el-form :model="platForm">
        <el-form-item label="平台">
          <el-input v-model="platForm.dictDetailName"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="platForm.dictDetailRemark"/>
        </el-form-item>
        <el-form-item label="文件名">
          <el-input v-model="platForm.dictDetailValue"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="addPlatFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="alterPlatFormVisible" title="修改发布平台">
      <el-form :model="platForm">
        <el-form-item label="平台">
          <el-input v-model="platForm.dictDetailName"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="platForm.dictDetailRemark"/>
        </el-form-item>
        <el-form-item label="文件名">
          <el-input v-model="platForm.dictDetailValue"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="alterPlatFormVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleAlter()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchDictByDictName, createDict, updateDict } from '@/api/cms/dict'
export default {
  name: 'PlatformSet',
  data() {
    return {
      dictObj: {
        dictId: '',
        dictName: '发布平台设置',
        dictType: '',
        dictRemark: '',
        seqNo: '',
        sysFlag: '',
        createUser: '',
        createTime: '',
        createIp: '',
        modifyUser: '',
        modifyTime: '',
        modifyIp: '',
        clientLicenseId: '',
        details: [
        ]
      },
      addPlatFormVisible: false,
      alterPlatFormVisible: false,
      platForm: {
        dictDetailId: '',
        dictDetailName: '',
        dictDetailValue: '',
        dictDetailRemark: ''
      }
    }
  },
  created: function() {
    this.fetchDict()
  },
  methods: {
    handleAddDialog() {
      this.platForm.dictDetailId = ''
      this.platForm.dictDetailName = ''
      this.platForm.dictDetailValue = ''
      this.platForm.dictDetailRemark = ''
      this.addPlatFormVisible = true
    },
    handleAdd() {
      console.log('新增')
      this.handleDialogObjToList()
      this.addPlatFormVisible = false
      // 新增保存
      this.handleSubmit()
    },
    beforeAlter(index, row) {
      this.platForm.dictDetailId = row.dictDetailId
      this.platForm.dictDetailName = row.dictDetailName
      this.platForm.dictDetailValue = row.dictDetailValue
      this.platForm.dictDetailRemark = row.dictDetailRemark
      this.alterPlatFormVisible = true
    },
    handleAlter() {
      console.log('修改')
      this.handleDialogObjToList()
      this.alterPlatFormVisible = false
      // 修改保存
      this.handleSubmit()
    },
    handleDelete(index, row) {
      console.log('删除' + row.dictDetailId)
      this.dictObj.details.splice(index, 1)
      // 删除保存
      this.handleSubmit()
    },
    // 将当前弹出框的数据重新维护到 dictObj.details 中
    handleDialogObjToList() {
      var _this = this
      var currentOpeIdx = -1
      _this.dictObj.details.forEach(function(v, k) {
        if (v.dictDetailName === _this.platForm.dictDetailName) {
          currentOpeIdx = k
        }
      })
      if (currentOpeIdx === -1) {
        _this.dictObj.details.push(Object.assign({}, _this.platForm))
      } else {
        _this.dictObj.details[currentOpeIdx].dictDetailName = _this.platForm.dictDetailName
        _this.dictObj.details[currentOpeIdx].dictDetailValue = _this.platForm.dictDetailValue
        _this.dictObj.details[currentOpeIdx].dictDetailRemark = _this.platForm.dictDetailRemark
      }
    },
    // 查询对象
    fetchDict() {
      var _this = this
      return new Promise((resolve, reject) => {
        fetchDictByDictName(_this.dictObj.dictName)
          .then((response) => {
            _this.dictObj = response.data.result
            if (_this.dictObj.details === null) {
              _this.dictObj.details = []
            }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 保存对象，实际为更新
    handleSubmit() {
      var _this = this
      if (_this.dictObj.dictId === '' || _this.dictObj.dictId === null) {
        _this.dictObj.dictName = '发布平台设置'
        return new Promise((resolve, reject) => {
          createDict(_this.dictObj)
            .then((response) => {
              _this.fetchDict()
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      } else {
        return new Promise((resolve, reject) => {
          updateDict(_this.dictObj)
            .then((response) => {
              _this.fetchDict()
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      }
    }
  }
}
</script>

<style scoped>
.el-button + .el-button {
  margin-top: 5px;
  margin-left: 0px;
}

.platform-container {
  margin: 30px;
}

.tool-bar {
  text-align: right;
}
</style>
