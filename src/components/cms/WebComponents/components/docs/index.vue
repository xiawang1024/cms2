<template>
  <div class="docs-wrap">
    <DocHead />
    <doc-list />
    <DocFoot />
    {{ treeTags }}
  </div>
</template>
<script>
import DocHead from './docHead'
import DocList from './docList'
import DocFoot from './docFoot'
import { mapGetters } from 'vuex'
export default {
  name: 'DocsWrap',
  components: {
    DocHead,
    DocList,
    DocFoot
  },
  computed: {
    ...mapGetters(['treeTags'])
  }
}
</script>
<style lang="scss" scoped>
.docs-wrap {
  min-width: 1020px;
}
</style>
