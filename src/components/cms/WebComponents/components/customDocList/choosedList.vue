<template>
  <div class="document-dialog">
    <el-table
      ref="dragTable"
      :data="tableData"
      style="width: 100%"
      size="mini"
      highlight-current-row>
      <el-table-column
        prop="articleTitle"
        label="标题"
        show-overflow-tooltip
        min-width="120"/>
      <el-table-column
        prop="articleType"
        label="类型"
        width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.articleType == 0">图文</span>
          <span v-if="scope.row.articleType == 1">图集</span>
          <span v-if="scope.row.articleType == 2">拼条</span>
          <span v-if="scope.row.articleType == 3">引用</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="channelName"
        min-width="120"
        label="所属栏目"/>
      <el-table-column
        prop="name"
        min-width="100"
        label="标记"/>
      <el-table-column
        prop="createUser"
        width="120"
        label="发稿人"/>
      <el-table-column
        prop="publishTime"
        width="160"
        label="发布时间"/>
      <el-table-column
        prop="clickNum"
        width="80"
        label="点击"/>
      <el-table-column
        prop="clickNum"
        label="操作"
        width="80">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" size="mini" @click="chooseDoc">添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <document-dialog :dialog-visible.sync = "dialogVisible" @getChoosed = "getChoosed" :list="tableData"/>
  </div>
</template>
<script>
  import documentDialog from './documentDialog.vue'
  import Sortable from 'sortablejs'
  export default {
    components: {
      documentDialog
    },
    props: {
      detailsList: {
        default: ()=> {
          []
        },
        type: Array
      }
    },
    data() {
      return {
        tableData: [],
        dialogVisible: false,
        oldList: [],
        newList: [],
        sortable: null,
      }
    },
    watch: {
      detailsList(val) {
        if(val && val.length) {
          this.tableData = val.map((ele) => {
            return ele.articleDTO
          })
        }
      },
      tableData(val) {
        this.oldList = val.map(v => v.articleId)
        this.newList = this.oldList.slice()
        this.$nextTick(() => {
          this.setSort()
        })
      }
    },
    methods: {
      getChoosed(list) {
        this.tableData = this.tableData.concat(list)
      },
      chooseDoc() {
        this.dialogVisible = true
      },
      deleteRow(index, rows) {
        rows.splice(index, 1)
      },
      setSort() {
        const el = this.$refs.dragTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
        this.sortable = Sortable.create(el, {
       
          setData: function(dataTransfer) {
            // to avoid Firefox bug
            // Detail see : https://github.com/RubaXa/Sortable/issues/1012
            // dataTransfer.setData('Text', '')
          },
          onEnd: evt => {
            // const targetRow = this.list.splice(evt.oldIndex, 1)[0]
            // this.list.splice(evt.newIndex, 0, targetRow)

            // for show the changes, you can delete in you code
            const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
            this.newList.splice(evt.newIndex, 0, tempIndex)
          }
        })
      }
    }
  }
</script>