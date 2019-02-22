<template>
  <div class="docs-wrap">
    <DocHead />
    <doc-list />
    <DocFoot />
  </div>
</template>
<script>
import DocHead from './docHead'
import DocList from './docList'
import DocFoot from './docFoot'
export default {
  name: 'DocsWrap',
  components: {
    DocHead,
    DocList,
    DocFoot
  }
}
</script>
<style lang="scss" scoped>
.docs-wrap {
  min-width: 1020px;
}
</style>

