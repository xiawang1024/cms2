<template>
  <div class="user-user-manage">
    <el-form :inline="true" size="mini" style="margin-top: 10px;">
      <el-form-item :label="`已选数据 [ ${multipleSelection.length} ]`">
        <el-button-group>
	        <el-button type="text" size="mini" :disabled="multipleSelection.length === 0" @click="handleShowSelectedTableData(multipleSelection)">
		        查看
	        </el-button>
        </el-button-group>
      </el-form-item>
    </el-form>

    <el-table ref="pap-base-table" :row-key="rowKeys" :data="currentTableData" v-loading="tableLoading"  stripe style="width: 100%; " @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="55" :reserve-selection=true></el-table-column>
        <el-table-column
                v-for="(col) in currentTableColumn"
                :key="col.prop"
                v-bind="col" >
        </el-table-column>
    </el-table>
		<!-- 分页条 -->
	  <el-pagination v-if="paginationShowFlag" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationPageNo"
      :page-sizes="paginationSizes" :page-size="paginationSize" :layout="paginationLayout" :total="total">
	  </el-pagination>
	  <!-- 当前选中数据的表格弹窗查看，当前表格兼容分页保存选中数据，故需要一个地方存储所有选中的数据对象 -->
	  <!-- 为防止出现 嵌套Dialog ,内层的dialog 默认将 append-to-body 设置为 true -->
	  <el-dialog append-to-body title="选中数据查看" :visible.sync="selectedTableDataDialogVisible">
		  <el-table size="mini" :data="multipleSelection" v-loading="tableLoading" height="400">
			  <el-table-column v-for="(col) in currentTableColumn" :key="col.prop" v-bind="col" >
			  </el-table-column>
		  </el-table>
	  </el-dialog>
  </div>
</template>

<script>

export default {
  props: {
    rowKeys: {
      type: String,
	    default: 'id'
    },
    colomn: {
      default: () => []
    },
    tableData: {
      default: () => []
    },
    tableLoading: {
      default: false
    },
	  // page
	  paginationShowFlag: {
      type: Boolean,
		  default: true
	  },
    /**
     * 分页组件的子组件布局，子组件名用逗号分隔，对应element-ui pagination的layout属性
     * @link http://element.eleme.io/#/zh-CN/component/pagination
     */
    paginationLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    /**
     * 分页组件的每页显示个数选择器的选项设置，对应element-ui pagination的page-sizes属性
     * @link http://element.eleme.io/#/zh-CN/component/pagination
     */
    paginationSizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50]
    },
	  total: {
      type: Number,
      default: 0
	  }
  },
  data () {
    return {
      /**
       * 分页组件当前页数
       */
      paginationPageNo: 1,
      /**
       * 分页组件的每页显示个数选择器默认选项
       */
      paginationSize: 10,
      currentTableData: [],
      multipleSelection: [],
      currentTableColumn: [],
	    // 选中数据弹窗查看
      selectedTableDataDialogVisible: false
    }
  },
  watch: {
    colomn: {
      handler (val) {
        this.currentTableColumn = val
      },
      immediate: true
    },
    tableData: {
      handler (val) {
        this.currentTableData = val
      },
      immediate: true
    }
  },
  methods: {
    // 表格数据查看
    handleShowSelectedTableData (val) {
      this.selectedTableDataDialogVisible = true
    },
    // 表格
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.$emit('multiple-selection', val)
    },
	  // 分页
    handleSizeChange (val) {
      this.paginationPageNo = 1
      this.paginationSize = val
      this.$emit('handle-size-change', val)
    },
    handleCurrentChange (val) {
      this.paginationPageNo = val
      this.$emit('handle-current-change', val)
    },
    handleDownloadXlsx (data) {
      var _this = this
      this.$export.excel({
        title: '已选数据导出',
        columns: _this.currentTableColumn,
        data: _this.downloadDataTranslate(_this.multipleSelection)
      })
        .then(() => {
          this.$message('导出表格成功')
        })
    },
	  // 表格导出优化，额外处理参数, 将数据库中的数据转换为可识别的数据
    downloadDataTranslate (data) {
      return data.map(row => ({
        ...row,
        disableFlag: row.disableFlag === 'NO' ? '启用' : '禁用'
      }))
    }
  }
}
</script>
<style lang="scss">
  .user-user-manage{
    .el-pagination{
      margin-top:30px;
      padding: 0 30px;
      text-align: right;
    }
  }
</style>
