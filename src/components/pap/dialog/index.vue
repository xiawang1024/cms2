<template>
	<div class="pop-dialog">
		<!-- 当前选中数据的表格弹窗查看，当前表格兼容分页保存选中数据，故需要一个地方存储所有选中的数据对象 -->
		<!-- 为防止出现 嵌套Dialog ,内层的dialog 默认将 append-to-body 设置为 true -->
		<el-dialog append-to-body title="表单操作" :visible.sync="baseDialogVisible" :before-close="handleClose">
			<el-form-renderer :inline="searchFormInlineFlag" :class="searchFormInlineFlag ? 'demo-form-inline' : '' " label-width="100px" :content="contentForm" ref="formRender">
				<!-- 具名插槽 -->
				<slot name="customerFormItem"></slot>
			</el-form-renderer>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click="baseDialogVisible = false">取 消</el-button>
				<el-button size="mini" type="primary" @click="dialogSubmit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import ElFormRenderer from '../../../components/el-form-renderer'

export default {
  name: 'PapDialog',
  props: {
    /**
     *  是否行内表单，在一行内放置表单
     */
    searchFormInlineFlag: {
      type: Boolean,
      default: true
    },
    /**
     *  弹窗ref 名称
     */
    dialogSubmitClickEmit: {
      type: String,
      default: 'submit'
    },
    /**
     * 表单元素属性：传递过来表单JSON数据，用来渲染页面
     */
    contentForm: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    ElFormRenderer
  },
  data () {
    return {
      // 弹窗展示与否
      baseDialogVisible: false
    }
  },
  watch: {
  },
  methods: {
    // 表格数据查看
    dialogSubmit () {
      var _this = this
      _this.$nextTick(function () {
        var formObj = _this.$refs.formRender.getFormValue()
        _this.$emit(_this.dialogSubmitClickEmit, formObj)
      })
    },
	  handleClose (done) {
       done()
	    // this.$confirm('确认关闭？')
	    //   .then(_ => {
	    //     done()
	    //   }).catch(_ => {})
	  }
  }
}
</script>
<style lang="scss">
  .pop-dialog {
    
  }
</style>