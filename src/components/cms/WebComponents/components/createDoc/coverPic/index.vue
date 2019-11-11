<template>
  <div class="article-cover-pic">
    <div class="upload-content">
      <el-row :gutter="20">
        <el-col :sm="12" :md="12" :lg="12" :xl="12">
          <v-form
            ref="imageForm"
            :form-settings="imageSettings"
            :form-data="formData"
            label-width="80px"
            :show-preview="showPreview"
            :show-button="showButton"
            @fileDetail="fileDetail"
            @removeFile="removeFile"
          />
        </el-col>
        <el-col :sm="10" :md="10" :lg="10" :xl="10">
          <div v-if="rightCardShow" />
        </el-col>
      </el-row>
    </div>
    <el-dialog title="图片" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <v-form
        ref="vForm"
        :form-settings="fileSettings"
        :form-data="singleData"
        label-width="80px"
        :show-button="showButton"
      >
        <template slot="information">
          <div class="file-infor">
            <div class="file-img">
              <img :src="filedetail.url" alt style="width:auto; height:175px;" >
            </div>
            <div class="desc">
              <div style="line-height:18px">{{ filedetail.name }}</div>
              <div
                style="line-height:18px"
                v-if="filedetail.createTime"
              >{{ parseInt(filedetail.createTime)|timeFilter }}</div>
              <div
                style="line-height:18px"
                v-if="filedetail.size"
              >{{ Math.floor(filedetail.size / 1024) }} kb</div>
            </div>
          </div>
        </template>
        <template slot="btn">
          <el-button type="primary" size="mini" @click="setFile">保存</el-button>
        </template>
      </v-form>
    </el-dialog>
    <div class="upload-btn">
      <el-button type="primary" size="mini" @click="savePic('0')" v-if="!contextMenu.docId">保存</el-button>
      <el-button type="primary" size="mini" @click="savePic('11')" v-if="!contextMenu.docId">保存并发布</el-button>
      <el-button type="primary" size="mini" @click="savePic" v-if="contextMenu.docId">保存封面</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  documentInfor,
  picCoverHandel,
  createDocument
} from "@/api/cms/article";
// import imageDetail from './imageDetail'
export default {
  components: {
    // imageDetail
  },
  props: {
    activeName: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      picList: [],
      rightCardShow: false,
      singleData: {},
      showButton: false,
      filedetail: {},
      showPreview: false,
      imageSettings: [
        {
          items: [
            {
              label: "图片",
              name: "contentImagesList",
              type: "img",
              required: false,
              multiple: true,
              // hasTextInput: true,
              hidden: false,
              maxSize: 1024 * 5
            }
          ]
        }
      ],
      fileSettings: [
        {
          items: [
            {
              label: "图片详情",
              name: "information",
              type: "slot"
            },
            {
              label: "标题",
              name: "title",
              type: "text",
              placeholder: "请输入标题"
            },
            {
              label: "描述",
              name: "desc",
              type: "textarea",
              placeholder: "请输入描述"
            },
            {
              label: "设为封面",
              name: "coverBool",
              type: "switch",
              hidden: false
            },
            // {
            //   label: '自定义',
            //   name: 'define',
            //   type: 'slot'
            // },
            {
              label: "",
              name: "btn",
              type: "slot"
            }
          ]
        }
      ],
      formData: {},
      dialogVisible: false
    };
  },
  computed: {
    ...mapGetters(["contextMenu", "treeTags", "getDocInformation"])
  },
  watch: {
    activeName(val, oldVal) {
      if (val == "coverPic" && this.contextMenu.docId) {
        this.getDocumentInfor(this.contextMenu.docId);
        this.rightCardShow = false;
      } else if (val == "coverPic" && !this.contextMenu.docId) {
        // 从编辑器获取图片
        let imgReg = /<img.*?(?:>|\/>)/gi;
        let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let imgArr = this.getDocInformation.baseInfor.contentBody.match(imgReg);
        let imgSrc = [];
        if (imgArr && imgArr.length) {
          imgArr.forEach(ele => {
            let src = ele.match(srcReg);
            imgSrc.push({
              url: src[1],
              name: "图片"
            });
          });
        }
        this.formData = {};
        this.formData.contentImagesList = imgSrc;
        if (imgSrc.length && this.getDocInformation.coverImagesList.length) {
          imgSrc = imgSrc.concat(this.getDocInformation.coverImagesList);
          // 图片列表去重
          let obj = {};
          let resArray = [];
          imgSrc.forEach(ele => {
            if (!obj[ele.url]) {
              resArray.push(ele);
              obj[ele.url] = ele;
            }
          });
          this.formData.contentImagesList = resArray;
        } else {
          this.formData.contentImagesList = imgSrc.concat(
            this.getDocInformation.coverImagesList
          );
        }
      }
      // 存储封面图片
      if (oldVal == "coverPic") {
        this.$store.dispatch(
          "setCoverList",
          this.$refs.imageForm.formModel.contentImagesList
        );
      }
    }
  },
  mounted() {
    // if(this.contextMenu.docId) {
    //   console.log('tupian')
    //   this.getDocumentInfor(this.contextMenu.docId)
    // }
  },
  methods: {
    // 关闭
    colseSet() {
      this.rightCardShow = false;
      this.dialogVisible = false;
    },
    // 删除图片
    removeFile() {
      this.rightCardShow = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 点击图片获取详情
    fileDetail(val) {
      console.log(val, "uid");
      // this.rightCardShow = true
      this.singleData = {};
      this.filedetail = val;
      this.singleData = val;
      // window.sessionStorage.setItem('imageUid', val.uid)
      this.dialogVisible = true;
      this.$store.dispatch("setImageUid", val.uid);
      // this.showImage = true
    },
    // 保存图片参数
    setFile() {
      this.filedetail.desc = this.$refs.vForm.formModel.desc;
      this.filedetail.title = this.$refs.vForm.formModel.title;
      this.filedetail.coverBool = this.$refs.vForm.formModel.coverBool;
      this.$message.success("保存成功");
      this.dialogVisible = false;
    },
    differenceFile(articleAttachmentsList, type) {
      let arrResoult = [];
      if (articleAttachmentsList && articleAttachmentsList.length) {
        arrResoult = articleAttachmentsList.filter(ele => {
          return ele.category === type;
        });
      }
      return arrResoult;
    },
    getDocumentInfor(id) {
      return new Promise((resolve, reject) => {
        documentInfor(id)
          .then(response => {
            this.formData = response.data.result;
            this.formData.contentImagesList = response.data.result
              .coverImagesList
              ? response.data.result.coverImagesList
              : [];
            if (this.formData.contentImagesList.length) {
              this.formData.contentImagesList.forEach(ele => {
                if (!ele.name) {
                  ele.name = "图片";
                }
              });
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    savePic(type) {
      if (this.contextMenu.docId) {
        // 编辑封面图
        this.editCover();
      } else {
        // 新增文章是添加封面
        // this.addCover()

        let params = this.getDocInformation.baseInfor;
        params.channelId = this.treeTags[this.treeTags.length - 1].id;
        params.articleAttachmentsList = this.getDocInformation.attachmentsList;
        params.coverImagesList = this.$refs.imageForm.formModel.contentImagesList;
        params.articleStatus = type;
        if (!params.articleTitle && params.articleType !== 2) {
          this.$message.warning("文档标题不能为空");
          return;
        }
        if (!params.contentTitle) {
          this.$message.warning("首页标题不能为空");
          return;
        }
        if (
          !params.articleOrigin &&
          params.articleType !== 2 &&
          params.articleType !== 4
        ) {
          this.$message.warning("文章来源不能为空");
          return;
        }
        if (params.extFieldsList && params.extFieldsList.length) {
          for (let i = 0; i < params.extFieldsList.length; i++) {
            if (
              params.extFieldsList[i].required &&
              !params.extFieldsList[i].fieldValue
            ) {
              this.$message.warning(`${params.extFieldsList[i].label}不能为空`);
              return;
            }
          }
        }
        // DXNews
        if (
          JSON.parse(localStorage.getItem("BaseInfor")).clientLicenseId ==
            "DXNews" &&
          !params.articleShowStyle
        ) {
          this.$message.warning(`请选择展现形式`);
          return;
        }
        this.addCover(params);
      }
    },
    editCover() {
      return new Promise((resolve, reject) => {
        picCoverHandel(
          this.contextMenu.docId,
          this.$refs.imageForm.formModel.contentImagesList
        )
          .then(response => {
            this.$message.success("封面保存成功");
            // this.$store.dispatch('setContextMenu', {
            //   id: '0',
            //   label: ''
            // })
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    addCover(params) {
      console.log(params, "封面添加");
      return new Promise((resolve, reject) => {
        createDocument(params)
          .then(response => {
            this.$message.success("保存成功");
            this.$store.dispatch("setContextMenu", {
              id: "0",
              label: ""
            });
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
</script>
<style lang="scss">
.article-cover-pic {
  .el-dialog__body {
    .form-section {
      border-bottom: none;
    }
  }
  .upload-btn {
    padding-left: 80px;
  }
  .upload-content {
    max-width: 1000px;
    margin-top: 30px;
    label {
      font-weight: normal;
    }
    .define {
      .el-row {
        margin-bottom: 10px;
      }
    }
    .v-form {
      .form-section {
        overflow: visible;
        border-bottom: none;
        .upload-img,
        .upload-file {
          .el-upload-list {
            li {
              margin-bottom: 26px;
            }
          }
          .el-upload {
            width: 100%;
            height: 200px;
            /* border: 1px dashed; */
            border: 1px dashed #ccc;
            margin-bottom: 20px;
            border-radius: 5px;
            .el-button {
              margin-top: 100px;
            }
          }
        }
        .upload-file {
          .el-upload-list {
            li {
              border: 1px solid #c0ccda;
            }
          }
        }
        .file-img {
          width: 100%;
          img {
            width: 100%;
          }
        }
        .file-infor {
          .desc {
            div {
              color: #c0c4cc;
              height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>