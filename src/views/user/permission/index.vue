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
    <pap-table ref="permission-table" v-bind="tableConfig" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange" @multiple-selection="multipleSelectionEmit"/>
    <!-- 允许当前页面被其他组件依赖，依赖的过程中，允许具名slot，保证明确的节点被插入到当前组件中 -->
    <slot name="fotter-slot"/>
    <!-- 向子组件内部传递dialogSubmitClickEmit 数据，数据对应的值，需要进行额外的监听，数据会返还回来  -->
    <pap-dialog ref="permission-dialog-ref" :dialog-submit-click-emit="dialogSubmitClickEmit" :content-form="dialogForm" @dialogSubmitClick="dialogSubmitClick">
      <span slot="customerFormItem">
        <el-form-item label="所属应用">
          <el-select v-model="dialogApplication" :remote-method="searchApplicationInfo" filterable remote reserve-keyword placeholder="请选择所属应用">
            <el-option v-for="item in applicationDataList" :key="item.sysApplicationId" :label="item.sysApplicationName" :value="item.sysApplicationId"/>
          </el-select>
        </el-form-item>
        <el-form-item label="请求协议">
          <el-select v-model="dialogHttpMethod" :remote-method="searchOperationInfo" filterable remote reserve-keyword placeholder="请选择请求协议">
            <el-option v-for="item in operationDataList" :key="item.sysOperationId" :label="item.sysOperationName" :value="item.sysOperationId"/>
          </el-select>
        </el-form-item>
      </span>
    </pap-dialog>
  </div>
</template>

<script>
import PapSearch from '@/components/pap/search/index'
import PapTable from '@/components/pap/table/index'
import PapDialog from '@/components/pap/dialog/index'
import ButtonGroup from '@/components/pap/button-group/index'
import { PermissionCreate, PermissionList, PermissionUpdate } from '@/api/user/permission'
import { OperationList } from '@/api/user/operation'
import { ApplicationList } from '@/api/user/application'

export default {
  name: 'SysPermission',
  components: {
    PapSearch,
    PapTable,
    PapDialog,
    ButtonGroup
  },
  props: {
    // 允许当前组件被当做子组件依赖，传递过来明确的按钮组数据
    buttonArrayProps: {
      type: Array,
      default: () => []
    }
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
        rowKeys: 'permissionId',
        colomn: [
          { prop: 'permissionCode', label: '权限编码'},
          { prop: 'permissionName', label: '权限名称'},
          { prop: 'httpUrl', label: '请求链接'},
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
        {$id: 'permissionName', $type: 'input', $label: '权限名称', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        }
      ],

      // 弹出框表单
      dialogForm: [
				{$id: 'permissionId', $type: 'input', $label: '权限编号', $default: '', $enableWhen: { null: 'null' },
					$el: { placeholder: '请输入', style: 'width: 200px' }
				},
				{$id: 'permissionCode', $type: 'input', $label: '权限编码', $default: '',
					$el: { placeholder: '请输入', style: 'width: 200px' }
				},
				{$id: 'permissionName', $type: 'input', $label: '权限名称', $default: '',
					$el: { placeholder: '请输入', style: 'width: 200px' }
				},
				{$id: 'resourceUrlId', $type: 'input', $label: '请求链接编号', $default: '', $enableWhen: { null: 'null' },
					$el: { placeholder: '请输入', style: 'width: 200px' }
				},
				{$id: 'httpUrl', $type: 'input', $label: '请求链接', $default: '',
					$el: { placeholder: '请输入', style: 'width: 200px' }
				},
				{$id: 'blackUrl', $type: 'input', $label: '黑名单链接', $default: '',
					$el: { placeholder: '请输入', style: 'width: 200px' }
				},
        {$id: 'remark', $type: 'input', $label: '备注', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        }
      ],
	    // 弹窗自定义一个下拉框属性
	    dialogHttpMethod: '',
      dialogApplication: '',
      dialogSubmitClickEmit: 'dialogSubmitClick',
	    // operation data list
	    operationDataList: [],
      applicationDataList: [],
      filename: ''
      /* eslint-disable */
    }
  },
  watch: {
    buttonArrayProps: {
      handler (val) {
        if (val !== undefined && val.length > 0) {
          this.buttonArray = val
        }
      },
      immediate: true
    }
  },
  mounted: function () {
    this.getOperationInfo()
    this.getApplicationInfo()
    this.getList()
  },
  methods: {
    getOperationInfo () {
			this.searchOperationInfo('')
    },
    searchOperationInfo (queryName) {
      var _this = this
      var searchFormObj = {}
      searchFormObj.operationName = queryName
      return new Promise((resolve, reject) => {
        // 开始请求
        OperationList(searchFormObj, 1, 10).then(async res => {
          _this.operationDataList = res.data.result.content
          // 结束
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    getApplicationInfo () {
      this.searchApplicationInfo('')
    },
    searchApplicationInfo (queryName) {
      var _this = this
      var searchFormObj = {}
      searchFormObj.sysApplicationName = queryName
      return new Promise((resolve, reject) => {
        // 开始请求
        ApplicationList(searchFormObj, 1, 10).then(async res => {
          _this.applicationDataList = res.data.result.content
          // 结束
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    getList () {
      var _this = this
      var searchFormObj = this.$refs.papSearchForm.$refs.formRender.getFormValue()
      return new Promise((resolve, reject) => {
        // 开始请求
        PermissionList(searchFormObj, this.tableConfig.paginationPageNo, this.tableConfig.paginationSize).then(async res => {
          _this.tableConfig.total = res.data.result.total
          _this.tableConfig.tableData = res.data.result.content
          // 结束
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 监听表格选中值变化, 并复制到当前组件中，便于手续也权限.
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
      _this.$refs["permission-dialog-ref"].baseDialogVisible = true
      _this.$nextTick(function () {
        _this.$refs["permission-dialog-ref"].$refs.formRender.updateForm({
          permissionId: '',
          permissionCode: '',
          permissionName: '',
          resourceUrlId: '',
          httpUrl: '',
          blackUrl: '',
          remark: ''
        })
	      _this.dialogHttpMethod = '';
        _this.dialogApplication = '';
      })
    },
    dialogSubmitClick (data) {
      var _this = this
			console.log(data)
	    data.httpMethod = _this.dialogHttpMethod
      data.sysApplicationId = _this.dialogApplication
      if (data.permissionId !== undefined && data.permissionId !== '') {
        return new Promise((resolve, reject) => {
          // 开始请求
          PermissionUpdate(data).then(async res => {
            _this.dialogSubmitClickCallback('权限更新', res, _this)
            // 结束
            resolve()
          }).catch(err => {
            reject(err)
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          // 开始请求
          PermissionCreate(data).then(async res => {
            _this.dialogSubmitClickCallback('权限新增', res, _this)
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
        contextThis.$refs["permission-dialog-ref"].baseDialogVisible = false
        contextThis.getList()
        // 查询成功之后，清空表格的选中值
        contextThis.$refs["permission-table"].$refs["pap-base-table"].clearSelection()
      } else {
        contextThis.$notify({
          title: type,
          message: h('i', {style: 'color: teal'}, res.data.result)
        })
      }
    },
    editClick () {
      var _this = this
      _this.$refs["permission-dialog-ref"].baseDialogVisible = true
	    var selObj = _this.multipleSelection[0]
      _this.$nextTick(function () {
        _this.$refs["permission-dialog-ref"].$refs.formRender.updateForm(selObj)
	      _this.dialogHttpMethod = selObj.httpMethod
        _this.dialogApplication = selObj.sysApplicationId
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
