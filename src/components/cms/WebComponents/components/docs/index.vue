<template>
  <div class="docs-wrap">
    <DocHead @searchList = "searchList" :multiple-list="multipleList" :source-list="sourceList" @handelSuccess = "handelSuccess"/>
    <doc-list :table-data="tableData" ref="documentList" @handelSuccess="handelSuccess" @multipleChoose="multipleChoose"/>
    <DocFoot :total="totalCount" @sizeChange = "sizeChange" @pageChange="pageChange"/>
    <!-- {{ treeTags }}
    {{ contextMenu }} -->
  </div>
</template>
<script>
import DocHead from './docHead'
import DocList from './docList'
import DocFoot from './docFoot'
import { mapGetters } from 'vuex'
import { documentList } from '@/api/cms/article'
import { fetchDictByDictName } from "@/api/cms/dict";
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
      multipleList: [],
      sourceList: []
    }
  },
  computed: {
    ...mapGetters(['treeTags', 'contextMenu'])
  },
  watch: {
    treeTags(val) {
      if(val) {
        this.pageNum = 1;
        this.pageSize = 10;
        this.channelId = val[val.length - 1].id
        this.documentList(val)
      }
    }
  },
  created() {
    if(this.contextMenu.id == '0') {
      if(this.treeTags && this.treeTags.length) {
        this.pageNum = 1;
        this.pageSize = 10;
        this.channelId = this.treeTags[this.treeTags.length - 1].id
        this.documentList()
      }
    }
    this.fetchDict()
  },
  methods: {
    // 文章来源
    fetchDict() {
      var _this = this;
      return new Promise((resolve, reject) => {
        fetchDictByDictName('文稿来源')
          .then(response => {
            if(response.data.result && response.data.result.details.length) {
              _this.sourceList = response.data.result.details.map((ele) => {
                return {
                  label: ele.dictDetailName,
                  value: ele.dictDetailId
                }
              })
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 获取多逊列表
    multipleChoose(val) {
      this.multipleList = val
    },
    handelSuccess() {
      this.$refs.documentList = []
      this.multipleList = []
      this.documentList()
    },
    searchList(val) {
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
      // _this.searchData.sortBy = 'topFlag'
      // _this.searchData.deleteFlag = 0
      return new Promise((resolve, reject) => {
        documentList(_this.searchData, _this.pageNum, _this.pageSize)
          .then((response) => {
            _this.tableData = []
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
