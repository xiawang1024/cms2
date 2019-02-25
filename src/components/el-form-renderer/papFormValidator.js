// 手机号验证
export function phone(rule, value, callback) {
  /* eslint-disable */
  let regFormat = /^[1][3578][0-9]{9}$/ //正确手机号
  /* eslint-disable */
  if (!value) {
    return callback(new Error('不能为空'))
  }
  if (!(regFormat.test(value))) {
    callback(new Error('请输入正确手机号'))
  } else {
      callback()
  }
}

// 数字验证
export function number (rule, value, callback) {
  if (!value) {
    return callback(new Error('不能为空'))
  }
  if (!Number.isInteger(value)) {
    callback(new Error('请输入数字值'))
  } else {
      callback()
  }
}

// 电话 匹配0-9之间的数字,并且长度是11位
export function tel (rule, value, callback) {
  /* eslint-disable */
  let mal = /^[0-9]{11}$/
  /* eslint-disable */
  if (!value) {
    return callback(new Error('电话不能为空'))
  }
  if (!(mal.test(value))) {
    callback(new Error('请输入正确电话'))
  } else {
    callback()
  }
}

// 密码验证 匹配6-20位的任何字类字符，包括下划线。与“[A-Za-z0-9_]”等效。
export function pwd (rule, value, callback) {
  /* eslint-disable */
  let mal = /^(\w){6,20}$/
  /* eslint-disable */
  if (!value) {
    return callback(new Error('密码不能为空'))
  }
  if (!(mal.test(value))) {
    callback(new Error('6-20位的任何字类字符，包括下划线'))
  } else {
    callback()
  }
}

// text不能为空
export function text (rule, value, callback) {
  if (!value) {
    return callback(new Error('不能为空'))
  } else {
    callback()
  }
}

// desc不能为空
export function desc (rule, value, callback) {
  if (!value) {
    return callback(new Error('不能为空'))
  } else {
    callback()
  }
}

// 邮箱
export function email (rule, value, callback) {
  /* eslint-disable */
  let mal = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  /* eslint-disable */
  if (!value) {
    return callback(new Error('邮箱不能为空'))
  }
  if (!(mal.test(value))) {
    callback(new Error('请输入正确邮箱'))
  } else {
    callback()
  }
}

// 开始时间
export function startTime (rule, value, callback) {
  if (!value) {
    return callback(new Error('请选择开始日期'))
  } else {
    callback()
  }
}

// 截止时间
export function endTime (rule, value, callback) {
  if (!value) {
    return callback(new Error('请选择结束日期'))
  } else {
    callback()
  }
}

// 时间
export function time (rule, value, callback) {
  if (!value) {
    return callback(new Error('请选择日期'))
  } else {
    callback()
  }
}

// 多选框
export function checkbox (rule, value, callback) {
  if (value.length < 1) {
    return callback(new Error('请至少选择一个'))
  } else {
    callback()
  }
}

// 单选框
export function radio (rule, value, callback) {
  if (value.length < 1) {
    return callback(new Error('请选择一个'))
  } else {
    callback()
  }
}

// 下拉框
export function select (rule, value, callback) {
  if (value.length < 1) {
    return callback(new Error('请至少选择一个'))
  } else {
    callback()
  }
}
