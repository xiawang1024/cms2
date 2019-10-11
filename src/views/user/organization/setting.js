export const buttonArray = [{
  name: "搜索",
  auth: true,
  click: "list-click",
  icon: "el-icon-search"
}, {
  name: "新建",
  auth: true,
  click: "create-click",
  icon: "el-icon-plus"
}, {
  name: "编辑",
  auth: true,
  click: "edit-click",
  disabled: true,
  icon: "el-icon-edit"
}, {
  name: "审核通过",
  auth: true,
  click: "enable-click",
  disabled: true,
  icon: "el-icon-check"
}, {
  name: "审核拒绝",
  auth: true,
  click: "disable-click",
  disabled: true,
  icon: "el-icon-close"
}]
export const searchForm = [{
  $id: "organizationCode",
  $type: "input",
  $label: "租户编码",
  $default: "",
  $el: {
    placeholder: "请输入",
    style: "width: 200px"
  }
}, {
  $id: "organizationName",
  $type: "input",
  $label: "租户名称",
  $default: "",
  $el: {
    placeholder: "请输入",
    style: "width: 200px"
  }
}, {
  $id: "organizationType",
  $type: "input",
  $label: "系统类型",
  $default: "CUSTOMER",
  $enableWhen: {
    null: "null"
  },
  $el: {
    placeholder: "请输入",
    style: "width: 200px"
  }
}]
export const searchSettings = [{
  label: "租户编码",
  name: "organizationCode",
  placeholder: "请输入租户编码",
  visible: true,
  type: "text"
}, {
  label: "租户名称",
  name: "organizationName",
  placeholder: "请输入租户名称",
  visible: true,
  type: "text"
}]
export const dialogSearchSettings = [{
    label: "权限名称",
    name: "permissionName",
    placeholder: "请输入权限名称",
    visible: true,
    type: "text"
  }, {
    label: "权限编码",
    name: "permissionCode",
    placeholder: "请输入权限编码",
    visible: true,
    type: "text"
  },

  {
    label: "所属系统",
    name: "sysApplicationId",
    placeholder: "请输入所属系统",
    visible: true,
    type: "text"
  }
]
export const dialogForm = [{
  $id: "organizationId",
  $type: "input",
  $label: "租户编号",
  $default: "",
  $enableWhen: {
    null: "null"
  },
  $el: {
    placeholder: "请输入",
    style: "width: 200px"
  }
}, {
  $id: "organizationType",
  $type: "input",
  $label: "系统类型",
  $default: "CUSTOMER",
  $enableWhen: {
    null: "null"
  },
  $el: {
    placeholder: "请输入",
    style: "width: 200px"
  }
}, {
  $id: "enableFlag",
  $type: "input",
  $label: "可用状态",
  $default: "0",
  $enableWhen: {
    null: "null"
  },
  $el: {
    placeholder: "请输入",
    style: "width: 200px"
  }
}, {
  $id: "organizationCode",
  $type: "input",
  $label: "租户编码",
  $default: "",
  $el: {
    placeholder: "请输入",
    style: "width: 200px"
  },
  rules: [{
    validator: ''
  }]
}, {
  $id: "organizationName",
  $type: "input",
  $label: "租户名称",
  $default: "",
  $el: {
    placeholder: "请输入",
    style: "width: 200px"
  }
}, {
  $id: "organizationManager",
  $type: "input",
  $label: "租户管理者",
  $default: "",
  $el: {
    placeholder: "请输入",
    style: "width: 200px"
  }
}, {
  $id: "remark",
  $type: "input",
  $label: "备注",
  $default: "",
  $el: {
    placeholder: "请输入",
    style: "width: 200px"
  }
}]
