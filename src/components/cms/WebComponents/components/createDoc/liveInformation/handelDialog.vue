<template>
  <div class="live-handel-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      :title="title"
      width="40%"
      top="10vh"
      :before-close="colseMe"
    >
      <v-form ref="liveForm" :form-settings="liveSettings" :form-data="formData" label-width="80px" @save="submitSave"/>
    </el-dialog>
  </div>
</template>
<script>
import { addLive, getLiveInfor, editLive } from '@/api/cms/article'
import mixins from '@/components/cms/mixins'
import { mapGetters } from 'vuex'
import Tinymce from '@/components/Tinymce'
import { handleDate } from '@/utils/date-filter'
export default {
  components: {
    Tinymce
  },
  mixins: [mixins],
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    },
    title: {
      default: '',
      type: String
    },
    liveRow: {
      default: ()=> {
        return {}
      },
      type: Object
    }
  },
  data() {
    return {
      formData: {},
      liveSettings: [
        {
          items: [
            {
              label: '直播人',
              name: 'articleLiveCommentUser',
              type: 'text',
              valueType: 'string',
              placeholder: '请输入直播人'
            },
            {
              label: '发布时间',
              name: 'articleLiveCommentTime',
              type: 'datetime',
              placeholder: '请选择',
              options: []
            },
            {
              label: '图片',
              name: 'articleLiveCommentPicUrl',
              type: 'img',
              limit: 1,
              showPreview: true
            },
            {
              label: '描述',
              name: 'articleLiveCommentContent',
              type: 'textarea',
              placeholder: '请输入',
            }
          ]
        }
      ],
      contentBody: '',
      liveInfor: {}
    }
  },
  computed: {
    ...mapGetters(['treeTags', 'contextMenu'])
  },
  watch: {
    dialogVisible(val) {
      if(val) {
        this.formData = {}
        if(this.liveRow.articleLiveCommentId) {
          this.getInfor()
        }
      }
    }
  },
  methods: {
    handelConfirm() {
    },
    getInfor() {
      return new Promise((resolve, reject) => {
        getLiveInfor(this.liveRow.articleLiveCommentId)
          .then((response) => {
            this.formData = response.data.result
            this.formData.articleLiveCommentPicUrl = response.data.result.articleLiveCommentPicUrl ? [{url: response.data.result.articleLiveCommentPicUrl}] : []
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    colseMe() {
      this.$emit('update:dialogVisible', false)
    },
    submitSave(data) {
      data.articleId = this.contextMenu.docId
      data.articleLiveCommentPicUrl = data.articleLiveCommentPicUrl.length ? data.articleLiveCommentPicUrl[0].url : ''
      data.enableFlag = 1
      console.log(data,'data11')
      if(data.articleLiveCommentTime) {
        console.log(123)
        data.articleLiveCommentTime = handleDate(data.articleLiveCommentTime)
      }
      if(this.title == '添加') {
        this.addLive(data)
      } else {
        data.articleLiveCommentId = this.liveRow.articleLiveCommentId
        this.editLive(data)
      }
    },
    addLive(data) {
      return new Promise((resolve, reject) => {
          addLive(data)
            .then((response) => {
              this.$message.success('添加成功')
              this.$emit('update:dialogVisible', false)
              this.$emit('handelSuccess')
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
    },
    editLive(data) {
      return new Promise((resolve, reject) => {
          editLive(data)
            .then((response) => {
              this.$message.success('编辑成功')
              this.$emit('update:dialogVisible', false)
              this.$emit('handelSuccess')
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
<style lang="scss">
.live-handel-dialog {
  .el-dialog {
    .el-dialog__header{
      border-bottom: 1px solid #ebeef5;
    }
  }
}
</style>

