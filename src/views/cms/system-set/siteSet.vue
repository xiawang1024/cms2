<template>
  <div class="site-set-container">
    <el-table :data="dictObj.details" style="width: 100%">
      <el-table-column prop="dictDetailName" label="名称"/>
      <el-table-column prop="dictDetailCode" label="代码"/>
      <el-table-column label="值">
        <template slot-scope="scope">
          <el-input v-model="scope.row.dictDetailValue"/>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" class="btn-save" @click="handleSubmit()">保存</el-button>
  </div>
</template>

<script>
import { fetchDictByDictName, updateDict } from '@/api/cms/dict'
export default {
  name: 'SiteSet',
  data() {
    return {
      dictObj: {
        dictId: '',
        dictName: '站点设置',
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
      }
    }
  },
  created: function() {
    this.fetchDict()
  },
  methods: {
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
</script>

<style scoped>
.site-set-container {
  margin: 30px;
}

.btn-save {
  margin-top: 20px;
}
</style>
