<template>
  <div class="reproduce-wrap">
    <v-form ref="vForm" :form-settings="formSettings" :form-data="formData" label-width="80px" :btn-loading = "isLoading" @save = "submitSave">
      <template slot="set">
        <div class="set">
          <el-checkbox>置顶</el-checkbox>
          <el-checkbox>隐身</el-checkbox>
          <span class = "extractCode">提取码</span>
          <el-input/>
        </div>
      </template>
    </v-form>
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
              name: 'articleTitle',
              type: 'text',
              placeholder: '请输入正文标题',
              required: true
            },
            {
              label: '首页标题',
              name: 'contentTitle',
              type: 'text',
              placeholder: '请输入首页标题',
              required: true
            },
            {
              label:'转载地址',
              name: 'url',
              type:'text',
              placeholder: '请输入转载地址'
            },{
              label: '标签',
              name: 'tag',
              type: 'checkbox',
              options: [{
                label: '预告',
                value: '1'
                }, {
                  label: '直播',
                  value: '2'
                }, {
                  label: '回看',
                  value: '3'
              }]
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

