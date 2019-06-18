<template>
  <div class="components-container">
    <!-- 根据 buttonArray 中的 click 参数，对外暴露监听其中的方法，并在当前页面中监听并实现对应的业务 -->
    <div class="el-card__header">
      <v-search :search-settings="searchSettings" @search="search"/>
    </div>
    <div class="handel-btn">
      <button-group
        :button-array="buttonArray"
        @list-click="listClick()"
        @create-click="createClick" @able-click="enableFlagClick('1')" @disable-click="enableFlagClick('0')" @googlecheck-click="googleCheckClick"
        @role-click="roleClick" @roles-click="rolesClick"
        @edit-click="editClick"/>
    </div>
    <!-- 表格的数据展示，参数放置到 tableConfig 中进行传入。 -->
    <!-- 分页条处理：每页条数变化、当前页页码条数、表格选中数据监听 -->
    <pap-table ref="user-table" v-bind="tableConfig" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange" @multiple-selection="multipleSelectionEmit"/>
    <!-- 用户管理 弹窗组件 -->
    <el-dialog ref="dialogUserManager" :visible.sync="dialogFormVisible" :before-close="handleClose" title="用户管理" width="30%">
      <el-form-renderer ref="dialogFormRender" :inline="dialogFormInlineFlag" :class="dialogFormInlineFlag ? 'demo-form-inline' : '' " :content="dialogForm" label-width="100px"/>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色分配管理 弹窗组件 -->
    <el-dialog :visible.sync="dialogRoleManagerVisible" :before-close="handleClose" title="角色分配管理">
      <div style="height: 500px;">
        <role ref="dialogRoleRef" :button-array-props="dialogRoleManagerButtonArrayProps" :tree-button-flag="dialogRoleManagerTreeButtonFlag">
          <h1 slot="fotter-slot" style="float: right;">
            <el-button @click="dialogRoleManagerVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogRoleManagerSubmit">确 定</el-button>
          </h1>
        </role>
      </div>
    </el-dialog>
    <!-- 允许当前页面被其他组件依赖，依赖的过程中，允许具名slot，保证明确的节点被插入到当前组件中 -->
    <slot name="fotter-slot"/>
  </div>
</template>

<script>
import PapSearch from '@/components/pap/search/index'
import PapTable from '@/components/pap/table/index'
import ButtonGroup from '@/components/pap/button-group/index'
import ElFormRenderer from '@/components/el-form-renderer'
import { UserList, UserCreate, UserUpdate, UserRoleRelSave, UsersRolesRelSave, UserRoleRelRoleInfoByUserId, UserModifyEnableFlagByUserIds, UserCheckCode, RemoveGoogleCheckBinding } from '@/api/user/user'
import Role from '@/views/user/role'

export default {
  name: 'SysuserUser',
  components: {
    PapSearch,
    PapTable,
    ButtonGroup,
    ElFormRenderer,
    Role
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
        {name: '编辑', auth: true, click: 'edit-click', disabled: true, icon: 'el-icon-edit'},
        {name: '角色', auth: true, click: 'role-click', disabled: true, icon: 'el-icon-edit'},
        {name: '状态', icon:'el-icon-document', click: 'query',
          details:[
            {name: '启用', auth: true, icon: 'el-icon-circle-check-outline', click: 'able-click'},
            {name: '禁用', auth: true, icon: 'el-icon-circle-close-outline', click: 'disable-click'},
            {name: '清空Google校验', auth: true, icon: 'el-icon-circle-close-outline', click: 'googlecheck-click'}
          ]
        },
        {name: '批量操作', icon:'el-icon-document', click: 'query',
          details:[
            {name: '角色分配', auth: true, icon: 'el-icon-edit', click: 'roles-click'}
          ]
        },
      ],

      // 表格
      tableConfig: {
        // 多页选中数据回显，分页记录保存选中的数据
        rowKeys: 'userId',
        colomn: [
          { prop: 'userCode', label: '用户编码'},
          { prop: 'userName', label: '用户名'},
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
        {$id: 'userName', $type: 'input', $label: '姓名', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        }
      ],
      // 用户管理
      dialogFormInlineFlag: true,
      dialogForm: [
        {$id: 'userId', $type: 'input', $label: '编号', $default: '', $enableWhen: { null: 'null' },
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'userCode', $type: 'input', $label: '编码', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
        {$id: 'userName', $type: 'input', $label: '名称', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' },
          rules: [
            {
              validator: this.checkUserNameRepeat
            }
          ]
        },
        {$id: 'password', $type: 'input', $label: '密码', $default: '',
          $el: { placeholder: '请输入', style: 'width: 200px' }
        },
      ],
      dialogFormVisible: false,
      dialogOperationType: '',
      dialogUserNameCopyTemp: '',
      // 弹窗用户管理部分
      dialogUserManagerVisible: false,
      // 用户角色管理弹窗部分
      dialogRoleManagerUserId: '',
      dialogRoleManagerVisible: false,
      dialogRoleManagerButtonArrayProps: [
        {name: '搜索', auth: 'ROLE:LIST', click: 'list-click', icon: 'el-icon-search'},
      ],
      // 弹窗是单数据操作还是批量数量操作
      dialogRoleManagerOperationType: 'ONE',
      dialogRoleManagerTreeButtonFlag: false,
      filename: '',
      // 搜索组件初始化
      searchSettings: [
        {
          label: '用户编码',
          name: 'userCode',
          placeholder: '请输入用户编码',
          visible: true,
          type: 'text'
        },
        {
          label: '用户名',
          name: 'userName',
          placeholder: '请输入姓名',
          visible: true,
          type: 'text'
        },
        {
          label: '状态',
          name: 'enableFlag',
          placeholder: '请选择',
          visible: false,
          type: 'select',
          options: [
            {
              label: '启用',
              value: 1
            },
            {
              label: '禁用',
              value: 0
            }
          ]
        },
      ],
      // 搜索条件
      searchData: {
        userName: ''
      },
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
  mounted: function() {
    this.getList()
  },
  methods: {
    // 点击搜索
    search(data) {
      this.searchData = data
      this.tableConfig.paginationPageNo = 1
      this.getList()
    },
    getList () {
      var _this = this
      // var searchFormObj = this.$refs.papSearchForm.$refs.formRender.getFormValue()
      // console.log(searchFormObj, 'searchFormObj')
      return new Promise((resolve, reject) => {
        // 开始请求登录接口
        UserList(_this.searchData, this.tableConfig.paginationPageNo, this.tableConfig.paginationSize).then(async res => {
          console.log(res.data)
          _this.tableConfig.total = res.data.result.total
          _this.tableConfig.tableData = res.data.result.content
          // 结束
          resolve()
        })
          .catch(err => {
            console.log('err: ', err)
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
        if (this.buttonArray.length > 3 && this.buttonArray[2].name === '编辑' && this.buttonArray[3].name === '角色') {
          this.buttonArray[2].disabled = true
          this.buttonArray[3].disabled = true
        }
      } else {
        if (this.buttonArray.length > 3 && this.buttonArray[2].name === '编辑' && this.buttonArray[3].name === '角色') {
          this.buttonArray[2].disabled = false
          this.buttonArray[3].disabled = false
        }
      }
    },
    listClick () {
      // 点击搜索按钮，则默认从第一页开始搜索
      this.tableConfig.paginationPageNo = 1
      this.getList()
    },
    createClick () {
      console.log('create-click')
      var _this = this
      // 新增页签的方式处理新增数据.
      this.dialogFormVisible = true
      _this.$nextTick(function () {
        _this.$refs.dialogFormRender.updateForm({
          userId: '',
          userCode: '',
          userName: '',
          password: ''
        })
        _this.dialogOperationType = '新增'
      })
    },
    enableFlagClick (enableFlag) {
      var _this = this
      var multiSelection = _this.$refs["user-table"].multipleSelection
      var userIds = []
      for(var i = 0; i < multiSelection.length; i++) {
        userIds.push(multiSelection[i].userId)
      }
      var obj = {
        enableFlag: enableFlag,
        userIds: userIds
      }
      return new Promise((resolve, reject) => {
        UserModifyEnableFlagByUserIds(obj).then(async res => {
          console.log(res)
          _this.getList()
        }).catch(err => {
          console.log('err: ', err)
          reject(err)
        })
      })
    },
    googleCheckClick () {
      var _this = this
      var multiSelection = _this.$refs["user-table"].multipleSelection
      var userIds = []
      for(var i = 0; i < multiSelection.length; i++) {
        userIds.push(multiSelection[i].userId)
      }
      var obj = {
        userIds: userIds
      }
      return new Promise((resolve, reject) => {
        RemoveGoogleCheckBinding(obj).then(async res => {
          console.log(res)
          _this.$refs["user-table"].$refs["pap-base-table"].clearSelection()
          _this.getList()
        }).catch(err => {
          console.log('err: ', err)
          reject(err)
        })
      })
    },
    dialogFormSubmit () {
      var _this = this
      var dialogFormObj = this.$refs.dialogFormRender.getFormValue()
      return new Promise((resolve, reject) => {
        // 开始请求
        if (dialogFormObj.userId === '' || dialogFormObj.userId === undefined) {
          UserCreate(dialogFormObj).then(async res => {
            console.log(res)
            _this.$refs["user-table"].$refs["pap-base-table"].clearSelection()
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
        if (dialogFormObj.userId !== '') {
          UserUpdate(dialogFormObj).then(async res => {
            if (res.data.code == 0) {
              console.log(res)
              _this.$refs["user-table"].$refs["pap-base-table"].clearSelection()
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
        userId: '',
        userCode: '',
        userName: '',
        password: ''
      })
    },
    editClick () {
      console.log('edit-click')
      var _this = this
      _this.dialogFormVisible = true
      // 此处有可能出现$refs.dialogFormRender 获取不到的情况，使用 nextTick (在下次 DOM 更新循环结束之后执行延迟回调)
      _this.$nextTick(function () {
        _this.$refs.dialogFormRender.updateForm({
          userId: _this.multipleSelection[0].userId,
          userCode: _this.multipleSelection[0].userCode,
          userName: _this.multipleSelection[0].userName,
          password: _this.multipleSelection[0].password
        })
        _this.dialogOperationType = '修改'
        _this.dialogUserNameCopyTemp = _this.multipleSelection[0].userName
      })
    },
    roleClick () {
      var _this = this
      _this.dialogRoleManagerUserId = _this.multipleSelection[0].userId
      _this.dialogRoleManagerOperationType = 'ONE'
      _this.dialogRoleManagerVisible = true
      _this.$nextTick(function () {
        // 父组件调用子组件方法，在上述方法将部门下用户带出来之后，重新渲染表格数据，这样可以保证表格的数据选中效果
        _this.$refs.dialogRoleRef.getList()
        // 查询出来用户下属的角色信息
        return new Promise((resolve, reject) => {
          UserRoleRelRoleInfoByUserId(_this.dialogRoleManagerUserId).then(async res => {
            console.log(res)
            _this.$refs.dialogRoleRef.$refs.tree.setCheckedKeys([])
            if (res.data.result !== null && res.data.result.length > 0) {
              var keys = []
              res.data.result.forEach((item, index)=>{
                keys.push(item.roleId)
              })
              _this.$refs.dialogRoleRef.$refs.tree.setCheckedKeys(keys)
            }
          }).catch(err => {
            console.log('err: ', err)
            reject(err)
          })
        })
      })
    },
    rolesClick () {
      var _this = this
      _this.dialogRoleManagerOperationType = 'MUTI'
      _this.dialogRoleManagerVisible = true
      _this.$nextTick(function () {
        // 父组件调用子组件方法，在上述方法将部门下用户带出来之后，重新渲染表格数据，这样可以保证表格的数据选中效果
        _this.$refs.dialogRoleRef.getList()
        _this.$refs.dialogRoleRef.$refs.tree.setCheckedKeys([])
      })
    },
    dialogRoleManagerSubmit () {
      var _this = this
      var roleArrays = _this.$refs.dialogRoleRef.$refs.tree.getCheckedKeys()
      if(_this.dialogRoleManagerOperationType == 'ONE') {
        var obj = {
          userId: _this.dialogRoleManagerUserId,
          roleIdDetails: roleArrays
        }
        return new Promise((resolve, reject) => {
          UserRoleRelSave(obj).then(async res => {
            console.log(res)
            const h = this.$createElement;
            if (res.data.code == 0) {
              this.$notify({
                title: '用户角色绑定',
                message: h('i', {style: 'color: teal'}, "用户角色成功!")
              })
              _this.dialogRoleManagerVisible = false
            } else {
              this.$notify({
                title: '用户角色绑定',
                message: h('i', {style: 'color: teal'}, res.data.data)
              })
            }
            _this.$refs["user-table"].$refs["pap-base-table"].clearSelection()
            // 结束
            resolve()
          }).catch(err => {
            console.log('err: ', err)
            reject(err)
          })
        })
      }
      if(_this.dialogRoleManagerOperationType == 'MUTI') {
        var multiSelection = _this.$refs["user-table"].multipleSelection
        var userIds = []
        for(var i = 0; i < multiSelection.length; i++) {
          userIds.push(multiSelection[i].userId)
        }
        var obj = {
          userIdDetails: userIds,
          roleIdDetails: roleArrays
        }
        return new Promise((resolve, reject) => {
          UsersRolesRelSave(obj).then(async res => {
            console.log(res)
            const h = this.$createElement;
            if (res.data.code == 0) {
              this.$notify({
                title: '用户角色绑定',
                message: h('i', {style: 'color: teal'}, "用户角色成功!")
              })
              _this.dialogRoleManagerVisible = false
            } else {
              this.$notify({
                title: '用户角色绑定',
                message: h('i', {style: 'color: teal'}, res.data.data)
              })
            }
            _this.$refs["user-table"].$refs["pap-base-table"].clearSelection()
            // 结束
            resolve()
          }).catch(err => {
            console.log('err: ', err)
            reject(err)
          })
        })
      }
    },
    showClick () {
      console.log(this.multipleSelection)
    },
    checkUserNameRepeat (rule, value, callback) {
      var _this = this
      if (!value) {
        return callback(new Error('请输入用户名称'))
      }
      var userName = _this.$refs["dialogFormRender"].getFormValue().userName
      return new Promise((resolve, reject) => {
        UserCheckCode(userName)
          .then((response) => {
            if(_this.dialogOperationType == '新增') {
              if(response.data.result == 0 || response.data.result == -1) {
                callback()
              } else {
                callback(new Error('用户名称不能重复'))
              }
            }
            if(_this.dialogOperationType == '修改') {
              if(_this.dialogUserNameCopyTemp === _this.$refs["dialogFormRender"].getFormValue().userName) {
                callback()
              }
              if(response.data.result == 0 || response.data.result == -1) {
                callback()
              } else {
                callback(new Error('用户名称不能重复'))
              }
            }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    handleSizeChange (val) {
      console.log(val)
      this.tableConfig.paginationPageNo = 1
      this.tableConfig.paginationSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      console.log(val)
      this.tableConfig.paginationPageNo = val
      this.getList()
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
<style lang="scss">
  .components-container{
    .handel-btn{
      margin-top:18px;
    }
  }
</style>