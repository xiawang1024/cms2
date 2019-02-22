<template>
  <div class="imageText-wrap">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <el-form ref="docContentForm" :model="docContentForm" label-width="80px">
          <el-form-item label="正文标题">
            <el-input v-model="docContentForm.textTitle"/>
          </el-form-item>
          <el-form-item label="首页标题">
            <el-input v-model="docContentForm.homePageTitle"/>
          </el-form-item>
          <el-form-item label="文档来源">
            <el-input v-model="docContentForm.docSource"/>
          </el-form-item>
          <el-form-item label="文档作者">
            <el-input v-model="docContentForm.docWriter"/>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="docContentForm.keyWords"/>
          </el-form-item>
          <el-form-item label="摘要">
            <el-input v-model="docContentForm.abstract" type="textarea"/>
          </el-form-item>
          <el-form-item label="标签"/>
          <el-form-item label="设置">
            <el-switch v-model="docContentForm.setTop" active-color="#13ce66"/>
            <span style="margin:0 30px 0 10px">置顶</span>
            <el-switch v-model="docContentForm.invisible" active-color="#13ce66"/>
            <span style="margin:0 30px 0 10px">隐身</span>
            <span style="margin-left:10px">提取码:</span>
            <el-input v-model="docContentForm.code" style="width:5em" maxlength="4"/>
          </el-form-item>
          <el-form-item label="排序号">
            <el-input v-model="docContentForm.sequenceNumber"/>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <div class="grid-content bg-purple">
          <Tinymce ref="editor" :height="400" v-model="docContentForm.content"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Tinymce from '@/components/Tinymce'
export default {
  name: 'ImageText',
  components: { Tinymce },
  data() {
    return {
      docContentForm: {
        textTitle: '',
        homePageTitle: '',
        docSource: '',
        docWriter: '',
        keyWords: '',
        abstract: '',
        tags: '',
        setTop: false,
        invisible: false,
        code: '',
        sequenceNumber: 0,
        content: ''
      }
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.imageText-wrap {
  margin: 10px 0;
}
</style>

