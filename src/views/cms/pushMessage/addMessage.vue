<template>
  <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave" label-width="80px" :btn-loading = "isLoading"/>
</template>
<script>
export default {
  data() {
    return {
      formSettings: [
        {
          items: [
            {
              label: '敏感词',
              name: 'word',
              type: 'text',
              valueType: 'string',
              required: true,
              placeholder: '请输入敏感词'
            }
          ]
        }
      ],
      formData: {},
      isLoading: false
    }
  },
  methods: {
    submitSave() {

    }
  }
}
</script>