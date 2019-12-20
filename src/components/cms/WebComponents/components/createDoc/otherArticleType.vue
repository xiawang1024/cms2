<template>
  <div class="images">
    <v-form
      ref="form"
      :form-settings="otherSetting"
      :form-data="formData"
      label-width="80px"
      :show-button="false"
    >
      <!-- <template slot="set">
        <div class="set">
          <el-checkbox true-label="1" false-label="0" v-model="adddocSet.topFlag">置顶</el-checkbox>
          <el-checkbox true-label="1" false-label="0" v-model="adddocSet.hiddenFlag">隐身</el-checkbox>
          <span class="extractCode">提取码</span>
          <el-input v-model="adddocSet.extractCode" />
        </div>
      </template>-->
      <template slot="preview">
        <div>
          <el-button type="primary" size="mini" @click="lookPreview">预览</el-button>
        </div>
        <div class="preview" v-if="indexTitle">
          <div v-html="indexTitle" />
        </div>
      </template>
      <template slot="articleOrigin" slot-scope="scope">
        <el-select
          v-model="scope.model.articleOrigin"
          filterable
          placeholder="请选择"
          clearable
          remote
          reserve-keyword
          :remote-method="filterMethod"
          :loading="selectloading"
        >
          <el-option
            v-for="(item, index) in filterSourceList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>
    </v-form>
    <div class="images-btn">
      <el-button size="mini" @click="goBack">返回</el-button>
      <el-button
        :disabled="Boolean(contextMenu.docId) && (docInfor.articleStatus ==1) && (baseInfor.userName !== docInfor.createUser)"
        type="primary"
        size="mini"
        @click="save('docContentForm', '0')"
      >保存</el-button>
      <el-button
        :disabled="Boolean(contextMenu.docId) && (docInfor.articleStatus ==1) && (baseInfor.userName !== docInfor.createUser)"
        type="primary"
        size="mini"
        @click="save('docContentForm', '11')"
      >保存并发布</el-button>
    </div>
  </div>
</template>
<script>
import { createDocument, editDocument } from "@/api/cms/article";
import { mapGetters } from "vuex";
import { handleDate } from "@/utils/date-filter";
import store from "store";
// import sourceMixin from "./mixin";
export default {
  name: "OtherArticleType",
  // mixins: [sourceMixin],
  props: {
    extendsList: {
      default: () => {
        return [];
      },
      type: Array
    },
    channelId: {
      default: "",
      type: String
    },
    docInfor: {
      default: () => {
        return {};
      },
      type: Object
    },
    tagList: {
      default: () => {
        return [];
      },
      type: Array
    },
    otherSetting: {
      default: () => {
        return [];
      },
      type: Array
    },
    articleType: {
      type: Number,
      default: 0
    },
    sourceList: {
      default: () => {
        return [];
      },
      type: Array
    }
  },
  data() {
    return {
      adddocSet: {
        extractCode: "",
        hiddenFlag: "0",
        topFlag: "1"
      },
      formData: {},
      isLoading: false,
      indexTitle: "",
      filterSourceList: [],
      selectloading: false
    };
  },
  computed: {
    ...mapGetters(["contextMenu", "getDocInformation"]),
    baseInfor() {
      return store.get("BaseInfor");
    }
  },
  watch: {
    docInfor(val) {
      this.adddocSet = {
        extractCode: val.extractCode,
        hiddenFlag: val.hiddenFlag + "",
        topFlag: val.topFlag + ""
      };
      this.formData = val;
      let showTags = [];
      if (val.tagIdsList) {
        val.tagIdsList.forEach(ele => {
          showTags.push(ele.tagId);
        });
      }
      this.formData.tagIds = showTags;
    },
    sourceList(val) {
      if (val.length) {
        this.filterSourceList = val;
      }
    }
  },
  mounted() {
    this.filterSourceList = this.sourceList;
    this.formData = this.docInfor;
    let showTags = [];
    if (this.docInfor.tagIdsList) {
      this.docInfor.tagIdsList.forEach(ele => {
        showTags.push(ele.tagId);
      });
    }
    this.formData.tagIds = showTags;
    this.adddocSet = {
      extractCode: this.docInfor.extractCode ? this.docInfor.extractCode : 0,
      hiddenFlag: this.docInfor.hiddenFlag
        ? this.docInfor.hiddenFlag + ""
        : "0",
      topFlag: this.docInfor.topFlag ? this.docInfor.topFlag + "" : "0"
    };
  },
  methods: {
    filterMethod(query) {
      window.query = query;
      if (query !== "") {
        this.selectloading = true;
        setTimeout(() => {
          this.selectloading = false;
          this.filterSourceList = this.sourceList.filter(item => {
            return item.combinName && item.combinName.indexOf(query) > -1;
          });
        }, 200);
      } else {
        this.filterSourceList = this.sourceList;
      }
    },
    // 拼条预览
    lookPreview() {
      this.indexTitle = this.$refs.form.formModel.contentTitle;
    },
    goBack() {
      this.$store.dispatch("setContextMenu", {
        id: "0",
        label: "",
        pageNum: this.contextMenu.pageNum,
        pageSize: this.contextMenu.pageSize
      });
    },
    createDoc(formData, saveType) {
      var _this = this;
      return new Promise((resolve, reject) => {
        createDocument(formData)
          .then(response => {
            _this.$message({
              showClose: true,
              message: "恭喜你，操作成功!",
              type: "success"
            });
            this.goBack();
            resolve();
            _this.isLoading = false;
          })
          .catch(error => {
            _this.isLoading = false;
            reject(error);
          });
      });
    },
    editDoc(formData, saveType) {
      var _this = this;
      return new Promise((resolve, reject) => {
        editDocument(formData)
          .then(response => {
            _this.$message({
              showClose: true,
              message: "恭喜你，操作成功!",
              type: "success"
            });
            this.goBack();
            resolve();
            _this.isLoading = false;
          })
          .catch(error => {
            _this.isLoading = false;
            reject(error);
          });
      });
    },
    getSubmitData() {
      let resoultObj = Object.assign(this.$refs.form.formModel, this.adddocSet);
      // 标签字段处理
      let chooseTags = [];
      if (resoultObj.tagIds) {
        resoultObj.tagIds.forEach(ele => {
          this.tagList.forEach(son => {
            if (ele == son.value) {
              chooseTags.push({
                tagId: son.value,
                tagName: son.label
              });
            }
          });
        });
      }
      // 获取扩展字段的值
      let extendsFields = [];
      // 扩展字段时间处理
      if (this.extendsList.length) {
        extendsFields = this.extendsList.map(ele => {
          if (ele.type == "datetime") {
            if (resoultObj[ele.label]) {
              return {
                label: ele.label,
                fieldValue: handleDate(resoultObj[ele.label]),
                required: ele.required
              };
            } else {
              return {
                label: ele.label,
                fieldValue: resoultObj[ele.label],
                required: ele.required
              };
            }
          } else {
            return {
              label: ele.label,
              fieldValue: resoultObj[ele.label],
              required: ele.required
            };
          }
        });
      }
      resoultObj.extFieldsList = extendsFields;
      resoultObj.tagIdsList = chooseTags;
      resoultObj.articleType = this.articleType;
      delete resoultObj.set;
      delete resoultObj.tagIds;
      delete resoultObj.btn;
      if (!resoultObj.contentBody) {
        resoultObj.contentBody = "";
      }
      // 时间格式处理
      if (resoultObj.publishTime) {
        resoultObj.publishTime = handleDate(resoultObj.publishTime);
      }
      resoultObj.channelId = this.channelId;
      return resoultObj;
    },
    save(formName, publishType, saveType) {
      this.$refs.form.getDataAsync().then(data => {
        if (!data) {
          return;
        }
        let resoultObj = this.getSubmitData();
        resoultObj.channelId = this.channelId;
        resoultObj.articleStatus = publishType;
        // 编辑文章
        if (this.contextMenu.docId) {
          if (
            this.getDocInformation.attachmentsList &&
            this.getDocInformation.attachmentsList.length
          ) {
            resoultObj.articleAttachmentsList = this.getDocInformation.attachmentsList;
          } else {
            resoultObj.articleAttachmentsList = this.docInfor.articleAttachmentsList;
          }
          resoultObj.articleId = this.contextMenu.docId;
          this.editDoc(resoultObj, saveType);
        } else {
          // 新建文章
          if (
            this.getDocInformation.attachmentsList &&
            this.getDocInformation.attachmentsList.length
          ) {
            resoultObj.articleAttachmentsList = this.getDocInformation.attachmentsList;
          } else {
            resoultObj.articleAttachmentsList = [];
          }
          resoultObj.coverImagesList = this.getDocInformation.coverImagesList;
          this.createDoc(resoultObj, saveType);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.images {
  // margin: 10px 0;
  .set {
    .extractCode {
      margin-left: 10px;
      margin-right: 10px;
    }
    .el-input {
      width: 100px;
    }
    .el-checkbox {
      margin-right: 10px;
    }
  }
  .images-btn {
    padding-left: 80px;
  }
}
</style>

