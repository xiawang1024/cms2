<template>
  <div class="extends-word">
    <div class="extends-word-add">
      <el-button type="primary" @click="handelWord('add')" size="mini">创建扩展字段</el-button>
    </div>
    <el-table :data="extFieldsList" style="width: 100%">
      <el-table-column prop="label" label="字段名称" min-width="180"/>
      <el-table-column prop="type" label="字段类型" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.type === '1'">字符串</span>
          <span v-if="scope.row.type === '2'">时间</span>
          <span v-if="scope.row.type === '3'">数字</span>
        </template>
      </el-table-column>
      <el-table-column prop="required" label="是否必填" min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.required === false">否</span>
          <span v-if="scope.row.required === true">是</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handelWord('edit', scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="wordDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <handel-dialog :dialog-visible.sync="dialogVisible" :params="params" @submitSuccess="submitSuccess"/>
  </div>
</template>
<script>
import handelDialog from '@/components/cms/WebComponents/components/extendsWord/handelDialog'
import { columnInfor, deleteExtendsWord } from '@/api/cms/columnManage'
export default {
  name: 'ExtendsWord',
  components: {
    handelDialog
  },
  props: {
    columnRow: {
      default: () => {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      extFieldsList: [],
      dialogVisible: false,
      params: {},
      // routeQuery: {}
    }
  },
  mounted() {
    // this.routeQuery = this.$route.query
    this.params.channelId = this.columnRow.channelId
    this.getColumnInfor()
  },
  methods: {
    getColumnInfor() {
      var _this = this
      return new Promise((resolve, reject) => {
        columnInfor(this.columnRow.channelId)
          .then((response) => {
            _this.extFieldsList = response.data.result.extFieldsList
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    createExtends() {
      return new Promise((resolve, reject) => {
        columnInfor(this.columnRow.channelId)
          .then((response) => {
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    submitSuccess() {
      this.getColumnInfor()
    },
    wordDelete(row) {
      this.$confirm('是否删除该字段?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteEstends({extFieldId: row.extFieldId })
      }).catch(() => {
      })
    },
    deleteEstends(data) {
      var _this = this
      return new Promise((resolve, reject) => {
        deleteExtendsWord(this.columnRow.channelId, data)
          .then((response) => {
            _this.$message({ showClose: true, message: '恭喜你，操作成功!', type: 'success' })
            _this.getColumnInfor()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    handelWord(type, row) {
      this.params.type = type
      this.params.extFieldInfor = row
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
  .extends-word {
    .extends-word-add {
      // text-align: right;
      // margin-bottom:22px;
    }
  }
</style>

