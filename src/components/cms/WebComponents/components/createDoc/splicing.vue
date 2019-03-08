<template>
  <div class="splicing-wrap">
    <v-form ref="vForm" :form-settings="formSettings" :form-data="formData" label-width="80px" :btn-loading = "isLoading" @save = "submitSave"/>
  </div>
</template>
<script>
export default {
  name: 'Splicing',
  data() {
    return {
      formSettings: [
        {
          items: [
            {
              label: '首页标题',
              name: 'textTitle',
              type: 'text',
              placeholder: '请输入正文标题'
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
           },
           {
            label: '附加数据',
            name: 'otherData',
            type: 'textarea',
            placeholder: '请输入附加数据'
          }]
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
.splicing-wrap {
  margin: 10px 0;
}
</style>

