<template>
  <div class="basicContent-wrap">
    <div class="tool-bar clearfix">
      <el-form ref="form" :model="typeForm" label-width="80px">
        <el-form-item label="文档类型">
          {{ contextMenu }}
          <el-radio-group v-model="typeForm.articleType" size="small" @change="typeChange">
            <el-radio-button label="0">图文</el-radio-button>
            <el-radio-button label="1">图集</el-radio-button>
            <el-radio-button label="2">拼条</el-radio-button>
            <el-radio-button label="3">转载</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <imageText :extends-list="extendsList" :channel-id = "channelId" :doc-infor="docInfor" v-if="typeForm.articleType == 0"/>
    <images v-if="typeForm.articleType == 1"/>
    <splicing v-if="typeForm.articleType == 2"/>
    <reproduce v-if="typeForm.articleType == 3"/>
  </div>
</template>
<script>
import imageText from './imageText'
import images from './images.vue'
import splicing from './splicing.vue'
import reproduce from './reproduce.vue'
import { columnInfor } from '@/api/cms/columnManage'
import { documentInfor } from '@/api/cms/article'
import { mapGetters } from 'vuex'
export default {
  name: 'BasicContent',
  components: { imageText, images, splicing, reproduce },
  data() {
    return {
      typeForm: {
        articleType: '0'
      },
      extendsList: [],
      tagList: [],
      channelId: '',
      docInfor: {}
    }
  },
  computed: {
    ...mapGetters(['treeTags', 'contextMenu'])
  },
  created() {
    // 获取栏目详情
    this.getColumnInfor(this.treeTags[this.treeTags.length - 1].id)
    this.channelId = this.treeTags[this.treeTags.length - 1].id
  },
  mounted() {
    if(this.contextMenu.docId) {
      this.getDocumentInfor(this.contextMenu.docId)
    }
  },
  methods: {
    handleSave() {},
    handleSaveAddRelease() {},
    goBack() {
      this.$store.dispatch('setContextMenu', {
        id: '0',
        label: ''
      })
    },
    typeChange(val) {
      console.log(val)
    },
    datachange(type) {
      switch(type) {
        case '1':
          return 'text'
        case '2':
          return 'date'
        case '3':
          return 'number'
        default: ''
      }
    },
    // 获取栏目详情
    getColumnInfor(id) {
      var _this = this
      return new Promise((resolve, reject) => {
        columnInfor(id)
          .then((response) => {
            if(response.data.result.extFieldsList.length) {
              _this.extendsList = response.data.result.extFieldsList.map((ele) => {
                return {
                  label: ele.label,
                  name: ele.label,
                  type: _this.datachange(ele.type),
                  placeholder: '请输入'
                }
              })
            }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getDocumentInfor(id) {
      var _this = this
      return new Promise((resolve, reject) => {
        documentInfor(id)
          .then((response) => {
            _this.docInfor = response.data.result
            _this.$emit('docInfor', _this.docInfor)
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
<style lang="scss" >
.basicContent-wrap {
  margin: 0;
  .tool-bar{
    label {
      font-weight: normal;
    }
  }
}

.pull-right {
  float: right;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>

