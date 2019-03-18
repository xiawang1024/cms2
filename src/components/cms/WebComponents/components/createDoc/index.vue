<template>
  <div class="docs-wrap">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基本内容" name="basicContent">
        <BasicContent @docInfor="docInfor" :active-name="activeName"/>
      </el-tab-pane>
      <el-tab-pane label="图片和附件" name="picturesAndAccessories">
        <PicturesAndAccessories :doc-information="docInformation" :active-name="activeName"/>
      </el-tab-pane>
      <!-- <el-tab-pane label="相关文档" name="relatedDocuments">
        <RelatedDocuments/>
      </el-tab-pane> -->
    </el-tabs>
    <!-- {{ treeTags }} -->
  </div>
</template>
<script>
import PicturesAndAccessories from './picturesAndAccessories'
import BasicContent from './basicContent'
// import RelatedDocuments from './relatedDocuments'
import { mapGetters } from 'vuex'
export default {
  name: 'DocsWrap',
  components: {
    PicturesAndAccessories,
    BasicContent,
    // RelatedDocuments
  },
  data() {
    return {
      activeName: 'basicContent',
      docInformation: {}
    }
  },
  computed: {
    ...mapGetters(['treeTags'])
  },
  methods: {
    docInfor(val) {
      console.log(val)
      this.docInformation = val
    }
  }
}
</script>
<style lang="scss" scoped>
.docs-wrap {
  // min-width: 1020px;
  margin: 0px 10px 10px 10px;
}
</style>

