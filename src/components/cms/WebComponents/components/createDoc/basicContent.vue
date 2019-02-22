<template>
  <div class="basicContent-wrap">
    <div class="tool-bar clearfix">
      <span style="color:#454545;font-weight:600;margin-right:10px">文档类型:</span>
      <el-select v-model="selectType" placeholder="请选择">
        <el-option v-for="type in types" :key="type.id" :label="type.name" :value="type.id"/>
      </el-select>
      <div class="tool-bar pull-right">
        <el-button type="warning" @click="handleSave">保存</el-button>
        <el-button type="warning" @click="handleSaveAddRelease">保存并发布</el-button>
      </div>
    </div>
    <imageText v-if="selectType == 1"/>
    <images v-if="selectType == 2"/>
    <splicing v-if="selectType == 3"/>
    <reproduce v-if="selectType == 4"/>
  </div>
</template>
<script>
import imageText from './imageText'
import images from './images.vue'
import splicing from './splicing.vue'
import reproduce from './reproduce.vue'
export default {
  name: 'BasicContent',
  components: { imageText, images, splicing, reproduce },
  data() {
    return {
      types: [
        {
          id: 1,
          name: '图文'
        },
        {
          id: 2,
          name: '图集'
        },
        {
          id: 3,
          name: '拼条'
        },
        {
          id: 4,
          name: '转载'
        }
      ],
      selectType: 1
    }
  },
  methods: {
    handleSave() {},
    handleSaveAddRelease() {}
  }
}
</script>
<style lang="scss" scoped>
.basicContent-wrap {
  margin: 0;
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

