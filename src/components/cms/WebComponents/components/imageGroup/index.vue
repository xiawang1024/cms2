<template>
  <div class="imageGroup-wrap">
    <div class="tool-bar">
      <el-button
        size="small"
        type="primary"
        @click="handleGroup('add')"
      >新增</el-button>
    </div>
    <el-table
      :data="imageGroupList"
      size="mini"
      style="width: 100%"
      highlight-current-row
    >
      <el-table-column
        prop="picGroupName"
        min-width="150px"
        show-overflow-tooltip
        label="名称"
      />
      <el-table-column
        prop="picGroupRemark"
        show-overflow-tooltip
        min-width="150px"
        label="描述"
      />
      <el-table-column
        prop="picCount"
        label="图片数量"
      />
      <el-table-column
        prop="createUser"
        label="创建人"
      />
      <el-table-column
        width="200px"
        prop="createTime"
        label="创建时间"
      />
      <el-table-column label="操作"
                       width="150px"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="addImageGroupVisible"
      :before-close="handleClean"
      top="8vh"
      :title="title"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="14" :xl="14">
          <v-form ref="vform" :form-settings="formSettings" :form-data="formData" :show-preview="showPreview" label-width="80px" @fileDetail="fileDetail" @removeFile="removeFile" @save="submitSave"/>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" :offset="1">
          <div v-if="rightCardShow" class="image-setting">
            <el-card class="box-card">
              <v-form ref="formSetting" :form-settings="fileSettings" :form-data="singleData" label-width="80px" :show-button = "false">
                <template slot="information">
                  <div class="file-infor">
                    <div class="file-img">
                      <img :src="filedetail.url" alt="">
                    </div>
                    <div class="desc">
                      <div>{{ filedetail.name }}</div>
                      <div v-if="filedetail.createTime">{{ parseInt(filedetail.createTime)|timeFilter }}</div>
                      <div v-if="filedetail.size">{{ Math.floor(filedetail.size / 1024) }} kb</div>
                    </div>
                  </div>
                </template>
                <template slot="btn">
                  <el-button type="primary" size="small" @click ="setFile">保存</el-button>
                  <el-button size="small" @click="colseSet">关闭</el-button>
                </template>
              </v-form>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <div
        slot="footer"
        class="dialog-footer"
      />
    </el-dialog>
  </div>
</template>
<script>
import Upload from '@/components/cms/Upload/uploadBtn'
import { columnInfor } from '@/api/cms/columnManage'
import { columnImageList, createImageList, getImageListInfor, editImageList, deleteImageList } from '@/api/cms/article'
import { mapGetters } from 'vuex'
export default {
  name: 'ImageGroup',
  components: { Upload },
  data() {
    return {
      addImageGroupVisible: false,
      imageGroupList: [],
      // imageGroupForm: {
      //   id: '',
      //   name: '',
      //   desc: '',
      //   disable: '',
      //   tag: '',
      //   imageList: []
      // },
      rightCardShow: false,
      showPreview: false,
      formSettings: [{
        items: [
          {
            label: '名称',
            name: 'picGroupName',
            type: 'text',
            placeholder: '请输入名称'
          },
          {
            label: '描述',
            name: 'picGroupRemark',
            type: 'text',
            placeholder: '请输入描述'
          },
          {
            label: '是否禁用',
            name: 'enableFlag',
            activeValue: 0,
            inactiveValue: 1,
            activeColor: '#13ce66',
            value: 1,
            type: 'switch'
          },
          {
            label: '标签',
            name: 'tagIdsList',
            type: 'checkbox',
            options: []
          },
          {
            label: '图片组',
            name: 'details',
            type: 'img',
            required: false,
            // hasTextInput: true,
            hidden: false,
            maxSize: 1024*5
          }
        ]
      }],
      fileSettings: [{
        items: [
          {
            label: '附件详情',
            name: 'information',
            type: 'slot'
          },
          {
            label: '标题',
            name: 'title',
            type: 'text'
          },
          {
            label: '描述',
            name: 'description',
            type: 'textarea',
          },
          // {
          //   label: '设为封面',
          //   name: 'coverBool',
          //   type: 'switch',
          //   hidden: false
          // },
          {
            label: '',
            name: 'btn',
            type: 'slot'
          },
        ]
      }],
      formData: {},
      singleData: {},
      filedetail: {},
      pageNum: 1,
      pageSize: 30,
      title: '新增',
      picGroupId: '',
      tagList: []
    }
  },
  computed: {
    ...mapGetters(['treeTags'])
  },
  mounted() {
    this.getColumnImage()
  },
  methods: {
    submitSave(data) {
      data.channelId = this.treeTags[this.treeTags.length - 1].id
      console.log(data, 'data1')
      if(data.details && data.details.length) {
        data.details.forEach((ele) => {
          ele.picUrl = ele.url,
          ele.picName = ele.name
        })
      }
      if(this.title == '新增') {
        return new Promise((resolve, reject) => {
          createImageList(data)
            .then((response) => {
              this.$message.success('添加成功')
              this.addImageGroupVisible = false
              this.getColumnImage()
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      } else {
        data.picGroupId = this.picGroupId
        return new Promise((resolve, reject) => {
          editImageList(data)
            .then((response) => {
              this.$message.success('编辑成功')
              this.addImageGroupVisible = false
              this.getColumnImage()
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      }
    },
    fileDetail(val) {
      this.rightCardShow = true
      this.singleData = {}
      this.filedetail = val
      this.singleData = val
    },
    colseSet() {
      this.rightCardShow = false
    },
    removeFile() {
      this.rightCardShow = false
    },
    setFile() {
      this.filedetail.desc = this.$refs.formSetting.formModel.desc
      this.filedetail.title = this.$refs.formSetting.formModel.title
      // this.filedetail.coverBool = this.$refs.formSetting.formModel.coverBool
      this.filedetail.description = this.$refs.formSetting.formModel.description
      this.$message.success('保存成功')
    },
    handleGroup(type) {
      this.rightCardShow = false
      this.formData = {}
      this.title = "新增"
      this.addImageGroupVisible = true
    },
    // 获取栏目详情
    getColumnInfor() {
      var _this = this
      return new Promise((resolve, reject) => {
        columnInfor(this.treeTags[this.treeTags.length - 1].id)
          .then((response) => {
            _this.tagList = []
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
            _this.formSettings[0].items[3].options = _this.tagList
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取栏目图片组
    getColumnImage() {
      return new Promise((resolve, reject) => {
        columnImageList({ channelId:this.treeTags[this.treeTags.length - 1].id }, this.pageNum, this.pageSize)
          .then((response) => {
            this.imageGroupList = response.data.result.content ? response.data.result.content : []
            this.getColumnInfor()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    handleEdit(row) {
      this.rightCardShow = false
      this.title = "编辑"
      this.addImageGroupVisible = true
      return new Promise((resolve, reject) => {
        getImageListInfor(row.picGroupId)
          .then((response) => {
            this.formData = response.data.result
            this.formData.tagIdsList = response.data.result.tagIdsList ? response.data.result.tagIdsList : []
            if(this.formData.details && this.formData.details.length) {
              this.formData.details.forEach((ele) => {
                ele.url = ele.picUrl
                ele.name = ele.picName
              })
            }
            this.picGroupId = response.data.result.picGroupId
            this.$refs.vform.setData('tagIdsList', ['a'])
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    handleClean() {
      this.addImageGroupVisible = false
    },
    handleSave() {},
    handleDelete(row) {
      this.$confirm('确定删除该图片组吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return new Promise((resolve, reject) => {
          deleteImageList({picGroupId: row.picGroupId})
            .then((response) => {
              this.$message.success('删除成功')
              this.getColumnImage()
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
      }).catch(() => {      
      })
    }
  },
}
</script>
<style lang="scss">
.imageGroup-wrap{
  .image-setting{
    .form-section{
      border-bottom:none;
    }
    .el-card{
      margin-top:16px;
      .el-card__body {
        padding:0px;
      }
    }
  }
  .v-form {
    .form-section {
      overflow: visible;
      .upload-img, .upload-file{
        .el-upload-list {
          li {
            margin-bottom: 26px;
          }
        }
      }
      .upload-file {
        .el-upload-list {
          li {
            border: 1px solid #c0ccda;;
          }
        }
      }
      .file-img {
        height: 100px;
        img{
          width: auto;
          height:100%;
        }
      }
      .file-infor {
        .desc {
          margin-top:10px;
          div {
            color: #C0C4CC;
            line-height: 16px;
          }
        }
      }
    }
  }
}
// .el-button + .el-button {
//   margin: 5px 0px;
// }
// .imageGroup-wrap {
//   margin: 0 5px;
// }
// .tool-bar {
// }
// .title {
//   color: #454545;
//   padding: 10px 0;
//   font-weight: 700;
//   border-bottom: 1px solid #444;
//   margin-bottom: 20px;
// }
// .location-box {
//   width: 300px;
// }
// .location-btn {
//   width: 30%;
//   padding: 20px;
// }
</style>

