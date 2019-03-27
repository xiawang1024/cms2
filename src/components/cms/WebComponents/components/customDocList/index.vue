<template>
  <div class="define-doucment">
    <div class="add-btn">
      <el-button type="primary" size="small" @click="handelDoc('add')">创建文档列表</el-button>
    </div>
    <div>
      <table-list/>
    </div>
    <!-- <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
      <el-dialog
        width="60%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        append-to-body>
        <div>
          内部
        </div>
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
      </div>
    </el-dialog> -->
    <v-page :visible.sync="addPage">
      <h3 slot="title">{{ title }}</h3>
      <template slot="content">
        <!-- 详情页组件 -->
        <!-- <v-detail :detailData="detailData" :detailId="detailId"></v-detail> -->
        <v-form ref="vform" :form-settings="formSettings" :form-data="formData" @save="submitSave">
          <template slot="list">
            <div class="choosed-list">
              <choosed-list/>
            </div>
          </template>
        </v-form>
      </template>
    </v-page>
  </div>
</template>
<script>
import tableList from './table'
import choosedList from './choosedList'
export default {
  components: {
    tableList,
    choosedList
  },
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      addPage: false,
      title: '创建文档列表',
      formData: {},
      formSettings: [
        {
          items: [
            {
              label: '名称',
              name: 'documentName',
              type: 'text',
              placeholder: '请输入名称'
            },
            {
              label: '描述',
              name: 'documentRemark',
              type: 'text',
              placeholder: '请输入描述'
            },{
              label: '是否禁用',
              name: 'enableFlag',
              activeValue: 0,
              inactiveValue: 1,
              activeColor: '#13ce66',
              value: 1,
              type: 'switch'
            },{
              label: '标签',
              name: 'tagIds',
              type: 'textarea',
              placeholder: '请输入其他数据'
            },{
              label:'列表',
              name: 'list',
              type:'slot',
              placeholder: ''
            }
          ]
        }
      ]
    }
  },
  methods: {
    handelDoc(type) {
      if(type == 'add') {
        this.title = '创建文档列表'
      }
      this.addPage = true
    },
    submitSave() {
    }
  }
}
</script>
<style lang="scss">
  .define-doucment{
    .add-btn {
      text-align: right;
    }
  }
</style>