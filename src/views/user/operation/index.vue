<template>
  <div class="components-container">
    <pap-search ref="papSearchForm" :content="searchForm">
      <!-- 按钮等操作建议放在外层，这里建议存放的是特殊情况的搜索框(不能通过JSON传参生成的搜索条件) -->
      <!--<el-button type="primary" icon="el-icon-search">搜索</el-button>-->
    </pap-search>
    <!-- 根据 buttonArray 中的 click 参数，对外暴露监听其中的方法，并在当前页面中监听并实现对应的业务 -->
    <button-group :button-array="buttonArray" @list-click="listClick()" @create-click="createClick" @edit-click="editClick"/>
    <!-- 表格的数据展示，参数放置到 tableConfig 中进行传入。 -->
    <!-- 分页条处理：每页条数变化、当前页页码条数、表格选中数据监听 -->
    <pap-table ref="operation-table" v-bind="tableConfig" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange" @multiple-selection="multipleSelectionEmit"/>
    <!-- 允许当前页面被其他组件依赖，依赖的过程中，允许具名slot，保证明确的节点被插入到当前组件中 -->
    <slot name="fotter-slot"/>
    <!-- 向子组件内部传递dialogSubmitClickEmit 数据，数据对应的值，需要进行额外的监听，数据会返还回来  -->
    <pap-dialog ref="operation-dialog-ref" :dialog-submit-click-emit="dialogSubmitClickEmit" :content-form="dialogForm" @dialogSubmitClick="dialogSubmitClick"/>
  </div>
</template>

<script>
import PapSearch from '@/components/pap/search/index'
import PapTable from '@/components/pap/table/index'
import PapDialog from '@/components/pap/dialog/index'
import ButtonGroup from '@/components/pap/button-group/index'
import { OperationList, OperationCreate, OperationUpdate } from '@/api/user/operation'

export default {
  name: 'SysOperation',
  components: {
    PapSearch,
    PapTable,
    PapDialog,
    ButtonGroup
  },
  data() {
    return {
      /* eslint-disable */
      // 按钮组
      buttonArray: [
        {name: '搜索', auth: true, click: 'list-click', icon: 'el-icon-search'},
        {name: '新建', auth: true, click: 'create-click', icon: 'el-icon-plus'},
        {name: '编辑', auth: true, click: 'edit-click', disabled: true, icon: 'el-icon-edit'}
      ],

      // 表格
      tableConfig: {
        // 多页选中数据回显，分页记录保存选中的数据
        rowKeys: 'sysOperationId',
        colomn: [
          { prop: 'sysOperationCode', label: '操作编码'},
          { prop: 'sysOperationName', label: '操作名称'},
          { prop: 'sysOperationUrl', label: '请求链接'},
          { prop: 'httpMethod', label: '请求协议'}
        ],
        tableData: [
        ],
        paginationPageNo: 1,
        paginationSize: 10,
        total: 0
      },
      // 表格选择的值
      multipleSelection: [],

      // 搜索框
      searchForm: [
        {$id: 'sysOperationCode', $type: 'input', $label: '操作编码', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'sysOperationName', $type: 'input', $label: '操作名称', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'sysOperationUrl', $type: 'input', $label: '请求链接', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        }
      ],

      // 弹出框表单
      dialogForm: [
        {$id: 'sysOperationId', $type: 'input', $label: '操作编号', $default: '', $enableWhen: { null: 'null' },
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'sysOperationCode', $type: 'input', $label: '操作编码', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'sysOperationName', $type: 'input', $label: '操作名称', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'sysOperationUrl', $type: 'input', $label: '请求链接', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'httpMethod', $type: 'select', $label: '请求协议', $default: '',
          $el: { placeholder: '请选择', style: 'width: 200px' },
          $options: [
            { label: 'POST', value: 'POST' },
            { label: 'GET', value: 'GET' },
            { label: 'DELETE', value: 'DELETE' },
            { label: 'UPDATE', value: 'UPDATE' },
          ]
        }
      ],
      dialogSubmitClickEmit: 'dialogSubmitClick',
      filename: ''
      /* eslint-disable */
    }
  },
  methods: {
    getList () {
      var _this = this
      var searchFormObj = this.$refs.papSearchForm.$refs.formRender.getFormValue()
      return new Promise((resolve, reject) => {
        // 开始请求
        OperationList(searchFormObj, this.tableConfig.paginationPageNo, this.tableConfig.paginationSize).then(async res => {
          _this.tableConfig.total = res.data.result.total
          _this.tableConfig.tableData = res.data.result.content
          // 结束
          resolve()
        }).catch(err => {
            reject(err)
          })
      })
    },
    // 监听表格选中值变化, 并复制到当前组件中，便于手续也操作.
    multipleSelectionEmit (val) {
      this.multipleSelection = val
      // 这里根据表格选中值的数据条数进行判断，将按钮中的数据进行动态维护
      if (this.multipleSelection.length !== 1) {
        // 在进行按钮组禁用/启用的过程中，有可能父组件会向当前组件传递buttonArrayProps 数据，此时buttonArray 数组的值将发生变化，故此处需要强制判断
        if (this.buttonArray.length > 2 && this.buttonArray[2].name === '编辑') {
          this.buttonArray[2].disabled = true
        }
      } else {
        if (this.buttonArray.length > 2 && this.buttonArray[2].name === '编辑') {
          this.buttonArray[2].disabled = false
        }
      }
    },
    listClick () {
      // 点击搜索按钮，则默认从第一页开始搜索
      this.tableConfig.paginationPageNo = 1
      this.getList()
    },
    createClick () {
	    var _this = this
      _this.$refs["operation-dialog-ref"].baseDialogVisible = true
      _this.$nextTick(function () {
        _this.$refs["operation-dialog-ref"].$refs.formRender.updateForm({
          sysOperationId: '',
          sysOperationCode: '',
          sysOperationName: '',
          sysOperationUrl: '',
          httpMethod: ''
        })
      })
    },
    dialogSubmitClick (data) {
      var _this = this
	    if (data.sysOperationId !== undefined && data.sysOperationId !== '') {
        return new Promise((resolve, reject) => {
          // 开始请求
          OperationUpdate(data).then(async res => {
            _this.dialogSubmitClickCallback('操作更新', res, _this)
            // 结束
            resolve()
          }).catch(err => {
              reject(err)
            })
        })
	    } else {
        return new Promise((resolve, reject) => {
          // 开始请求
          OperationCreate(data).then(async res => {
            _this.dialogSubmitClickCallback('操作新增', res, _this)
            // 结束
            resolve()
          }).catch(err => {
              reject(err)
            })
        })
	    }
    },
    dialogSubmitClickCallback (type, res, contextThis) {
      const h = contextThis.$createElement;
      if (res.data.code == 0) {
        contextThis.$notify({
          title: type,
          message: h('i', {style: 'color: teal'}, type + "成功!")
        })
        contextThis.$refs["operation-dialog-ref"].baseDialogVisible = false
        contextThis.getList()
        // 查询成功之后，清空表格的选中值
        contextThis.$refs["operation-table"].$refs["pap-base-table"].clearSelection()
      } else {
        contextThis.$notify({
          title: type,
          message: h('i', {style: 'color: teal'}, res.data.result)
        })
      }
    },
    editClick () {
      var _this = this
      _this.$refs["operation-dialog-ref"].baseDialogVisible = true
	    var selObj = _this.multipleSelection[0]
      _this.$nextTick(function () {
        _this.$refs["operation-dialog-ref"].$refs.formRender.updateForm(selObj)
      })
    },
    handleSizeChange (val) {
      this.tableConfig.paginationPageNo = 1
      this.tableConfig.paginationSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.tableConfig.paginationPageNo = val
      this.getList()
    }
  }
}
</script>
