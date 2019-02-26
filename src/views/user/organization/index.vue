<template>
  <div class="components-container">
    <pap-search ref="papSearchForm" :content="searchForm">
      <!-- 按钮等租户建议放在外层，这里建议存放的是特殊情况的搜索框(不能通过JSON传参生成的搜索条件) -->
      <!--<el-button type="primary" icon="el-icon-search">搜索</el-button>-->
    </pap-search>
    <!-- 根据 buttonArray 中的 click 参数，对外暴露监听其中的方法，并在当前页面中监听并实现对应的业务 -->
    <button-group :button-array="buttonArray" @list-click="listClick()" @create-click="createClick" @edit-click="editClick" @enable-click="enableClick" @disable-click="disableClick"/>
    <!-- 表格的数据展示，参数放置到 tableConfig 中进行传入。 -->
    <!-- 分页条处理：每页条数变化、当前页页码条数、表格选中数据监听 -->
    <pap-table ref="organization-table" v-bind="tableConfig" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange" @multiple-selection="multipleSelectionEmit"/>
    <!-- 允许当前页面被其他组件依赖，依赖的过程中，允许具名slot，保证明确的节点被插入到当前组件中 -->
    <slot name="fotter-slot"/>
    <!-- 向子组件内部传递dialogSubmitClickEmit 数据，数据对应的值，需要进行额外的监听，数据会返还回来  -->
    <pap-dialog ref="organization-dialog-ref" :dialog-submit-click-emit="dialogSubmitClickEmit" :content-form="dialogForm" @dialogSubmitClick="dialogSubmitClick"/>
  </div>
</template>

<script>
import PapSearch from '@/components/pap/search/index'
import PapTable from '@/components/pap/table/index'
import PapDialog from '@/components/pap/dialog/index'
import ButtonGroup from '@/components/pap/button-group/index'
import { OrganizationList, OrganizationCreate, OrganizationUpdate, OrganizationUpdateForEnable } from '@/api/user/organization'

export default {
  name: 'SysOrganization',
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
        {name: '编辑', auth: true, click: 'edit-click', disabled: true, icon: 'el-icon-edit'},
        {name: '审核通过', auth: true, click: 'enable-click', disabled: true, icon: 'el-icon-check'},
        {name: '审核拒绝', auth: true, click: 'disable-click', disabled: true, icon: 'el-icon-close'}
      ],

      // 表格
      tableConfig: {
        // 多页选中数据回显，分页记录保存选中的数据
        rowKeys: 'organizationId',
        colomn: [
          { prop: 'organizationCode', label: '租户编码'},
          { prop: 'organizationName', label: '租户名称'},
          { prop: 'organizationManager', label: '租户管理者'},
          { prop: 'remark', label: '备注'},
          { prop: 'enableFlag', label: '状态', formatter: row => (row.enableFlag === 1 ? '启用' : '禁用')}
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
        {$id: 'organizationCode', $type: 'input', $label: '租户编码', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'organizationName', $type: 'input', $label: '租户名称', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'organizationType', $type: 'input', $label: '系统类型', $default: 'CUSTOMER', $enableWhen: { null: 'null' },
          $el: { placeholder: '请输入', style: 'width: 200px' }
        }
      ],

      // 弹出框表单
      dialogForm: [
        {$id: 'organizationId', $type: 'input', $label: '租户编号', $default: '', $enableWhen: { null: 'null' },
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'organizationType', $type: 'input', $label: '系统类型', $default: 'CUSTOMER', $enableWhen: { null: 'null' },
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'enableFlag', $type: 'input', $label: '可用状态', $default: '0', $enableWhen: { null: 'null' },
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'organizationCode', $type: 'input', $label: '租户编码', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'organizationName', $type: 'input', $label: '租户名称', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'organizationManager', $type: 'input', $label: '租户管理者', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'remark', $type: 'input', $label: '备注', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
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
        OrganizationList(searchFormObj, this.tableConfig.paginationPageNo, this.tableConfig.paginationSize).then(async res => {
          _this.tableConfig.total = res.data.result.total
          _this.tableConfig.tableData = res.data.result.content
          // 结束
          resolve()
        }).catch(err => {
            reject(err)
          })
      })
    },
    // 监听表格选中值变化, 并复制到当前组件中，便于手续也租户.
    multipleSelectionEmit (val) {
      this.multipleSelection = val
      // 这里根据表格选中值的数据条数进行判断，将按钮中的数据进行动态维护
      if (this.multipleSelection.length !== 1) {
        // 在进行按钮组禁用/启用的过程中，有可能父组件会向当前组件传递buttonArrayProps 数据，此时buttonArray 数组的值将发生变化，故此处需要强制判断
        if (this.buttonArray.length > 2 && this.buttonArray[2].name === '编辑' && this.buttonArray[3].name === '审核通过' && this.buttonArray[4].name === '审核拒绝') {
          this.buttonArray[2].disabled = true
          this.buttonArray[3].disabled = true
          this.buttonArray[4].disabled = true
        }
      } else {
        if (this.buttonArray.length > 2 && this.buttonArray[2].name === '编辑' && this.buttonArray[3].name === '审核通过' && this.buttonArray[4].name === '审核拒绝') {
          this.buttonArray[2].disabled = false
          if (this.multipleSelection[0].enableFlag === 0) {
            this.buttonArray[3].disabled = false
          }
          if (this.multipleSelection[0].enableFlag === 1) {
            this.buttonArray[4].disabled = false
          }
          
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
      _this.$refs["organization-dialog-ref"].baseDialogVisible = true
      _this.$nextTick(function () {
        _this.$refs["organization-dialog-ref"].$refs.formRender.updateForm({
          organizationId: '',
          organizationCode: '',
          organizationName: '',
          organizationManager: '',
          remark: ''
        })
      })
    },
    dialogSubmitClick (data) {
      var _this = this
	    if (data.organizationId !== undefined && data.organizationId !== '') {
        return new Promise((resolve, reject) => {
          // 开始请求
          OrganizationUpdate(data).then(async res => {
            _this.dialogSubmitClickCallback('租户更新', res, _this)
            // 结束
            resolve()
          }).catch(err => {
              reject(err)
            })
        })
	    } else {
        return new Promise((resolve, reject) => {
          // 开始请求
          OrganizationCreate(data).then(async res => {
            _this.dialogSubmitClickCallback('租户新增', res, _this)
            // 结束
            resolve()
          }).catch(err => {
              reject(err)
            })
        })
	    }
    },
    enableClick () {
      var _this = this
      var enableFlagObj = this.multipleSelection[0]
      enableFlagObj.enableFlag = 1;
      return new Promise((resolve, reject) => {
        // 开始请求
        OrganizationUpdateForEnable(enableFlagObj).then(async res => {
          _this.dialogSubmitClickCallback('租户审核', res, _this)
          // 结束
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    disableClick () {
      var _this = this
      var enableFlagObj = this.multipleSelection[0]
      enableFlagObj.enableFlag = 0;
      return new Promise((resolve, reject) => {
        // 开始请求
        OrganizationUpdateForEnable(enableFlagObj).then(async res => {
          _this.dialogSubmitClickCallback('租户审核', res, _this)
          // 结束
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    dialogSubmitClickCallback (type, res, contextThis) {
      const h = contextThis.$createElement;
      if (res.data.code == 0) {
        contextThis.$notify({
          title: type,
          message: h('i', {style: 'color: teal'}, type + "成功!")
        })
        contextThis.$refs["organization-dialog-ref"].baseDialogVisible = false
        contextThis.getList()
        // 查询成功之后，清空表格的选中值
        contextThis.$refs["organization-table"].$refs["pap-base-table"].clearSelection()
      } else {
        contextThis.$notify({
          title: type,
          message: h('i', {style: 'color: teal'}, res.data.result)
        })
      }
    },
    editClick () {
      var _this = this
      _this.$refs["organization-dialog-ref"].baseDialogVisible = true
	    var selObj = _this.multipleSelection[0]
      _this.$nextTick(function () {
        _this.$refs["organization-dialog-ref"].$refs.formRender.updateForm(selObj)
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
