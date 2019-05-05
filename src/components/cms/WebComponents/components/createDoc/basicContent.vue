<template>
  <div class="basicContent-wrap">
    <div class="tool-bar clearfix">
      <el-form ref="form" :model="typeForm" label-width="80px">
        <el-form-item label="文档类型">
          <el-select v-model="typeForm.articleType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <imageText ref="imageText" :extends-list="extendsList" :other-settings="otherSettings" :tag-list="tagList" :source-list="sourceList" :channel-id="channelId" :doc-infor="docInfor" v-if="typeForm.articleType == 0"/>
    <images ref="images" :extends-list="extendsList" :images-setting="imagesSeting" :tag-list="tagList" :channel-id="channelId" :doc-infor="docInfor" v-if="typeForm.articleType == 1"/>
    <splicing ref="splicing" :channel-id = "channelId" :doc-infor="docInfor" :tag-list = "tagList" v-if="typeForm.articleType == 2"/>
    <reproduce ref="reproduce" :channel-id = "channelId" :doc-infor="docInfor" :reproduce-setting="reproduceSetting" :tag-list = "tagList" v-if="typeForm.articleType == 3"/>
  </div>
</template>
<script>
import imageText from './imageText'
import images from './images.vue'
import splicing from './splicing.vue'
import reproduce from './reproduce.vue'
import { columnInfor } from '@/api/cms/columnManage'
import { documentInfor } from '@/api/cms/article'
import { fetchDictByDictName } from "@/api/cms/dict"
import {otherSettings, imagesSeting, reproduceSetting, defultItems} from './setting.js'
import { mapGetters } from 'vuex'
export default {
  name: 'BasicContent',
  components: { imageText, images, splicing, reproduce },
  props: {
   activeName: {
     default: '',
     type: String
   },
  //  propInformation: {
  //    default: ()=> {
  //      return {}
  //    },
  //    type: Object
  //  }
  },
  data() {
    return {
      typeForm: {
        articleType: 0
      },
      extendsList: [],
      tagList: [],
      channelId: '',
      docInfor: {},
      options: [{
          value: 0,
          label: '图文'
        }, {
          value: 1,
          label: '图集'
        }, {
          value: 2,
          label: '拼条'
        }, {
          value: 3,
          label: '转载'
        }],
        otherSettings: otherSettings,
        imagesSeting: imagesSeting,
        reproduceSetting: reproduceSetting,
        sourceList: []
    }
  },
  computed: {
    ...mapGetters(['treeTags', 'contextMenu'])
  },
  watch: {
    activeName(val, oldVal) {
      if(oldVal == 'basicContent' && this.typeForm.articleType == 0) {
        this.$store.dispatch('setBaseInfor', this.$refs.imageText.getSubmitData())
      }
      if(oldVal == 'basicContent' && this.typeForm.articleType == 1) {
        this.$store.dispatch('setBaseInfor', this.$refs.images.getSubmitData())
      }
      if(oldVal == 'basicContent' && this.typeForm.articleType == 2) {
        this.$store.dispatch('setBaseInfor', this.$refs.splicing.getSubmitData())
      }
      if(oldVal == 'basicContent' && this.typeForm.articleType == 3) {
        this.$store.dispatch('setBaseInfor', this.$refs.reproduce.getSubmitData())
      }
    }
  },
  created() {
    // 获取栏目详情
    this.getColumnInfor(this.treeTags[this.treeTags.length - 1].id)
    this.channelId = this.treeTags[this.treeTags.length - 1].id
    this.fetchDict()
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
          return 'datetime'
        case '3':
          return 'number'
        default: ''
      }
    },
    // 获取栏目详情
    getColumnInfor(id) {
      // 设置默认值， 防止扩展字段重复添加
      this.otherSettings[0].items = defultItems
      var _this = this
      return new Promise((resolve, reject) => {
        columnInfor(id)
          .then((response) => {
            if(response.data.result.extFieldsList) {
              _this.extendsList = response.data.result.extFieldsList.map((ele) => {
                return {
                  label: ele.label,
                  name: ele.label,
                  type: _this.datachange(ele.type),
                  required: ele.required,
                  placeholder: '请输入'
                }
              })
            }
            if(response.data.result.tagRule) {
              Object.keys(response.data.result.tagRule).forEach((ele) => {
                if(response.data.result.tagRule[ele]) {
                  _this.tagList.push({
                    label: response.data.result.tagRule[ele],
                    value: ele
                  })
                }
              })
            }
            _this.otherSettings[0].items[0].options = _this.tagList
            _this.imagesSeting[0].items[6].options = _this.tagList
            _this.reproduceSetting[0].items[3].options = _this.tagList
            this.$nextTick(() => {
              _this.otherSettings[0].items = _this.otherSettings[0].items.concat(_this.extendsList)
            })
            if(!_this.tagList.length) {
              _this.otherSettings[0].items[0].hidden = true
              _this.imagesSeting[0].items[6].hidden = true
              _this.reproduceSetting[0].items[3].hidden = true
            }
            if(_this.contextMenu.docId) {
              _this.getDocumentInfor(_this.contextMenu.docId)
            } else {
              // 扩展字段必填触发updateForm
              this.$nextTick(() => {
                _this.docInfor = {
                  hiddenFlag: '0',
                  topFlag: '0'
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
            _this.typeForm.articleType = response.data.result.articleType ? response.data.result.articleType : 0
            if(_this.docInfor.extFieldsList && _this.docInfor.extFieldsList.length) {
              _this.docInfor.extFieldsList.forEach((ele) => {
                _this.docInfor[ele.label] = ele.fieldValue
              })
            }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchDict() {
      var _this = this;
      return new Promise((resolve, reject) => {
        fetchDictByDictName('文稿来源')
          .then(response => {
            if(response.data.result.details && response.data.result.details.length) {
              _this.sourceList = response.data.result.details.map((ele) => {
                return {
                  label: ele.dictDetailName,
                  value: ele.dictDetailName
                }
              })
              _this.imagesSeting[0].items[2].options = _this.sourceList
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
}
</script>
<style lang="scss" >
.basicContent-wrap {
  margin: 0;
  margin-bottom: 30px;
  .tool-bar{
    label {
      font-weight: normal;
    }
    .el-form-item {
      margin-bottom:0px;
      .el-input__inner{
        height: 32px;
        line-height: 32px;
      }
      .el-form-item__content{
        text-align: left;
      }
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

