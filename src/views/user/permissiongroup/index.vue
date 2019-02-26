<template>
  <div class="components-container">
    <pap-search ref="papSearchForm" :content="searchForm"/>
    <!-- 根据 buttonArray 中的 click 参数，对外暴露监听其中的方法，并在当前页面中监听并实现对应的业务 -->
    <button-group :button-array="buttonArray" @list-click="listClick()" @create-click="createClick"/>

    <div style="margin-top: 50px;">
      <!-- 注意这里的 node-key 字段维护，维护过之后，选择框数据才能正常 -->
      <el-tree ref="tree" :data="treeData" :props="defaultProps" :expand-on-click-node="false" show-checkbox default-expand-all node-key="permissionGroupId" highlight-current>
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span v-if="treeButtonFlag">
            <el-button type="text" size="mini" @click="() => updateTreeNodeDialog(node, data)">更新</el-button>
            <el-button type="text" size="mini" @click="() => removeTreeNode(node, data)">删除</el-button>
            <el-button type="text" size="mini" @click="() => updatePermissionManagerDialog(node, data)">权限</el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <!-- 权限组管理 弹窗组件 -->
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="权限组管理" width="30%">
      <el-form-renderer ref="dialogFormRender" :inline="dialogFormInlineFlag" :class="dialogFormInlineFlag ? 'demo-form-inline' : '' " :content="dialogForm" label-width="100px">
        <el-form-item label="上级权限组">
          <el-cascader v-model="dialogPermissionGroupOptions" :options="treeData" :props="cascaderProps" clearable change-on-select/>
        </el-form-item>
      </el-form-renderer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 权限分配管理 弹窗组件 -->
    <el-dialog :visible.sync="dialogPermissionManagerVisible" :before-close="handleClose" title="权限分配管理">
      <div style="height: 700px;">
        <permission ref="dialogPermissionRef" :button-array-props="dialogPermissionManagerButtonArrayProps" :import-button-flag="dialogPermissionManagerImportButtonFlag">
          <h1 slot="fotter-slot" style="float: right;">
            <el-button @click="dialogPermissionManagerVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogPermissionManagerSubmit">确 定</el-button>
          </h1>
        </permission>
      </div>
    </el-dialog>
    <!-- 允许当前页面被其他组件依赖，依赖的过程中，允许具名slot，保证明确的节点被插入到当前组件中 -->
    <slot name="fotter-slot"/>
  </div>
</template>

<script>
import PapSearch from '@/components/pap/search/index'
import ButtonGroup from '@/components/pap/button-group/index'
import { PermissionGroupList, PermissionGroupCreate, PermissionGroupUpdate, PermissionGroupDelete, PermissionGroupPermissionRelSave, PermissionGroupPermissionRelPermissionInfoByGroupId } from '@/api/user/permissiongroup'
import ElFormRenderer from '@/components/el-form-renderer'
import Permission from '@/views/user/permission/index'

export default {
  name: 'SysuserPermissiongroup',
  components: {
    PapSearch,
    ButtonGroup,
    ElFormRenderer,
    Permission
  },
  props: {
    // 允许当前组件被当做子组件依赖，传递过来明确的按钮组数据
    buttonArrayProps: {
      type: Array,
      default: () => []
    },
    // 允许当前组件被当做子组件依赖，根据参数判断是否隐藏额外的slot插槽按钮
    treeButtonFlag: {
      type: Boolean,
      default: true
    }
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
      dialogPermissionGroupOptions: [],
      dialogForm: [
        {$id: 'permissionGroupId', $type: 'input', $label: '编号', $default: '', $enableWhen: { null: 'null' },
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'permissionGroupCode', $type: 'input', $label: '编码', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'permissionGroupName', $type: 'input', $label: '名称', $default: '',
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
        label: 'permissionGroupName'
      },
      cascaderProps: {
        value: 'permissionGroupId',
        label: 'permissionGroupName',
        children: 'children'
      },
      dialogFormVisible: false,
      // 弹窗权限管理部分
      dialogPermissionManagerVisible: false,
      // 弹窗选择的权限组编号
      dialogPermissionManagerPermissionGroupId: '',
      // 权限弹出框按钮组
      dialogPermissionManagerButtonArrayProps: [
        {name: '搜索', auth: 'USER:LIST', click: 'list-click', icon: 'el-icon-search'}
      ],
      dialogPermissionManagerImportButtonFlag: false,
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
  methods: {
    getList () {
      var _this = this
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        PermissionGroupList().then(async res => {
          console.log(res)
          if (res.data !== '' && res.data.result !== '') {
            _this.treeData = res.data.result
          }
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
        PermissionGroupDelete(data).then(async res => {
          console.log(res)
          if (res.data.code === 0) {
            _this.getList()
          } else {
            const h = this.$createElement;
            this.$notify({
              title: '权限组删除',
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
          permissionGroupId: data.permissionGroupId,
          permissionGroupCode: data.permissionGroupCode,
          permissionGroupName: data.permissionGroupName
        })
        _this.dialogPermissionGroupOptions = (data.parentPermissionGroupIds !== null && data.parentPermissionGroupIds !== undefined) ? data.parentPermissionGroupIds.split(',') : []
      })
    },
    updatePermissionManagerDialog (node, data) {
      console.log(node, data)
      var _this = this
      _this.dialogPermissionManagerVisible = true
      _this.dialogPermissionManagerPermissionGroupId = data.permissionGroupId
      // 在 DOM 更新之后处理，确保能够找到内部组件，这里需要将默认选中的值优先进行清空。
      _this.$nextTick(function () {
        // 查询出来权限组下属的权限信息
        PermissionGroupPermissionRelPermissionInfoByGroupId(_this.dialogPermissionManagerPermissionGroupId).then(async res => {
          console.log(res)
          _this.$refs.dialogPermissionRef.$refs["permission-table"].$refs["pap-base-table"].clearSelection()
          var userArray = res.data.result
          if (userArray !== null && userArray.length > 0) {
            userArray.forEach(row => {
              _this.$refs.dialogPermissionRef.$refs["permission-table"].$refs["pap-base-table"].toggleRowSelection(row);
            })
          }
          // 父组件调用子组件方法，在上述方法将权限组下权限带出来之后，重新渲染表格数据，这样可以保证表格的数据选中效果
          _this.$refs.dialogPermissionRef.getList()
        }).catch(err => {
          console.log('err: ', err)
          reject(err)
        })
      })
    },
    dialogFormSubmit () {
      var _this = this
      var dialogFormObj = this.$refs.dialogFormRender.getFormValue()
      const permissionGroupLastId = this.dialogPermissionGroupOptions[this.dialogPermissionGroupOptions.length - 1]
      dialogFormObj.parentPermissionGroupId = permissionGroupLastId
      return new Promise((resolve, reject) => {
        // 开始请求
        if (_this.dialogSubmitUrlType === 'CREATE') {
          PermissionGroupCreate(dialogFormObj).then(async res => {
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
          PermissionGroupUpdate(dialogFormObj).then(async res => {
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
      })
    },
	  // 情况dialog中的form表单数据
	  clearDialogForm () {
      var _this = this
      _this.$refs.dialogFormRender.updateForm({
        permissionGroupId: '',
        permissionGroupCode: '',
        permissionGroupName: ''
      })
      _this.dialogPermissionGroupOptions = []
	  },
    dialogPermissionManagerSubmit () {
      var _this = this
      console.log(_this.$refs.dialogPermissionRef.multipleSelection)
      var multiSelection = _this.$refs.dialogPermissionRef.multipleSelection
      var details = []
      for(var i = 0; i < multiSelection.length; i++) {
        details.push(multiSelection[i].permissionId)
      }
      var obj = {
        permissionGroupId: _this.dialogPermissionManagerPermissionGroupId,
        permissionIdDetails: details
      }
      return new Promise((resolve, reject) => {
        PermissionGroupPermissionRelSave(obj).then(async res => {
          console.log(res)
          const h = this.$createElement;
          if (res.data.code == 0) {
            this.$notify({
              title: '权限组权限绑定',
              message: h('i', {style: 'color: teal'}, "权限绑定成功!")
            })
            _this.dialogPermissionManagerVisible = false
          } else {
            this.$notify({
              title: '权限组权限绑定',
              message: h('i', {style: 'color: teal'}, res.data)
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