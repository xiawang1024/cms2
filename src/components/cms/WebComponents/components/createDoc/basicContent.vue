<template>
  <div class="basicContent-wrap">
    <div class="tool-bar clearfix">
      <el-form ref="form" :model="typeForm" label-width="80px">
        <el-form-item label="文档类型">
          <el-radio-group v-model="typeForm.type" size="small" @change="typeChange">
            <el-radio-button label="1">图文</el-radio-button>
            <el-radio-button label="2">图集</el-radio-button>
            <el-radio-button label="3">拼条</el-radio-button>
            <el-radio-button label="4">转载</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <imageText v-if="typeForm.type == 1"/>
    <images v-if="typeForm.type == 2"/>
    <splicing v-if="typeForm.type == 3"/>
    <reproduce v-if="typeForm.type == 4"/>
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
      typeForm: {
        type: '1'
      }
    }
  },
  methods: {
    handleSave() {},
    handleSaveAddRelease() {},
    goBack() {
      this.$store.dispatch('setContextMenu', {
        id: '0',
        label: ''
      })
    },
    typeChange(val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss" >
.basicContent-wrap {
  margin: 0;
  .tool-bar{
    label {
      font-weight: normal;
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

