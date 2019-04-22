<template>
  <div class="addbaoliao">
    <v-form
      ref="vform"
      :model="formModel"
      :form-settings="formSettings"
      @save="submitSave"
      :btn-loading="isLoading"
    >
      <template slot="isScale">
        <div>
          <el-checkbox v-model="imageSetting.isScaleChecked">是否缩放</el-checkbox>
          <el-input
            v-if="imageSetting.isScaleChecked"
            v-model="imageSetting.width"
            style="width:10em"
            type="number"
            maxlength="3"
            step="10"
            max="100"
            min="0"
          >
            <template slot="prepend">宽</template>
          </el-input>
          <el-input
            v-if="imageSetting.isScaleChecked"
            v-model="imageSetting.height"
            style="width:10em"
            type="number"
            maxlength="3"
            step="10"
            max="100"
            min="0"
          >
            <template slot="prepend">高</template>
          </el-input>
        </div>
      </template>
    </v-form>
  </div>
</template>
<script>
// const Upload = _ => import('@/components/cms/Upload/upload')
export default {
  name: "ColumnHandel",
  // components: { Upload },
  data() {
    return {
      formModel: null,
      formSettings: [
        {
          items: [
            {
              label: "爆料名称：",
              name: "disclosureName",
              type: "text",
              required: true,
              placeholder: "请输入爆料名称"
            },
            {
              label: "爆料分类：",
              name: "disclosureClassify",
              type: "select",
              rule: [
                {
                  validator: this.checkColumnRepet
                },
                {
                  required: true,
                  trigger: "blur"
                }
              ],
              placeholder: "请选择分类",
              options: [
                {
                  label: "aaaaa",
                  value: "aaaaa"
                },
                {
                  label: "bbbb",
                  value: "bbbb"
                }
              ]
            },
            {
              label: "爆料人：",
              name: "disclosurePerson",
              type: "text",
              placeholder: "请输入爆料人"
            },
            {
              label: "爆料人电话：",
              name: "disclosurePhone",
              type: "text",
              placeholder: "请输入爆料人电话"
            },
            {
              label: "爆料描述",
              name: "disclosureDescrip",
              type: "textarea",
              placeholder: "请输入爆料描述"
            },
            {
              label: "爆料时间：",
              name: "disclosureTime",
              type: "datetime"
            }
          ]
        }
      ],
      routeQuery: {},
      isEdit: true,
      isLoading: false,
      imageSetting: {
        isScaleChecked: false,
        height: "",
        width: ""
      }
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitSave(formData) {
      this.isLoading = true;
      console.log("submitSavesubmitSave");
    }
  }
};
</script>
<style lang="scss" scoped>
// .addbaoliao {
//   width: 700px;
//   margin: 0 auto;
//   margin-top: 50px;
// }
//  .el-form-item__label{width:200px!important;}
</style>
