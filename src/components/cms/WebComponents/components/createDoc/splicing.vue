<template>
  <div class="splicing-wrap">
    <v-form ref="vForm" :form-settings="formSettings" :form-data="formData" label-width="80px" :btn-loading = "isLoading" @save = "submitSave">
      <template slot="set">
        <div class="set">
          <el-checkbox>置顶</el-checkbox>
          <el-checkbox>隐身</el-checkbox>
          <span class = "extractCode">提取码</span>
          <el-input/>
        </div>
      </template>
      <template slot="preview">
        <div class="preview">
          <div v-html="$refs.vForm.formModel.contentTitle" v-if="$refs.vForm"/>
        </div>
      </template>
    </v-form>
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
              name: 'contentTitle',
              type: 'textarea',
              placeholder: '请输入html代码',
              required: true
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
            label: '附加数据',
            name: 'extFields',
            type: 'textarea',
            placeholder: '请输入附加数据'
          },{
            label: '预览',
            name: 'preview',
            type: 'slot'
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
  .set {
    .extractCode {
      margin-left: 10px;
      margin-right: 10px;
    }
    .el-input {
      width:100px
    }
    .el-checkbox {
      margin-right: 10px;
    }
  }
}
</style>

