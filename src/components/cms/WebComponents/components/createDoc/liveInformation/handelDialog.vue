<template>
  <div class="live-handel-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      :title="title"
      width="40%"
      :before-close="colseMe"
    >
      <v-form ref="liveForm" :form-settings="liveSettings" :form-data="formData" label-width="80px" @save="submitSave">
        <template slot="articleLiveCommentContent">
          <div>
            <Tinymce ref="editor" :height="300" v-model="contentBody"/>
          </div>
        </template>
      </v-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="$emit('update:dialogVisible', false)" size="small">取消</el-button>
        <el-button type="primary" @click="handelConfirm" size="small">确定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>
<script>
// import { columnList } from '@/api/cms/columnManage'
import { addLive, getLiveInfor, editLive } from '@/api/cms/article'
import mixins from '@/components/cms/mixins'
import { mapGetters } from 'vuex'
import Tinymce from '@/components/Tinymce'
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
              label: '直播内容',
              name: 'articleLiveCommentContent',
              type: 'slot',
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
        // this.getInfor()
      } else {
        // this.$refs.editor.destroyTinymce()
      }
    },
    // liveRow(val) {
    //   console.log(val, 'row')
    //   if(val) {
    //     this.liveInfor = val
    //     this.getInfor()
    //   }
    // }
  },
  methods: {
    handelConfirm() {
    },
    getInfor() {
      return new Promise((resolve, reject) => {
        getLiveInfor(this.liveRow.articleLiveCommentId)
          .then((response) => {
            this.formData = response.data.result
            this.contentBody = response.data.result.articleLiveCommentContent
            this.$refs.editor.setContent(response.data.result.articleLiveCommentContent)
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
      data.articleLiveCommentContent = this.contentBody
      data.articleId = this.contextMenu.docId
      if(this.title == '添加') {
        this.addLive(data)
      } else {
        data.articleLiveCommentId = this.liveInfor.articleLiveCommentId
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
              // this.getColumnImage()
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
              // this.getColumnImage()
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
    },
    // show() {
    //   this.dialogVisible = true
    // }
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

