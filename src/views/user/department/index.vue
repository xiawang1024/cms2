<template>
  <div class="components-container">
    <!-- <pap-search ref="papSearchForm" :content="searchForm"/> -->
    <!-- 根据 buttonArray 中的 click 参数，对外暴露监听其中的方法，并在当前页面中监听并实现对应的业务 -->
    <button-group :button-array="buttonArray" @list-click="listClick()" @create-click="createClick"/>
    <div>
      <el-tree ref="tree" :data="treeData" :props="defaultProps" :expand-on-click-node="false" show-checkbox default-expand-all node-key="departmentId" highlight-current>
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click="() => updateTreeNodeDialog(node, data)">更新</el-button>
            <el-button type="text" size="mini" @click="() => removeTreeNode(node, data)">删除</el-button>
            <el-button type="text" size="mini" @click="() => updateUserManagerDialog(node, data)">用户</el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <!-- 部门管理 弹窗组件 -->
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="部门管理" width="30%">
      <el-form-renderer ref="dialogFormRender" :inline="dialogFormInlineFlag" :class="dialogFormInlineFlag ? 'demo-form-inline' : '' " :content="dialogForm" label-width="100px">
        <el-form-item label="上级部门">
          <el-cascader v-model="dialogDepartmentOptions" :options="treeData" :props="cascaderProps" clearable change-on-select/>
        </el-form-item>
      </el-form-renderer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 用户分配管理 弹窗组件 -->
    <el-dialog :visible.sync="dialogUserManagerVisible" :before-close="handleClose" title="用户分配管理">
      <div style="height: 700px;">
        <user ref="dialogUserRef" :button-array-props="dialogUserManagerButtonArrayProps" :import-button-flag="dialogUserManagerImportButtonFlag">
          <h1 slot="fotter-slot" style="float: right;">
            <el-button @click="dialogUserManagerVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogUserManagerSubmit">确 定</el-button>
          </h1>
        </user>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PapSearch from '@/components/pap/search/index'
import ButtonGroup from '@/components/pap/button-group/index'
import { DepartmentList, DepartmentCreate, DepartmentUpdate, DepartmentDelete, DepartmentUserRelSave, DepartmentUserRelUserInfoByDepId } from '@/api/user/department'
import ElFormRenderer from '@/components/el-form-renderer'
import User from '@/views/user/user'

export default {
  name: 'UserDepartment',
  components: {
    PapSearch,
    ButtonGroup,
    ElFormRenderer,
    User
  },
  data() {
    return {
      /* eslint-disable */
      // 按钮组
      buttonArray: [
        {name: '搜索', auth: true, click: 'list-click', icon: 'el-icon-search'},
        {name: '新建', auth: true, click: 'create-click', icon: 'el-icon-plus'}
      ],
      // 搜索框
      searchForm: [
      ],
      dialogDepartmentOptions: [],
      dialogForm: [
        {$id: 'departmentId', $type: 'input', $label: '编号', $default: '', $enableWhen: { null: 'null' },
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'departmentCode', $type: 'input', $label: '编码', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'departmentName', $type: 'input', $label: '名称', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        }
      ],
      // 用来区分弹窗提交按钮的类型， 区分 create 与 update
      dialogSubmitUrlType: 'CREATE',
      dialogFormInlineFlag: false,
      // 树形数据
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'departmentName'
      },
      cascaderProps: {
        value: 'departmentId',
        label: 'departmentName',
        children: 'children'
      },
      dialogFormVisible: false,
      // 弹窗用户管理部分
      dialogUserManagerVisible: false,
      // 弹窗选择的组织机构编号
      dialogUserManagerDepartmentId: '',
      // 用户弹出框按钮组
      dialogUserManagerButtonArrayProps: [
        {name: '搜索', auth: 'USER:LIST', click: 'list-click', icon: 'el-icon-search'}
      ],
      dialogUserManagerImportButtonFlag: false,
      filename: ''
      /* eslint-disable */
    }
  },
  mounted: function() {
    this.getList()
  },
  methods: {
    getList () {
      var _this = this
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        DepartmentList().then(async res => {
          console.log(res)
          _this.treeData = res.data.result
          // 结束
          resolve()
        }).catch(err => {
          console.log('err: ', err)
          reject(err)
        })
      })
    },
    listClick () {
      this.getList()
    },
    createClick () {
      // 确保弹窗提交按钮是创建
      this.dialogSubmitUrlType = 'CREATE'
      this.dialogFormVisible = true
    },
    removeTreeNode (node, data) {
      console.log(node, data)
      var _this = this
      return new Promise((resolve, reject) => {
        // 开始请求
        DepartmentDelete(data).then(async res => {
          console.log(res)
          if (res.data.code === 0) {
            _this.getList()
          } else {
            const h = this.$createElement;
            this.$notify({
              title: '部门删除',
              message: h('i', {style: 'color: teal'}, res.data.msg)
            })
          }
          // 结束
          resolve()
        }).catch(err => {
          console.log('err: ', err)
          reject(err)
        })
      })
    },
    updateTreeNodeDialog (node, data) {
      console.log(node, data)
      var _this = this
      // 确保弹窗提交按钮是更新
      _this.dialogSubmitUrlType = 'UPDATE'
      _this.dialogFormVisible = true
      // 此处有可能出现$refs.dialogFormRender 获取不到的情况，使用 nextTick (在下次 DOM 更新循环结束之后执行延迟回调)
      _this.$nextTick(function () {
        _this.$refs.dialogFormRender.updateForm({
          departmentId: data.departmentId,
          departmentCode: data.departmentCode,
          departmentName: data.departmentName
        })
        _this.dialogDepartmentOptions = (data.parentDepartmentIds !== null && data.parentDepartmentIds !== undefined) ? data.parentDepartmentIds.split(',') : []
      })
    },
    updateUserManagerDialog (node, data) {
      console.log(node, data)
      var _this = this
      _this.dialogUserManagerVisible = true
      _this.dialogUserManagerDepartmentId = data.departmentId
      // 在 DOM 更新之后处理，确保能够找到内部组件，这里需要将默认选中的值优先进行清空。
      _this.$nextTick(function () {
        // 查询出来组织机构下属的用户信息
        DepartmentUserRelUserInfoByDepId(_this.dialogUserManagerDepartmentId).then(async res => {
          console.log(res)
          _this.$refs.dialogUserRef.$refs["user-table"].$refs["pap-base-table"].clearSelection()
          var userArray = res.data.result
          userArray.forEach(row => {
            _this.$refs.dialogUserRef.$refs["user-table"].$refs["pap-base-table"].toggleRowSelection(row);
          })
          // 父组件调用子组件方法，在上述方法将部门下用户带出来之后，重新渲染表格数据，这样可以保证表格的数据选中效果
          _this.$refs.dialogUserRef.getList()
        }).catch(err => {
          console.log('err: ', err)
          reject(err)
        })
      })
    },
    dialogFormSubmit () {
      var _this = this
      var dialogFormObj = this.$refs.dialogFormRender.getFormValue()
      const departmentLastId = this.dialogDepartmentOptions[this.dialogDepartmentOptions.length - 1]
      dialogFormObj.parentDepartmentId = departmentLastId
      return new Promise((resolve, reject) => {
        // 开始请求
        if (_this.dialogSubmitUrlType === 'CREATE') {
          DepartmentCreate(dialogFormObj).then(async res => {
            console.log(res)
            _this.getList()
            _this.clearDialogForm()
            _this.dialogFormVisible = false
            // 结束
            resolve()
          }).catch(err => {
            console.log('err: ', err)
            reject(err)
          })
        }
        if (_this.dialogSubmitUrlType === 'UPDATE') {
          DepartmentUpdate(dialogFormObj).then(async res => {
            if (res.data.code == 0) {
              console.log(res)
              _this.getList()
              _this.clearDialogForm()
              _this.dialogFormVisible = false
            } else {
              const h = this.$createElement;
              this.$notify({
                title: '当前操作',
                message: h('i', {style: 'color: teal'}, res.data.msg)
              })
            }

            // 结束
            resolve()
          }).catch(err => {
            console.log('err: ', err)
            reject(err)
          })
        }
      })
    },
    // 情况dialog中的form表单数据
    clearDialogForm () {
      var _this = this
      _this.$refs.dialogFormRender.updateForm({
        departmentId: '',
        departmentCode: '',
        departmentName: ''
      })
      _this.dialogDepartmentOptions = []
    },
    dialogUserManagerSubmit () {
      var _this = this
      console.log(_this.$refs.dialogUserRef.multipleSelection)
      var multiSelection = _this.$refs.dialogUserRef.multipleSelection
      var details = []
      for(var i = 0; i < multiSelection.length; i++) {
        details.push(multiSelection[i].userId)
      }
      var obj = {
        departmentId: _this.dialogUserManagerDepartmentId,
        userIdDetails: details
      }
      return new Promise((resolve, reject) => {
        DepartmentUserRelSave(obj).then(async res => {
          console.log(res)
          const h = this.$createElement;
          if (res.data.code == 0) {
            this.$notify({
              title: '部门用户绑定',
              message: h('i', {style: 'color: teal'}, "用户绑定成功!")
            })
            _this.dialogUserManagerVisible = false
          } else {
            this.$notify({
              title: '部门用户绑定',
              message: h('i', {style: 'color: teal'}, res.data.data)
            })
          }
          // 结束
          resolve()
        }).catch(err => {
          console.log('err: ', err)
          reject(err)
        })
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        }).catch(_ => {});
    }
  }
}
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>

