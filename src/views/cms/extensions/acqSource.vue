<template>
  <div class="acqSource-container">
    <el-table :data="acqSourceList" style="width: 100%">
      <el-table-column prop="domain" label="域名" width="180"/>
      <el-table-column prop="program" label="对应栏目" width="180"/>
      <el-table-column prop="listRegular" label="列表正则"/>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'AcqSourceSet',
  data() {
    return {
      acqSourceList: [
        {
          id: 1,
          domain: 'news.mtime.com',
          program: '资讯',
          listRegular: 'http://news.mtime.com/'
        },
        {
          id: 2,
          domain: 'news.mtime.com',
          program: '资讯',
          listRegular: 'http://news.mtime.com/'
        },
        {
          id: 3,
          domain: 'news.mtime.com',
          program: '资讯',
          listRegular: 'http://news.mtime.com/'
        },
        {
          id: 4,
          domain: 'news.mtime.com',
          program: '资讯',
          listRegular: 'http://news.mtime.com/'
        },
        {
          id: 5,
          domain: 'news.mtime.com',
          program: '资讯',
          listRegular: 'http://news.mtime.com/'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>
.acqSource-container {
  margin: 30px;
}
</style>
