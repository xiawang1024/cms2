<template>
  <div class="docs-wrap">
    <DocHead @searchList = "searchList" :multiple-list="multipleList" @handelSuccess = "handelSuccess"/>
    <doc-list :table-data="tableData" @handelSuccess="handelSuccess" @multipleChoose="multipleChoose"/>
    <DocFoot :total="totalCount" @sizeChange = "sizeChange" @pageChange="pageChange"/>
    {{ treeTags }}
    {{ contextMenu }}
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
      channelId: '',
      multipleList: []
    }
  },
  computed: {
    ...mapGetters(['treeTags', 'contextMenu'])
  },
  watch: {
    treeTags(val) {
      console.log(val, 'treeTags')
      if(val) {
        this.channelId = val[val.length - 1].id
        this.documentList(val)
      }
    }
  },
  created() {
    if(this.contextMenu.id == '0') {
      if(this.treeTags && this.treeTags.length) {
        this.channelId = this.treeTags[this.treeTags.length - 1].id
        this.documentList()
      }
    }
  },
  methods: {
    // 获取多逊列表
    multipleChoose(val) {
      this.multipleList = val
    },
    handelSuccess() {
      this.documentList()
    },
    searchList(val) {
      console.log(val)
      this.searchData = val
      this.pageNum = 1
      this.documentList()
    },
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
    }
  }
}
</script>
<style lang="scss" scoped>
.docs-wrap {
  min-width: 1020px;
}
</style>
