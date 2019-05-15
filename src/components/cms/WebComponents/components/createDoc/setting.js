export const otherSettings = [
  {
    items: [
      {
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
        placeholder: '请输入点击量'
      },
      {
        label: '发布时间',
        name: 'publishTime',
        type: 'datetime',
        required: true,
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
        options: [
          {
            label: '正文标题和描述',
            value: 0
          },
          {
            label: '左图，右正文标题',
            value: 1
          },
          {
            label: '右图，左正文标题',
            value: 2
          },
          {
            label: '一个图片通栏，无标题',
            value: 3
          },
          {
            label: '上正文标题，下一个图片通栏',
            value: 4
          },
          {
            label: '上正文标题，下两张图片',
            value: 5
          },
          {
            label: '上正文标题，下三张图片',
            value: 6
          },
          {
            label: '上正文标题，下左一张图片，下右描述',
            value: 7
          },
          {
            label: '视频形式',
            value: 8
          }
        ]
      },
    ]
  }
]
export const defultItems = [
  {
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
    placeholder: '请输入点击量'
  },
  {
    label: '发布时间',
    name: 'publishTime',
    type: 'datetime',
    required: true
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
    options: [
      {
        label: '正文标题和描述',
        value: 0
      },
      {
        label: '左图，右正文标题',
        value: 1
      },
      {
        label: '右图，左正文标题',
        value: 2
      },
      {
        label: '一个图片通栏，无标题',
        value: 3
      },
      {
        label: '上正文标题，下一个图片通栏',
        value: 4
      },
      {
        label: '上正文标题，下两张图片',
        value: 5
      },
      {
        label: '上正文标题，下三张图片',
        value: 6
      },
      {
        label: '上正文标题，下左一张图片，下右描述',
        value: 7
      },
      {
        label: '视频形式',
        value: 8
      }
    ]
  }
]
export const imagesSeting = [
  {
    items: [
      {
        label: '正文标题',
        name: 'articleTitle',
        type: 'text',
        placeholder: '请输入正文标题',
        maxlength: 80,
        required: true
      },
      {
        label: '首页标题',
        name: 'contentTitle',
        type: 'text',
        placeholder: '请输入首页标题',
        maxlength: 80,
        required: true
      },
      {
        label: '文档来源',
        name: 'articleOrigin',
        type: 'select',
        placeholder: '请选择',
        required: true,
        options: []
      },{
        label:'文档作者',
        name: 'articleAuthor',
        type:'text',
        placeholder: '请输入文档作者'
      },{
        label: '关键字',
        name: 'seoKeywords',
        type: 'text',
        placeholder: '请输入关键字',
      },{
        label: '摘要',
        name: 'seoDescription',
        type: 'textarea',
        maxlength: 20,
        placeholder: '请输入摘要'
      },{
        label: '标签',
        name: 'tagIds',
        type: 'checkbox',
        options: [],
        hidden: false
      },{
        label:'点击量',
        name: 'clickNum',
        type:'number',
        placeholder: '请输入点击量'
      },{
        label:'发布时间',
        name:'publishTime',
        type:'datetime',
        placeholder: '请选择',
        required: true,
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
        required: true,
        options: [
          {
            label: '正文标题和描述',
            value: 0
          },
          {
            label: '左图，右正文标题',
            value: 1
          },
          {
            label: '右图，左正文标题',
            value: 2
          },
          {
            label: '一个图片通栏，无标题',
            value: 3
          },
          {
            label: '上正文标题，下一个图片通栏',
            value: 4
          },
          {
            label: '上正文标题，下两张图片',
            value: 5
          },
          {
            label: '上正文标题，下三张图片',
            value: 6
          },
          {
            label: '上正文标题，下左一张图片，下右描述',
            value: 7
          },
          {
            label: '视频形式',
            value: 8
          }
        ]
      },
      {
        label: '',
        name: 'btn',
        type: 'slot'
      },
    ]
  }
]

export const reproduceSetting = [
  {
    items: [
      {
        label: '正文标题',
        name: 'articleTitle',
        type: 'text',
        placeholder: '请输入正文标题',
        maxlength: 80,
        required: true
      },
      {
        label: '首页标题',
        name: 'contentTitle',
        type: 'text',
        placeholder: '请输入首页标题',
        maxlength: 80,
        required: true
      },
      {
        label:'转载地址',
        name: 'linkTo',
        type:'text',
        placeholder: '请输入转载地址'
      },{
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
        required: true,
        options: [
          {
            label: '正文标题和描述',
            value: 0
          },
          {
            label: '左图，右正文标题',
            value: 1
          },
          {
            label: '右图，左正文标题',
            value: 2
          },
          {
            label: '一个图片通栏，无标题',
            value: 3
          },
          {
            label: '上正文标题，下一个图片通栏',
            value: 4
          },
          {
            label: '上正文标题，下两张图片',
            value: 5
          },
          {
            label: '上正文标题，下三张图片',
            value: 6
          },
          {
            label: '上正文标题，下左一张图片，下右描述',
            value: 7
          },
          {
            label: '视频形式',
            value: 8
          }
        ]
      },
    ]
  }
]