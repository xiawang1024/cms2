<template>
  <div id="app">
    <router-view/>
    <global-uploader/>

  </div>
</template>

<script>
    import globalUploader from '@/components/simple-uploader/globalUploader.vue'
export default{
  name: 'App',
  components: {
            globalUploader
        },
  data(){
    return{

    }
  },
}
</script>
<style lang="scss">
@import "~@/styles/element-ui.scss";
// @import "~@/assets/sass/cover.scss";
// @import "~@/assets/sass/common.scss";
</style>
