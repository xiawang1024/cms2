<template>
  <div class="docs-wrap">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基本内容" name="basicContent">
        <BasicContent :active-name="activeName"/>
      </el-tab-pane>
      <el-tab-pane label="封面图" name="coverPic" v-if="contextMenu.articleType !== 3">
        <cover-pic :active-name="activeName"/>
      </el-tab-pane>
      <el-tab-pane label="附件" name="picturesAndAccessories" v-if="contextMenu.articleType !== 3">
        <PicturesAndAccessories :prop-information="docInformation" :active-name="activeName" @docInfor="docInfor"/>
      </el-tab-pane>
      <el-tab-pane label="相关文档" name="relatedDocuments" v-if="contextMenu.docId && contextMenu.articleType !== 3">
        <RelatedDocuments :active-name="activeName"/>
      </el-tab-pane>
      <el-tab-pane label="直播消息" name="liveInformation" v-if="contextMenu.docId && contextMenu.articleType !== 3">
        <LiveInfor :active-name="activeName"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import PicturesAndAccessories from './picturesAndAccessories'
import BasicContent from './basicContent'
import RelatedDocuments from './relatedDocuments'
import LiveInfor from './liveInformation'
import coverPic from './coverPic'
import { mapGetters } from 'vuex'
export default {
  name: 'DocsWrap',
  components: {
    PicturesAndAccessories,
    BasicContent,
    RelatedDocuments,
    LiveInfor,
    coverPic
  },
  data() {
    return {
      activeName: 'basicContent',
      docInformation: {}
    }
  },
  computed: {
    ...mapGetters(['treeTags', 'contextMenu'])
  },
  methods: {
    docInfor(val) {
      this.docInformation = val
      console.log(val, 'docInformation11')
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

