<template>
  <div class="basicContent-wrap">
    <div class="tool-bar clearfix">
      <el-form ref="form" :model="typeForm" label-width="80px">
        <el-form-item label="文档类型">
          <el-radio-group v-model="typeForm.articleType" size="small" @change="typeChange">
            <el-radio-button label="0">图文</el-radio-button>
            <el-radio-button label="1">图集</el-radio-button>
            <el-radio-button label="2">拼条</el-radio-button>
            <el-radio-button label="3">转载</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <imageText :extends-list="extendsList" :other-settings="otherSettings" :tag-list="tagList" :channel-id="channelId" :doc-infor="docInfor" v-if="typeForm.articleType == 0"/>
    <images :extends-list="extendsList" :images-setting="imagesSeting" :tag-list="tagList" :channel-id="channelId" :doc-infor="docInfor" v-if="typeForm.articleType == 1"/>
    <splicing :channel-id = "channelId" :doc-infor="docInfor" :tag-list = "tagList" v-if="typeForm.articleType == 2"/>
    <reproduce :channel-id = "channelId" :doc-infor="docInfor" :reproduce-setting="reproduceSetting" :tag-list = "tagList" v-if="typeForm.articleType == 3"/>
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
      docInfor: {},
      otherSettings: [
        {
          items: [
            {
              label: '标签',
              name: 'tagIds',
              type: 'checkbox',
              options: [],
              hidden: false
            },
            {
              label: '点击量',
              name: 'clickNum',
              type: 'number',
              placeholder: '请输入点击量'
            },
            {
              label: '创建时间',
              name: 'createTime',
              type: 'date'
            },
            {
              label: '设置',
              name: 'set',
              type: 'slot',
            },
            {
              label: '排序号',
              name: 'seqNo',
              type: 'number'
            },
          ]
        }
      ],
      imagesSeting: [
        {
          items: [
            {
              label: '正文标题',
              name: 'articleTitle',
              type: 'text',
              placeholder: '请输入正文标题',
              maxlength: 80,
              required: true
            },
            {
              label: '首页标题',
              name: 'contentTitle',
              type: 'text',
              placeholder: '请输入首页标题',
              maxlength: 80,
              required: true
            },
            {
              label: '文档来源',
              name: 'articleOrigin',
              type: 'select',
              placeholder: '请选择',
              options: [
                {
                  label: '1',
                  value: '123'
                }
              ]
            },{
              label:'文档作者',
              name: 'articleAuthor',
              type:'text',
              placeholder: '请输入文档作者'
            },{
              label: '关键字',
              name: 'seoKeywords',
              type: 'text',
              placeholder: '请输入关键字',
            },{
              label: '摘要',
              name: 'seoDescription',
              type: 'textarea',
              maxlength: 20,
              placeholder: '请输入摘要'
            },{
              label: '标签',
              name: 'tagIds',
              type: 'checkbox',
              options: [],
              hidden: false
            },{
              label:'点击量',
              name: 'clickNum',
              type:'number',
              placeholder: '请输入点击量'
            },{
              label:'创建时间',
              name:'createTime',
              type:'date',
              placeholder: '请选择'
            },
            {
              label: '设置',
              name: 'set',
              type: 'slot',
            },
            {
              label: '排序号',
              name: 'seqNo',
              type: 'number'
            },
            {
              label: '',
              name: 'btn',
              type: 'slot'
            },
          ]
        }
      ],
      reproduceSetting: [
        {
          items: [
            {
              label: '正文标题',
              name: 'articleTitle',
              type: 'text',
              placeholder: '请输入正文标题',
              maxlength: 80,
              required: true
            },
            {
              label: '首页标题',
              name: 'contentTitle',
              type: 'text',
              placeholder: '请输入首页标题',
              maxlength: 80,
              required: true
            },
            {
              label:'转载地址',
              name: 'linkTo',
              type:'text',
              placeholder: '请输入转载地址'
            },{
              label: '标签',
              name: 'tagIds',
              type: 'checkbox',
              options: [],
              hidden: false
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
      ]
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
            if(response.data.result.extFieldsList) {
              _this.extendsList = response.data.result.extFieldsList.map((ele) => {
                return {
                  label: ele.label,
                  name: ele.label,
                  type: _this.datachange(ele.type),
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
            _this.otherSettings[0].items = _this.otherSettings[0].items.concat(_this.extendsList)
            if(_this.tagList.length) {
              console.log()
            } else {
              _this.otherSettings[0].items[0].hidden = true
              _this.imagesSeting[0].items[6].hidden = true
              _this.reproduceSetting[0].items[3].hidden = true
            }
            if(_this.contextMenu.docId) {
              _this.getDocumentInfor(_this.contextMenu.docId)
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

