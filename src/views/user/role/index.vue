<template>
  <div class="components-container">
    <pap-search ref="papSearchForm" :content="searchForm"/>
    <!-- 根据 buttonArray 中的 click 参数，对外暴露监听其中的方法，并在当前页面中监听并实现对应的业务 -->
    <button-group :button-array="buttonArray" @list-click="listClick()" @create-click="createClick"/>
    <!-- -->
    <div style="margin-top: 50px;">
      <el-tree ref="tree" :data="treeData" :props="defaultProps" :expand-on-click-node="false" show-checkbox default-expand-all node-key="roleId" highlight-current>
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span v-if="treeButtonFlag">
            <el-button type="text" size="mini" @click="() => updateTreeNodeDialog(node, data)">更新</el-button>
            <el-button type="text" size="mini" @click="() => removeTreeNode(node, data)">删除</el-button>
            <el-button type="text" size="mini" @click="() => updatePermissionNodeDialog(node, data)">权限</el-button>
          </span>
        </span>
      </el-tree>
    </div>
    <!-- 角色自管理弹窗 -->
    <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" title="角色管理" width="30%">
      <el-form-renderer ref="dialogFormRender" :inline="dialogFormInlineFlag" :class="dialogFormInlineFlag ? 'demo-form-inline' : '' " :content="dialogForm" label-width="100px">
        <el-form-item label="上级角色">
          <el-cascader v-model="dialogRoleOptions" :options="treeData" :props="cascaderProps" clearable change-on-select/>
        </el-form-item>
      </el-form-renderer>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 权限分配管理 弹窗组件 -->
    <el-dialog :visible.sync="dialogPermissionManagerVisible" :before-close="handleClose" title="权限分配管理">
      <div style="height: 500px;">
        <sysuser-permissiongroup ref="dialogPermissionRef" :button-array-props="dialogPermissionManagerButtonArrayProps" :tree-button-flag="dialogPermissionManagerTreeButtonFlag">
          <h1 slot="fotter-slot" style="float: right;">
            <el-button @click="dialogPermissionManagerVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogPermissionManagerSubmit">确 定</el-button>
          </h1>
        </sysuser-permissiongroup>
      </div>
    </el-dialog>
    <!-- 允许当前页面被其他组件依赖，依赖的过程中，允许具名slot，保证明确的节点被插入到当前组件中 -->
    <slot name="fotter-slot"/>
  </div>

</template>

<script>
import PapSearch from '@/components/pap/search/index'
import ButtonGroup from '@/components/pap/button-group/index'
import { RoleList, RoleCreate, RoleUpdate, RoleDelete, RolePerissionRelSave, RolePermissionRelPermissionByRoleId } from '@/api/user/role'
import ElFormRenderer from '@/components/el-form-renderer'

export default {
  name: 'SysuserRole',
  components: {
    PapSearch,
    ButtonGroup,
    ElFormRenderer
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
      dialogRoleOptions: [],
      dialogForm: [
        {$id: 'roleId', $type: 'input', $label: '编号', $default: '', $enableWhen: { null: 'null' },
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'roleCode', $type: 'input', $label: '编码', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'roleName', $type: 'input', $label: '名称', $default: '',
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
        label: 'roleName'
      },
      cascaderProps: {
        value: 'roleId',
        label: 'roleName',
        children: 'children'
      },
      dialogFormVisible: false,
      // 角色权限管理弹窗部分
      dialogPermissionManagerRoleId: '',
      dialogPermissionManagerVisible: false,
      dialogPermissionManagerButtonArrayProps: [
        {name: '搜索', auth: 'ROLE:LIST', click: 'list-click', icon: 'el-icon-search'},
      ],
      dialogPermissionManagerTreeButtonFlag: false,
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
        RoleList().then(async res => {
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
        RoleDelete(data).then(async res => {
          if (res.data.code == 0) {
            console.log(res)
            _this.getList()
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
          roleId: data.roleId,
          roleCode: data.roleCode,
          roleName: data.roleName
        })
        _this.dialogRoleOptions = (data.parentRoleIds !== null && data.parentRoleIds !== undefined) ? data.parentRoleIds.split(',') : []
      })
    },
    dialogFormSubmit () {
      var _this = this
      var dialogFormObj = this.$refs.dialogFormRender.getFormValue()
      const roleLastId = this.dialogRoleOptions[this.dialogRoleOptions.length - 1]
      dialogFormObj.parentRoleId = roleLastId
      return new Promise((resolve, reject) => {
        // 开始请求
        if (_this.dialogSubmitUrlType === 'CREATE') {
          RoleCreate(dialogFormObj).then(async res => {
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
          RoleUpdate(dialogFormObj).then(async res => {
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
        roleId: '',
        roleCode: '',
        roleName: ''
      })
      _this.dialogRoleOptions = []
    },
    // 用户权限分配
    updatePermissionNodeDialog (node, data) {
      console.log(node, data)
      var _this = this
      _this.dialogPermissionManagerRoleId = data.roleId
      _this.dialogPermissionManagerVisible = true
      _this.$nextTick(function () {
        // 父组件调用子组件方法，在上述方法将角色下权限组带出来之后，重新渲染表格数据，这样可以保证表格的数据选中效果
        _this.$refs.dialogPermissionRef.getList()
        return new Promise((resolve, reject) => {
          // 查询出来用户下属的角色信息
          RolePermissionRelPermissionByRoleId(_this.dialogPermissionManagerRoleId).then(async res => {
            console.log(res)
            _this.$refs.dialogPermissionRef.$refs.tree.setCheckedKeys([])
            if (res.list !== null) {
              _this.$refs.dialogPermissionRef.$refs.tree.setCheckedKeys(res.list)
            }
          }).catch(err => {
            console.log('err: ', err)
            reject(err)
          })
        })
      })
    },
    // 权限组关系保存
    dialogPermissionManagerSubmit () {
      var _this = this
      var permissionArrays = _this.$refs.dialogPermissionRef.$refs.tree.getCheckedKeys()
      var obj = {
        roleId: _this.dialogPermissionManagerRoleId,
        details: permissionArrays
      }
      return new Promise((resolve, reject) => {
        RolePerissionRelSave(obj).then(async res => {
          console.log(res)
          const h = this.$createElement;
          if (res.code == '200') {
            this.$notify({
              title: '角色权限绑定',
              message: h('i', {style: 'color: teal'}, "角色权限成功!")
            })
            _this.dialogPermissionManagerVisible = false
          } else {
            this.$notify({
              title: '角色权限绑定',
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