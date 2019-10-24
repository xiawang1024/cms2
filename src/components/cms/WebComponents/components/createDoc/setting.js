const articleShowType = [{
  label: '无图样式',
  value: 0
}, {
  label: '单图样式',
  value: 1
}, {
  label: '大图样式',
  value: 4
}, {
  label: '三图样式',
  value: 6
}, {
  label: '视频样式',
  value: 8
}, {
  label: '专题样式',
  value: 9
}, {
  label: '直播样式',
  value: 10
}]
export const otherSettings = [{
  items: [{
      label: '标签',
      name: 'tagIds',
      type: 'checkbox',
      options: [],
      hidden: false
    },
    {
      label: '点击量',
      name: 'clickNum',
      type: 'number',
      placeholder: '请输入点击量',
      value: 0
    },
    {
      label: '发布时间',
      name: 'publishTime',
      type: 'datetime',
      clearable: false
      // required: true,
    },
    {
      label: '设置',
      name: 'set',
      type: 'slot',
    },
    {
      label: '排序号',
      name: 'seqNo',
      type: 'number',
      value: 0
    },
    {
      label: '展现形式',
      name: 'articleShowStyle',
      type: 'select',
      // required: true,
      options: articleShowType
    },
  ]
}]
export const defultItems = [{
    label: '标签',
    name: 'tagIds',
    type: 'checkbox',
    options: [],
    hidden: false
  },
  {
    label: '点击量',
    name: 'clickNum',
    type: 'number',
    placeholder: '请输入点击量',
    value: 0
  },
  {
    label: '发布时间',
    name: 'publishTime',
    type: 'datetime',
    clearable: false
    // required: true
  },
  {
    label: '设置',
    name: 'set',
    type: 'slot',
  },
  {
    label: '排序号',
    name: 'seqNo',
    type: 'number',
    value: 0
  },
  {
    label: '展现形式',
    name: 'articleShowStyle',
    type: 'select',
    // required: true,
    options: articleShowType
  }
]
export const imagesSeting = [{
  items: [{
      label: '正文标题',
      name: 'articleTitle',
      type: 'text',
      placeholder: '请输入正文标题',
      maxlength: 80,
      showWordLimit: true,
      required: true
    },
    {
      label: '首页标题',
      name: 'contentTitle',
      type: 'text',
      placeholder: '请输入首页标题',
      maxlength: 80,
      showWordLimit: true,
      required: true
    },
    {
      label: '文档来源',
      name: 'articleOrigin',
      type: 'select',
      placeholder: '请选择',
      required: true,
      filterable: true,
      options: []
    }, {
      label: '文档作者',
      name: 'articleAuthor',
      type: 'text',
      placeholder: '请输入文档作者'
    }, {
      label: '关键字',
      name: 'seoKeywords',
      type: 'text',
      placeholder: '请输入关键字',
    }, {
      label: '摘要',
      name: 'seoDescription',
      type: 'textarea',
      maxlength: 20,
      placeholder: '请输入摘要'
    }, {
      label: '标签',
      name: 'tagIds',
      type: 'checkbox',
      options: [],
      hidden: false
    }, {
      label: '点击量',
      name: 'clickNum',
      type: 'number',
      placeholder: '请输入点击量',
      value: 0
    }, {
      label: '发布时间',
      name: 'publishTime',
      type: 'datetime',
      placeholder: '请选择',
      clearable: false
      // required: true,
    },
    {
      label: '设置',
      name: 'set',
      type: 'slot',
    },
    {
      label: '排序号',
      name: 'seqNo',
      type: 'number',
      value: 0
    },
    {
      label: '展现形式',
      name: 'articleShowStyle',
      type: 'select',
      // required: true,
      options: articleShowType
    },
    {
      label: '',
      name: 'btn',
      type: 'slot'
    },
  ]
}]

export const reproduceSetting = [{
  items: [{
      label: '正文标题',
      name: 'articleTitle',
      type: 'text',
      placeholder: '请输入正文标题',
      maxlength: 80,
      showWordLimit: true,
      required: true
    },
    {
      label: '首页标题',
      name: 'contentTitle',
      type: 'text',
      placeholder: '请输入首页标题',
      showWordLimit: true,
      maxlength: 80,
      required: true
    },
    {
      label: '文档来源',
      name: 'articleOrigin',
      type: 'select',
      placeholder: '请选择',
      required: true,
      filterable: true,
      options: []
    },
    {
      label: '转载地址',
      name: 'linkTo',
      type: 'text',
      placeholder: '请输入转载地址'
    }, {
      label: '标签',
      name: 'tagIds',
      type: 'checkbox',
      options: [],
      hidden: false
    },
    {
      label: '设置',
      name: 'set',
      type: 'slot'
    },
    {
      label: '排序号',
      name: 'seqNo',
      type: 'number',
      value: 0
    },
    {
      label: '展现形式',
      name: 'articleShowStyle',
      type: 'select',
      // required: true,
      options: articleShowType
    },
  ]
}]
export const articleLinkSetting = [{
  items: [{
      label: '正文标题',
      name: 'articleTitle',
      type: 'text',
      placeholder: '请输入正文标题',
      maxlength: 80,
      showWordLimit: true,
      required: true
    },
    {
      label: '首页标题',
      name: 'contentTitle',
      type: 'text',
      placeholder: '请输入首页标题',
      maxlength: 80,
      showWordLimit: true,
      required: true
    },
    {
      label: '文档来源',
      name: 'articleOrigin',
      //type: 'slot',
      type: 'select',
      placeholder: '请选择',
      required: true,
      filterable: true,
      options: []
    },
    {
      label: '外链地址',
      name: 'linkTo',
      type: 'text',
      placeholder: '请输入外链地址'
    }, {
      label: '标签',
      name: 'tagIds',
      type: 'checkbox',
      options: [],
      hidden: false
    },
    {
      label: '设置',
      name: 'set',
      type: 'slot'
    },
    {
      label: '排序号',
      name: 'seqNo',
      type: 'number',
      value: 0
    },
    {
      label: '展现形式',
      name: 'articleShowStyle',
      type: 'select',
      // required: true,
      options: articleShowType
    },
  ]
}]
export const splicingSetting = [{
  items: [{
      label: "首页标题",
      name: "contentTitle",
      type: "textarea",
      placeholder: "请输入html代码",
      required: true
    },
    {
      label: "设置",
      name: "set",
      type: "slot"
    },
    {
      label: "排序号",
      name: "seqNo",
      type: "number",
      value: 0
    },
    {
      label: "展现形式",
      name: "articleShowStyle",
      type: "select",
      options: articleShowType
    },
    {
      label: "附加数据",
      name: "extFields",
      type: "textarea",
      placeholder: "请输入附加数据"
    },
    {
      label: "预览",
      name: "preview",
      type: "slot"
    }
  ]
}]
