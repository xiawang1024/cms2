<template>
  <div id="app">
    <router-view/>
    <global-uploader/>

  </div>
</template>

<script>
export default{
  name: 'App',
  
}
</script>
<style lang="scss">
@import "~@/styles/element-ui.scss";
// @import "~@/assets/sass/cover.scss";
// @import "~@/assets/sass/common.scss";
</style>
