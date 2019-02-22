<template>
  <div class="web-site-tag">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>
        网站
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="item of treeTags"
        :key="item.id"
      >{{ item.label }}</el-breadcrumb-item>

    </el-breadcrumb>
    <span
      v-show="contextMenu.id !== '0' && contextMenu.label "
      class="context-menu"
    >（{{ contextMenu.label }}）</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'WebSiteTag',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['treeTags', 'contextMenu'])
  }
}
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  font-size: 12px;
}
.web-site-tag {
  display: flex;
  font-size: 12px;
  .context-menu {
    // margin-left: 4px;
    color: #333;
  }
}
</style>

