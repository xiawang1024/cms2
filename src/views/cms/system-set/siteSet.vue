<template>
  <div class="site-set-container">
    <el-table :data="siteList" style="width: 100%">
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="code" label="代码"/>
      <el-table-column label="值">
        <template slot-scope="scope">
          <el-input v-model="scope.row.value"/>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" class="btn-save">保存</el-button>
  </div>
</template>

<script>
export default {
  name: 'SiteSet',
  data() {
    return {
      siteList: [
        {
          name: '网站名称',
          code: 'site.name',
          value: '河南广播网'
        },
        {
          name: '生产服务器',
          code: 'factory.domain',
          value: 'http://admin.hndt.com'
        },
        {
          name: '发布根目录',
          code: 'publish.root',
          value: '/home/pub/'
        },
        {
          name: '发布域名',
          code: 'site.domain',
          value: 'http://www.hndt.com'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>
.site-set-container {
  margin: 30px;
}

.btn-save {
  margin-top: 20px;
}
</style>
