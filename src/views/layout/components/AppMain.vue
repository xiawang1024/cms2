<template>
  <section class="app-main">
    <transition mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    }
  }
};
</script>

<style scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
  transition: all 0.1s !important;
  padding-bottom: 85px;
}
.app-main::-webkit-scrollbar {
  display: none;
}
.app-main > div:first-child {
  height: 100%;
  overflow-y: auto;
  padding: 15px;
}
</style>

