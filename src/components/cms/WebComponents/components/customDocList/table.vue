<template>
  <el-table
    :data="list"
    style="width: 100%"
    highlight-current-row>
    <el-table-column
      prop="documentName"
      label="名称"
      show-overflow-tooltip
      min-width="120"/>
    <el-table-column
      prop="documentRemark"
      show-overflow-tooltip
      label="描述"
      min-width="180"/>
    <el-table-column
      prop="createUser"
      label="创建人"
      width="120"/>
    <el-table-column
      prop="createTime"
      width="180"
      label="创建时间"/>
    <el-table-column
      width="150"
      label="操作">
      <template slot-scope="scope">
        <div>
          <el-button size="small" type="primary" @click="editDoc(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="delDoc(scope.row)">删除</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { deleteDefineArticle } from '@/api/cms/article'
  export default {
    props: {
      list: {
        default: ()=> {
          []
        },
        type: Array
      }
    },
    data() {
      return {
      }
    },
    methods: {
      delDoc(row) {
        this.$confirm('确定删除该文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.confirmDel(row)
        }).catch(() => {         
        })
      },
      confirmDel(row) {
        let params = {
          channelId: row.channelId,
          documentId: row.documentId
        }
        return new Promise((resolve, reject) => {
          deleteDefineArticle(params)
            .then((response) => {
              this.$message.success('删除成功')
              this.$emit('handelSuccess')
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      },
      editDoc(row) {
        this.$emit('editDoc', row)
      }
    }
  }
</script>