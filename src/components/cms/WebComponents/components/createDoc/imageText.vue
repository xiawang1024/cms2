<template>
  <div class="imageText-wrap">
    <el-row :gutter="10">
      <el-col :xs="12" :sm="12" :md="14" :lg="14" :xl="14">
        <el-form ref="docContentForm" :model="docContentForm" :rules="rules" label-width="80px" class="docContentForm">
          <el-form-item label="文档标题" prop="textTitle">
            <el-input v-model="docContentForm.textTitle"/>
          </el-form-item>
          <el-form-item label="首页标题" prop="indexTitle">
            <el-input v-model="docContentForm.indexTitle"/>
          </el-form-item>
          <el-form-item label="" prop="indexTitle">
            <div class="grid-content bg-purple">
              <Tinymce ref="editor" :height="400" v-model="docContentForm.content"/>
            </div>
          </el-form-item>
        </el-form>
        <div class="btn-list">
          <el-button type = "primary" size="small" @click = "save">预览</el-button>
          <el-button type = "primary" size="small" @click = "save">存草稿</el-button>
          <el-button type = "primary" size="small" @click = "save">保存并关闭</el-button>
          <el-button type = "primary" size="small" @click = "save">保存并发布</el-button>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="10" :lg="10" :xl="10" class="document-right">
        <div class="base-attribute">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>基本属性</span>
            </div>
            <div>
              <v-form ref="baseForm" :form-settings="baseSettings" :form-data="formData" label-width="80px" :show-button = "showButton"/>
            </div>
          </el-card>
        </div>
        <div class="other-attribute">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>其他属性</span>
            </div>
            <div>
              <v-form ref="otherForm" :form-settings="otherSettings" :form-data="formData" label-width="80px" :show-button = "showButton"/>
            </div>
          </el-card>
        </div>
        <div class="file-attribute">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>图片和附件</span>
            </div>
            <div class="btn">
              <el-button type="text" size="small">上传图片或附件</el-button>
              <el-button type="text" size="small">上传其他文件</el-button>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
export default {
  name: 'ImageText',
  components: { Tinymce },
  data() {
    return {
      docContentForm: {
        textTitle: '',
        indexTitle: '',
        content: ''
      },
      rules: {
        textTitle: [
          { required: true, message: '请输入文档标题', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        indexTitle: [
          { required: true, message: '请输入首页标题', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      },
      formData: {},
      isLoading: false,
      baseSettings: [
        {
          items: [
            {
              label: '关键词',
              name: 'keyWord',
              type: 'text',
              valueType: 'string',
              placeholder: '请输入关键词'
            },
            {
              label: '来源',
              name: 'source',
              type: 'text',
              placeholder: '请输入来源'
            },
            {
              label: '作者',
              name: 'author',
              type: 'text',
              valueType: 'string',
              placeholder: '请输入作者'
            },
            {
              label: '摘要',
              name: 'digest',
              type: 'textarea',
              placeholder: '请输入摘要'
            }
          ]
        }
      ],
      otherSettings: [
        {
          items: [
            {
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
              type: 'checkbox',
              options: [{
                label: '置顶',
                value: '1'
                }, {
                  label: '隐身',
                  value: '2'
                }]
            },
            {
              label: '直播地址',
              name: 'author',
              type: 'text',
              valueType: 'string',
              placeholder: '请输入直播地址'
            },
            {
              label: '在线人数',
              name: 'digest',
              type: 'text',
              placeholder: '请输入在线人数'
            },
            {
              label: '定时功能',
              name: 'ding',
              type: 'text',
              placeholder: '请输入在线人数'
            }
          ]
        }
      ],
      showButton: false
    }
  },
  methods: {
    save() {
      console.log(this.$refs.baseForm.formModel)
    }
  }
}
</script>
<style lang="scss" >
.imageText-wrap {
  .btn-list {
    margin-left:80px;
    text-align: center;
  }
  margin: 10px 0;
  .docContentForm {
     label{
       font-weight: normal;
     }
     input {
       height: 32px;
       line-height: 32px;
     }
  }
  .document-right {
    .v-form {
      .form-section {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom:none;
      }
    }
    font-size: 14px;
    .el-card__header {
      padding:5px 20px;
    }
    .el-card__body {
      padding: 0;
    }
    .base-attribute {
      margin-bottom: 10px;
    }
    .other-attribute {
      margin-bottom: 10px;
    }
    .file-attribute {
      .btn {
        text-align: center;
        padding-top:20px;
        padding-bottom:20px;
      }
    }
  }
}
</style>

