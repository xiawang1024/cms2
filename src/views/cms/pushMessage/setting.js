export const searchSetting = [{
  label: '消息标题',
  name: 'word',
  type: 'text',
  placeholder: '请输入消息标题',
  visible: true
}, {
  label: '发布人员',
  name: 'word2',
  type: 'select',
  placeholder: '请选择',
  visible: true,
  options: []
}, {
  label: '发布时间',
  name: 'word3',
  type: 'date',
  placeholder: '请选择'
}]
export const formSettings = [
  {
    items: [
      {
        label: '发布范围',
        name: 'isToAll',
        type: 'select',
        placeholder: '请选择',
        required: true,
        value: '1',
        events: {
          change: 'rangeChange'
        },
        options: [
          {
            label: '全部用户',
            value: '1'
          },
           {
            label: '部分用户',
            value: '0'
          }
        ]
      },
      {
        label: '',
        name: 'bindPeople',
        type: 'slot',
        placeholder: '',
        hidden: true,
        required: true
      },
      {
        label: '客户端',
        name: 'appIds',
        type: 'select',
        placeholder: '请选择',
        required: true,
        multiple: true,
        options: [
        ]
      },
      {
        label: '类型',
        name: 'msgType',
        type: 'select',
        placeholder: '请选择',
        required: true,
        events: {
          change: 'newsChange'
        },
        options: [
          {
            label: '新闻',
            value: 'NEWS'
          },
          {
            label: '直播',
            value: 'LIVE'
          },
          {
            label: '视频',
            value: 'VIDEO'
          },
           {
            label: 'url',
            value: 'URL'
          }
        ]
      },
      {
        label: 'url',
        name: 'target',
        type: 'text',
        valueType: 'string',
        placeholder: '请输入url',
        hidden: true,
        required: true,
      },
      {
        label: '',
        name: 'newsChoosed',
        type: 'slot',
        valueType: 'string',
        placeholder: '',
        hidden: true,
        required: true
      },
      {
        label: 'APP推送标题',
        name: 'title',
        type: 'text',
        valueType: 'string',
        required: true,
        placeholder: '请输入APP推送标题'
      },
      {
        label: '内容模板',
        name: 'content',
        type: 'textarea',
        required: true,
        placeholder: '请输入内容模板'
      },
    ]
  }
]