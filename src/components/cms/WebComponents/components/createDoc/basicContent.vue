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
      :images-setting="otherTypeformSetting"
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
      sourceList: []
    };
  },
  computed: {
    ...mapGetters(["treeTags", "contextMenu"]),
    otherTypeformSetting() {
      switch (this.typeForm.articleType) {
        case 1:
          return imagesSeting;
        case 2:
          return splicingSetting;
        case 4:
          return reproduceSetting;
        case 5:
          return articleLinkSetting;
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
      var _this = this;
      return new Promise((resolve, reject) => {
        columnInfor(id)
          .then(response => {
            if (response.data.result.extFieldsList) {
              _this.extendsList = response.data.result.extFieldsList.map(
                ele => {
                  return {
                    label: ele.label,
                    name: ele.label,
                    type: _this.datachange(ele.type),
                    required: ele.required,
                    placeholder: "请输入",
                    value: ele.defaultValue
                    // disabled: ele.defaultValue ? true : false
                  };
                }
              );
            }
            if (response.data.result.tagRule) {
              Object.keys(response.data.result.tagRule).forEach(ele => {
                if (response.data.result.tagRule[ele]) {
                  _this.tagList.push({
                    label: response.data.result.tagRule[ele],
                    value: ele
                  });
                }
              });
            }
            _this.otherSettings[0].items[0].options = _this.tagList;
            _this.imagesSeting[0].items[6].options = _this.tagList;
            _this.reproduceSetting[0].items[4].options = _this.tagList;
            _this.articleLinkSetting[0].items[4].options = _this.tagList;
            this.$nextTick(() => {
              _this.otherSettings[0].items = _this.otherSettings[0].items.concat(
                _this.extendsList
              );
              if (_this.contextMenu.articleType == 3) {
                this.otherSettings[0].items.forEach(ele => {
                  ele.disabled = true;
                });
              }
            });
            //未设置标签字段时标签不显示
            if (!_this.tagList.length) {
              _this.otherSettings[0].items[0].hidden = true;
              _this.imagesSeting[0].items[6].hidden = true;
              _this.reproduceSetting[0].items[4].hidden = true;
              _this.articleLinkSetting[0].items[4].hidden = true;
            } else {
              _this.otherSettings[0].items[0].hidden = false;
              _this.imagesSeting[0].items[6].hidden = false;
              _this.reproduceSetting[0].items[4].hidden = false;
              _this.articleLinkSetting[0].items[4].hidden = false;
            }
            if (_this.contextMenu.docId) {
              if (_this.contextMenu.articleType == 3) {
                _this.getQuoteDocumentInfor(_this.contextMenu.docId);
              } else {
                _this.getDocumentInfor(_this.contextMenu.docId);
              }
            } else {
              // 扩展字段必填触发updateForm
              this.$nextTick(() => {
                _this.docInfor = {
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
    getDocumentInfor(id) {
      var _this = this;
      return new Promise((resolve, reject) => {
        documentInfor(id)
          .then(response => {
            _this.docInfor = response.data.result;
            if (_this.docInfor.contentBody) {
              _this.docInfor.contentBody = _this.docInfor.contentBody.replace(
                /!important/g,
                ""
              );
            }
            _this.typeForm.articleType = response.data.result.articleType
              ? response.data.result.articleType
              : 0;
            if (_this.typeForm.articleType == 4) {
              _this.typeForm.articleType = 0;
            }
            if (
              _this.docInfor.extFieldsList &&
              _this.docInfor.extFieldsList.length
            ) {
              _this.docInfor.extFieldsList.forEach(ele => {
                _this.docInfor[ele.label] = ele.fieldValue;
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
      var _this = this;
      return new Promise((resolve, reject) => {
        documentQuoteInfor(id)
          .then(response => {
            _this.docInfor = response.data.result;
            _this.typeForm.articleType = response.data.result.articleType
              ? response.data.result.articleType
              : 0;
            if (
              _this.docInfor.extFieldsList &&
              _this.docInfor.extFieldsList.length
            ) {
              _this.docInfor.extFieldsList.forEach(ele => {
                _this.docInfor[ele.label] = ele.fieldValue;
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
      var _this = this;
      _this.sourceList = [];
      return new Promise((resolve, reject) => {
        fetchDictByDictName("文稿来源")
          .then(response => {
            if (
              response.data.result.details &&
              response.data.result.details.length
            ) {
              _this.sourceList = response.data.result.details.map(ele => {
                return {
                  label: ele.dictDetailName,
                  value: ele.dictDetailName,
                  combinName: ele.combinName
                };
              });
              // _this.sourceList = testSource.map(ele => {
              //   return {
              //     label: ele.dictDetailName,
              //     value: ele.dictDetailName,
              //     combinName: ele.combinName
              //   };
              // });
              _this.imagesSeting[0].items[2].options = _this.sourceList;
              _this.reproduceSetting[0].items[2].options = _this.sourceList;
              _this.articleLinkSetting[0].items[2].options = _this.sourceList;
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

