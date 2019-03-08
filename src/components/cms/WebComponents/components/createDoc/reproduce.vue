<template>
  <div class="reproduce-wrap">
    <v-form ref="vForm" :form-settings="formSettings" :form-data="formData" label-width="80px" :btn-loading = "isLoading" @save = "submitSave"/>
  </div>
</template>
<script>
export default {
  name: 'Reproduce',
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
              label:'转载地址',
              name: 'docWriter',
              type:'text',
              placeholder: '请输入文档作者'
            },{
              label: '标签',
              name: 'tag',
              type: 'text',
              placeholder: '请输入其他数据'
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
.reproduce-wrap {
  margin: 10px 0;
}
</style>

