<template>
  <div class="logs-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="栏目基本信息" name="information">
        <BasicInformation :active-name = "activeName" :channel-id = "treeTags[treeTags.length - 1].id"/>
      </el-tab-pane>
      <el-tab-pane label="设置栏目模板" name="templet" v-if="contextMenu.label !== '建立子栏目' && checkAuth('cms:channel:template')">
        <ColumnTemplet :active-name = "activeName" :channel-array = "treeTags"/>
      </el-tab-pane>
      <el-tab-pane label="拓展字段" name="field" v-if="contextMenu.label !== '建立子栏目' && checkAuth('cms:channel:extendsWord')">
        <ExtendField :active-name = "activeName" :channel-id = "treeTags[treeTags.length - 1].id"/>
      </el-tab-pane>
      <el-tab-pane label="标签设置" name="label" v-if="contextMenu.label !== '建立子栏目' && checkAuth('cms:channel:tagSetting')">
        <LabelSetting :active-name = "activeName" :channel-id = "treeTags[treeTags.length - 1].id"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BasicInformation from './components/BasicInformation'
import ColumnTemplet from './components/ColumnTemplet'
import ExtendField from './components/ExtendField'
import LabelSetting from './components/LabelSetting'
import { mapGetters } from 'vuex'
export default {
  name: 'Logs',
  components: { BasicInformation, ColumnTemplet, ExtendField, LabelSetting },
  data() {
    return {
      activeName: 'information'
    }
  },
  computed: {
    ...mapGetters(['treeTags', 'contextMenu'])
  },
  mounted() {
    
  },
  methods: {
    handleClick() {},
        checkAuth (authKey) {
      if (this.$store.getters.authorities.indexOf(authKey) === -1) {
        return false
      } else {
        return true
      }
    },
  }
}
</script>

<style scoped>
.logs-container {
}
</style>
