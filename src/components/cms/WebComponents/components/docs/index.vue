<template>
  <div class="docs-wrap">
    <DocHead />
    <doc-list :table-data="tableData"/>
    <DocFoot :total="totalCount" @sizeChange = "sizeChange" @pageChange="pageChange"/>
    {{ treeTags }}
  </div>
</template>
<script>
import DocHead from './docHead'
import DocList from './docList'
import DocFoot from './docFoot'
import { mapGetters } from 'vuex'
import { documentList } from '@/api/cms/article'
export default {
  name: 'DocsWrap',
  components: {
    DocHead,
    DocList,
    DocFoot
  },
  data() {
    return {
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      searchData: {},
      channelId: ''
    }
  },
  computed: {
    ...mapGetters(['treeTags'])
  },
  watch: {
    treeTags(val) {
      if(val) {
        this.channelId = val[val.length - 1].id
        this.documentList(val)
      }
    }
  },
  methods: {
    sizeChange(val) {
      this.pageSize = val
      this.documentList()
    },
    pageChange(val) {
      this.pageNum = val
      this.documentList()
    },
    documentList() {
      var _this = this
      _this.searchData.channelId = this.channelId
      return new Promise((resolve, reject) => {
        documentList(_this.searchData, _this.pageNum, _this.pageSize)
          .then((response) => {
            _this.tableData = response.data.result.content
            _this.totalCount = response.data.result.total
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.docs-wrap {
  min-width: 1020px;
}
</style>
