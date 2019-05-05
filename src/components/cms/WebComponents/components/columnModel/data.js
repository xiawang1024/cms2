export const searchSettings = [
  {
    label: '栏目名称',
    name: 'channelId',
    placeholder: '请输入栏目名称',
    visible: true,
    options: [],
    type: 'cascader',
    changeOnSelect: true
  }, {
    label: '模板名称',
    name: 'templateName',
    placeholder: '请输入',
    visible: true,
    type: 'text'
  }
]
export const formSettings = [
  {
    items: [
      {
        label: '所属栏目',
        name: 'channelId',
        type: 'cascader',
        placeholder: '请选择',
        options: []
      },
      {
        label: '模板类别',
        name: 'templateType',
        type: 'select',
        placeholder: '请选择',
        options: [
          {
            value: 'list',
            label: '列表组件'
          },
          {
            value: 'index',
            label: '首页组件'
          },
          {
            value: 'content',
            label: '正文组件'
          }
        ]
      },
      {
        label: '适用平台',
        name: 'templateFormat',
        type: 'select',
        placeholder: '请选择',
        options: [
          {
            value: 'pc',
            label: '电脑页面'
          },
          {
            value: 'mobile',
            label: '手机页面'
          }
        ]
      },
      {
        label: '是否有效',
        name: 'enableFlag',
        activeValue: 1,
        inactiveValue: 0,
        value: 1,
        type: 'switch'
      },{
        label: '模板名称',
        name: 'templateName',
        type: 'text',
        placeholder: '请输入模板名称'
      },{
        label:'文件名',
        name: 'templateFilename',
        type:'text',
        placeholder: '请输入文件名'
      },
      {
        label:'描述',
        name: 'templateDescription',
        type:'textarea',
        placeholder: '请输入'
      },
      {
        label:'模板内容',
        name: 'templateContent',
        type:'slot',
        placeholder: '请输入'
      }
    ]
  }
]