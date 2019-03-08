<template>
  <div class="images-wrap">
    <v-form ref="baseForm" :form-settings="formSettings" :form-data="formData" label-width="80px" :btn-loading = "isLoading" @save = "submitSave"/>
  </div>
</template>
<script>
export default {
  name: 'Images',
  data() {
    return {
      formSettings: [
        {
          items: [
            {
              label: '正文标题',
              name: 'textTitle',
              type: 'text',
              placeholder: '请输入正文标题'
            },
            {
              label: '首页标题',
              name: 'homePageTitle',
              type: 'text',
              placeholder: '请输入首页标题'
            },
            {
              label: '文档来源',
              name: 'docSource',
              type: 'select',
              placeholder: '请选择',
              options: [
                {
                  label: '1',
                  value: '123'
                }
              ]
            },{
              label:'文档作者',
              name: 'docWriter',
              type:'text',
              placeholder: '请输入文档作者'
            },{
              label: '关键字',
              name: 'keyWords',
              type: 'text',
              placeholder: '请输入关键字',
            },{
              label: '摘要',
              name: 'abstract',
              type: 'textarea',
              placeholder: '请输入摘要'
            },{
              label: '标签',
              name: 'tag',
              type: 'text',
              placeholder: '请输入其他数据'
            },{
              label:'点击量',
              name: 'sequenceNumber',
              type:'text',
              placeholder: '请输入点击量'
            },{
              label:'创建时间',
              name:'createTime',
              type:'datetime',
              placeholder: '请选择'
            },
            {
              label: '设置',
              name: 'settings',
              type: 'slot'
            },
            {
              label: '排序号',
              name: 'order',
              type: 'text',
              value: 0
           }
          ]
        }
      ],
      formData: {},
      isLoading: false
    }
  },
  methods: {
    submitSave(data) {
      console.log(data, 'data')
    }
  }
}
</script>
<style lang="scss" scoped>
.images-wrap {
  margin: 10px 0;
}
</style>

