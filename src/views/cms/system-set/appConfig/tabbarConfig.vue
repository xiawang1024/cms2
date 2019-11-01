<template>
  <div>
    <v-form
      ref="vform"
      :form-settings="formSettings"
      :form-data="formData"
      @save="submitSave"
      label-width="160px"
    />
  </div>
</template>
<script>
export default {
  props: {
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    //导航图
    var startPicture1 = (rule, value, callback) => {
      let pic = new Image();
      if (value[0]) {
        pic.src = value[0].url;
        let imgType = value[0].url
          .split(".")
          .reverse()[0]
          .toLowerCase();
        if (imgType == "png") {
          // if (pic.width != 750 || pic.height != 140) {
          //   callback(new Error("请上传750*140像素的图片"));
          // } else {
            callback();
          // }
        } else {
          callback(new Error("请上传PNG格式图片"));
        }
      } else {
        callback(new Error("请上传750*140像素的PNG格式图片"));
      }
    };
    //我的背景图
    var startPicture2 = (rule, value, callback) => {
      let pic = new Image();
      if (value[0]) {
        pic.src = value[0].url;
        let imgType = value[0].url
          .split(".")
          .reverse()[0]
          .toLowerCase();
        if (imgType == "png") {
          if (pic.width != 750 || pic.height != 470) {
            callback(new Error("请上传750*470像素的图片"));
          } else {
            callback();
          }
        } else {
          callback(new Error("请上传PNG格式图片"));
        }
      } else {
        callback(new Error("请上传750*470像素的PNG格式图片"));
      }
    };

    return {
      formSettings: [
        {
          items: [
            {
              label: "导航图",
              name: "themeImageUrl",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传图片",
              rule: [
                {
                  required: true,
                  validator: startPicture1,
                  trigger: "blur"
                }
              ]
            },
            {
              label: "我的背景图",
              name: "myImageUrl",
              type: "img",
              limit: 1,
              disabled: false,
              placeholder: "请上传图片",
              rule: [
                {
                  required: true,
                  validator: startPicture2,
                  trigger: "blur"
                }
              ]
            },
            {
              label: "底部图标1（选中）",
              name: "icon00",
              type: "img",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请上传图片"
            },
            {
              label: "底部图标1（未选中）",
              name: "icon10",
              type: "img",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请上传图片"
            },
            {
              label: "名字",
              name: "name0",
              type: "text",
              disabled: false,
              placeholder: "请输入模块名",
              required: true
            },
            {
              label: "底部图标2（选中）",
              name: "icon01",
              type: "img",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请上传图片"
            },
            {
              label: "底部图标2（未选中）",
              name: "icon11",
              type: "img",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请上传图片"
            },
            {
              label: "名字",
              name: "name1",
              type: "text",
              disabled: false,
              placeholder: "请输入模块名",
              required: true
            },
            {
              label: "底部图标3（选中）",
              name: "icon02",
              type: "img",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请上传图片"
            },
            {
              label: "底部图标3（未选中）",
              name: "icon12",
              type: "img",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请上传图片"
            },
            {
              label: "名字",
              name: "name2",
              type: "text",
              disabled: false,
              placeholder: "请输入模块名",
              required: true
            },
            {
              label: "底部图标4（选中）",
              name: "icon03",
              type: "img",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请上传图片"
            },
            {
              label: "底部图标4（未选中）",
              name: "icon13",
              type: "img",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请上传图片"
            },
            {
              label: "名字",
              name: "name3",
              type: "text",
              disabled: false,
              placeholder: "请输入模块名",
              required: true
            },
            {
              label: "底部图标5（选中）",
              name: "icon04",
              type: "img",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请上传图片"
            },
            {
              label: "底部图标5（未选中）",
              name: "icon14",
              type: "img",
              limit: 1,
              disabled: false,
              required: true,
              placeholder: "请上传图片"
            },
            {
              label: "名字",
              name: "name4",
              type: "text",
              disabled: false,
              placeholder: "请输入模块名",
              required: true
            },
            {
              label: "版本",
              name: "version",
              type: "text",
              disabled: false,
              required: true,
              placeholder: "请输入版本号",
              required: true
            },
            {
              label: "启用主题",
              name: "status1",
              disabled: false,
              type: "checkbox",
              value: false,
              options: [
                {
                  // select、radio、checkbox等的选择内容
                  label: "启用",
                  value: true
                }
              ]
            },
            {
              label: "主题色(#ffffff)",
              name: "color",
              type: "text",
              disabled: false,
              placeholder: "请输入主题色",
              required: true
            }
          ]
        }
      ]
    };
  },
  created() {},
  methods: {
    submitSave(val) {
      this.$emit("iconUpload", val);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>