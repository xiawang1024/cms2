<template>
  <div class="sysType">
    <div
      v-for="(item,index) of sysTypeList"
      :class="selected(index)"
      :key="item.type"
      @click="selectHandler(index)"
      v-text="item.value"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import sysType from './sysType.js'
export default {
  data() {
    return {
      selectedIndex: 0
    }
  },
  computed: {
    ...mapGetters(['sysList']),
    sysTypeList: function() {
      return this.filterSysList(this.sysList)
    }
  },
  methods: {
    selected(index) {
      return this.selectedIndex === index
        ? { item: true, active: true }
        : { item: true }
    },
    selectHandler(sysType) {
      this.selectedIndex = sysType
      this.$store.dispatch('selectSysType', `${sysType}`)
    },
    filterSysList(sysList) {
      const syncSysList = sysType.filter(item => {
        return sysList.includes(item.type)
      })
      return syncSysList
    }
  }
}
</script>

<style lang="scss" scoped>
.sysType {
  display: flex;
  .item {
    height: 50px;
    position: relative;
    padding: 0 16px;
    font-size: 13px;
    color: #fff;
    box-sizing: border-box;
    &.active {
      color: rgb(255, 208, 75);
      border-bottom: 2px solid rgb(255, 208, 75);
    }
    &:hover {
      cursor: pointer;
      background: rgba(84, 92, 100, 0.5);
    }
  }
}
</style>

