<template>
  <div class="basicContent-wrap">
    <div class="tool-bars clearfix">
      <div v-if="contextMenu.articleType && contextMenu.articleType == 3" class="quote-tille">
        <span>文档类型： 引用</span>
      </div>
      <div v-else-if="contextMenu.articleType && contextMenu.articleType == 4" class="quote-tille">
        <span>文档类型： 转载</span>
      </div>
      <el-form ref="form" :model="typeForm" label-width="80px" v-else>
        <el-form-item label="文档类型">
          <el-select v-model="typeForm.articleType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <imageText
      ref="imageText"
      :extends-list="extendsList"
      :other-settings="otherSettings"
      :tag-list="tagList"
      :source-list="sourceList"
      :channel-id="channelId"
      :doc-infor="docInfor"
      v-if="typeForm.articleType == 0 || contextMenu.articleType == 3"
    />
    <other-type
      ref="othertType"
      :source-list="sourceList"
      :extends-list="extendsList"
      :other-setting="otherTypeformSetting"
      :tag-list="tagList"
      :channel-id="channelId"
      :doc-infor="docInfor"
      :article-type="typeForm.articleType"
      v-if="!(typeForm.articleType == 0 || typeForm.articleType == 3) && contextMenu.articleType !== 3"
    />
    <!-- <quote v-if="typeForm.articleType == 3"></quote> -->
  </div>
</template>
<script>
import imageText from "./imageText";
import otherType from "./otherArticleType";
import { columnInfor } from "@/api/cms/columnManage";
import { documentInfor, documentQuoteInfor } from "@/api/cms/article";
import { fetchDictByDictName } from "@/api/cms/dict";
// import { testSource } from "./sourceList";
import {
  otherSettings,
  imagesSeting,
  reproduceSetting,
  defultItems,
  articleLinkSetting,
  splicingSetting
} from "./setting.js";
import { mapGetters } from "vuex";
export default {
  name: "BasicContent",
  components: {
    imageText,
    otherType
  },
  props: {
    activeName: {
      default: "",
      type: String
    }
  },
  data() {
    return {
      typeForm: {
        articleType: 0
      },
      extendsList: [],
      tagList: [],
      channelId: "",
      docInfor: {},
      options: [
        {
          value: 0,
          label: "图文"
        },
        {
          value: 1,
          label: "图集"
        },
        {
          value: 2,
          label: "拼条"
        },
        {
          value: 4,
          label: "转载"
        },
        {
          value: 5,
          label: "外链"
        }
      ],
      otherSettings: otherSettings,
      imagesSeting: imagesSeting,
      reproduceSetting: reproduceSetting,
      articleLinkSetting: articleLinkSetting,
      splicingSetting: splicingSetting,
      sourceList: []
    };
  },
  computed: {
    ...mapGetters(["treeTags", "contextMenu"]),
    otherTypeformSetting() {
      switch (this.typeForm.articleType) {
        case 1:
          return this.removeRepet(this.imagesSeting, this.extendsList);
        case 2:
          return this.removeRepet(this.splicingSetting, this.extendsList);
        case 4:
          return this.removeRepet(this.reproduceSetting, this.extendsList);
        case 5:
          return this.removeRepet(this.articleLinkSetting, this.extendsList);
        default:
          [];
      }
    }
  },
  watch: {
    // 存储文章信息
    activeName(val, oldVal) {
      if (oldVal == "basicContent" && this.typeForm.articleType == 0) {
        this.$store.dispatch(
          "setBaseInfor",
          this.$refs.imageText.getSubmitData()
        );
      }
      if (oldVal == "basicContent" && this.typeForm.articleType !== 0) {
        this.$store.dispatch(
          "setBaseInfor",
          this.$refs.othertType.getSubmitData()
        );
      }
    }
  },
  created() {
    // 获取栏目详情
    this.getColumnInfor(this.treeTags[this.treeTags.length - 1].id);
    this.channelId = this.treeTags[this.treeTags.length - 1].id;
    this.fetchDict();
    if (
      JSON.parse(localStorage.getItem("BaseInfor")).clientLicenseId == "DXNews"
    ) {
      this.otherSettings[0].items[5].required = true;
    }
  },
  mounted() {
    if (this.contextMenu.articleType == 3) {
      this.otherSettings[0].items.forEach(ele => {
        ele.disabled = true;
      });
    } else {
      this.otherSettings[0].items.forEach(ele => {
        ele.disabled = false;
      });
    }
  },
  methods: {
    handleSave() {},
    handleSaveAddRelease() {},
    goBack() {
      this.$store.dispatch("setContextMenu", {
        id: "0",
        label: ""
      });
    },
    typeChange(val) {
      console.log(val);
    },
    datachange(type) {
      switch (type) {
        case "1":
          return "text";
        case "2":
          return "datetime";
        case "3":
          return "number";
        default:
          "";
      }
    },
    // 获取栏目详情
    getColumnInfor(id) {
      // 设置默认值， 防止扩展字段重复添加
      this.otherSettings[0].items = defultItems;
      return new Promise((resolve, reject) => {
        columnInfor(id)
          .then(response => {
            if (response.data.result.extFieldsList) {
              this.extendsList = response.data.result.extFieldsList.map(ele => {
                return {
                  label: ele.label,
                  name: ele.label,
                  type: this.datachange(ele.type),
                  required: ele.required,
                  placeholder: "请输入",
                  value: ele.defaultValue
                  // disabled: ele.defaultValue ? true : false
                };
              });
            }
            if (response.data.result.tagRule) {
              Object.keys(response.data.result.tagRule).forEach(ele => {
                if (response.data.result.tagRule[ele]) {
                  this.tagList.push({
                    label: response.data.result.tagRule[ele],
                    value: ele
                  });
                }
              });
            }
            this.otherSettings[0].items[0].options = this.tagList;
            this.imagesSeting[0].items[6].options = this.tagList;
            this.reproduceSetting[0].items[4].options = this.tagList;
            this.articleLinkSetting[0].items[4].options = this.tagList;
            this.$nextTick(() => {
              this.otherSettings[0].items = this.otherSettings[0].items.concat(
                this.extendsList
              );
              if (this.contextMenu.articleType == 3) {
                this.otherSettings[0].items.forEach(ele => {
                  ele.disabled = true;
                });
              }
            });
            //未设置标签字段时标签不显示
            if (!this.tagList.length) {
              this.otherSettings[0].items[0].hidden = true;
              this.imagesSeting[0].items[6].hidden = true;
              this.reproduceSetting[0].items[4].hidden = true;
              this.articleLinkSetting[0].items[4].hidden = true;
            } else {
              this.otherSettings[0].items[0].hidden = false;
              this.imagesSeting[0].items[6].hidden = false;
              this.reproduceSetting[0].items[4].hidden = false;
              this.articleLinkSetting[0].items[4].hidden = false;
            }
            if (this.contextMenu.docId) {
              if (this.contextMenu.articleType == 3) {
                this.getQuoteDocumentInfor(this.contextMenu.docId);
              } else {
                this.getDocumentInfor(this.contextMenu.docId);
              }
            } else {
              // 扩展字段必填触发updateForm
              this.$nextTick(() => {
                this.docInfor = {
                  hiddenFlag: "0",
                  topFlag: "0",
                  publishTime: new Date()
                };
              });
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // formItem去重
    removeRepet(originList, extendsList) {
      console.log(extendsList, "extendsList");
      let ext = originList[0].items.map(ele => {
        return ele.name;
      });
      extendsList.forEach(ele => {
        if (ext.indexOf(ele.name) === -1) {
          originList[0].items.push(ele);
        }
      });
      return originList;
    },
    getDocumentInfor(id) {
      return new Promise((resolve, reject) => {
        documentInfor(id)
          .then(response => {
            this.docInfor = response.data.result;
            if (this.docInfor.contentBody) {
              this.docInfor.contentBody = this.docInfor.contentBody.replace(
                /!important/g,
                ""
              );
            }
            this.typeForm.articleType = response.data.result.articleType
              ? response.data.result.articleType
              : 0;
            if (this.typeForm.articleType == 4) {
              this.typeForm.articleType = 0;
            }
            if (
              this.docInfor.extFieldsList &&
              this.docInfor.extFieldsList.length
            ) {
              this.docInfor.extFieldsList.forEach(ele => {
                this.docInfor[ele.label] = ele.fieldValue;
              });
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 获取引用文章详情
    getQuoteDocumentInfor(id) {
      return new Promise((resolve, reject) => {
        documentQuoteInfor(id)
          .then(response => {
            this.docInfor = response.data.result;
            this.typeForm.articleType = response.data.result.articleType
              ? response.data.result.articleType
              : 0;
            if (
              this.docInfor.extFieldsList &&
              this.docInfor.extFieldsList.length
            ) {
              this.docInfor.extFieldsList.forEach(ele => {
                this.docInfor[ele.label] = ele.fieldValue;
              });
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    fetchDict() {
      this.sourceList = [];
      return new Promise((resolve, reject) => {
        fetchDictByDictName("文稿来源")
          .then(response => {
            if (
              response.data.result.details &&
              response.data.result.details.length
            ) {
              this.sourceList = response.data.result.details.map(ele => {
                return {
                  label: ele.dictDetailName,
                  value: ele.dictDetailName,
                  combinName: ele.combinName
                };
              });
              // this.sourceList = testSource.map(ele => {
              //   return {
              //     label: ele.dictDetailName,
              //     value: ele.dictDetailName,
              //     combinName: ele.combinName
              //   };
              // });
              this.imagesSeting[0].items[2].options = this.sourceList;
              this.reproduceSetting[0].items[2].options = this.sourceList;
              this.articleLinkSetting[0].items[2].options = this.sourceList;
            }
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
<style lang="scss" >
.basicContent-wrap {
  margin: 0;
  margin-bottom: 30px;
  .tool-bars {
    label {
      font-weight: normal;
    }
    .el-form-item {
      margin-bottom: 0px;
      .el-input__inner {
        height: 32px;
        line-height: 32px;
      }
      .el-form-item__content {
        text-align: left;
      }
    }
    .quote-tille {
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding-left: 12px;
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

