<template>
  <div class="splicing-wrap">
    <el-form ref="docContentForm" :model="docContentForm" label-width="80px">
      <p class="title">HTML标题</p>
      <el-form-item label="首页标题">
        <el-input v-model="docContentForm.textTitle" type="textarea"/>
      </el-form-item>
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
      <el-form-item label="附加数据">
        <el-input v-model="docContentForm.sequenceNumber" type="textarea"/>
      </el-form-item>
      <p class="title">标题预览</p>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'Splicing',
  data() {
    return {
      docContentForm: {
        textTitle: '',
        homePageTitle: '',
        docSource: '',
        docWriter: '',
        keyWords: '',
        abstract: '',
        tags: [],
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
.splicing-wrap {
  margin: 10px 0;
}
.title {
  font-size: 130%;
  padding: 10px 0;
  font-weight: 700;
  border-bottom: 1px solid #444;
  margin-bottom: 20px;
}
</style>

