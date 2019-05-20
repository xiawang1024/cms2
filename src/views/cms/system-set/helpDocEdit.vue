<template>
  <div class="helpdoc-edit-container">
    <el-form :model="helpDocForm">
      <el-form-item label="标题">
        <el-input v-model="helpDocForm.title"/>
      </el-form-item>
      <el-form-item label="URI">
        <el-input v-model="helpDocForm.uri"/>
      </el-form-item>
      <el-form-item label="标签">
        <el-tag
          v-for="tag in helpDocForm.tags"
          :key="tag"
          style="margin-right:10px"
          closable
          @close="deleteTag(tag)"
        >{{ tag }}</el-tag>
        <el-autocomplete
          v-if="inputVisible"
          ref="saveTagInput"
          v-model="inputValue"
          :fetch-suggestions="querySearch"
          class="inline-input"
          placeholder="请输入"
          @select="handleSelect"
          @keyup.enter.native="handleInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag"
          size="mini"
          icon="el-icon-plus"
          @click="showInput"
        >输入标签或搜索已有标签</el-button>
      </el-form-item>
      <el-form-item label="内容">
        <Tinymce ref="editor" :height="400" v-model="helpDocForm.content" class="editor"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
      <el-button size="mini" type="primary" @click="handleSave()">保 存</el-button>
    </div>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
export default {
  name: "HelpDocEdit",
  components: { Tinymce },
  data() {
    return {
      helpDocForm: {
        title: "",
        uri: "",
        tags: ["标签一", "标签二", "标签三"]
      },
      tagList: [
        {
          value: "标签一"
        },
        {
          value: "标签二"
        },
        {
          value: "标签三"
        }
      ],
      content: "",
      inputVisible: false,
      inputValue: ""
    };
  },
  methods: {
    deleteTag(tag) {
      this.helpDocForm.tags.splice(this.helpDocForm.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    querySearch(queryString, cb) {
      var tags = this.tagList;
      var results = queryString
        ? tags.filter(this.createFilter(queryString))
        : this.tagList;
      // 调用 callback 返回建议列表的数据
      console.log(results);

      cb(results);
    },
    createFilter(queryString) {
      return tag => {
        return tag.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    handleSelect(item) {
      const inputValue = this.inputValue;
      if (inputValue) {
        this.helpDocForm.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleSave() {}
  }
};
</script>

<style scoped>
.helpdoc-edit-container {
  margin: 30px;
}

.editor {
  margin: 35px 0 10px;
}
</style>
